import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FileUpload from "./file-upload";
import { ArrowRight, ArrowLeft } from "lucide-react";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  experience: z.string().min(1, "Experience level is required"),
});

const roleSelectionSchema = z.object({
  role: z.string().min(1, "Role selection is required"),
  additionalInfo: z.string().optional(),
});

const documentsSchema = z.object({
  passportFile: z.any().optional(),
  credentialsFile: z.any().optional(),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
type RoleSelectionForm = z.infer<typeof roleSelectionSchema>;
type DocumentsForm = z.infer<typeof documentsSchema>;

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const { toast } = useToast();

  const personalForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData,
  });

  const roleForm = useForm<RoleSelectionForm>({
    resolver: zodResolver(roleSelectionSchema),
    defaultValues: formData,
  });

  const documentsForm = useForm<DocumentsForm>({
    resolver: zodResolver(documentsSchema),
    defaultValues: formData,
  });

  const submitApplicationMutation = useMutation({
    mutationFn: async (applicationData: any) => {
      const formDataToSubmit = new FormData();
      
      // Add form fields
      Object.keys(applicationData).forEach(key => {
        if (key !== 'passportFile' && key !== 'credentialsFile') {
          formDataToSubmit.append(key, applicationData[key]);
        }
      });

      // Add files
      if (uploadedFiles.passport) {
        formDataToSubmit.append('passport', uploadedFiles.passport);
      }
      if (uploadedFiles.credentials) {
        formDataToSubmit.append('credentials', uploadedFiles.credentials);
      }

      return apiRequest("POST", "/api/applications", formDataToSubmit);
    },
    onSuccess: (response) => {
      toast({
        title: "Application Submitted",
        description: "We'll review your application and be in touch soon!",
      });
      
      // If caregiver role, redirect to test
      if (formData.role === 'caregiver' && response && typeof response === 'object' && 'testId' in response) {
        window.location.href = `/test/${response.testId}`;
      }
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const progress = (currentStep / 4) * 100;

  const stepLabels = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Role Selection" },
    { number: 3, label: "Documents" },
    { number: 4, label: "Review & Submit" },
  ];

  const handleNextStep = async (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFileUpload = (fileType: 'passport' | 'credentials', file: File) => {
    setUploadedFiles((prev: Record<string, File>) => ({ ...prev, [fileType]: file }));
  };

  const handleFinalSubmit = async () => {
    const completeData = { ...formData, ...uploadedFiles };
    submitApplicationMutation.mutate(completeData);
  };

  return (
    <div className="bg-muted p-8 rounded-2xl">
      {/* Progress Indicator */}
      <div className="mb-12" data-testid="progress-indicator">
        <Progress value={progress} className="w-full mb-6" />
        <div className="flex items-center justify-between">
          {stepLabels.map((step) => (
            <div key={step.number} className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= step.number ? 'step-active' : 
                currentStep > step.number ? 'step-completed' : 'step-inactive'
              }`}>
                {step.number}
              </div>
              <div className={`text-sm font-semibold ${
                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Form {...personalForm}>
          <form onSubmit={personalForm.handleSubmit(handleNextStep)} className="space-y-6" data-testid="step-personal-info">
            <h3 className="text-2xl font-bold text-foreground mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={personalForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} data-testid="input-fullname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={personalForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+254 700 000 000" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
                        <SelectItem value="ghana">Ghana</SelectItem>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your current city" {...field} data-testid="input-city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-dob" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={personalForm.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Healthcare Experience *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-experience">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6">
              <Button type="submit" className="w-full md:w-auto px-8 py-3" data-testid="button-next-step1">
                Continue to Role Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Step 2: Role Selection */}
      {currentStep === 2 && (
        <Form {...roleForm}>
          <form onSubmit={roleForm.handleSubmit(handleNextStep)} className="space-y-6" data-testid="step-role-selection">
            <h3 className="text-2xl font-bold text-foreground mb-6">Role Selection</h3>
            
            <FormField
              control={roleForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which role are you applying for? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="Select your desired role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nurse">Registered Nurse</SelectItem>
                      <SelectItem value="midwife">Midwife</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={roleForm.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your specializations, preferred locations, or any other relevant information..."
                      className="min-h-[100px]"
                      {...field}
                      data-testid="textarea-additional-info"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={handlePreviousStep} data-testid="button-previous-step2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button type="submit" data-testid="button-next-step2">
                Continue to Documents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Step 3: Documents */}
      {currentStep === 3 && (
        <div className="space-y-6" data-testid="step-documents">
          <h3 className="text-2xl font-bold text-foreground mb-6">Upload Documents</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Passport Copy *</label>
              <FileUpload
                onFileSelect={(file) => handleFileUpload('passport', file)}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                testId="upload-passport"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Professional Credentials *</label>
              <FileUpload
                onFileSelect={(file) => handleFileUpload('credentials', file)}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={10}
                testId="upload-credentials"
              />
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Required Documents:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Valid passport (bio page)</li>
              <li>• Professional qualifications/certificates</li>
              <li>• Professional registration certificates</li>
              <li>• Work experience letters</li>
            </ul>
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={handlePreviousStep} data-testid="button-previous-step3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={() => handleNextStep({})}
              disabled={!uploadedFiles.passport || !uploadedFiles.credentials}
              data-testid="button-next-step3"
            >
              Review Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {currentStep === 4 && (
        <div className="space-y-6" data-testid="step-review">
          <h3 className="text-2xl font-bold text-foreground mb-6">Review Your Application</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-4">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                <p><span className="font-medium">Country:</span> {formData.country}</p>
                <p><span className="font-medium">City:</span> {formData.city}</p>
                <p><span className="font-medium">Experience:</span> {formData.experience}</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-4">Application Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Role:</span> {formData.role}</p>
                <p><span className="font-medium">Passport:</span> {uploadedFiles.passport ? '✓ Uploaded' : '✗ Missing'}</p>
                <p><span className="font-medium">Credentials:</span> {uploadedFiles.credentials ? '✓ Uploaded' : '✗ Missing'}</p>
                {formData.additionalInfo && (
                  <p><span className="font-medium">Additional Info:</span> {formData.additionalInfo}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-accent/10 p-6 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Next Steps</h4>
            <p className="text-muted-foreground text-sm">
              After submitting your application, we'll review your documents and credentials. 
              {formData.role === 'caregiver' && ' You will then be directed to complete a skills assessment test.'}
              {formData.role !== 'caregiver' && ' We\'ll be in touch within 2-3 business days with the next steps.'}
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={handlePreviousStep} data-testid="button-previous-step4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={handleFinalSubmit}
              disabled={submitApplicationMutation.isPending}
              className="bg-primary text-primary-foreground px-8 py-3"
              data-testid="button-submit-application"
            >
              {submitApplicationMutation.isPending ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
