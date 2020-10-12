import React from "react";
import "../../styles/index.scss";
import TodoList from "./TodoList";

const App = () => {
	return (
		<div className="App">
			<h1> todos </h1>
			<div className="App-content">
				<TodoList />
			</div>
		</div>
	);
};

export default App;
