import React, {useCallback, useReducer, useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Lists from './components/Lists';

interface Todo {
  id: number,
  text: string,
}
type Actiontype = { type: "ADD"; text: string } | { type: "REMOVE";  id: number}
function App() {

  function reducer(state: Todo[], action: Actiontype) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text
          }

        ]
      case "REMOVE":
        return state.filter(({id})=> id !== action.id)
    }


  }
  {/* use Reducer */ }

  const gettodos = localStorage.getItem('todos');
  console.log(gettodos);
  let todoMain;
  if (gettodos !== null) {
    todoMain = JSON.parse(gettodos)

  }


  const [todos, dispatch] = useReducer(reducer, todoMain);
  const newTodoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
  console.log(JSON.stringify(todos));
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos])


  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
      type: "ADD",
      text: newTodoRef.current.value
      })
      newTodoRef.current.value = "";
    }

  }, [])

  console.log(todos);


  return (
    <div className="App">
      {/* <Lists /> */}
      <input type="text" ref={newTodoRef} />
      <button onClick={onAddTodo}>Add</button>
      {
        todos.map((todo) => (
          <div key={todo.id}>{todo.text}
          <button onClick={()=>dispatch({type: "REMOVE", id: todo.id})}>X</button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
