
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Placeholder for actual form submission logic
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for contacting us. We'll get back to you shortly.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Get in <span className="text-ultravm-primary">Touch</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Have questions or need help? We're here for you. Reach out to our team.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Information</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Our team is here to help you with any questions or concerns.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-ultravm-primary mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      support@ultravm.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-ultravm-primary mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Phone</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-ultravm-primary mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Office</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      123 Server Lane<br />
                      Cloud City, DC 10101<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Hours</h3>
                  <div className="mt-4 space-y-1 text-gray-500 dark:text-gray-400">
                    <p>Monday - Friday: 9am - 8pm EST</p>
                    <p>Saturday: 10am - 6pm EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <p className="mt-4 text-sm text-ultravm-primary">
                    24/7 Technical Support Available
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white dark:bg-ultravm-dark rounded-lg shadow-md p-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-ultravm-primary hover:bg-ultravm-secondary" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
