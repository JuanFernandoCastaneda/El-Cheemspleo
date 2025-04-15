import { Auth } from "@supabase/auth-ui-react";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabaseClient } from "../db/supabase";

const SessionContext = createContext<Session | null | undefined>(undefined);

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null | undefined>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

const AuthComponent = () => {
  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{ theme: ThemeSupa }}
      providers={[]}
    />
  );
};

async function signOut() {
  const { error } = await supabaseClient.auth.signOut({ scope: "local" });
  return error;
}

export { SessionProvider, useSession, AuthComponent, signOut };
