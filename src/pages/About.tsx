import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">About Us</h1>
            <p className="text-muted-foreground">
              Learn more about KinboMart and our mission
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                KinboMart was founded with a simple mission: to make smart shopping accessible to everyone. 
                We believe that quality products should be paired with exceptional service and competitive prices.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                We strive to provide our customers with carefully curated products that enhance their everyday lives. 
                Every item in our collection is thoughtfully selected for quality, design, and value.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Why Choose Us</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Carefully curated product selection</li>
                <li>• Competitive pricing</li>
                <li>• Fast and reliable shipping</li>
                <li>• Exceptional customer service</li>
                <li>• Easy returns and exchanges</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
