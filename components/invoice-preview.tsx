import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { formatDate } from "@/utils/formatters";
import { generatePDF } from "@/utils/pdf-generator";
import { useInvoiceContext } from "@/context/invoice-contex";

interface InvoicePreviewProps {
  onBack: () => void;
}

export const InvoicePreview = ({ onBack }: InvoicePreviewProps) => {
  const { invoice } = useInvoiceContext();

  const handleDownloadPDF = () => {
    generatePDF(invoice);
  };

  return (
    <section className="p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoice Preview</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={onBack}>
              Back to Edit
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 size-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="mb-8 flex justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold uppercase">Invoice</h2>
                <p className="text-gray-600">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Date: {formatDate(invoice.date)}
                </p>
              </div>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-2 font-semibold">From:</h3>
                <p className="font-medium capitalize">{invoice.fromName}</p>
                <p className="text-gray-600">{invoice.fromEmail}</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">To:</h3>
                <p className="font-medium capitalize">{invoice.toName}</p>
                <p className="text-gray-600">{invoice.toEmail}</p>
              </div>
            </div>
            <table className="mb-8 w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left">Description</th>
                  <th className="text-center">Qty</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map(
                  ({ id, description, quantity, rate, amount }) => (
                    <tr key={id} className="border-b">
                      <td className="py-2">{description}</td>
                      <td className="py-2 text-center">{quantity}</td>
                      <td className="py-2 text-right">
                        ${typeof rate === "number" ? rate.toFixed(2) : "0.00"}
                      </td>
                      <td className="py-2 text-right">
                        $
                        {typeof amount === "number"
                          ? amount.toFixed(2)
                          : "0.00"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="flex justify-end">
              <ul className="w-64 space-y-2">
                <li className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${invoice.subTotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  <span>
                    Tax (
                    {typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
                    %):
                  </span>
                  <span>${invoice.taxAmount.toFixed(2)}</span>
                </li>
                <li className="pt-2 flex justify-between text-lg font-bold border-t">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
