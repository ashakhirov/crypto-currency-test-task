import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { InfoOutlined } from '@material-ui/icons'
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  Grid,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  tableCell: {
    borderBottom: '1px solid #00d665',
    '&:hover': {
      background: '#fffcd6',
      cursor: 'pointer',
    },
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
  },
  tooltipContainer: {
    paddingLeft: 8,
    width: 16,
    height: 16,
  },
  tooltip: {
    width: 16,
    height: 16,
  },
}))

export const Head: React.FC = () => {
  const classes = useStyles()

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableCell} align="center">
          <Typography
            className={classes.text}
            variant="subtitle2"
            component="span"
          >
            #
          </Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography
            className={classes.text}
            variant="subtitle2"
            component="span"
          >
            Coin
          </Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography
            className={classes.text}
            variant="subtitle2"
            component="span"
          >
            Price
          </Typography>
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <Grid
            container
            wrap="nowrap"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              <Typography
                className={classes.text}
                variant="subtitle2"
                component="span"
              >
                Total Vol
              </Typography>
            </Grid>
            <Grid className={classes.tooltipContainer} item container>
              <Tooltip
                className={classes.tooltip}
                title={
                  <Typography variant="caption">
                    This is the total volume of the coin across all markets and
                    currency pairs multiplied by the current price.
                  </Typography>
                }
              >
                <InfoOutlined />
              </Tooltip>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <Grid
            container
            wrap="nowrap"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              <Typography
                className={classes.text}
                variant="subtitle2"
                component="span"
              >
                Top Tier Vol
              </Typography>
            </Grid>
            <Grid className={classes.tooltipContainer} item container>
              <Tooltip
                className={classes.tooltip}
                title={
                  <Typography variant="caption">
                    The top 10 coins are ranked by Total Top Tier Vol 24hr. This
                    is the total volume of the coin across all top-tier exchange
                    markets and currency pairs multiplied by the current price.
                  </Typography>
                }
              >
                <InfoOutlined />
              </Tooltip>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell className={classes.tableCell} align="right">
          <Grid
            container
            wrap="nowrap"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item>
              <Typography
                className={classes.text}
                variant="subtitle2"
                component="span"
              >
                Mkt. Cap.
              </Typography>
            </Grid>
            <Grid className={classes.tooltipContainer} item container>
              <Tooltip
                className={classes.tooltip}
                title={
                  <Typography variant="caption">
                    When calculating Market Capitalization (market cap), we
                    account for all coins in circulation, including those held
                    by team members or the company. This also includes coins in
                    smart contracts or escrow. If the coins have been issued and
                    have not been burned, they will be accounted for in the
                    market cap.
                  </Typography>
                }
              >
                <InfoOutlined />
              </Tooltip>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Tooltip
              className={classes.tooltip}
              title={
                <Typography variant="caption">
                  These ratings are powered by Weiss Crypto Ratings.
                </Typography>
              }
            >
              <InfoOutlined />
            </Tooltip>
          </Grid>
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <Typography
            className={classes.text}
            variant="subtitle2"
            component="span"
          >
            Chg. 24H
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
