import React from 'react'
import { useStore } from 'effector-react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Paper,
  TextField,
  MenuItem,
  FormControl,
  Typography,
} from '@material-ui/core'

import { $currencies, $currency, handleCurrencySelected } from '../model'

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
  const currency = useStore($currency)
  const currencies = useStore($currencies)

  return (
    <Paper className={classes.paper}>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.currencyInput}
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.currencyType}
          size="small"
          select
          value={currency}
          onChange={handleCurrencySelected}
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.currencyInput}
          size="small"
          variant="outlined"
        />
        <TextField
          className={classes.currencyType}
          size="small"
          select
          value={currency}
          onChange={handleCurrencySelected}
          variant="outlined"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <Typography
        className={classes.currencyValue}
        variant="h5"
        component="h2"
        color="textPrimary"
        align="center"
      >
        70 Российских Рублей
      </Typography>
    </Paper>
  )
}
