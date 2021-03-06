import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: props.api_url,
            task: "",
            body: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.formSubmit(event.target);
    }


    handleTaskChange(event) {
        this.setState({
            task: event.target.value
        })
    }
    handleBodyChange(event) {
        this.setState({
            body: event.target.value
        })
    }

    async formSubmit(formData) {
        var data = new FormData(formData);
        var response = await fetch(this.state.api_url, {
            method: 'POST',
            mode: 'cors',
            body: data
        }).then(response => response.json()
            .then(response => this.props.updateTodoList(response)));
        this.setState({
            task: "",
            body: ""
        })
    }

    render() {
        return (

            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <form
                        onSubmit={this.handleSubmit}
                        id="todo_form"
                        autoComplete="off">
                        <Grid container justify="space-between">
                            <Grid item xs={12}>
                                <TextField id="task_input"
                                    label="Task Name"
                                    variant="outlined"
                                    type="text"
                                    name="todo[task]"
                                    value={this.state.task}
                                    onChange={this.handleTaskChange}
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextareaAutosize id="body_input"
                                    label="Task Name"
                                    variant="outlined"
                                    type="text"
                                    name="todo[body]"
                                    value={this.state.body}
                                    style={{ width: "99%", borderRadius: "5px" }}
                                    rowsMin={3}
                                    placeholder="Enter more details here..."
                                    onChange={this.handleBodyChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained"
                                    color="primary"
                                    type="submit">
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        );
    }
}

export default TodoForm;