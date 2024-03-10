export interface FormatCurrencyOptions {
  decimals?: number
  locale?: string
  suffix?: string
}

export const formatCurrency = (value?: number, options?: FormatCurrencyOptions) => {
  const { decimals = 0, locale = 'it-IT', suffix = '₫' } = options ?? {}

  return value !== undefined
    ? Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value) + suffix
    : undefined
}
