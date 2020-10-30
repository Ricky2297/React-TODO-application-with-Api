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
				label: todo.label
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
	// const handleClick = e => {
	// 	//updates our state with previous todos, and new todo added

	// 	setTodo({ label: "", done: false });

	// 	///Fetch Api
	// 	fetch(url, {
	// 		method: "POST", // or 'POST'
	// 		body: JSON.stringify(todos.concat(todo)), // data can be `string` or {object}!
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	})
	// 		.then(res => res.json())
	//         .then(response => {
	//             fetch(url)
	//             .then()
	//         })
	// 		.catch(error => console.error("Error:", error));
	// };

	const deleteTodo = indice => {
		var newTodos = todos.filter((task, index) => {
			return index != indice;
		});
		console.log(newTodos);
		setTodos(newTodos);

		///Fetch Api
		fetch(url, {
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
