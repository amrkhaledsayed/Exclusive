import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const SelectDemo = ({ className }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const currentLang = i18n.language || 'en';

  return (
    <Select
      value={currentLang}
      onValueChange={handleLanguageChange}
      className="z-[1500]"
    >
      <SelectTrigger
        className={`${className} text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 h-[35px] items-center justify-center gap-[5px] rounded bg-transparent px-[15px] text-[13px] leading-none  outline-none focus:shadow-[0_0_0_2px] focus:shadow-black md:inline-flex`}
        aria-label="Language"
      >
        <SelectValue placeholder="Select a language…" />
      </SelectTrigger>

      <SelectContent
        side="bottom"
        className="overflow-hidden z-100 rounded-md bg-white "
      >
        <SelectGroup className="z-100">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
          <SelectItem value="tr">Türkçe</SelectItem>
          <SelectItem value="it">Italy</SelectItem>
          <SelectItem value="sp">spanish</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default React.memo(SelectDemo);
