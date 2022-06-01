import { Router } from "express";
import { TaskController } from "../../controller/taskController/task.controller";

const taskRouter = Router()

taskRouter.post("/add",  TaskController.addTask);

taskRouter.get("/:userId", TaskController.getTask);

taskRouter.post("/taskType", TaskController.getTaskType);

taskRouter.delete("/delete/:taskId", TaskController.deleteTask);

export {taskRouter};
