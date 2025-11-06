import { ItemsList } from "@/components/items-list";
import { BasicDetails } from "@/components/basic-details";
import { TaxAndTotals } from "@/components/tax-and-totals";
import { ContactDetails } from "@/components/contact-details";

export const InvoiceForm = () => {
  return (
    <div className="space-y-6">
      <BasicDetails />
      <ContactDetails />
      <ItemsList />
      <TaxAndTotals />
    </div>
  );
};
