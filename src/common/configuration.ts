import 'dotenv/config' //needs to be imported for env variables to load globaly

export const SERVER_PORT = process.env.SERVER_PORT || 3000
export const DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION_URL
