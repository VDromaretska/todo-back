const Client = require("pg").Client;

export const client = new Client({
  user: "academy",
  database: "tododb",
});
