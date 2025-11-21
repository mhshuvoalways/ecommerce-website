import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">
              How we protect and use your information
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us, including your name, email address, 
                shipping address, payment information, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Process and fulfill your orders</li>
                <li>• Communicate with you about your orders and account</li>
                <li>• Send you marketing communications (with your consent)</li>
                <li>• Improve our products and services</li>
                <li>• Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell or rent your personal information to third parties. We may share your 
                information with service providers who help us operate our business, such as payment 
                processors and shipping companies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Your Rights</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your information</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@kinbomart.com or through our Contact page.
              </p>
            </section>

            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
