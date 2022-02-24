import React, { useCallback, useReducer, useRef, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface Todo {
  id: number;
  text: string;
}
type Actiontype =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };
function App() {
  function reducer(state: Todo[], action: Actiontype) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }
  {
    /* use Reducer */
  }

  const gettodos = localStorage.getItem("todos");
  console.log(gettodos);
  let todoMain;
  if (gettodos !== null) {
    todoMain = JSON.parse(gettodos);
  }

  const [todos, dispatch] = useReducer(reducer, todoMain);
  const newTodoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(JSON.stringify(todos));
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  console.log(todos);

  return (
    <div className='App'>
      <Navbar></Navbar>
      <div className='input-group mb-3 w-50 container'>
        <input
          ref={newTodoRef}
          type='text'
          className='form-control'
          placeholder='Add new todo'
          aria-label="Recipient's username"
          aria-describedby='button-addon2'
        />
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon2'
          onClick={onAddTodo}
        >
          ADD
        </button>
      </div>
      <div className={`container ${todos[0] ? "d-block" : "d-none"} `}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <h2>Serial</h2>
                </StyledTableCell>
                <StyledTableCell className='fs-3' align='center'>
                  Todo Name
                </StyledTableCell>
                <StyledTableCell className='fs-3' align='right'>
                  Delete
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <StyledTableRow key={todo.id}>
                  <StyledTableCell component='th' scope='row'>
                    <h4>{todo.id + 1}</h4>
                  </StyledTableCell>
                  <StyledTableCell className='fs-2' align='center'>
                    {todo.text}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
                      color='error'
                      variant='outlined'
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/*  {
        todos.map((todo) => (
          <div key={todo.id}>{todo.text}
          <button onClick={()=>dispatch({type: "REMOVE", id: todo.id})}>X</button>
          </div>
        ))
      } */}
    </div>
  );
}

export default App;
