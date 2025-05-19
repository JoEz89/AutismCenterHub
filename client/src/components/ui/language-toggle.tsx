import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleLanguage}
      aria-label={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
      className="rounded-full w-10 h-10"
    >
      <span className="text-sm font-medium">
        {i18n.language === "en" ? "AR" : "EN"}
      </span>
    </Button>
  );
}
