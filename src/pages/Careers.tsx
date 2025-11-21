import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Careers = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Careers</h1>
            <p className="text-muted-foreground">
              Join our growing team
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Work With Us</h2>
              <p className="text-muted-foreground">
                At KinboMart, we're always looking for talented individuals who are passionate about 
                e-commerce and customer service. Join our team and help us build something great.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Why Work at KinboMart</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Competitive salary and benefits</li>
                <li>• Flexible work arrangements</li>
                <li>• Professional development opportunities</li>
                <li>• Collaborative and inclusive culture</li>
                <li>• Employee discounts</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Open Positions</h2>
              <p className="mb-4 text-muted-foreground">
                We're currently reviewing applications for various positions. Send us your resume 
                and we'll keep you in mind for future opportunities.
              </p>
              <Button>Apply Now</Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
