import { createStore, createEvent } from 'effector'

type Currency = {
  value: string
  label: string
}

const currencySelected = createEvent<string>()
export const handleCurrencySelected = currencySelected.prepend(
  (event: React.ChangeEvent<{ value: unknown }>) =>
    event.target.value as string,
)

export const $currencies = createStore<Currency[]>([
  { value: 'USD', label: '$' },
  { value: 'RUB', label: 'Р' },
])
export const $currency = createStore('USD')

$currency.on(currencySelected, (_, selectedCurrency) => selectedCurrency)
