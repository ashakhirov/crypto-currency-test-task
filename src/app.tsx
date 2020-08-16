import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { MonetizationOn } from '@material-ui/icons'
import { Container, Grid, AppBar, Typography, Toolbar } from '@material-ui/core'

import { Converter } from '~/features/currency-converter'
import { Board } from '~/features/rate-board'

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
      <AppBar position="static">
        <Toolbar>
          <MonetizationOn />
          <Typography variant="h6" component="h1">
            crypto-currency
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Converter />
          </Grid>
          <Grid item xs={12}>
            <Board />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
