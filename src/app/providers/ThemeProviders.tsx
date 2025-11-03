"use client";

// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { type ThemeProviderProps } from "next-themes/dist/types";

// export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
//     return (
//         <NextThemesProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem={true}
//             disableTransitionOnChange={false}
//             {...props}
//         >
//             {children}
//         </NextThemesProvider>
//     );
// }


import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}