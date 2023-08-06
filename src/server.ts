import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { addDummyDbItems } from "./db";
import filePath from "./filePath";

const app = express();

/** Parses JSON data in a request automatically */
app.use(express.json());
/** To allow 'Cross-Origin Resource Sharing': https://en.wikipedia.org/wiki/Cross-origin_resource_sharing */
app.use(cors());

// read in contents of any environment variables in the .env file
dotenv.config();

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;
const allTasks = {
  toDoTasks: [
    { taskBody: "First", AddedBy: "Viki", DueDate: "06/08/2023" },
    { taskBody: "Second", AddedBy: "Viki", DueDate: "06/08/2023" },
    { taskBody: "Third", AddedBy: "Viki", DueDate: "06/08/2023" },
  ],
  completeTasks: [
    { taskBody: "Forth", AddedBy: "Viki", DueDate: "06/08/2023" },
  ],
};
// const allCompletedTasks: JsonTask[] = [];
interface JsonTask {
  taskBody: string;
  AddedBy: string;
  DueDate: string;
}

// API info page
function handleGetRequestForRootDoc(req: any, res: any) {
  res.json(allTasks);
}
function handlePOSTRequestOfNewTask(req: any, res: any) {
  const receivedTask: JsonTask = req.body;
  allTasks.toDoTasks.push(receivedTask);
}
function handlePatchRequestForCompletion(req: any, res: any) {
  const receivedCompleteTask: JsonTask = req.body;
  const index = allTasks.toDoTasks.findIndex(
    (t) => t.taskBody === receivedCompleteTask.taskBody
  );
  allTasks.toDoTasks.splice(index, 1);
  allTasks.completeTasks.push(receivedCompleteTask);
}

function handleDeleteRequest(req: any, res: any) {
  const receivedDeleteTask: JsonTask = req.body;
  const indexToDo: number = allTasks.toDoTasks.findIndex(
    (t) => t.taskBody === receivedDeleteTask.taskBody
  );
  const indexComplete: number = allTasks.completeTasks.findIndex(
    (t) => t.taskBody === receivedDeleteTask.taskBody
  );
  if (indexToDo === -1) {
    allTasks.completeTasks.splice(indexComplete, 1);
  } else {
    allTasks.toDoTasks.splice(indexToDo, 1);
  }
}
app.get("/", handleGetRequestForRootDoc);

app.post("/", handlePOSTRequestOfNewTask);

app.patch("/", handlePatchRequestForCompletion);

app.delete("/", handleDeleteRequest);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
