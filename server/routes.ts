import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertApplicationSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create user endpoint
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Submit application endpoint
  app.post("/api/applications", upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'credentials', maxCount: 1 }
  ]), async (req, res) => {
    try {
      // First create or get user
      const userSchema = insertUserSchema.extend({
        role: z.string(),
        additionalInfo: z.string().optional(),
      });
      
      const userData = userSchema.parse(req.body);
      const { role, additionalInfo, ...userFields } = userData;
      
      let user = await storage.getUserByEmail(userFields.email);
      if (!user) {
        user = await storage.createUser(userFields);
      }

      // Handle file uploads
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const passportUrl = files?.passport?.[0]?.path;
      const credentialsUrl = files?.credentials?.[0]?.path;

      // Create application
      const applicationData = {
        userId: user.id,
        role,
        passportUrl,
        credentialsUrl,
        additionalInfo: additionalInfo ? JSON.stringify({ notes: additionalInfo }) : null,
      };

      const application = await storage.createApplication(applicationData);

      // Create test for caregivers
      let testId = null;
      if (role === 'caregiver') {
        const test = await storage.createTest({
          applicationId: application.id,
          role,
          questions: JSON.stringify(getCaregiverQuestions()),
        });
        testId = test.id;
      }

      res.json({ 
        success: true, 
        applicationId: application.id,
        testId,
        message: "Application submitted successfully"
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get test endpoint
  app.get("/api/tests/:id", async (req, res) => {
    try {
      const test = await storage.getTest(req.params.id);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      res.json(test);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Submit test answers endpoint
  app.post("/api/tests/:id/submit", async (req, res) => {
    try {
      const testId = req.params.id;
      const { answers } = req.body;

      const test = await storage.getTest(testId);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }

      if (test.completed) {
        return res.status(400).json({ message: "Test already completed" });
      }

      // Calculate score
      const questions = test.questions;
      let score = 0;
      let totalQuestions = 0;

      if (Array.isArray(questions)) {
        totalQuestions = questions.length;
        questions.forEach((question: any) => {
          const userAnswer = answers[question.id];
          if (userAnswer === question.correctAnswer) {
            score++;
          }
        });
      }

      const finalScore = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

      // Update test
      await storage.updateTest(testId, {
        answers: JSON.stringify(answers),
        score: finalScore,
        completed: true,
        completedAt: new Date(),
      });

      // Update application
      await storage.updateApplication(test.applicationId, {
        testScore: finalScore,
        testCompleted: true,
        status: finalScore >= 70 ? 'approved' : 'testing',
      });

      res.json({ 
        success: true, 
        score: finalScore,
        passed: finalScore >= 70,
        message: finalScore >= 70 ? "Test passed! We'll be in touch soon." : "Test completed. We'll review your results."
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getCaregiverQuestions() {
  return [
    {
      id: "q1",
      question: "What is the most important thing to consider when assisting an elderly person with mobility issues?",
      options: [
        "Speed of movement",
        "Patient safety and comfort",
        "Time efficiency",
        "Personal convenience"
      ],
      correctAnswer: 1
    },
    {
      id: "q2", 
      question: "When should you wash your hands in a care setting?",
      options: [
        "Only when they look dirty",
        "Before and after each patient contact",
        "Once at the start of your shift",
        "When reminded by supervisors"
      ],
      correctAnswer: 1
    },
    {
      id: "q3",
      question: "How should you respond if a patient falls?",
      options: [
        "Help them up immediately",
        "Call for help and assess for injuries before moving them",
        "Leave them on the floor until a nurse arrives",
        "Take a photo for incident reporting"
      ],
      correctAnswer: 1
    },
    {
      id: "q4",
      question: "What is the correct procedure for disposing of medical waste?",
      options: [
        "Put it in regular trash bins",
        "Use designated medical waste containers",
        "Take it home for disposal",
        "Burn it in the facility"
      ],
      correctAnswer: 1
    },
    {
      id: "q5",
      question: "When a patient refuses medication, you should:",
      options: [
        "Force them to take it",
        "Hide it in their food",
        "Report to the nurse and document the refusal",
        "Skip it and not tell anyone"
      ],
      correctAnswer: 2
    }
  ];
}
