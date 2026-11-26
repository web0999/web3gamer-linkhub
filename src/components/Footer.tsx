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
    <footer id="contact" className="mt-16 border-t border-[var(--border-subtle)] pt-14 pb-14">
      {hasContact && (
        <div className="mb-14">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Direct Contact
              </h2>
              <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Let&apos;s Connect.
              </p>
            </div>
            {(whatsappUrl || telegramUrl) && (
              <div className="flex flex-wrap items-center gap-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nexus-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {telegramUrl && (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nexus-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
                  >
                    <TelegramIcon className="h-4 w-4 text-sky-400" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {validEmails.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {validEmails.map(({ email, mailto }) => {
                const isCopied = copiedEmail === email;
                return (
                  <div
                    key={email}
                    className="nexus-panel flex items-center justify-between gap-3 rounded-2xl px-5 py-4"
                  >
                    <a
                      href={mailto}
                      className="group flex min-w-0 items-center gap-3 text-sm font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                      <span className="truncate group-hover:text-cyan-300 transition-colors">
                        {email}
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyEmail(email)}
                      aria-label={`Copy ${email}`}
                      title={`Copy ${email}`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 text-[var(--text-secondary)] transition-colors hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-8 text-center text-xs text-[var(--text-secondary)] sm:flex-row">
        <p className="font-display font-semibold tracking-wider uppercase text-[var(--text-primary)]">
          WEB3GAMER <span className="text-cyan-400">//</span> NEXUS
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/web0999/web3gamer-linkhub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            GitHub Repo
          </a>
          <p>&copy; {CURRENT_YEAR} {siteConfig.profile.name}. {siteConfig.profile.tagline}</p>
        </div>
      </div>
    </footer>
  );
};
