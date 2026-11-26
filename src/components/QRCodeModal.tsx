import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';
import { siteConfig } from '../config/site.config';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://web3gamer.pages.dev';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="qr-dialog-title" className="font-display text-base font-bold text-[var(--text-primary)]">
            Scan QR Code
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close QR dialog"
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-auto mt-5 inline-flex rounded-2xl bg-white p-4 shadow-inner">
          <QRCodeSVG
            value={currentUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#09090b"
            level="M"
          />
        </div>

        <p className="mt-4 text-xs text-[var(--text-secondary)]">
          Point your camera to open <span className="font-semibold text-[var(--text-primary)]">{siteConfig.profile.name}</span> on mobile.
        </p>
      </div>
    </div>
  );
};

