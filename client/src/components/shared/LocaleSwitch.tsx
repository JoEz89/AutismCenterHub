import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LocaleSwitchProps {
  className?: string;
}

const LocaleSwitch: React.FC<LocaleSwitchProps> = ({ className }) => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? t('arabic') : t('english')}</span>
    </Button>
  );
};

export default LocaleSwitch;
