import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao realizar logout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 animate-fade-up">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas configurações e preferências.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-medium mb-2">Conta</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Email: {session?.user.email}
              </p>
              <Button variant="destructive" onClick={handleSignOut}>
                Sair da conta
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;