import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import MatchView from "./MatchView";

const useStyles = makeStyles(theme => ({
    root: {
    },
    matchContainer: {
        padding: "10px",
    },
}));

export default function SummonerStats(props) {
    const classes = useStyles();

    const matches = props.matches.map(match => {
        let isOnRedTeam = false;
        for (let i = 0; i < match.redTeam.players.length; ++i) {
            if (match.redTeam.players[i].summoner === props.searchSummoner) {
                isOnRedTeam = true;
                break;
            }
        }
        return (
            <div key={match.id} className={classes.matchContainer}>
                <MatchView
                    win={(isOnRedTeam && match.redTeam.win) || (!isOnRedTeam && !match.redTeam.win)}
                    searchSummoner={props.searchSummoner}
                    redTeam={match.redTeam}
                    blueTeam={match.blueTeam}
                />
            </div>
        );
    });

    return (
        <div>
            {matches}
        </div>
    )
}
