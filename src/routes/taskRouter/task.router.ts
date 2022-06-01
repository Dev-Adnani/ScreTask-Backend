import { Router } from "express";
import { TaskController } from "../../controller/taskController/task.controller";

const taskRouter = Router()

taskRouter.post("/add",  TaskController.addTask);
taskRouter.get("/:userId", TaskController.getTask);
taskRouter.delete("/delete/:taskId", TaskController.deleteTask);

export {taskRouter};
