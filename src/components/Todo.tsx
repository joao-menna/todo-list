import { Todo } from "../interfaces/todo";
import { motion } from "motion/react";

interface Props {
  todo: Todo;
  onRemoveTodo: (id: number) => void;
  onMarkDone: (id: number) => void;
}

export function SingleTodo({ todo, onRemoveTodo, onMarkDone }: Props) {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1.0, opacity: 1 }}
    >
      <button onClick={() => onRemoveTodo(todo.id)}>Remover</button>
      <input
        type="checkbox"
        onClick={() => onMarkDone(todo.id)}
        defaultChecked={todo.done}
      />
      <h3 className="text-2xl">{todo.name}</h3>
      <span>{todo.description}</span>
    </motion.div>
  );
}
