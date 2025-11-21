import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping takes 5-7 business days. Express shipping (2-3 days) and 
                  overnight shipping options are also available at checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for unused items in original packaging. 
                  Returns are free for defective items, and refunds are processed within 5-7 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Currently, we only ship within the United States. We're working on expanding 
                  our shipping options to include international destinations in the near future.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via email. You can also 
                  view your order status by logging into your account and visiting the "My Orders" section.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, MasterCard, American Express, Discover), 
                  PayPal, and Apple Pay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I cancel or modify my order?</AccordionTrigger>
                <AccordionContent>
                  Orders can be cancelled or modified within 1 hour of placement. After that, 
                  please contact our customer service team and we'll do our best to accommodate your request.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Do you offer gift wrapping?</AccordionTrigger>
                <AccordionContent>
                  Yes! Gift wrapping is available for $5 per item at checkout. We also include 
                  a personalized gift message if you'd like.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I contact customer service?</AccordionTrigger>
                <AccordionContent>
                  You can reach us via email at support@kinbomart.com, by phone at +1 (555) 123-4567, 
                  or through the contact form on our Contact page. We're available Monday-Friday, 9AM-6PM EST.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
