import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Finance Fabula</CardTitle>
          <CardDescription>
            Entre com sua conta ou crie uma nova para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#333333',
                  },
                },
              },
              className: {
                container: 'flex flex-col gap-4',
                label: 'block text-sm font-medium text-gray-700',
                input: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm',
                button: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
                anchor: 'text-sm font-medium text-black hover:text-gray-800',
                divider: 'my-4',
                message: 'text-sm text-gray-600',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  link_text: 'Já tem uma conta? Entre aqui',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  button_label: 'Cadastrar',
                  link_text: 'Não tem uma conta? Cadastre-se',
                  confirmation_text: '',
                },
              },
            }}
            providers={[]}
            view="sign_up"
            showLinks={true}
            additionalData={{
              name: {
                label: 'Nome completo',
                type: 'text',
                required: true,
              },
              cpf: {
                label: 'CPF',
                type: 'text',
                required: true,
                pattern: '[0-9]{11}',
                title: 'Digite apenas os números do CPF',
              },
              whatsapp: {
                label: 'WhatsApp',
                type: 'tel',
                required: true,
                pattern: '[0-9]{11}',
                title: 'Digite apenas os números com DDD',
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;