import { forward } from 'effector'
import { createGate } from 'effector-react'

import { getCryptoCoinsFx } from './features/rate-board'

export const InitGate = createGate()

forward({
  from: InitGate.open,
  to: getCryptoCoinsFx,
})
