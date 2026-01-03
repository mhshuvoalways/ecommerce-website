import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { HeroSlideDialog } from "@/components/admin/HeroSlideDialog";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const HeroSlides = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const queryClient = useQueryClient();

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["hero-slides-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("hero_slides").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides-admin"] });
      toast.success("Slide deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete slide");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from("hero_slides")
        .update({ display_order: newOrder })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-slides-admin"] });
    },
  });

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const currentSlide = slides[index];
    const previousSlide = slides[index - 1];
    reorderMutation.mutate({ id: currentSlide.id, newOrder: previousSlide.display_order });
    reorderMutation.mutate({ id: previousSlide.id, newOrder: currentSlide.display_order });
  };

  const handleMoveDown = (index: number) => {
    if (index === slides.length - 1) return;
    const currentSlide = slides[index];
    const nextSlide = slides[index + 1];
    reorderMutation.mutate({ id: currentSlide.id, newOrder: nextSlide.display_order });
    reorderMutation.mutate({ id: nextSlide.id, newOrder: currentSlide.display_order });
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingSlide(null);
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Hero Slides</h2>
            <p className="text-muted-foreground">Manage your homepage hero carousel</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Slide
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Slides</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : slides.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No slides yet. Add your first slide to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Order</TableHead>
                    <TableHead className="w-24">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Subtitle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides.map((slide, index) => (
                    <TableRow key={slide.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="h-6 w-6"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === slides.length - 1}
                            className="h-6 w-6"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <img
                          src={slide.image_url}
                          alt={slide.title}
                          className="h-12 w-20 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{slide.title}</TableCell>
                      <TableCell>{slide.subtitle || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={slide.is_active ? "default" : "secondary"}>
                          {slide.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(slide)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(slide.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <HeroSlideDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slide={editingSlide}
        nextOrder={slides.length}
      />
    </AdminLayout>
  );
};

export default HeroSlides;
