import { get } from './lib/request'
import { CoinsResponse } from './types'

export const fetchCryptoCoins = (): Promise<CoinsResponse> =>
  get<CoinsResponse>({
    path: 'data/top/totalvolfull?limit=10&tsym=USD',
  })
