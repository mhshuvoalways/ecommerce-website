import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Shipping = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Shipping & Returns</h1>
            <p className="text-muted-foreground">
              Everything you need to know about delivery and returns
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="max-w-3xl space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Shipping Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Standard Shipping</h3>
                  <p>Delivery in 5-7 business days. Free on orders over $50.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Express Shipping</h3>
                  <p>Delivery in 2-3 business days. Flat rate of $15.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Overnight Shipping</h3>
                  <p>Next business day delivery. Flat rate of $25.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Returns Policy</h2>
              <p className="mb-4 text-muted-foreground">
                We want you to be completely satisfied with your purchase. If you're not happy with 
                your order, you can return it within 30 days for a full refund.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Items must be unused and in original packaging</li>
                <li>• Return shipping is free for defective items</li>
                <li>• Refunds processed within 5-7 business days</li>
                <li>• Store credit available for all returns</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Exchange Policy</h2>
              <p className="text-muted-foreground">
                Need a different size or color? We offer free exchanges within 30 days of purchase. 
                Contact our customer service team to initiate an exchange.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
