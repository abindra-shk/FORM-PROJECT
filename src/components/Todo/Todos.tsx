import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../../features/todo/todoSlice';

function Todos() {
  const todos = useSelector((state : any) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <div>Todos</div>
      {todos?.map((todo :any) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
        </li>
      ))}
    </>
  );
}

export default Todos;
