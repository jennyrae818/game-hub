const db = require("../config/connection");
const { Category, Game } = require("../models");
const categorySeeds = require("./categorySeeds.js");

db.once("open", async () => {
    try {
        // Clean Category in database
        await Category.deleteMany({});

        // Bulk create category in database
        const categorySeed = await Category.insertMany(categorySeeds);

        console.log("----CATEGORIES SEEDED----");

        // Clean Game database
        await Game.deleteMany({});

        // Bulk create games
        await Game.insertMany([
            {
                gameName: "Tag",
                description: "The player who is it chases the other players, trying to touch one of them, thereby making that person it.",
                usersPlaying: 0,
                categories: categorySeed[0]._id
            },
            {
                gameName: "Corn-Hole",
                description: "A lawn game in which players toss beanbags toward a slanted platform with the aim of passing the beanbag through a hole in the center of the platform.",
                usersPlaying: 0,
                categories: [categorySeed[0]._id, categorySeed[4]._id]
            },
            {
                gameName: "Pac-Man",
                description: "An action maze chase video game; the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts — Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) — that pursue him.",
                usersPlaying: 0,
                categories: categorySeed[1]._id
            },
            {
                gameName: "Cribbage",
                description: "A card game, usually for two players, in which each player tries to form various counting combinations of cards. Each player receives six cards, and the score is kept by moving pegs on a narrow rectangular board.",
                usersPlaying: 0,
                categories: [categorySeed[2]._id, categorySeed[3]._id]
            },
            {
                gameName: "Hungry Hungry Hippos",
                description: "Hungry Hungry Hippos is a tabletop game made for 2-4 players, The objective of the game is for each player to collect as many marbles as possible with their hippo.",
                usersPlaying: 0,
                categories: categorySeed[2]._id
            },
            {
                gameName: "Eucher",
                description: "A card game for two to four players, usually played with the thirty-two highest cards, the aim being to win at least three of the five tricks played.",
                usersPlaying: 0,
                categories: categorySeed[3]._id
            },
            {
                gameName: "Spider Solitaire",
                description: "Single player game, the goal is to assemble 13 cards of a suit, in ascending sequence from ace through king, on top of a pile.",
                usersPlaying: 0,
                categories: categorySeed[3]._id
            },
            {
                gameName: "Spoons",
                description: "Players take turns trying to collect a four-of-a-kind. Once someone does, everyone tries to grab a spoon. Without a spoon, you get a letter. If a player spells “S-P-O-O-N”, they're out!",
                usersPlaying: 0,
                categories: categorySeed[3]._id
            },
            {
                gameName: "Speed",
                description: "Speed is a game for two players or more where players try to get rid of all of their cards first.",
                usersPlaying: 0,
                categories: categorySeed[3]._id
            },
            {
                gameName: "Bump - (Basketball)",
                description: "The object of the game is to “bump” the other players out of the game by making a shot before the person in back of you in the line does.",
                usersPlaying: 0,
                categories: [categorySeed[4]._id, categorySeed[0]]
            },
            {
                gameName: "Pokemon",
                description: "The original Pokémon is a role-playing game based around building a small team of monsters to battle other monsters in a quest to become the best.",
                usersPlaying: 0,
                categories: categorySeed[5]._id
            },
        ]);

        console.log("----GAMES SEEDED----");

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("All done!");
    process.exit(0);
});