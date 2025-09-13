"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }),
});

export default function CreateClassPage() {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError(null);
    const { name, code } = data;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error: insertError } = await supabase
        .from('classes')
        .insert([{ name, code, teacher_id: user.id }]);
      
      if (insertError) {
        setError(insertError.message);
      } else {
        toast({
          title: "Class created successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
        form.reset();
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Class"
        description="Fill in the details to create a new class."
      />
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Mathematics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., MATH-301" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit">Create Class</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}