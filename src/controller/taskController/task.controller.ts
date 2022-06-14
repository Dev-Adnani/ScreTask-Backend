import { Request, Response } from "express";
import TaskInfo from "../../models/taskModel/task.model";

export class TaskController {

    // Add Task 
    static async addTask(req: Request, res: Response) {

        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let taskId = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);


            let {
                user_id,
                task_title,
                task_desc,
                task_type,
                task_date,
                task_completed,
            } = req.body;


            if (user_id != null && task_title != null &&
                task_type != null && task_completed != null
                && task_date != null && task_desc != null) {

                const findId = await TaskInfo.exists({ task_id: taskId });

                if (findId) {
                    return res.send({
                        added: false,
                        data: "Ehh Same Task ID"
                    });
                }
                else {
                    const tasks = await TaskInfo.create({
                        task_id: taskId,
                        user_id: user_id,
                        task_title: task_title,
                        task_desc: task_desc,
                        task_type: task_type,
                        task_date: task_date,
                        task_completed: task_completed,
                    });

                    return res.send({
                        added: true,
                        data: "Success"
                    });
                }


            }
            else {
                return res.send({
                    added: false,
                    data: "Please Fill All The Fields"
                });
            }
        }
        else {
            return res.send({
                added: false,
                data: "Wrong API Key Key",
            });
        }

    }

    // Get Task By Users ID
    static async getTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;

        if (adminSecret === "test") {
            let { userId } = req.params;

            const tasks = await TaskInfo.find({ user_id: userId }).lean();
            if (tasks) {
                return res.send({
                    received: true,
                    available: true,
                    data: tasks
                });
            }
            else {
                return res.send({
                    received: false,
                    available: false,
                    data: null
                });
            }
        }
        else {
            return res.send({
                received: false,
                available: false,
                data: null,
            });
        }

    }
    //Get Total Task Completed Count

    static async getCompletedCount(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        var completed_count = 0;

        if (adminSecret === "test") {
            let { userId } = req.params;

            const tasks = await TaskInfo.find({ user_id: userId }).lean();
            for (const key in tasks) {
                if(tasks[key]["task_completed"] == true)
                {
                    completed_count = completed_count + 1;
                }
            }
          
            if(tasks.length === 0)
            {
                return res.send({
                    received: true,
                    available: false,
                    total_count: 0,
                    completed_count: 0,
                });
            }
            else
            {
                return res.send({
                    received: true,
                    available: true,
                    total_count:tasks.length,
                    completed_count: completed_count,
                });
            }
        }
        else {
            return res.send({
                received: false,
                available: false,
                data: null,
            });
        }

    }


    // Get Task Type
    static async getTaskType(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let { userId, type } = req.body;

            const tasks = await TaskInfo.find({ user_id: userId, task_type: type }).lean();

            if (tasks.length > 0) {
                return res.send({
                    received: true,
                    available: true,
                    data: tasks
                });
            }
            else {
                return res.send({
                    received: true,
                    available: false,
                    data: tasks
                });
            }

        }
        else {
            return res.send({
                deleted: false,
                data: "Wrong API Key",
            });
        }
    }

    static async updateTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let { task_id,
                task_title,
                task_desc,
                task_type,
                task_date,
                task_completed,
            } = req.body;


            if (task_id != null && task_title != null &&
                task_type != null && task_completed != null
                && task_date != null && task_desc != null) {

                const filter = { task_id: task_id }
                const update = {
                    task_title: task_title,
                    task_type: task_type, task_completed: task_completed, task_date: task_date, task_desc: task_desc
                }

                const tasks = await TaskInfo.findOneAndUpdate(filter, update, {
                    new: true,
                    upsert: true
                });


                if (tasks) {
                    return res.send({
                        updated: true,
                        data: "Success"
                    });
                }
                else {
                    return res.send({
                        updated: false,
                        data: "Oops Something Gone Wrong"
                    });
                }
            }
            else {
                return res.send({
                    added: false,
                    data: "Please Fill All The Fields"
                });
            }
        }
        else {
            return res.send({
                deleted: false,
                data: "Wrong API Key",
            });
        }
    }

    // Get Specific Task
    static async getSpecificTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let { taskId } = req.params;
            console.log(`Hello Check ${taskId}`);


            const tasks = await TaskInfo.findOne({ task_id: taskId }).lean();

            return res.send({
                received: true,
                available: true,
                data: tasks
            });
        }
        else {
            return res.send({
                deleted: false,
                data: "Wrong API Key",
            });
        }

    }

    // Delete Any Task
    static async deleteTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let { taskId } = req.params;

            var data = await TaskInfo.remove({ task_id: taskId });
            console.log(data);


            if (data) {
                return res.send({
                    deleted: true,
                    data: "Deleted",
                });
            }
            else {
                return res.send({
                    deleted: false,
                    data: "Wrong API Key",
                });
            }

        }
        else {
            return res.send({
                deleted: false,
                data: "Wrong API Key",
            });
        }
    }


}