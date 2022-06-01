import { Request, Response } from "express";
import TaskInfo from "../../models/taskModel/task.model";

export class TaskController {
    static async addTask(req: Request, res: Response) {

        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {

            let { task_id,
                user_id,
                task_title,
                task_desc,
                task_type,
                task_date,
                task_completed,
            } = req.body;


            if (task_id != null && user_id != null && task_title != null && task_type != null && task_completed != null) {

                const findId = await TaskInfo.exists({ task_id: task_id });
                
                if(findId)
                {
                    return res.send({
                        added: false,
                        data: "Ehh Same Task ID"
                    });
                }
                else
                {
                    const tasks = await TaskInfo.create({
                        task_id: task_id,
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
                data: "Wrong API Key",
            });
        }

    }

    static async getTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;

        if (adminSecret === "test") {
            let { userId } = req.params;

            const tasks = await TaskInfo.find({ user_id: userId }).lean();

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
                data: null,
            });
        }

    }

    static async deleteTask(req: Request, res: Response) {
        let adminSecret = req.headers.authorization as string;
        if (adminSecret === "test") {
            let { taskId } = req.params;
            
           var data = await TaskInfo.remove({task_id: taskId});
           console.log(data);
            

           if(data)
           {
            return res.send({
                deleted: true,
                data: "Deleted",
            });
           }
           else
           {
            return res.send({
                deleted: false,
                data: "Wrong API",
            });
           }

        }
        else
        {
            return res.send({
                deleted: false,
                data: "Wrong API",
            });
        }
    }

    
}