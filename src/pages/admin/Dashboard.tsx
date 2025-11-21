import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrencySymbol } from "@/hooks/useCurrencySymbol";

export default function AdminDashboard() {
  const currencySymbol = useCurrencySymbol();
  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)");
      if (error) throw error;
      return data;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["admin-products-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
  const totalOrders = orders?.length || 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `${currencySymbol}${totalRevenue.toFixed(2)}`,
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+180.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: products?.toString() || "0",
      change: "+19% from last month",
      icon: Package,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+201 since last hour",
      icon: Users,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders?.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer_email} - {currencySymbol}{Number(order.total).toFixed(2)}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{order.status}</div>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No orders yet</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Product {i}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 100 + 20)} sales
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
