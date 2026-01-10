'use client';

import Button from '@/components/Button';
import styles from './page.module.css';

interface ContactButtonProps {
  contact: string;
}

export default function ContactButton({ contact }: ContactButtonProps) {
  const handleContact = () => {
    // Format WhatsApp link
    const phoneNumber = contact.replace(/\s/g, '');
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <Button
      onClick={handleContact}
      variant="primary"
      size="lg"
      className={styles.contactButton}
    >
      📱 Contacter via WhatsApp
    </Button>
  );
}
