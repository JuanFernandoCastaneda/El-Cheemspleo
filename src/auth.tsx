import { Auth } from "@supabase/auth-ui-react";
import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://ksvpnmwmentvnhtfnngx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdnBubXdtZW50dm5odGZubmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDk0NTcsImV4cCI6MjA1OTkyNTQ1N30.CK_SAIP52Bxkykm2Ca-KnPhQ_pQEefeSBIy-TBixUfE"
);

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return session;
};

const authComponent = (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={[]}
  />
);

async function signOut() {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  return error;
}

export { useSession, authComponent, signOut };
