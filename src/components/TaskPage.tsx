import { query, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import React, { useEffect, useState } from "react";
import CreateTaskPanel from "./CreateTaskPanel";
import useTasks from "../hooks/useTasks";
import { Task } from "../atoms/TasksAtom";
import TaskCard from "./TaskCard";
import { Container, Stack } from "@mui/material";

type TaskPageProps = {};

const TaskPage: React.FC<TaskPageProps> = () => {
  const { tasksStateValue, setTasksStateValue, onDeleteTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const getTasks = async () => {
    try {
      const tasksQuery = query(collection(firestore, "tasks"));
      const taskDocs = await getDocs(tasksQuery);
      const tasks = taskDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasksStateValue((prev) => ({
        ...prev,
        allTasks: tasks as unknown as Task[],
      }));
    } catch (error: any) {
      console.log("getTasks() error", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    getTasks();
  }, [tasksStateValue]);
  return (
    <>
      <CreateTaskPanel />
      <Stack alignItems={'center'} spacing = {2} marginTop ={2}>
        {tasksStateValue.allTasks.map((item) => (
          <TaskCard key = {item.id} task={item} onDeleteTask={onDeleteTask}></TaskCard>
        ))}
      </Stack>
    </>
  );
};
export default TaskPage;
