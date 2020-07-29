import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { App } from './app'
import { InitGate } from './init'

render(
  <CssBaseline>
    <InitGate />
    <App />
  </CssBaseline>,
  document.getElementById('root'),
)
