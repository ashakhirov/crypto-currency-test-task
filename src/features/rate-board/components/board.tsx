import React from 'react'
import { useStore } from 'effector-react'
import { makeStyles } from '@material-ui/core/styles'
import { TableContainer, Table, TableBody, Paper } from '@material-ui/core'

import { Head } from './head'
import { $currentCryptoCoins } from '../model'
import { Row } from './row'

const useStyles = makeStyles({
  tableContainer: {
    overflowY: 'hidden',
  },
  table: {
    width: '100%',
  },
})

export const Board: React.FC = () => {
  const classes = useStyles()
  const currentCryptoCoins = useStore($currentCryptoCoins)

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table
        className={classes.table}
        size="small"
        aria-label="crypto coins table"
      >
        <Head />
        <TableBody>
          {currentCryptoCoins.map((coin, idx) => (
            <Row key={coin.display.id} coin={coin} index={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
