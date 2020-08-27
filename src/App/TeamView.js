import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Typography,
} from "@material-ui/core";

import PlayerView from "./PlayerView";

const useStyles = makeStyles(theme => ({
    root: {
    }
}));

export default function TeamView(props) {
    const classes = useStyles();

    const players = props.team.players;
    const win = props.team.win;

    const playerView = players.map(player => (
        <PlayerView
            key={player.summoner}
            summoner={player.summoner}
            champion={player.champion}
            performance={player.performance}
            isCurrPlayer={props.searchSummoner === player.summoner}
            win={win}
        />
    ));

    return (
        <div className={classes.root}>
            <Typography variant={"h5"}>{props.name} - {win ? "Win" : "Loss"}</Typography>
            {playerView}
        </div>
    );
}
