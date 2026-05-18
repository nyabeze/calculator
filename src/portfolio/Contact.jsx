import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useReveal } from './useReveal';

const LINKS = [
  {
    Icon: Mail,
    label: 'nyabeze02@gmail.com',
    href: 'mailto:nyabeze02@gmail.com',
  },
  {
    Icon: Phone,
    label: '0774 271 900',
    href: 'tel:+2630774271900',
  },
  {
    Icon: MapPin,
    label: 'Harare, Zimbabwe',
    href: null,
  },
  {
    Icon: Github,
    label: 'github.com/nyabeze',
    href: 'https://github.com/nyabeze',
  },
  {
    Icon: Linkedin,
    label: 'linkedin.com/in/ryan-nyabeze',
    href: 'https://linkedin.com/in/ryan-nyabeze',
  },
];

export default function Contact() {
  const ref = useReveal(0);

  return (
    <div>
      <div id="contact" className="p-section">
        <p className="p-section-label">Get In Touch</p>
        <h2 className="p-section-title">Contact</h2>

        <div className="p-contact-grid p-reveal" ref={ref}>
          <div>
            <p className="p-contact-intro">
              I'm open to full-time roles, freelance projects, and
              collaborations. Whether you have a question, an opportunity, or
              just want to say hi — my inbox is always open.
            </p>

            <div className="p-contact-links">
              {LINKS.map(({ Icon, label, href }) => {
                const content = (
                  <>
                    <span className="p-contact-link-icon">
                      <Icon size={17} />
                    </span>
                    <span>{label}</span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="p-contact-link"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="p-contact-link" style={{ cursor: 'default' }}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-contact-card">
            <h3>Send me an email</h3>
            <p>
              Click below to open your email client with my address pre-filled.
              I typically respond within 24 hours.
            </p>
            <a
              href="mailto:nyabeze02@gmail.com?subject=Hello%20Ryan"
              className="p-contact-email-btn"
            >
              <Mail size={15} />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
