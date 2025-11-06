import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInvoiceContext } from "@/context/invoice-contex";

export const TaxAndTotals = () => {
  const { invoice, updateInvoice } = useInvoiceContext();

  const handleTaxRateChange = (value: string) => {
    if (value === "") {
      updateInvoice({ taxRate: "" });
    } else {
      const numValue = Number.parseFloat(value);

      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        updateInvoice({ taxRate: numValue });
      }
    }
  };

  const handleTaxRateBlur = () => {
    if (invoice.taxRate === "" || isNaN(Number(invoice.taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax & Totals</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            name="taxRate"
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={invoice.taxRate}
            onChange={(e) => handleTaxRateChange(e.target.value)}
            onBlur={handleTaxRateBlur}
          />
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Subtotal:</span>
            <span>${invoice.subTotal.toFixed(2)}</span>
          </li>
          <li className="flex justify-between">
            <span>
              Tax ({typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
              %):
            </span>
            <span>${invoice.taxAmount.toFixed(2)}</span>
          </li>
          <li className="pt-2 flex justify-between text-lg font-bold border-t">
            <span>Total:</span>
            <span>${invoice.total.toFixed(2)}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
