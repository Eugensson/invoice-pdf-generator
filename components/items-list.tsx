import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InvoiceItem } from "@/components/invoice-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInvoiceContext } from "@/context/invoice-contex";

export const ItemsList = () => {
  const { invoice, addItem } = useInvoiceContext();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Invoice Items</CardTitle>
        <Button size="sm" onClick={addItem}>
          <Plus className="mr-2 size-4" />
          Add Item
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {invoice.items.map((item, index) => (
            <li key={item.id}>
              <InvoiceItem
                item={item}
                index={index}
                canRemove={invoice.items.length > 1}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
