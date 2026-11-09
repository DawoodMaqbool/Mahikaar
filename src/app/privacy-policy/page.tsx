import { notFound } from "next/navigation";
import { privacyFeaturesEnabled } from "@/lib/privacy-features";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("privacyPolicy");

function PrivacySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-outline-variant pt-8 space-y-4">
      <h2 id={id} className="type-headline-md text-on-surface scroll-mt-24">{title}</h2>
      <div className="space-y-4 type-body-md text-on-surface-variant">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  if (!privacyFeaturesEnabled) notFound();
  return (
    <article className="w-full bg-surface section-standard">
      <Container>
        <div className="max-w-3xl space-y-12">
          <header className="space-y-6">
            <Eyebrow>Privacy &amp; Your Information</Eyebrow>
            <h1 className="type-headline-xl text-on-surface measure-headline">Privacy Policy</h1>
            <p className="type-body-lg text-on-surface-variant measure-intro">
              How Mahikaar&apos;s website handles business enquiries and optional analytics,
              and how to contact us about your information.
            </p>
            <div className="border-l-2 border-secondary pl-5 space-y-2">
              <p className="type-body-sm font-medium text-on-surface">Draft — awaiting business-owner review</p>
              <p className="type-body-sm text-on-surface-variant">
                This notice describes the website&apos;s current features. Business identity,
                retention arrangements and other details listed below still require confirmation
                before this draft can be treated as a final privacy policy.
              </p>
            </div>
          </header>

          <PrivacySection id="about-this-notice" title="About this notice">
            <p>
              Mahikaar is a made-to-order footwear business serving brands, boutiques, retailers
              and private-label buyers. Our website identifies our workshop location as Lahore,
              Pakistan. This notice covers enquiries through this website and the optional
              analytics used to understand website activity.
            </p>
          </PrivacySection>

          <PrivacySection id="enquiry-information" title="Information you share with us">
            <p>
              Our enquiry forms ask for your name, brand or company name and business email address.
              Request a Quote also asks for your country. Portfolio and Private Label enquiries
              include the selected style or project reference.
            </p>
            <p>
              You may also provide styles of interest, estimated quantities, your preferred delivery
              window, branding options, a business website or social link, and notes about your project,
              leather, colours, materials or sizing. Only share information relevant to your enquiry;
              please avoid sensitive personal information in free-text fields.
            </p>
            <p>
              If you contact us directly by email or telephone, you choose the contact and project
              details you share. Customer file uploads are currently disabled on this website.
            </p>
          </PrivacySection>

          <PrivacySection id="enquiry-processing" title="How enquiries are used and delivered">
            <p>
              Enquiry information helps our team understand your requirements, reply to you, and
              discuss feasibility, materials, pricing, sampling and estimated timelines.
            </p>
            <p>
              When you submit a form, the website checks the information and sends the enquiry
              through Resend, our email-delivery service, to Mahikaar&apos;s configured business
              recipient. The email contains your submitted enquiry details and the form source.
              Your business email address is used as the reply-to address so our team can respond.
            </p>
            <p>
              A submission reference helps avoid duplicate email sends when you retry. The
              on-screen success message means the enquiry was accepted for sending; it is not
              confirmation that our team has read it.
            </p>
          </PrivacySection>

          <PrivacySection id="hosting-and-services" title="Hosting and service providers">
            <p>
              The website uses Vercel for hosting and enquiry rate-limit protection. Website
              requests and enquiry submissions are processed through this hosting environment.
              Request information is used for checks such as the request&apos;s origin and
              submission rate, to help prevent misuse of the forms.
            </p>
            <p>
              Resend processes the enquiry email for delivery. Google Analytics processes optional
              website measurements only after analytics has been enabled for the site and you accept it.
            </p>
            <p>
              The site also requests an icon-font stylesheet from Google Fonts. This request is
              separate from Google Analytics and occurs even if you reject analytics. The main text
              fonts are served by the website.
            </p>
          </PrivacySection>

          <PrivacySection id="analytics-and-consent" title="Optional analytics and your choices">
            <p>
              When enabled, Google Analytics 4 uses optional analytics cookies to measure visits
              and successful business enquiries. It is not loaded before you accept optional
              analytics. You can select Accept analytics or Reject analytics; rejecting does not
              prevent you from browsing or sending an enquiry.
            </p>
            <p>
              Our custom measurements include public page paths and a successful-enquiry event
              labelled with a general form source, such as Portfolio or Request a Quote. They do
              not include your name, email address, telephone number, project text or files.
              Page measurements omit URL query strings and fragments. Advertising consent is
              denied by this integration, and Google signals and ad personalisation are disabled.
            </p>
            <p>
              Open Analytics preferences in the footer whenever the analytics controls are available
              to review your choice. To withdraw an earlier acceptance, select Reject analytics.
              The website disables further analytics and removes accessible first-party Google
              Analytics cookies. It normally reloads the page to unload the analytics software,
              so save any unfinished enquiry text first. Withdrawal cannot recall requests already
              sent or remove information already held by Google.
            </p>
            <p>
              Your choice is remembered in this browser&apos;s local storage. Random submission
              references are also kept in browser session storage to prevent duplicate conversion
              events, including when analytics is rejected; these references are not sent to Google.
              If browser storage is unavailable, the website uses page-memory preferences instead,
              and your choice may not survive a reload. You can also manage cookies and site storage
              through your browser settings.
            </p>
          </PrivacySection>

          <PrivacySection id="retention-and-processing" title="Retention and international processing">
            <p>
              Enquiries are delivered as email. How long Mahikaar keeps those emails and related
              correspondence, provider records and analytics data needs business-owner confirmation.
              This draft does not set a retention period or promise automatic or permanent deletion.
              Contact us if you need information about the retention of a particular enquiry.
            </p>
            <p>
              Mahikaar operates from Pakistan and serves international buyers, so an enquiry from
              another country may be reviewed in Pakistan. Hosting, email and analytics processing
              may also involve other countries. The relevant provider account locations and any
              applicable international-transfer arrangements still need to be confirmed; this draft
              makes no claim about specific transfer safeguards.
            </p>
          </PrivacySection>

          <PrivacySection id="privacy-requests" title="Privacy requests and your rights">
            <p>
              Contact us if you would like to ask what information we hold about you, correct
              inaccurate details or request deletion. Depending on the law that applies to you
              and the circumstances, you may also have rights to restrict or object to processing,
              obtain a portable copy of your information, or complain to a relevant data-protection
              authority. These rights are not identical in every situation.
            </p>
            <p>
              You can withdraw optional analytics consent through the footer controls described
              above. For other privacy questions or requests, email{" "}
              <a href="mailto:b2b@mahikaratelier.com" className="editorial-link break-words">b2b@mahikaratelier.com</a>.
              Please describe your request and provide enough context to identify the enquiry concerned,
              without sending unnecessary sensitive information.
            </p>
          </PrivacySection>

          <PrivacySection id="owner-review" title="Details awaiting owner confirmation">
            <p>
              Before this draft is finalised, the business owner needs to confirm the identity and
              contact details of the organisation responsible for personal information, the applicable
              legal bases for enquiry and operational processing, retention periods or criteria,
              service-provider and international-transfer arrangements, and the process for handling
              privacy requests. Optional analytics is presented as an opt-in choice; this notice
              is not a statement of guaranteed legal compliance.
            </p>
          </PrivacySection>
        </div>
      </Container>
    </article>
  );
}
