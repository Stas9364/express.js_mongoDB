const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const MONGODB_URI = process.env.MONGODB_URI;

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGODB_URI);
}