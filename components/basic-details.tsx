import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInvoiceContext } from "@/context/invoice-contex";

export const BasicDetails = () => {
  const { invoice, updateInvoice } = useInvoiceContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            id="invoiceNumber"
            name="invoiceNumber"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceDate">Date</Label>
          <Input
            value={invoice.date}
            onChange={(e) => updateInvoice({ date: e.target.value })}
            id="invoiceDate"
            name="invoiceDate"
            type="date"
          />
        </div>
      </CardContent>
    </Card>
  );
};
