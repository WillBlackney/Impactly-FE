import { Timestamp } from "firebase/firestore";
import {atom} from "recoil";

export type Task = {
  id?: string;
  taskName: string;
  taskDescription: string;
  creator?: string;
  createdAt?: Timestamp;
};

interface AllTasksState {
  allTasks: Task[];
};

export const defaultAllTasksState : AllTasksState = {
  allTasks: [],
};


export const allTasksState = atom<AllTasksState>({
    key: 'allTasksState',
    default: defaultAllTasksState,
});





