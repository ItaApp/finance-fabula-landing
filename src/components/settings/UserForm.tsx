import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { UserFormFields } from "./UserFormFields";

const userFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  whatsapp: z.string().optional(),
  cpf: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export function UserForm() {
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setAvatarUrl(profile.avatar_url);
        form.reset({
          name: profile.name || "",
          whatsapp: profile.whatsapp || "",
          cpf: profile.cpf || "",
        });
      }
    };

    loadUserData();
  }, [form]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      if (data.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: data.password
        });

        if (passwordError) throw passwordError;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          whatsapp: data.whatsapp,
          cpf: data.cpf,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Informações atualizadas com sucesso",
      });

      form.setValue("password", "");
      form.setValue("confirmPassword", "");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações",
        variant: "destructive",
      });
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', session.user.id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar foto de perfil",
        variant: "destructive",
      });
      return;
    }

    setAvatarUrl(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UserAvatar 
          avatarUrl={avatarUrl} 
          userName={form.watch("name")} 
          onAvatarUpdate={handleAvatarUpdate}
        />
        <UserFormFields form={form} />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}