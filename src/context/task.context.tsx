import { createContext, useState, ReactNode } from 'react';
import { Task } from '../types/task';

const addTaskToTasks = (tasks: Task[], taskToAdd: Task) => {
  return [...tasks, taskToAdd];  
};

const removeTaskFromTasks = (tasks: Task[], idToRemove: number) => {
    return tasks.filter( task => task.id !== idToRemove)
};

const updateTaskFromTasks = (tasks: Task[], taskToUpdate: Task) => {
    const filteredTasks = tasks.filter( task => task.id !== taskToUpdate.id);

    return [...filteredTasks, taskToUpdate];
}

const clearAllTasks = (tasks: Task[]) => [];

interface TaskContextInterface {
    isTasksEmpty: boolean;
    taskTotal: number;
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    updateTask: (task: Task) => void;
    clearAll: () => void;
}
export const TaskContext = createContext<TaskContextInterface>({
    isTasksEmpty: true,
    taskTotal: 0,
    tasks: [],
    addTask: (task: Task) => {},
    removeTask: (id: number) => {},
    updateTask: (task: Task) => {},
    clearAll: () => {},
})

type TaskProviderProps = {
    children?: React.ReactNode;
};

export const TaskProvider = ({children} : TaskProviderProps) => {
    const [isTasksEmpty, setTasksEmpty] = useState<boolean>(false);
    const [taskTotal, setTaskTotal] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => { 
        setTasks(addTaskToTasks(tasks, task));
        updateTaskCount();
    }

    const removeTask = (id: number) => { 
        setTasks(removeTaskFromTasks(tasks, id));
        updateTaskCount();
    }

    const updateTask = (task: Task) => {
        setTasks(updateTaskFromTasks(tasks, task))
    }

    const clearAll = () => {
        setTasks(clearAllTasks(tasks));
        updateTaskCount();
    }

    const updateTaskCount = () => {
        setTaskTotal(tasks.length);
        setTasksEmpty(tasks.length === 0)
    }

    const value: TaskContextInterface = {
        isTasksEmpty,
        taskTotal,
        tasks,
        addTask,
        removeTask,
        updateTask,
        clearAll
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>

}