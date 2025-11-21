import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-muted-foreground">
              We'd love to hear from you
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="mx-auto max-w-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>

            <div className="mt-12 space-y-4 border-t pt-8">
              <h2 className="text-xl font-bold">Other Ways to Reach Us</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> support@kinbomart.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Hours:</strong> Monday - Friday, 9AM - 6PM EST</p>
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
