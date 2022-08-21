import { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskSearchForm from './TaskSearchForm';
import initialTasks from './initialTasks';
import './App.css';
import { TaskContext } from './context/task.context';
import { Task } from './types/task';


function App() {
  const {
    tasks,
    addTask,
    updateTask,
    removeTask,
  } = useContext(TaskContext);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const printTaskList = useCallback(() => {
    console.log("Changed List: ", tasks)
  }, [tasks]);

  useEffect(()=> {
    initialTasks.forEach(task => addTask(task));
  }, [])

  const handleDelete = useCallback((id: number) => {
    removeTask(id)
  }, [removeTask]);

  const handleUpdate = useCallback((updatedTask: Task)=> {
    updateTask(updatedTask);
  }, [updateTask]);

  const handleCreate = useCallback((name: string) => {
    addTask({id: Math.round(10000 * Math.random()), name});
  }, [addTask]);

  const handleSearch = (name: string) => {
    setSearchTerm(name);
  };

  const filteredTaskList = useMemo( () => {
    return tasks.filter((task: Task) => {
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }, [searchTerm, tasks]);

  /*
  () => tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchTerm.toLowerCase());
  }),
  */
  return (
    <div className="App">
      <TaskSearchForm handleSearch={handleSearch}/>
      <TaskForm handleCreate={handleCreate}/>
      <TaskList 
        tasks={filteredTaskList} 
        handleDelete={handleDelete} 
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
