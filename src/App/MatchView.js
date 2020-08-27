import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Typography,
    Card,
    CardContent,
    Grid,
} from "@material-ui/core";

import TeamView from "./TeamView";

const useStyles = makeStyles(theme => ({
    root: {
    }
}));

export default function MatchView(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant={"h3"}>{props.win ? "Victory" : "Defeat"}</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TeamView
                                team={props.redTeam}
                                name={"Red Team"}
                                searchSummoner={props.searchSummoner}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TeamView
                                team={props.blueTeam}
                                name={"Blue Team"}
                                searchSummoner={props.searchSummoner}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
