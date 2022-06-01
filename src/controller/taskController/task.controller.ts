import { Request, Response } from "express";
import TaskInfo from "../../models/taskModel/task.model";

export class TaskController {
    static async addTask(req: Request, res: Response) {
        let {task_id,
            user_id,
            task_title,
            task_desc,
            task_type,
            task_date ,
            task_completed,
        } = req.body;


        const tasks = await TaskInfo.create({
            task_id: task_id,
            user_id:user_id,
            task_title:task_title,
            task_desc:task_desc,
            task_type:task_type,
            task_date:task_date ,
            task_completed:task_completed,
        });

        return res.send({
            added: true,
          });


    }
}