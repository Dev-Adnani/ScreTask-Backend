import { Router } from "express";
import { TaskController } from "../../controller/taskController/task.controller";

const taskRouter = Router()

//Add Task Route
taskRouter.post("/add",  TaskController.addTask);

//Get Tasks By UserID Route
taskRouter.get("/:userId", TaskController.getTask);

//Get Total Task Completed Count
taskRouter.get("/count/:userId", TaskController.getCompletedCount);

//Get Specific Task Route
taskRouter.get("/detail/:taskId", TaskController.getSpecificTask);

//Get Task Types Route
taskRouter.post("/taskType", TaskController.getTaskType);

//Update Task Route
taskRouter.put("/update", TaskController.updateTask);

//Delete Task Route
taskRouter.delete("/delete/:taskId", TaskController.deleteTask);

export {taskRouter};
