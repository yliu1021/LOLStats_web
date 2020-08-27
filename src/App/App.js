import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Container,
    Grid,
    Typography,
    TextField,
    LinearProgress,
    Button,
    Paper,
} from "@material-ui/core";

import SummonerStats from "./SummonerStats";

const useStyles = makeStyles(theme => ({
    root: {
    },

    header: {
        margin: "40px auto"
    },
    title: {
    },
    textField: {
        width: "100%"
    },

    contentView: {
    },
    summonerStatsPaper: {
    },
    loadingView: {
    },
    pastSearchButton: {
    }
}));

export default function App() {
    const classes = useStyles();

    const [searchName, setSearchName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [summonerStats, setSummonerStats] = useState(null);

    function search() {
        if (searchName.length === 0) return;

        const currSearchName = searchName;

        let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        searchHistory = searchHistory ? searchHistory : {};
        if (searchHistory[currSearchName]) {
            searchHistory[currSearchName] += 1;
        } else {
            searchHistory[currSearchName] = 1;
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        setIsLoading(true);
        const searchParams = new URLSearchParams();
        searchParams.append("summoner", encodeURIComponent(searchName));
        searchParams.append("num_matches", "5");
        fetch(`http://localhost:5000/analyze?${searchParams.toString()}`)
            .then(res => res.json())
            .then(res => {
                res.currSearchName = currSearchName;
                setSummonerStats(res);
            })
            .catch(error => {
                setSummonerStats(null);
                console.log("Got error: " + error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    let contentView;
    if (isLoading) {
        contentView = (
            <Container className={classes.loadingView} maxWidth={"xs"}>
                <LinearProgress variant={"indeterminate"}/>
                <Typography variant={"caption"}>Loading...</Typography>
            </Container>
        );
    } else {
        if (summonerStats) {
            contentView = (
                <Paper className={classes.summonerStatsPaper}>
                    <SummonerStats matches={summonerStats.matches} searchSummoner={summonerStats.currSearchName}/>
                </Paper>
            );
        } else {
            let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
            searchHistory = searchHistory ? searchHistory : {};
            const recentHistory = Object.entries(searchHistory)
                .sort((a, b) => {
                    return b[1] - a[1]
                })
                .map(x => x[0])
                .slice(0, 5);
            const recentSearches = recentHistory.map((value => (
                <Grid item xs={"auto"} key={value}>
                    <Button
                        className={classes.pastSearchButton}
                        variant={"outlined"}
                        onClick={() => {
                            setSearchName(value);
                            search();
                        }}
                    >
                        {value}
                    </Button>
                </Grid>
            )));
            contentView = (
                <Container maxWidth={"sm"}>
                    <Grid container spacing={3}>
                        {recentSearches}
                    </Grid>
                </Container>
            );
        }
    }

    return (
        <div className={classes.root}>
            <Container className={classes.header} maxWidth={"sm"}>
                <Typography className={classes.title} variant={"h1"} align={"center"}>
                    LOLStats
                </Typography>
                <TextField
                    className={classes.textField}
                    label={"Summoner Name"}
                    value={searchName}
                    autoFocus={true}
                    onChange={(event) => {
                        setSearchName(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            if (searchName.length > 0) {
                                search();
                            }
                            event.preventDefault();
                        }
                    }}
                />
            </Container>
            <Container className={classes.contentView} maxWidth={"xl"}>
                {contentView}
            </Container>
        </div>
    );
}
