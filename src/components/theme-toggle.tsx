"use client";
import { Button } from "@heroui/react/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <Button aria-label="切换明暗主题" isIconOnly size="sm" variant="ghost" onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
    <Sun className="hidden size-4 dark:block" />
    <Moon className="size-4 dark:hidden" />
  </Button>;
}
