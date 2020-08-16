import React from 'react'
import { useStoreMap } from 'effector-react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { TableRow, TableCell, Grid, Typography } from '@material-ui/core'

import { $priceColorsMap, $mktCapColorsMap, coinSelected } from '../model'
import { NormalizedCoin } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    '& td': {
      borderRight: '1px solid #ddd',
    },
    '& td:last-child': {
      borderRight: 'none',
    },
  },
  place: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
    color: '#97a4b5',
  },
  coinIcon: {
    width: 25,
    height: 25,
  },
  coinName: {
    color: 'rgb(168, 160, 149)',
  },
  coinPriceCell: {
    '& span': {
      display: 'block',
      border: '1px solid #eee',
      paddingRight: 10,
      paddingLeft: 10,
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
  },
  coinChangePctCell: {
    '& span': {
      display: 'block',
      border: '1px solid #eee',
      paddingRight: 10,
      paddingLeft: 10,
      width: '100%',
      borderRadius: 4,
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
  },
  redCoinChangePct: {
    backgroundColor: '#f5f5f5',
    color: 'rgb(208 58 38)',
  },
  greenCoinChangePct: {
    backgroundColor: '#f5f5f5',
    color: '#3d9400',
  },
  defaultPrice: {
    backgroundColor: '#f5f5f5',
  },
  redPrice: {
    backgroundColor: 'rgb(208 58 38)',
  },
  greenPrice: {
    backgroundColor: '#3d9400',
  },
  defaultMktCap: {
    color: '#000',
  },
  greenMktCap: {
    color: '#3d9400',
  },
  redMktCap: {
    color: 'rgb(208 58 38)',
  },
}))

type MktCapColors = 'defaultMktCap' | 'greenMktCap' | 'redMktCap'
type PriceColors = 'defaultPrice' | 'redPrice' | 'greenPrice'

type Props = {
  coin: NormalizedCoin
  index: number
}

export const Row: React.FC<Props> = ({ coin, index }) => {
  const classes = useStyles()

  const priceColor = useStoreMap({
    store: $priceColorsMap,
    keys: [coin.display.id],
    fn: (colors, [id]) => colors[id] || 'default',
  })

  const mktCapColor = useStoreMap({
    store: $mktCapColorsMap,
    keys: [coin.display.id],
    fn: (colors, [id]) => colors[id] || 'default',
  })

  return (
    <TableRow className={classes.root} hover onClick={() => coinSelected(coin)}>
      <TableCell className={classes.place} align="right">
        {index + 1}
      </TableCell>
      <TableCell align="left">
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <img
              className={classes.coinIcon}
              src={coin.display.iconUrl}
              alt="Crypto coin icon"
            />
          </Grid>
          <Grid item xs={12} sm container direction="column">
            <Typography variant="body1" component="h3">
              {coin.display.fullName}
            </Typography>
            <Typography
              className={classes.coinName}
              variant="body2"
              component="span"
            >
              {coin.display.name}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell className={classes.coinPriceCell} align="center">
        <Typography
          className={classes[`${priceColor}Price` as PriceColors]}
          variant="subtitle1"
          component="span"
        >
          {coin.display.price}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="subtitle1" component="span">
          {coin.display.totalVolume24HTo}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="subtitle1" component="span">
          {coin.display.totalTopTierVolume24HTo}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography
          className={classes[`${mktCapColor}MktCap` as MktCapColors]}
          variant="subtitle1"
          component="span"
        >
          {coin.display.mktCap}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="subtitle1" component="span">
          {coin.display.rating}
        </Typography>
      </TableCell>
      <TableCell className={classes.coinChangePctCell} align="center">
        <Typography
          className={
            coin.raw.changePct24Hr < 0
              ? classes.redCoinChangePct
              : classes.greenCoinChangePct
          }
          variant="subtitle1"
          component="span"
        >
          {coin.display.changePct24Hr}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
