export function formatCurrency(value, locale = 'en') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value);
}
