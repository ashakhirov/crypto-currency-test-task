import {
  createStore,
  createEvent,
  createEffect,
  sample,
  forward,
} from 'effector'

import { fetchCryptoCoins } from './api'
import { NormalizedCoin, Colors } from './types'
import { transformCryptocoins } from './lib/transformer'

type CryptoCoins = {
  previousCoins: NormalizedCoin[]
  currentCoins: NormalizedCoin[]
}

type ColorsMap = Record<string, Colors>

const cryptoCoinsUpdated = createEvent<NormalizedCoin[]>()
const normalizeCryptoCoins = cryptoCoinsUpdated.prepend(transformCryptocoins)

export const getCryptoCoinsFx = createEffect({
  handler: fetchCryptoCoins,
})

const refreshTimeoutFx = createEffect({
  handler: () => new Promise((resolve) => setTimeout(resolve, 50000)),
})

const resetTimeoutFx = createEffect({
  handler: () => new Promise((resolve) => setTimeout(resolve, 12000)),
})

const $cryptoCoins = createStore<CryptoCoins>({
  previousCoins: [],
  currentCoins: [],
}).on(cryptoCoinsUpdated, (state, newCoins) => {
  if (state.previousCoins.length === 0) {
    return {
      previousCoins: newCoins,
      currentCoins: newCoins,
    }
  }

  return {
    previousCoins: [...state.currentCoins],
    currentCoins: newCoins,
  }
})

export const $currentCryptoCoins = $cryptoCoins.map(
  ({ currentCoins }) => currentCoins,
)

export const $priceColorsMap = createStore<ColorsMap>({})
  .on($cryptoCoins, (_, payload) => createColorsMap(payload, 'price'))
  .reset(resetTimeoutFx.done)

export const $mktCapColorsMap = createStore<ColorsMap>({})
  .on($cryptoCoins, (_, payload) => createColorsMap(payload, 'mktCap'))
  .reset(resetTimeoutFx.done)

sample({
  source: getCryptoCoinsFx.doneData,
  target: normalizeCryptoCoins,
  fn: ({ Data: coins }) => coins,
})

forward({
  from: getCryptoCoinsFx.done,
  to: refreshTimeoutFx,
})

forward({
  from: refreshTimeoutFx.done,
  to: [getCryptoCoinsFx],
})

forward({
  from: $priceColorsMap,
  to: resetTimeoutFx,
})

function createColorsMap<P extends CryptoCoins>(
  payload: P,
  filterBy: 'price' | 'mktCap' | 'changePct24Hr',
) {
  const filteredCoinsByPrice = payload.currentCoins.filter(
    (coin, idx) =>
      coin?.raw?.[filterBy] !== payload.previousCoins[idx]?.raw?.[filterBy],
  )

  return filteredCoinsByPrice.reduce<ColorsMap>((accObj, filteredCoin) => {
    const currentCoin = payload.currentCoins.find(
      (coin) => coin.display.name === filteredCoin.display.name,
    )
    if (currentCoin) {
      const previousCoin = payload.previousCoins.find(
        (coin) => coin.display.name === currentCoin.display.name,
      )
      if (currentCoin && previousCoin) {
        const color =
          currentCoin.raw[filterBy] === previousCoin.raw[filterBy]
            ? 'default'
            : currentCoin.raw[filterBy] > previousCoin.raw[filterBy]
            ? 'green'
            : 'red'

        accObj[currentCoin.display.id] = color
      }
    }

    return accObj
  }, {})
}
