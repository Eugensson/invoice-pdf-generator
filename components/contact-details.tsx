import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInvoiceContext } from "@/context/invoice-contex";

export const ContactDetails = () => {
  const { invoice, updateInvoice } = useInvoiceContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>From & To</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">From (Your Details)</h3>
          <div className="space-y-2">
            <Label htmlFor="fromName">Name</Label>
            <Input
              value={invoice.fromName}
              onChange={(e) => updateInvoice({ fromName: e.target.value })}
              id="fromName"
              name="fromName"
              type="text"
              placeholder="Your name or company"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fromEmail">Email</Label>
            <Input
              value={invoice.fromEmail}
              onChange={(e) => updateInvoice({ fromEmail: e.target.value })}
              id="fromEmail"
              name="fromEmail"
              type="email"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">To (Client Details)</h3>
          <div className="space-y-2">
            <Label htmlFor="toName">Name</Label>
            <Input
              value={invoice.toName}
              onChange={(e) => updateInvoice({ toName: e.target.value })}
              id="toName"
              name="toName"
              type="text"
              placeholder="Client name or company"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toEmail">Email</Label>
            <Input
              value={invoice.toEmail}
              onChange={(e) => updateInvoice({ toEmail: e.target.value })}
              id="toEmail"
              name="toEmail"
              type="email"
              placeholder="client.email@example.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
