import { Router } from "express";
import { TaskController } from "../../controller/taskController/task.controller";

const taskRouter = Router()

taskRouter.post("/add",  TaskController.addTask);

export {taskRouter};
