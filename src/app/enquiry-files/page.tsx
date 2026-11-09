import { Container } from '@/components/ui/Container';
import { FileAccess } from './FileAccess';
export default function EnquiryFilesPage() {
  return <section className="section-standard"><Container className="max-w-3xl space-y-6">
    <h1 className="type-headline-lg">Private enquiry files</h1>
    <p className="type-body-md text-on-surface-variant">This access link expires seven days after submission. Anyone with the email link can access these files; keep it private.</p>
    <FileAccess />
  </Container></section>;
}
