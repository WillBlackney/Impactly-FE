import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
} from "@mui/material";
import { Container, Box } from "@mui/system";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import React, { useState } from "react";
import { Task } from "../atoms/TasksAtom";
import { v4 as uuidv4 } from "uuid";

type CreateTaskPanelProps = {};

const CreateTaskPanel: React.FC<CreateTaskPanelProps> = () => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateNewTask = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setFormError("");
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const enteredTaskName = data.get("taskName")?.toString();
    const enteredTaskDescription = data.get("taskDescription")?.toString();

    if (enteredTaskName == undefined || enteredTaskDescription == undefined)
      return;

    if (enteredTaskName.length === 0) {
      setFormError("Please enter a task name");
      return;
    } else if (enteredTaskDescription.length === 0) {
      setFormError("Please enter a task description");
      return;
    }

    const newTask: Task = {
      //uuid: uuidv4(),
      taskName: enteredTaskName,
      taskDescription: enteredTaskDescription,
    };

    try{
        const tasksDocRef = await addDoc(collection(firestore, 'tasks'), newTask);

    } catch{

    }
    setLoading(true);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card
        variant="outlined"
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" mt={4}>
          Create New Task
        </Typography>
        <Box component="form" onSubmit={handleCreateNewTask} noValidate>
          <TextField
            id="taskName"
            label="Task name"
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="taskName"
            autoFocus
          />
          <TextField
            multiline
            id="taskDescription"
            label="Task Description"
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="taskDescription"
            autoFocus
            placeholder="Add a detailed description of the task"
          />
          <Typography
            component="p"
            variant="body1"
            color="red"
            textAlign={"center"}
          >
            {formError}
          </Typography>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            //loading={loading}
          >
            Create Task
          </LoadingButton>
        </Box>
      </Card>
    </Container>
  );
};
export default CreateTaskPanel;
