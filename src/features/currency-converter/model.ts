import { createStore, createEvent, sample, merge, combine } from 'effector'

import { coinSelected, $cryptoCoins, CryptoCoins } from '~/features/rate-board'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const inputCurrencyValueUpdated = createEvent<string>()
const outputCurrencyValueUpdated = createEvent<string>()
const inputCurrencyTypeUpdated = createEvent<string>()
const outputCurrencyTypeUpdated = createEvent<string>()

export const handleInputCurrencyValueUpdated = inputCurrencyValueUpdated.prepend(
  (event: ChangeEvent) => {
    if (!event.target.value.match(/[0-9.]/g)) return ''

    return event.target.value
  },
)
export const handleOutputCurrencyValueUpdated = outputCurrencyValueUpdated.prepend(
  (event: ChangeEvent) => {
    if (!event.target.value.match(/[0-9.]/g)) return ''

    return event.target.value
  },
)
export const handleInputCurrencyTypeUpdated = inputCurrencyTypeUpdated.prepend(
  (event: ChangeEvent) => event.target.value,
)
export const handleOuptuCurrencyTypeUpdated = outputCurrencyTypeUpdated.prepend(
  (event: ChangeEvent) => event.target.value,
)

export const $currencies = createStore<string[]>([]).on(
  $cryptoCoins,
  (_, coins) => coins.currentCoins.map((item) => item.display.name),
)

export const $inputCurrencyValue = createStore('0').on(
  inputCurrencyValueUpdated,
  (_, value) => value,
)

export const $outputCurrencyValue = createStore('0').on(
  outputCurrencyValueUpdated,
  (_, value) => value,
)

export const $inputCurrencyType = createStore('BTC')
  .on(inputCurrencyTypeUpdated, (_, value) => value)
  .on(coinSelected, (_, coin) => coin.display.name)

export const $outputCurrencyType = createStore('ETH').on(
  outputCurrencyTypeUpdated,
  (_, value) => value,
)

sample({
  source: combine([
    $cryptoCoins,
    $outputCurrencyType,
    $inputCurrencyValue,
    $inputCurrencyType,
  ]),
  clock: merge([
    $inputCurrencyType,
    inputCurrencyValueUpdated,
    $outputCurrencyType,
  ]),
  fn: ([
    cryptoCoins,
    outputCurrencyType,
    inputCurrencyValue,
    inputCurrencyType,
  ]) => {
    const { inputPrice, outputPrice } = getCoinPricesByCurrencyType(
      cryptoCoins,
      inputCurrencyType,
      outputCurrencyType,
    )

    if (inputCurrencyValue !== '') {
      return String((Number(inputCurrencyValue) * inputPrice) / outputPrice)
    }

    return ''
  },
  target: $outputCurrencyValue,
})

sample({
  source: combine([
    $cryptoCoins,
    $outputCurrencyValue,
    $inputCurrencyType,
    $outputCurrencyType,
  ]),
  clock: outputCurrencyValueUpdated,
  fn: ([
    cryptoCoins,
    outputCurrencyValue,
    inputCurrencyType,
    outputCurrencyType,
  ]) => {
    const { inputPrice, outputPrice } = getCoinPricesByCurrencyType(
      cryptoCoins,
      inputCurrencyType,
      outputCurrencyType,
    )

    if (outputCurrencyValue !== '') {
      return String((Number(outputCurrencyValue) * outputPrice) / inputPrice)
    }

    return ''
  },
  target: $inputCurrencyValue,
})

function getCoinPricesByCurrencyType(
  coins: CryptoCoins,
  inputType: string,
  outputType: string,
) {
  const outputCoinPrice =
    coins.currentCoins.find((coin) => coin.display.name === outputType)?.raw
      .price || 0

  const inputCoinPrice =
    coins.currentCoins.find((coin) => coin.display.name === inputType)?.raw
      .price || 0

  return {
    inputPrice: inputCoinPrice,
    outputPrice: outputCoinPrice,
  }
}
