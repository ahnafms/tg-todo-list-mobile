import { z } from "zod";
import { EditTaskSchema, TaskSchema } from "./task.contracts";

export type Task = z.infer<typeof TaskSchema>;
export type EditTask = z.infer<typeof EditTaskSchema>;
