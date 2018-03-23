import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import RootComponent from './Components/RootComponent';
import user from './dataSource/Users'
import task from './dataSource/Task';


import registerServiceWorker from './registerServiceWorker';

const createStore = (...reducers) => {

    let store = {},
        listeners = [];

    const getState = () => {
        return store;
    };

    const dispatch = (action) => {
        reducers.forEach( (reducer) => {
            store[reducer.name] = reducer(store[reducer.name], action);
        });
        
        listeners.forEach((listeners) => listeners(store));
    };

    const subscribe = (callback) => {
        listeners.push(callback);
        return () => listeners.filter( (listener) => listener !== callback);
    };

    dispatch({});

    return {
        getState,
        dispatch,
        subscribe
    }
};

let increment = 1;
function getTaskId() {
    return increment++;
}

function getRandomNamber(namber = 4) {
    return Math.floor(Math.random() * (namber));
}

function generateNewTask(state = {taskList: []}, action) {
    switch (action.type) {
        case "ADD_TASK" :
            let newTask = Object.assign({}, task[getRandomNamber()]);
            newTask.taskId = getTaskId();
            newTask.userId = getRandomNamber();
            newTask.username = user[newTask.userId].username;
            return Object.assign({}, state, {taskList: [...state.taskList, newTask]});
        case "CHANGE_STATUS" :
            const taskList = state.taskList;
            if (taskList.length === 0) {
                return state
            }
            let key = getRandomNamber(taskList.length-1);

            taskList[key].status = 1;
            return Object.assign({}, state, {taskList: state.taskList});
        case "DELETE_TASK" :
            let newTasks = new Set( state.taskList);
            newTasks.delete(state.taskList[action.id]);
            return {taskList : [...newTasks]};
        default :
            return state;

    }
}


setInterval(() => {
       store.dispatch({
        type: "ADD_TASK"
    });

}, 2000);

setInterval(() => {
    store.dispatch({
        type: "CHANGE_STATUS"
    });
}, 3000);

let store = createStore(generateNewTask);

ReactDOM.render(
    <RootComponent store={store}/>, document.getElementById('root')
);

registerServiceWorker();