import React, { useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';
import { siteConfig } from '../config/site.config';

interface ShareControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareControls: React.FC<ShareControlsProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: siteConfig.seo.title,
          text: siteConfig.profile.tagline,
          url: currentUrl,
        });
        onClose();
      } catch {
        // User cancelled native share
      }
    }
  };

  const supportsNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="share-dialog-title" className="font-display text-base font-bold text-[var(--text-primary)]">
            Share {siteConfig.profile.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
          Copy the link below or share directly from your device.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-2">
          <input
            type="text"
            readOnly
            value={currentUrl}
            aria-label="Page URL"
            className="w-full bg-transparent px-2 text-xs text-[var(--text-secondary)] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-500 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {supportsNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-violet-500" />
            <span>Share via device</span>
          </button>
        )}
      </div>
    </div>
  );
};

