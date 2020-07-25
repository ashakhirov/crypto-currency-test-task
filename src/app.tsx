import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'

import { Converter } from '~/features/currency-converter'
import { Board } from '~/features/rate-board'
import { AppGate } from './init'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(10),
    },
  }),
)

export const App: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <AppGate />
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Board />
          </Grid>
          <Grid item xs={4}>
            <Converter />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
