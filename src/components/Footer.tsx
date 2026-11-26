import React, { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { formatEmailUrl, formatWhatsAppUrl, isValidHttpUrl } from '../utils/validation';
import { TelegramIcon, WhatsAppIcon } from './PlatformIcons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const whatsappUrl = formatWhatsAppUrl(siteConfig.socials.whatsapp);
  const telegramUrl = isValidHttpUrl(siteConfig.socials.telegram) ? siteConfig.socials.telegram : null;

  const validEmails = siteConfig.contact.emails
    .map((email) => ({
      email: email.trim(),
      mailto: formatEmailUrl(email),
    }))
    .filter((item): item is { email: string; mailto: string } => item.mailto !== null);

  const hasContact = Boolean(whatsappUrl || telegramUrl || validEmails.length > 0);

  const handleCopyEmail = async (email: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail((prev) => (prev === email ? null : prev)), 2000);
    } catch {
      setCopiedEmail(null);
    }
  };

  return (
    <footer id="contact" className="mt-12 border-t border-[var(--border-subtle)] pt-10 pb-12">
      {hasContact && (
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
            Direct Contact
          </h2>

          <div className="mt-5 flex w-full max-w-2xl flex-col items-center gap-3">
            {validEmails.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                {validEmails.map(({ email, mailto }) => {
                  const isCopied = copiedEmail === email;
                  return (
                    <div
                      key={email}
                      className="surface-card flex items-center justify-between gap-2 rounded-2xl px-4 py-3"
                    >
                      <a
                        href={mailto}
                        className="group flex min-w-0 items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 rounded"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                        <span className="truncate group-hover:text-violet-400 transition-colors">
                          {email}
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyEmail(email)}
                        aria-label={`Copy ${email}`}
                        title={`Copy ${email}`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {(whatsappUrl || telegramUrl) && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {telegramUrl && (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    <TelegramIcon className="h-4 w-4 text-sky-500" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-[var(--text-secondary)] sm:flex-row">
        <p>&copy; {CURRENT_YEAR} {siteConfig.profile.name}. All rights reserved.</p>
        <p>{siteConfig.profile.tagline}</p>
      </div>
    </footer>
  );
};
