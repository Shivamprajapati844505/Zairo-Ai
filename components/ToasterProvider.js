// components/ToasterProvider.js
"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        success: { style: { background: "black", color: "white" } },
        error: { style: { background: "black", color: "white" } },
      }}
    />
  );
}
