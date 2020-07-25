import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './app'

render(
  <CssBaseline>
    <App />
  </CssBaseline>,
  document.getElementById('root'),
)
