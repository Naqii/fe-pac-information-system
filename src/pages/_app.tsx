import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/contexts/ToasterContext";
import AppShell from "@/components/commons/AppShell/AppShell";
import { Session } from "next-auth";
import "handsontable/dist/handsontable.full.min.css";

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <ToasterProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </ToasterProvider>
        </QueryClientProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
