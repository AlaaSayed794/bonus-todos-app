import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        title: ""
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.length) {
            this.props.addTodo(this.state.title)

        }
        else {
            alert("empty todo")
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state)

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="title" onChange={this.onChange} value={this.state.title} />
                <input type="submit" value="addTodo" />
            </form>
        )
    }
}
