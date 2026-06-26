"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  // No mounted-state gymnastics: render both icons and let the `.dark` class
  // decide which is visible via CSS. This stays hydration-safe.
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
      }
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 block dark:hidden" />
    </Button>
  );
}
