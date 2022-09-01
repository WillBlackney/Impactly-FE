import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useRecoilState } from "recoil";
import { allTasksState, Task } from "../atoms/TasksAtom";
import { firestore} from "../firebase/clientApp";
const useTasks = () => {
  const [tasksStateValue, setTasksStateValue] = useRecoilState(allTasksState);

  const onDeleteTask = async (task: Task) =>{
    console.log("DELETING Task: ", task.id);

    try {
      // delete post from posts collection
      const tasksDocRef = doc(firestore, "tasks", task?.id!);
      await deleteDoc(tasksDocRef);

      // Update post state
      setTasksStateValue((prev) => ({
        ...prev,
        allTasks: prev.allTasks.filter(
          (item) => item.id !== task.id
        ),
      }));

      return true;
    } catch (error) {
      console.log("THERE WAS AN ERROR", error);
      return false;
    }
  };

  return{
    tasksStateValue,
    setTasksStateValue,
    onDeleteTask,
  }
};
export default useTasks;
