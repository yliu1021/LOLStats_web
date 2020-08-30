import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Grid,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "8px",
    },
    currPlayer: {
        background: props => props.background,
        padding: "8px",
    }
}));

export default function PlayerView(props) {
    let classes = useStyles({
        background: props.isCurrPlayer ?
            (props.win ?
                "linear-gradient(45deg, #64b5f6 0%, white 70%)" : "linear-gradient(45deg, #e57373 0%, white 70%)"
            ) : null
    });

    const performancePercentage = (100*props.performance).toFixed(1) + "%";

    return (
        <div className={classes.currPlayer}>
            <Grid container spacing={2}>
                <Grid item xs={4} sm={4}>
                    <Typography variant={"body1"}>{props.summoner}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography variant={"body1"}>{props.champion}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography variant={"body1"}>{performancePercentage}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}
