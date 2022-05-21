const db = require("../config/connection");
const { Category, Game } = require("../models");
const categorySeeds = require("./categorySeeds.js");
const gameSeeds = require("./gameSeeds.js");

db.once("open", async () => {
    try {
        await Category.deleteMany({});

        await Category.insertMany(categorySeeds);

        console.log("----CATEGORIES SEEDED----");
        console.log(categorySeeds);
        await Game.deleteMany({});

        await Game.insertMany(gameSeeds);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("All done!");
    process.exit(0);
});