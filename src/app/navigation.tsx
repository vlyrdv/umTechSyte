import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode
} from "react";

type NavigationContextValue = {
  path: string;
  navigate: (href: string) => void;
  isActive: (href: string) => boolean;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

const normalizePath = (path: string) => {
  if (!path || path === "/") {
    return "/";
  }

  const cleanPath = path.split("#")[0].split("?")[0];
  return cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
};

const getPathFromHref = (href: string) => {
  try {
    return normalizePath(new URL(href, window.location.origin).pathname);
  } catch {
    return normalizePath(href);
  }
};

const getHashFromHref = (href: string) => {
  try {
    return new URL(href, window.location.origin).hash;
  } catch {
    return href.includes("#") ? `#${href.split("#")[1]}` : "";
  }
};

const scrollToTarget = (hash: string) => {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.setTimeout(() => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 40);
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(() => ({
    path: normalizePath(window.location.pathname),
    hash: window.location.hash
  }));

  useEffect(() => {
    const onPopState = () => {
      setLocation({
        path: normalizePath(window.location.pathname),
        hash: window.location.hash
      });
      scrollToTarget(window.location.hash);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((href: string) => {
    const nextPath = getPathFromHref(href);
    const nextHash = getHashFromHref(href);
    const nextHref = `${nextPath}${nextHash}`;

    if (nextHref !== `${normalizePath(window.location.pathname)}${window.location.hash}`) {
      window.history.pushState({}, "", nextHref);
    }

    setLocation({ path: nextPath, hash: nextHash });
    scrollToTarget(nextHash);
  }, []);

  const value = useMemo(
    () => ({
      path: location.path,
      navigate,
      isActive: (href: string) => {
        const targetPath = getPathFromHref(href);
        const targetHash = getHashFromHref(href);

        if (targetHash) {
          return targetPath === location.path && targetHash === location.hash;
        }

        if (targetPath === "/") {
          return location.path === "/" && !location.hash;
        }

        return targetPath === location.path;
      }
    }),
    [location.hash, location.path, navigate]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }

  return context;
}

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export function AppLink({ to, onClick, children, ...props }: AppLinkProps) {
  const { navigate } = useNavigation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
