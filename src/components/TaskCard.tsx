import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { allTasksState, Task } from "../atoms/TasksAtom";

type TaskCardProps = {
  task: Task;
  onDeleteTask: (task: Task) => Promise<boolean>;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDeleteTask }) => {
    const [tasksStateValue, setTasksStateValue] = useRecoilState(allTasksState);
    const handleDelete = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.stopPropagation();
        try {
          const success = await onDeleteTask(task);
          if (!success) throw new Error("Failed to delete task");
    
          console.log("Task successfully deleted");
    
        } catch (error: any) {
          console.log("Error deleting task", error.message);
        }

        console.log("new tasks state", tasksStateValue)
      };

  return (
    <Card sx={{ width: 550}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.taskName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.taskDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDelete} size="small">Delete Task</Button>
      </CardActions>
    </Card>
  );
};
export default TaskCard;
