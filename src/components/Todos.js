import React from 'react'

export default function Todos(props) {
    return (
        <div>
            <h3>Todos</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            completed
                        </th>
                        <th>
                            title
                        </th>
                        <th>
                            -
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.todos.map(todo =>
                        <tr key={todo.id}>
                            <td><input type="checkbox" checked={todo.completed} onChange={() => props.editTodo(todo.id, todo.completed)} /></td>
                            <td>{todo.title}</td>
                            <td><button onClick={() => props.delTodo(todo.id)}>Delete todo</button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
