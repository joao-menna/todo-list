import { Todo } from "../interfaces/todo";
import { motion } from "motion/react";

interface Props {
  todo: Todo;
  onRemoveTodo: (id: number) => void;
  onMarkDone: (id: number) => void;
}

export function SingleTodo({ todo, onRemoveTodo, onMarkDone }: Props) {
  return (
    // Elemento da lib de animação
    <motion.div
      className="flex items-center gap-2 text-black bg-slate-300 rounded-lg p-2"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1.0, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
    >
      <button
        className="bg-slate-600 hover:bg-slate-500 text-white p-1 duration-100 rounded-lg"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remover
      </button>
      <label htmlFor={`done-${todo.id}`}>
        <input
          id={`done-${todo.id}`}
          type="checkbox"
          onClick={() => onMarkDone(todo.id)}
          defaultChecked={todo.done}
        />
      </label>
      <h3 className="text-2xl break-all w-full">{todo.name}</h3>
      <p className="break-all w-full">{todo.description}</p>
    </motion.div>
  );
}
