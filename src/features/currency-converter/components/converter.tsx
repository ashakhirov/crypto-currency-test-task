import React from 'react'
import { useStore } from 'effector-react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, TextField, FormControl, MenuItem } from '@material-ui/core'

import {
  $currencies,
  $inputCurrencyValue,
  $outputCurrencyValue,
  $inputCurrencyType,
  $outputCurrencyType,
  handleInputCurrencyTypeUpdated,
  handleOuptuCurrencyTypeUpdated,
  handleInputCurrencyValueUpdated,
  handleOutputCurrencyValueUpdated,
} from '../model'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
    },
    formControl: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing(2),

      '&:first-child': {
        paddingBottom: 0,
      },
    },
    currencyInput: {
      width: 'calc(70% - 10px)',
    },
    currencyType: {
      width: '30%',
    },
    currencyValue: {
      paddingBottom: '15px',
    },
  }),
)

export const Converter: React.FC = () => {
  const classes = useStyles()
  const currencies = useStore($currencies)
  const inputCurrencyType = useStore($inputCurrencyType)
  const outputCurrencyType = useStore($outputCurrencyType)
  const inputCurrencyValue = useStore($inputCurrencyValue)
  const outputCurrencyValue = useStore($outputCurrencyValue)

  return (
    <Paper className={classes.paper}>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.currencyInput}
          size="small"
          variant="outlined"
          value={inputCurrencyValue}
          onChange={handleInputCurrencyValueUpdated}
        />
        <TextField
          className={classes.currencyType}
          size="small"
          variant="outlined"
          select
          value={inputCurrencyType}
          onChange={handleInputCurrencyTypeUpdated}
        >
          {currencies.map((currency, idx) => (
            <MenuItem key={idx} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.currencyInput}
          size="small"
          variant="outlined"
          value={outputCurrencyValue}
          onChange={handleOutputCurrencyValueUpdated}
        />
        <TextField
          className={classes.currencyType}
          size="small"
          variant="outlined"
          select
          value={outputCurrencyType}
          onChange={handleOuptuCurrencyTypeUpdated}
        >
          {currencies.map((currency, idx) => (
            <MenuItem key={idx} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Paper>
  )
}
