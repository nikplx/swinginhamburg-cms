'use client'

import { useTranslation } from '@payloadcms/ui'

/**
 * Client components rarely need full translation files. This returns a tiny
 * helper that picks the German or English string based on the admin UI
 * language selected in the top-right menu.
 */
export const useAdminText = (): ((de: string, en: string) => string) => {
  const { i18n } = useTranslation()
  const english = i18n?.language === 'en'
  return (de, en) => (english ? en : de)
}

/** Locale used for Intl formatting inside the admin UI. */
export const useAdminLocale = (): string => {
  const { i18n } = useTranslation()
  return i18n?.language === 'en' ? 'en-GB' : 'de-DE'
}
