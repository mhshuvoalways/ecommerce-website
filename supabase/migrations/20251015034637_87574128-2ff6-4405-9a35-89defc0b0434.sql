-- Add shipping address fields to orders table
ALTER TABLE public.orders 
ADD COLUMN shipping_name TEXT,
ADD COLUMN shipping_address TEXT,
ADD COLUMN shipping_city TEXT,
ADD COLUMN shipping_state TEXT,
ADD COLUMN shipping_zip TEXT,
ADD COLUMN shipping_phone TEXT;

-- Add RLS policy to allow users to create their own orders
CREATE POLICY "Users can create their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add RLS policy to allow users to create order items
CREATE POLICY "Users can create order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);