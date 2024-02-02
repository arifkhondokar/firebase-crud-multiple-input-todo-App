import { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const database = getDatabase();

  const initialTodoState = {
    id: null,
    title: '',
    description: '',
    priority: '',
  };

  const [todo, setTodo] = useState(initialTodoState);
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

//  write operation--------------------------
  const addTodo = () => {
    if (!todo.title || !todo.description || !todo.priority) {
      toast.error('Please fill in all fields!');
      return;
    }
    set(push(ref(database, 'todos')), {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    }).then(() => {
      setTodo(initialTodoState);
      toast.success('Todo added successfully!');
    });
  };

  // read operation------------------------------------
  useEffect(() => {
    const todoRef = ref(database, 'todos');
    onValue(todoRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
          arr.push({...item.val(), id:item.key})
      })
        setTodos(arr);
    });
  }, []);


// update operation--------------------------
  const updateTodo = () => {
    if (!todo.id || !todo.title || !todo.description || !todo.priority) {
      toast.error('Invalid todo data!');
      return;
    }

    update(ref(database, `todos/${todo.id}`), {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    }).then(() => {
      setTodo(initialTodoState);
      toast.success('Todo updated successfully!');
    });
  };

// edit operation--------------------
  const editTodo = (selectedTodo) => {
    setTodo(selectedTodo);
  };

// delete operation--------------------
  const deleteTodo = (id) => {
    remove(ref(database, `todos/${id}`)).then(() => {
      toast.success('Todo deleted successfully!');
    });
  };
// alldelete operation-------------------------
  const deleteAllTodos = () => {
    remove(ref(database, 'todos')).then(() => {
      toast.success('All todos deleted successfully!');
    });
  };

  return (
    <>
    <section className='mainSection' >
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className='mainWrapper container'>
        <h2 className='heading'>NOTE</h2>
        <div className='inputText'>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={todo.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={todo.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="priority"
            placeholder="Priority"
            value={todo.priority}
            onChange={handleChange}
          />
        </div>
        <div>
          {
          todo.id 
          ? 
          <button onClick={updateTodo}>Update</button>
          : 
          <button onClick={addTodo}>Add</button>
          }
        </div>
        


        <div className="display">
          <ul>
            {todos.map((item) => (
              <li key={item.id}>
                <span>Title:</span> {item.title}, 
                <span>Description:</span> {item.description}, 
                <span>Priority:</span> {item.priority} <br />
                <button onClick={() => editTodo(item)}>Edit</button>
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={deleteAllTodos}>Delete All</button>
        </div>
      </div>
    </section>
    </>
  );
}

export default App;
