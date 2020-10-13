import React from "react";
import "../../styles/index.scss";
import TodoList from "./TodoList";

const App = () => {
	return (
		<div className="App">
			<h1> ToDos List </h1>
			<div className="App-content">
				<TodoList />
			</div>
		</div>
	);
};

export default App;
