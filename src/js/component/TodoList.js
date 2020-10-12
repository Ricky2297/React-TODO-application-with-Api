import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
	//for new todo
	const [todo, setTodo] = useState({});
	//for our previous todos
	const [todos, setTodos] = useState([
		// { todo: "todo 1" },
	]);

	//captures change event from our input, and updates our state for single todo
	const handleChange = e => setTodo({ [e.target.name]: e.target.value });

	//checks for empty todo
	const handleClick = e => {
		if (Object.keys(todo).length === 0 || todo.todo.trim() === "") {
			alert("empty list");
			return;
		}
		//updates our state with previous todos, and new todo added
		setTodos([...todos, todo]);
	};

	const deleteTodo = indice => {
		const newTodos = [...todos];
		//splicing
		newTodos.splice(indice, 1);
		//returns array with deleted todo
		setTodos(newTodos);
	};

	//name on input line 37 same as key for our objects
	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<br />
				<input type="text" name="todo" onChange={handleChange} />
				<button onClick={handleClick}>save</button>
			</form>

			{todos.map((value, index) => (
				<Todo
					todo={value.todo}
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
