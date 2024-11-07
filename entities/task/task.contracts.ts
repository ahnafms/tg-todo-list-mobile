import { z } from "zod";

export enum Status {
  ON_GOING = "ON GOING",
  FINISH = "FINISH",
}

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Task name must be at least 2 characters."),
  status: z.enum([Status.ON_GOING, Status.FINISH]),
});

export const EditTaskSchema = z.object({
  status: z.boolean(),
});
