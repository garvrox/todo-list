import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function TodoForm(props) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      text: input,
    });
    setInput("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch", minHeight: "55px" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="todo-basic"
        label="Todo"
        variant="filled"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
        inputProps={{ "data-testid": "input-todo" }}
      />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        style={{ marginTop: "10px" }}
        data-testid="action-add-todo"
      >
        Add Todo
      </Button>
    </Box>
  );
}

export default TodoForm;
