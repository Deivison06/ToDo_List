import React, { useState } from 'react';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

// Styles
import styles from "./App.module.css"

// Interfaces
import {ITask} from "./Interfaces/task"
import Modal from './Components/Modal';


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => task.id!== id)
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if(display) {
      modal!.classList.remove("hide")
    }else {
      modal!.classList.add("hide")
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number)=> { 
    const updateTask: ITask = {id, title, difficulty}

    const updateItems = taskList.map((task) => {
      return task.id == updateTask.id ? updateTask : task
    })

    setTaskList(updateItems)

    hideOrShowModal(false);

  }

  return (
    <div>
      <Modal 
        children={
          <TaskForm 
            btnText="Editar Tarefa" 
            taskList={taskList} 
            task={taskToUpdate} 
            />
          } 
          />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText="criar tarefa" 
          taskList={taskList}
          setTaskList={setTaskList}
          handleUpdate={updateTask}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList 
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
