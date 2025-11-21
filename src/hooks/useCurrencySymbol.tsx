import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCurrencySymbol = () => {
  const { data: currencySymbol = "$" } = useQuery({
    queryKey: ["currency-symbol"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("currency_symbol")
        .single();
      
      if (error) {
        console.error("Error fetching currency symbol:", error);
        return "$";
      }
      
      return data?.currency_symbol || "$";
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return currencySymbol;
};
