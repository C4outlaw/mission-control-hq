'use client';
import { useT } from '../../lib/i18n';

export default function HomeMobileCTA() {
  const { t } = useT();
  return (
    <div className="mobile-cta">
      <a className="ti-btn primary" href="#contact">{t('mobile_cta.book')}</a>
    </div>
  );
}
