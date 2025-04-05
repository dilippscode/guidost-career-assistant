
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Message sent successfully! We'll get back to you soon.");
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold gradient-heading mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-guidost-500" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a 
                    href="mailto:dilippsdilip@gmail.com" 
                    className="text-guidost-600 hover:underline"
                  >
                    dilippsdilip@gmail.com
                  </a>
                </CardDescription>
                <p className="text-sm text-gray-500 mt-2">
                  For general inquiries and support
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-guidost-500" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  <a 
                    href="tel:+919035014571" 
                    className="text-guidost-600 hover:underline"
                  >
                    +91 9035014571
                  </a>
                </CardDescription>
                <p className="text-sm text-gray-500 mt-2">
                  Mon-Fri, 9:00 AM - 5:00 PM IST
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-guidost-500" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Bangalore, Karnataka, India
                </CardDescription>
                <p className="text-sm text-gray-500 mt-2">
                  <Clock className="h-4 w-4 inline mr-1" /> 
                  Office hours: 9:00 AM - 5:00 PM IST
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below, and we'll get back to you as soon as possible.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                          <Input placeholder="Your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Message subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="gradient-button w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-1">How do I get started with GuiDost?</h3>
                  <p className="text-gray-600">
                    Simply create a free account to access our Career Compass Bot, view course roadmaps, and explore other resources.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-1">Is GuiDost completely free?</h3>
                  <p className="text-gray-600">
                    We offer both free and premium features. The basic services are free, while some advanced features require a subscription.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-1">How can I connect with a mentor?</h3>
                  <p className="text-gray-600">
                    Visit the Mentorship page to browse available mentors, filter by expertise, and request a connection.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-1">Can I use the Voice Feedback feature offline?</h3>
                  <p className="text-gray-600">
                    Yes, our Voice Feedback feature works offline and automatically syncs when you're back online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
