import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'

import { Converter } from '~/features/currency-converter'
import { Board } from '~/features/rate-board'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(10),
    },
  }),
)

const App: React.FC = () => {
  const classes = useStyles()

  return (
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
  )
}

export default hot(App)
