const db = require("../config/connection");
const { Category } = require("../models");
const categorySeeds = require("./categorySeeds");

db.once("open", async () => {
    try {
        await Category.deleteMany({});

        await Category.create(categorySeeds);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("All done!");
    process.exit(0);
});