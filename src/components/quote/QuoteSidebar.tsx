import { ContactDetails } from "@/components/contact/ContactBlocks";

export function QuoteSidebar() {
  return (
    <aside className="lg:col-span-4 min-w-0 border-t border-outline-variant pt-6 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none [&>div>span:first-child]:hidden [&_#visits]:bg-transparent [&_#visits]:p-0 [&_#visits]:pt-6 [&_#visits]:border-t [&_#visits]:border-outline-variant [&_#visits]:shadow-none [&_#visits>h3]:type-headline-sm [&_#visits>h3]:normal-case [&_#visits>h3]:tracking-normal [&_a]:inline-flex [&_a]:min-h-12 [&_a]:max-w-full [&_a]:items-center [&_a]:break-all [&_a]:underline [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-secondary">
      <ContactDetails />
    </aside>
  );
}
