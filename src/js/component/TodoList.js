import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
	//for new todo
	const [todo, setTodo] = useState({
		label: "",
		done: false
	});
	//for our previous todos
	const [todos, setTodos] = useState([]);
	const url =
		"https://3000-bf94dc48-8c50-4a33-b826-6137c644e881.ws-us02.gitpod.io/todo/ricky";

	useEffect(() => {
		fetch(url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}

				return response.json();
			})
			.then(function(responseAsJson) {
				setTodos(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleChange = e => setTodo({ label: e.target.value, done: false });

	//checks for empty todo

	const handleClick = e => {
		fetch(url, {
			method: "POST", // or 'POST'
			body: JSON.stringify({
				label: todo.label,
				done: false
			}), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				console.log("Success:", response);
				fetch(url)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setTodos(responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(error => console.error("Error:", error));
		// setTodos(todos.concat(singleTodo));
		setTodo({ label: "", done: false });
	};

	const deleteTodo = id => {
		fetch(url + "/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(response => setTodos(response))
			.catch(error => console.error("Error:", error));
	};

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<br />
				<input
					type="text"
					name="todo"
					onChange={e => setTodo({ ...todo, label: e.target.value })}
					value={todo.label}
				/>
				<button onClick={handleClick}>save</button>
			</form>

			{todos.map((task, index) => (
				<Todo
					todo={task}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}

			<div className="items-left">{todos.length} item left</div>
		</>
	);
};

export default TodoList;
