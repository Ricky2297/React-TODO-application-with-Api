import React from "react";
import PropTypes from "prop-types";
//props that we are passing in
// need to pass in index to know which todo to delete
const Todo = ({ todo, index, deleteTodo }) => {
	//return h3 first
	return (
		<>
			<div className="todo">
				<h5>{todo}</h5>
				<button
					className="btn-delete"
					onClick={() => deleteTodo(index)}>
					x
				</button>
			</div>
			<div className="line" />
		</>
	);
};

//prop type validation
Todo.propTypes = {
	todo: PropTypes.string,
	index: PropTypes.number,
	deleteTodo: PropTypes.func
};

export default Todo;
