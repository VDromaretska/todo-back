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

client
  .connect()
  .then(() => console.log("Connected"))
  .then(() => client.query("select * from todo"))
  .catch((e: any) => console.log(e));

//routing
app.get("/", (req, res) => {
  client
    .query("SELECT * FROM todo")
    .then((dbresult) => res.json(dbresult.rows));
});

app.post("/", (req, res) => {
  client.query(`INSERT ${req.body} INTO todo`).then(() => res.sendStatus(201));
});

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;
app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});

// const allCompletedTasks: JsonTask[] = [];
interface JsonTask {
  taskBody: string;
  AddedBy: string;
  DueDate: string;
}

// app.get("/", (req, res) => {
//   res.json(allTasks);
// });

// app.post("/", (req, res) => {
//   const receivedTask: JsonTask = req.body;
//   allTasks.toDoTasks.push(receivedTask);
//   res.status(201).json(receivedTask);
// });

// app.patch("/", (req, res) => {
//   const receivedCompleteTask: JsonTask = req.body;
//   const index = allTasks.toDoTasks.findIndex(
//     (t) => t.taskBody === receivedCompleteTask.taskBody
//   );
//   allTasks.toDoTasks.splice(index, 1);
//   allTasks.completeTasks.push(receivedCompleteTask);
// });

// app.delete("/", (req, res) => {
//   const receivedDeleteTask: JsonTask = req.body;
//   const indexToDo: number = allTasks.toDoTasks.findIndex(
//     (t) => t.taskBody === receivedDeleteTask.taskBody
//   );
//   const indexComplete: number = allTasks.completeTasks.findIndex(
//     (t) => t.taskBody === receivedDeleteTask.taskBody
//   );
//   if (indexToDo === -1) {
//     allTasks.completeTasks.splice(indexComplete, 1);
//   } else {
//     allTasks.toDoTasks.splice(indexToDo, 1);
//   }
// });
