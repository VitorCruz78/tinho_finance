export function CurrencyPtBr(value: number | string) {
  return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(value || 0))
}
