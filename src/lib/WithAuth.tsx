"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ComponentType } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loaders/Loading";
import { useContextConsumer } from "@/context/Context";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { hasProjectAccess } = useContextConsumer();
    const { isAuthenticated } = useAuth();
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const hasToken = Cookies.get("accessToken");
      const isLoggedIn = hasToken || (session && status === "authenticated");

      if (status === "loading") return;

      if (!isLoggedIn) {
        router.replace("/");
      }

      if (
        pathname.startsWith("/dashboard/projects") ||
        pathname === "/dashboard/applications/pending" ||
        pathname === "/dashboard/applications/approved" ||
        pathname === "/dashboard/applications/rejected"
      ) {
        if (!hasProjectAccess) {
          router.replace("/dashboard");
        }
      }
    }, [isAuthenticated, session, status, router, hasProjectAccess, pathname]);

    if (status === "loading") {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default WithAuth;
