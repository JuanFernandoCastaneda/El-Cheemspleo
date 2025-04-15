import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";

/**
 * NEEDS TO BE INSIDE A ROUTES COMPONENT.
 * Otherwise useLocation does not make sense.
 */

const LastUrlContext = createContext<string | undefined>(undefined);

const LastUrlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastUrl, setLastUrl] = useState("/");
  const [currentUrl, setCurrentUrl] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setLastUrl(currentUrl);
    setCurrentUrl(location.pathname + location.hash + location.search);
  }, [location]);

  return (
    <LastUrlContext.Provider value={lastUrl}>
      {children}
    </LastUrlContext.Provider>
  );
};

const useLastUrl = () => {
  const context = useContext(LastUrlContext);
  if (!context) {
    throw new Error("useLastUrl must be used within a LastUrlProvider");
  }
  return context;
};

export { LastUrlProvider, useLastUrl };
