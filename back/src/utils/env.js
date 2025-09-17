// SET UP
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
// import * as dotenv from 'dotenv';

// DOTENV SET UP
dotenv.config({ path: __dirname + '../../.env' });

// VARIABLE
const { PORT, DATABASE_URL } = process.env;

export default {
    port: PORT,
    database_url: DATABASE_URL,
};
