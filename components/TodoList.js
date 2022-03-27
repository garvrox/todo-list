import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, markComplete, extractTodos } from "../slices/todoSlice";
import TodoForm from "./TodoForm";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Done from "@mui/icons-material/Done";

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

const TodoList = ({ inputTodos = [] }) => {
  const todos = useSelector((state) => state.todo.value);
  const dispatch = useDispatch();
  useEffect(() => {
    /* istanbul ignore next */
    if (inputTodos.length > 0) {
      /* istanbul ignore next */
      dispatch(setDefaultState(inputTodos));
    }
    if (inputTodos.length === 0 && todos.length === 0) {
      /* istanbul ignore next */
      dispatch(extractTodos());
    }
  });

  return (
    <>
      <TodoForm onSubmit={(todo) => dispatch(addTodo(todo))} />
      {todos.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">#</StyledTableCell>
                <StyledTableCell>Todo</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map(({ text, isComplete = false, _id }, index) => (
                <StyledTableRow key={index} data-testid={`todo-item-${_id}`}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {text}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    data-testid={`todo-status-${_id}`}
                  >
                    {isComplete ? "Not Pending" : "Pending"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isComplete ? (
                      <label color="blue">Completed</label>
                    ) : (
                      <Button
                        variant="outlined"
                        endIcon={<Done />}
                        onClick={() => dispatch(markComplete(_id))}
                        data-testid={`action-mark-complete-${_id}`}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TodoList;
