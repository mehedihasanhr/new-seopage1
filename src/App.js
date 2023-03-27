import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tasks from "./components/Tasks";
import axios from "./axios";

// context provider

export const ModalContext = React.createContext();
export const TasksContext = React.createContext();

function App() {
  const [modal, setModal] = React.useState(false);
  const [modalId, setModalId] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  // handle modal
  const handleModal = (modal, id) => {
    setModal(modal);
    setModalId(id);
  };

  // fetch tasks
  const fetchTasks = async () => {
    await axios
      .get("/upload-attachment")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchTasks();
    return () => fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks }}>
      <ModalContext.Provider
        value={{ modal, id: modalId, setModal: handleModal }}
      >
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <Tasks />
          </div>
        </DndProvider>
      </ModalContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
