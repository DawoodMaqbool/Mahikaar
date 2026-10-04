import {
  ContactDetails,
  InstitutionalCommitments,
  TanneryLineage,
} from "@/components/contact/ContactBlocks";

export function QuoteSidebar() {
  return (
    <aside className="lg:col-span-4 space-y-8">
      <InstitutionalCommitments />
      <ContactDetails />
      <TanneryLineage />
    </aside>
  );
}
