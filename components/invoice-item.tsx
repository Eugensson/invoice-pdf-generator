import { Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useInvoiceContext } from "@/context/invoice-contex";
import type { InvoiceItem as InvoiceItemType } from "@/types/invoice";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove?: boolean;
}

export const InvoiceItem = ({ item, index, canRemove }: InvoiceItemProps) => {
  const { updateItem, removeItem } = useInvoiceContext();

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      updateItem(index, "quantity", "");
    } else {
      const numValue = Number.parseInt(value);

      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "quantity", numValue);
      }
    }
  };

  const handleQuantityBlur = () => {
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleRateChange = (value: string) => {
    if (value === "") {
      updateItem(index, "rate", "");
    } else {
      const numValue = Number.parseFloat(value);

      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "rate", numValue);
      }
    }
  };

  const handleRateBlur = () => {
    if (item.rate === "" || item.rate === 0) {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div className="p-4 grid grid-cols-12 gap-4 border rounded-lg">
      <div className="col-span-5 space-y-2">
        <Label>Description</Label>
        <Input
          value={item.description}
          onChange={(e) => updateItem(index, "description", e.target.value)}
          type="text"
          placeholder="Description"
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Quantity</Label>
        <Input
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
          type="number"
          min={1}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Rate ($)</Label>
        <Input
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          onBlur={handleRateBlur}
          type="number"
          min={0}
          step={0.01}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Amount</Label>
        <div className="py-2 px-3 h-9 flex items-center border rounded-md bg-gray-50">
          ${typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00"}
        </div>
      </div>
      <div className="col-span-1 mt-auto">
        <Button
          size="icon"
          variant="outline"
          disabled={!canRemove}
          onClick={() => removeItem(index)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
};
