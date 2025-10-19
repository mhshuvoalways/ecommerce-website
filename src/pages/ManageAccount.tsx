import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ManageAccount = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    shipping_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zip: "",
    shipping_phone: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } else if (data) {
        setFormData({
          full_name: data.full_name || "",
          shipping_name: data.shipping_name || "",
          shipping_address: data.shipping_address || "",
          shipping_city: data.shipping_city || "",
          shipping_state: data.shipping_state || "",
          shipping_zip: data.shipping_zip || "",
          shipping_phone: data.shipping_phone || "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Manage Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Saved Shipping Address</h2>
            <p className="text-sm text-muted-foreground">
              Save your shipping address to auto-fill it during checkout
            </p>
            
            <div>
              <Label htmlFor="shipping_name">Recipient Name</Label>
              <Input
                id="shipping_name"
                value={formData.shipping_name}
                onChange={(e) => setFormData({ ...formData, shipping_name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="shipping_address">Street Address</Label>
              <Input
                id="shipping_address"
                value={formData.shipping_address}
                onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shipping_city">City</Label>
                <Input
                  id="shipping_city"
                  value={formData.shipping_city}
                  onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="shipping_state">State</Label>
                <Input
                  id="shipping_state"
                  value={formData.shipping_state}
                  onChange={(e) => setFormData({ ...formData, shipping_state: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shipping_zip">ZIP Code</Label>
                <Input
                  id="shipping_zip"
                  value={formData.shipping_zip}
                  onChange={(e) => setFormData({ ...formData, shipping_zip: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="shipping_phone">Phone</Label>
                <Input
                  id="shipping_phone"
                  type="tel"
                  value={formData.shipping_phone}
                  onChange={(e) => setFormData({ ...formData, shipping_phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default ManageAccount;
