import React, { Component } from 'react';
import users from '../dataSource/Users';

class UserStatistics extends Component {
    getUsersList() {
        let usersList = JSON.parse(JSON.stringify(users));

        this.props.taskList.forEach(function(item) {
            if(item.status === 1) {
                usersList[item.userId].done = usersList[item.userId].done + 1;
            }
        });

        return usersList.map((element, key) => (
            <h4 key={key}>  {element.id}  {element.username} done : {element.done} </h4>
        ));
    }

    render(){
        return (
            <div>
                {this.getUsersList()}
            </div>
        )
    }

}

export default UserStatistics;