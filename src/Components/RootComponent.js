import React, { Component } from 'react';
import TaskGenerate from './TaskGenerate';
import UserStatistics from './UserStatistics';

export default class RootComponent extends Component {
    componentDidMount() {
        this.unSubscribe = this.props.store.subscribe( () => {
            this.updateComponent();
        })
    }

    updateComponent() {
        this.forceUpdate();
    }

    render() {
        let taskList = this.props.store.getState().generateNewTask.taskList;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <TaskGenerate
                            taskList={taskList}
                            store = {this.props.store}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>Users Statistics</h2>
                        <UserStatistics
                            taskList = {taskList} />
                    </div>
                </div>
            </div>
        );
    }
}
