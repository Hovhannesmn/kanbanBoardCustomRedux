import React, { Component } from 'react';

class TaskGenerate extends Component {
    getInProgressTask() {
         let taskList  =  this.props.taskList;

         if (taskList.length < 1) {
             return;
         }

         return  taskList
            .filter((item) => !item.status)
            .map((element, key) => (
                <div key = {key} className="w3-panel w3-lime w3-display-container" >
                    <button id = {element.taskId - 1} className="w3-button w3-lime w3-display-topright" onClick={(key) => this.deletedTask(key)} >
                        <span >x</span>
                    </button>
                    <h6>TaskId: {element.taskId} </h6>
                    <h6>asign to: {element.username} </h6>
                    <h6>Title: {element.title}</h6>
                    <h6>Status: In Progress</h6>
                    <h6>priority: {element.priority}</h6>
                    <h4>{element.description}</h4>
                </div>
            ));
    }

    deletedTask = (e) => {
        this.props.store.dispatch({
            type: "DELETE_TASK",
            id  : e.currentTarget.id
        });
    };

    getDoneTask() {
        let taskList  =  this.props.taskList;
        if (taskList.length < 1) {
            return ;
        }

        return this.props.taskList
            .filter((item) => item.status)
            .map((element, key) => (
                <div key = {key} className="w3-panel w3-teal w3-display-container" >
                    <button id = {element.taskId - 1} className="w3-button w3-lime w3-display-topright" onClick={(key) => this.deletedTask(key)} >
                        <span>x</span>
                    </button>
                    <h6>TaskId: {element.taskId} </h6>
                    <h6>asign to: {element.username} </h6>
                    <h6>Title: {element.title}</h6>
                    <h6>Status: Done</h6>
                    <h6>priority: {element.priority}</h6>
                    <h4>{element.description}</h4>

                </div>
            ));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="App">
                        <div className="App-header">
                            <h2>In Progress</h2>
                        </div>
                        <h4 className="App-intro">
                            {this.getInProgressTask()}
                        </h4>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="App">
                        <div className="App-header">
                            <h2>Done</h2>
                            {this.getDoneTask()}
                        </div>
                        <h4 className="App-intro">
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskGenerate;
