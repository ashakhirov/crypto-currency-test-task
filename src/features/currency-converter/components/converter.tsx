import React from 'react'
import { useList } from 'effector-react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, TextField, MenuItem, FormControl } from '@material-ui/core'

import { $currencies, handleCurrencySelected } from '../model'

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

  return (
    <Paper className={classes.paper}>
      {useList($currencies, (option) => (
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
            value={option.value}
            onChange={handleCurrencySelected}
            variant="outlined"
          >
            <MenuItem value={option.value}>{option.label}</MenuItem>
          </TextField>
        </FormControl>
      ))}
    </Paper>
  )
}
