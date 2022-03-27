const API_URLS = {
  GET: "/api/todo",
  POST: "/api/todo",
  PUT: "/api/todo",
};

export async function fetchTodo() {
  const response = await fetch(API_URLS.GET);
  const todos = await response.json();
  return todos;
}

export async function insertTodo(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(API_URLS.POST, requestOptions);
  const todo = await response.json();
  return todo;
}

export async function updateTodo(id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${API_URLS.PUT}?id=${id}`, requestOptions);
  const todo = await response.json();
  return todo;
}
