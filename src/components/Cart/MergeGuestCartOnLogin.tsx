"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { mergeGuestCartIntoUserAction } from "../../../action/action";

export default function MergeGuestCartOnLogin() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (!isSignedIn) return;
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        await mergeGuestCartIntoUserAction();
        router.refresh();
      } catch {
        // ignore: merge is best-effort
      }
    })();
  }, [isSignedIn, router]);

  return null;
}
