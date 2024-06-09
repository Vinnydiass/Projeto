const mongoose = require('mongoose')
require('dotenv').config()

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

console.log('DB_USERNAME:', DB_USERNAME);
console.log('DB_PASSWORD:', DB_PASSWORD);
console.log('DB_HOST:', DB_HOST);
console.log('DB_NAME:', DB_NAME);