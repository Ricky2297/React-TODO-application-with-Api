import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
	//for new todo
	const [todo, setTodo] = useState({});
	//for our previous todos
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricky22")
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
		//updates our state with previous todos, and new todo added

		setTodo({ label: "", done: false });

		///Fetch Api
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricky22", {
			method: "PUT", // or 'POST'
			body: JSON.stringify(todos.concat(todo)), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", response))
			.catch(error => console.error("Error:", error));
		setTodos(todos.concat(todo));
	};

	const deleteTodo = indice => {
		var newTodos = todos.filter((task, index) => {
			return index != indice;
		});
		console.log(newTodos);
		setTodos(newTodos);

		///Fetch Api
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricky22", {
			method: "PUT",
			body: JSON.stringify(newTodos), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<br />
				<input
					type="text"
					name="todo"
					onChange={handleChange}
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
