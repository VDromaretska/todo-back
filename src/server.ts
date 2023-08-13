import express from "express";
import { Client } from "pg";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

// read in contents of any environment variables in the .env file
dotenv.config();
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function connectToDb() {
  await client.connect();
  console.log("Connected async");
}
connectToDb();
// Below other option: connecting with .then()
// client
//   .connect()
//   .then(() => console.log("Connected"))
//   .then(() => client.query("select * from todo"))
//   .catch((e: any) => console.log(e));

//routing
app.get("/", (req, res) => {
  client
    .query("SELECT * FROM todo")
    .then((dbresult) => res.json(dbresult.rows));
});

app.post("/", (req, res) => {
  const { description, added_by, date, completed } = req.body;
  const queryAddTask = {
    text: "INSERT INTO todo (description, added_by, date, completed) VALUES ($1, $2, $3, $4)",
    values: [description, added_by, date, completed],
  };
  client
    .query(queryAddTask)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error("Error during addind data into database", error);
      res.sendStatus(500);
    });
});

app.patch("/", (req, res) => {
  const { description } = req.body;
  const queryCompleteTask = {
    text: "UPDATE todo SET completed = $1 WHERE description = $2",
    values: ["Y", description],
  };
  client
    .query(queryCompleteTask)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error("Error during marking task as complete", error);
      res.sendStatus(500);
    });
});

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;
app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});

// const allCompletedTasks: JsonTask[] = [];
interface JsonTaskAddProps {
  description: string;
  added_by: string;
  date: string;
  completed: "Y" | "N";
}
