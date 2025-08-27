import { type User, type InsertUser, type Application, type InsertApplication, type Test, type InsertTest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getApplication(id: string): Promise<Application | undefined>;
  createApplication(application: Omit<InsertApplication, 'id'>): Promise<Application>;
  updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined>;
  
  getTest(id: string): Promise<Test | undefined>;
  createTest(test: Omit<InsertTest, 'id'>): Promise<Test>;
  updateTest(id: string, updates: Partial<Test>): Promise<Test | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private applications: Map<string, Application>;
  private tests: Map<string, Test>;

  constructor() {
    this.users = new Map();
    this.applications = new Map();
    this.tests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(applicationData: Omit<InsertApplication, 'id'>): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...applicationData,
      id,
      status: 'pending',
      testCompleted: false,
      submittedAt: new Date(),
      updatedAt: new Date(),
      additionalInfo: applicationData.additionalInfo || null,
      testScore: null,
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) {
      return undefined;
    }

    const updatedApplication = {
      ...application,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  async getTest(id: string): Promise<Test | undefined> {
    return this.tests.get(id);
  }

  async createTest(testData: Omit<InsertTest, 'id'>): Promise<Test> {
    const id = randomUUID();
    const test: Test = {
      ...testData,
      id,
      completed: false,
      startedAt: new Date(),
      completedAt: null,
      answers: null,
      score: null,
    };
    this.tests.set(id, test);
    return test;
  }

  async updateTest(id: string, updates: Partial<Omit<Test, 'id' | 'startedAt'>>): Promise<Test | undefined> {
    const test = this.tests.get(id);
    if (!test) {
      return undefined;
    }

    const updatedTest = {
      ...test,
      ...updates,
    };
    
    this.tests.set(id, updatedTest);
    return updatedTest;
  }
}

export const storage = new MemStorage();
