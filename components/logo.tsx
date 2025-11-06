import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Invoice PDF Generator"
        width={40}
        height={50}
      />
      <div>
        <h1 className="text-2xl font-bold">Invoice Generator</h1>
        <p className="text-gray-600">Create professional invoices quickly.</p>
      </div>
    </div>
  );
};
