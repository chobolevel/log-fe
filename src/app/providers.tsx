"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactQueryDevtools as ReactQueryDevtoolsType } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  const [DevTools, setDevTools] = useState<
    typeof ReactQueryDevtoolsType | null
  >(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@tanstack/react-query-devtools").then((m) => {
        setDevTools(() => m.ReactQueryDevtools);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
      {DevTools && <DevTools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
