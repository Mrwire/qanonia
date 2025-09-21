import { createTranslator } from 'next-intl';

export function getRequestConfig() {
  return {
    messages: {},
    locale: 'fr',
    translator: createTranslator({ locale: 'fr', messages: {} }),
  } as const;
}
