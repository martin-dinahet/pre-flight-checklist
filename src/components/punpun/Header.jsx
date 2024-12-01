"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/punpun/ThemeSwitcher";
import { Home } from "lucide-react";
import { Moon } from "lucide-react";
import { NewChecklistButton } from "@/components/punpun/NewChecklistButton";

export const Header = () => {
  return (
    <>
      <header
        className={cn(
          "w-full sticky top-0 bg-background",
          "flex justify-between items-center",
          "border-b",
          "p-3"
        )}>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "text-xl font-bold")}>
          Pre-flight checklist
        </Link>
        <nav className={cn("flex justify-center items-center")}>
          <div className={cn("flex mr-4")}>
            <Link href="#" className={cn(buttonVariants({ variant: "ghost" }))}>
              <Home />
            </Link>
            <ThemeSwitcher />
            <NewChecklistButton></NewChecklistButton>
          </div>
        </nav>
      </header>
    </>
  );
};
