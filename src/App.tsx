import { AnimatePresence } from "motion/react";
import { SingleTodo } from "./components/Todo";
import { useRef, useState } from "react";
import { Todo } from "./interfaces/todo";

const TODOS = "todos";
const ARRAY = "[]";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem(TODOS) ?? ARRAY)
  );
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (!nameRef.current || !descriptionRef.current) {
      return;
    }

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    let id: number = 0;
    const lastTodo = todos.slice(-1);

    if (!lastTodo.length) {
      id = 1;
    } else {
      id = lastTodo[0].id;
    }

    const todo: Todo = {
      id,
      name,
      done: false,
      description,
    };

    setTodos((state) => [...state, todo]);
    localStorage.setItem(TODOS, JSON.stringify([...todos, todo]));

    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const handleMarkDone = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }

    todo.done = !todo.done;

    const newTodos = todos.filter((todo) => todo.id !== id);
    newTodos.push(todo);
    newTodos.sort((a, b) => a.id - b.id);

    setTodos(newTodos);

    localStorage.setItem(TODOS, JSON.stringify(newTodos));
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((state) => state.filter((todo) => todo.id !== id));
    localStorage.setItem(
      TODOS,
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    <div className="flex flex-col gap-2 h-full items-center">
      <div className="bg-slate-700 flex gap-2 container rounded-lg p-2">
        <input
          className="bg-slate-600 outline-0 rounded-lg p-1"
          type="text"
          ref={nameRef}
        />
        <textarea
          className="bg-slate-600 outline-0 rounded-lg p-1 h-full"
          ref={descriptionRef}
        ></textarea>
        <button
          className="bg-slate-600 hover:bg-slate-500 duration-100 rounded-lg p-2"
          onClick={handleAddTodo}
        >
          Adicionar
        </button>
      </div>
      <div className="container">
        <AnimatePresence>
          {todos.map((todo) => (
            <SingleTodo
              onRemoveTodo={handleRemoveTodo}
              onMarkDone={handleMarkDone}
              todo={todo}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
