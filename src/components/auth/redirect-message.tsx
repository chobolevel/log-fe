"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function RedirectMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      toast.error(message, { id: "redirect-message" });
    }
  }, [message]);

  return null;
}
