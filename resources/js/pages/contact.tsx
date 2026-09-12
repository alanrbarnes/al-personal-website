import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';


// Form validation schema
const contactSchema = z.object({
  path: z.enum(['hiring', 'freelance']),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Please provide more detail in your message'),
  // Hiring specific
  company: z.string().optional(),
  role: z.string().optional(),
  // Freelance specific
  projectType: z.string().optional(),
  budget: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.path === 'hiring') {
    if (!data.company || data.company.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Company name is required", path: ["company"] });
    }

    if (!data.role || data.role.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Role/Position is required", path: ["role"] });
    }
  }

  if (data.path === 'freelance') {
    if (!data.projectType || data.projectType.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Project type is required", path: ["projectType"] });
    }

    if (!data.budget) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please select a budget range", path: ["budget"] });
    }
  }
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const gotchaRef = useRef<HTMLInputElement>(null);
  const mountTimeRef = useRef(Date.now());

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      path: 'hiring',
      name: '',
      email: '',
      message: '',
      company: '',
      role: '',
      projectType: '',
      budget: '',
    },
  });

  const path = form.watch('path');

  const onSubmit = (data: ContactFormValues) => {
    setSubmitStatus('submitting');

    const { projectType, ...rest } = data;

    router.post('/contact', {
      ...rest,
      project_type: projectType,
      _gotcha: gotchaRef.current?.value ?? '',
      _ts: mountTimeRef.current,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setSubmitStatus('success');
        form.reset();
      },
      onError: (errors) => {
        setSubmitStatus('error');
        Object.entries(errors).forEach(([field, message]) => {
          const formField = field === 'project_type' ? 'projectType' : field;
          form.setError(formField as keyof ContactFormValues, { message: message as string });
        });
      },
    });
  };

  return (
    <>
      <Head title="Contact" />
      <div className="bg-background pt-20 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking to fill a full-time engineering role or need a reliable developer for a custom project, I'd love to hear from you.
            </p>
          </motion.div>
  
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 sm:p-10 shadow-sm"
          >
            
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="text-primary font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start">
                      <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Submission Error</h4>
                        <p className="text-sm mt-1">
                          There was a problem sending your message. Please try again or email me directly.
                        </p>
                      </div>
                    </div>
                  )}
  
                  {/* Path Selector */}
                  <FormField
                    control={form.control}
                    name="path"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-base">What are you getting in touch about?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroupItem value="hiring" className="peer sr-only" />
                              </FormControl>
                              <FormLabel className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-primary hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all">
                                <span className="font-bold">I'm hiring for a role</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroupItem value="freelance" className="peer sr-only" />
                              </FormControl>
                              <FormLabel className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-primary hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all">
                                <span className="font-bold">I have a project for you</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
  
                  {/* Conditional Fields: Hiring */}
                  {path === 'hiring' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Senior Frontend Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
  
                  {/* Conditional Fields: Freelance */}
                  {path === 'freelance' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. E-commerce site, internal dashboard" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Budget</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under_1k">Under $1,000</SelectItem>
                                <SelectItem value="1k_5k">$1,000 – $5,000</SelectItem>
                                <SelectItem value="5k_10k">$5,000 – $10,000</SelectItem>
                                <SelectItem value="over_10k">$10,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={path === 'hiring' ? "Tell me a bit about the team and the technical stack..." : "Describe the problem you are trying to solve..."}
                            className="min-h-[150px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <input
                    type="text"
                    name="_gotcha"
                    ref={gotchaRef}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-only"
                  />
  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-bold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitStatus === 'submitting' ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="mr-2 w-5 h-5" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
  
                </form>
              </Form>
            )}
  
          </motion.div>
  
          <div className="mt-12 text-center text-muted-foreground text-sm">
            <p>Prefer to email directly? Reach out at <a href="mailto:alanbarnes447@gmail.com" className="text-primary hover:underline font-medium">alanbarnes447@gmail.com</a></p>
          </div>
  
        </div>
      </div>
    </>
  );
}
