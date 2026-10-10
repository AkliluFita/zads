import { PageHero } from "../components/common";
import { company } from "../data";
const contents = {
  privacy: {
    title: "Privacy information",
    lead: "How this website handles the details you choose to share.",
    sections: [
      [
        "The enquiry form",
        "Information entered into the form stays in your current browser page. This static website does not upload your enquiry to a server or save it in browser storage. Refreshing or leaving the page clears the draft.",
      ],
      [
        "Sending an enquiry",
        "The “Open email app” action prepares a message in your email application. You decide whether to send it. Downloading a draft saves a text file on your device; copying a draft places it on your clipboard. Your email provider processes messages you choose to send.",
      ],
      [
        "Website resources",
        "Fonts and product images are served with this website. No advertising trackers or analytics scripts are included in this version. Your hosting provider may process technical request information to deliver the website.",
      ],
      [
        "Contact",
        "For questions about information shared with ZADS PLC, contact the company using the email below.",
      ],
    ],
  },
  terms: {
    title: "Website terms",
    lead: "Information to help you use the ZADS PLC website.",
    sections: [
      [
        "Product information",
        "This website introduces ZADS PLC’s products and trade services. Product images are illustrative and do not represent an agreed grade or a particular shipment.",
      ],
      [
        "Quotations and orders",
        "Information on this website is not a price quotation or order confirmation. Product specifications, availability, quantities, pricing and commercial terms must be confirmed directly with ZADS PLC.",
      ],
      [
        "Enquiry drafts",
        "Preparing or downloading an enquiry does not submit an order. Use your email application to send your enquiry and discuss the next steps with the team.",
      ],
      [
        "Company information",
        "Company background and service descriptions are based on the supplied ZADS PLC company profile and content guide. Contact the company to verify information relevant to a commercial decision.",
      ],
    ],
  },
  shipping: {
    title: "Shipping information",
    lead: "Every shipment starts with clear requirements and agreed arrangements.",
    sections: [
      [
        "Export preparation",
        "The export workflow includes sourcing, quality inspection, grading, packing, documentation, logistics coordination, shipment updates and delivery follow-up.",
      ],
      [
        "Order size and packaging",
        "The stated minimum agricultural export order is 2 containers / 45,000 kg. Export-grade bags are used in the described export workflow; exact packaging and product-specific formats are agreed with the buyer.",
      ],
      [
        "Destinations and timing",
        "Delivery dates, routes, freight costs, Incoterms and destination-specific requirements are confirmed during quotation. The website does not provide live shipping rates or guaranteed transit times.",
      ],
      [
        "Import coordination",
        "ZADS PLC offers client-specific sourcing and door-to-door import coordination for fabrics and construction materials. Confirm the steps and delivery arrangements for your specific requirement with the import team.",
      ],
    ],
  },
};
export default function Legal({ type }) {
  const content = contents[type];
  return (
    <>
      <PageHero eyebrow="ZADS PLC / WEBSITE INFORMATION" title={content.title}>
        <p>{content.lead}</p>
      </PageHero>
      <article className="article-body legal-body">
        {content.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <p>
          Contact: <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </article>
    </>
  );
}
