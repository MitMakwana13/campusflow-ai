"use client";

import { useEffect } from "react";

export function useKeyboard(key: string, callback: () => void, metaOrCtrl = true) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMetaKey = metaOrCtrl ? (event.metaKey || event.ctrlKey) : true;
      if (isMetaKey && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, metaOrCtrl]);
}
