"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";

const Home = () => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <Button onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 size-4" />
            Preview
          </Button>
        </div>
        <InvoiceForm />
      </div>
    </div>
  );
};

export default Home;
