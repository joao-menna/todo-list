import { AnimatePresence } from "motion/react";
import { SingleTodo } from "./components/Todo";
import { useRef, useState } from "react";
import { Todo } from "./interfaces/todo";

const TODOS = "todos";
const ARRAY = "[]";

function App() {
  // useState é igual uma constante que só pode ser alterada pela função de set
  const [todos, setTodos] = useState<Todo[]>(() =>
    // Carrega os TODOS do localStorage como valor default do state
    JSON.parse(localStorage.getItem(TODOS) ?? ARRAY)
  );
  // Referências aos elementos respectivos (input de descrição e input de nome)
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Função de adicionar Todo
  const handleAddTodo = () => {
    if (!nameRef.current || !descriptionRef.current) {
      return;
    }

    // Pegar o valor dos campos
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    // Pegar um ID pro novo Todo
    let id: number = 0;
    const lastTodo = todos.slice(-1);

    if (!lastTodo.length) {
      id = 1;
    } else {
      id = lastTodo[0].id + 1;
    }

    // Criando o novo Todo
    const todo: Todo = {
      id,
      name,
      done: false,
      description,
    };

    // Colocando o novo Todo na variável de TODOS e no localStorage (para salvar no navegador)
    setTodos((state) => [...state, todo]);
    localStorage.setItem(TODOS, JSON.stringify([...todos, todo]));

    // Zerando os valores dos campos em tela
    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };

  // Marca o Todo como feito ou não feito
  const handleMarkDone = (id: number) => {
    // Procurando o ID nos TODOS
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return;
    }

    // Invertendo o "feito"
    todo.done = !todo.done;

    // Tira o ID do novo array
    const newTodos = todos.filter((todo) => todo.id !== id);
    // Adiciona o novo Todo
    newTodos.push(todo);
    // Ordena por ID
    newTodos.sort((a, b) => a.id - b.id);

    // Coloca ele na constante e no localStorage
    setTodos(newTodos);

    localStorage.setItem(TODOS, JSON.stringify(newTodos));
  };

  // Remove o Todo
  const handleRemoveTodo = (id: number) => {
    // Filtra os TODOS pelo ID recebido, removendo o escolhido
    setTodos((state) => state.filter((todo) => todo.id !== id));
    localStorage.setItem(
      TODOS,
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    // Essas classes gigantes são a estilização do TailwindCSS
    <div className="flex flex-col gap-2 h-full items-center text-slate-50">
      <div className="bg-slate-700 flex gap-2 container rounded-lg p-2">
        <input
          className="bg-slate-600 outline-0 rounded-lg p-1 h-6"
          type="text"
          ref={nameRef}
          maxLength={128}
        />
        <textarea
          className="bg-slate-600 outline-0 rounded-lg p-1 h-full"
          maxLength={512}
          ref={descriptionRef}
        ></textarea>
        <button
          className="bg-slate-600 hover:bg-slate-500 duration-100 rounded-lg p-2"
          onClick={handleAddTodo}
        >
          Adicionar
        </button>
      </div>
      <div className="container flex flex-col gap-2">
        {/* Elemento para adicionar animação aos componentes */}
        <AnimatePresence>
          {todos.map((todo) => (
            <SingleTodo
              key={todo.id}
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
