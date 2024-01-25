import React, { useState } from "react";

export const Todolist = () => {

    const [task, setTask] = useState(" ")
    const [user, setUser] = useState("annie")
    const [list, setList] = useState(['Make the bed', 'Wash my hands', 'Eat', 'Walk the dog'])
    const url_base = 'https://playground.4geeks.com/apis/fake/todos'

    const getList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
            method: "GET"
        };

        const response = await fetch(url, options)
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return response.status
        }
        const data = await response.json()
        console.log(data);
        setList(data);
    }

    const createList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data)
    }

    const updateList = async (newTask) => {
        const dataToSend = [...list, newTask]
        const url = url_base + '/user/' + user;
        const options = {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-type": "application/json"
            }
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return response.status
        }
        const data = await response.json();
        console.log(data);
        getList();
    }


    const deleteList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
            method: "DELETE"
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return
        }
        const data = await response.json();
        console.log(data)
        setList([])
    }


    const addTask = (event) => {
        event.preventDefault();
        if (task.trim() === " ") {
            setTask(" ")
            return
        };
        const newTask = { label: task, done: false }
        updateList(newTask)
        setTask("");
        //setList([...list, newTask]);
    }

    const deleteTask = (item) => {
        setList(list.filter((element) => element != item))
    }

    return (
        <div className="container col-xs-10 col-md-6 col-lg-4">
            <h1 className="text-secondary text-center m-5">To Do List</h1>
            <div>
                <form onSubmit={addTask}>
                    <input type="text" className="form-control" placeholder="Add a task" value={task} onChange={(event) => { setTask(event.target.value) }} />
                </form>
            </div>
            <div className="bg-light mt-4">
                <ul className="list-group" >
                    {list.map((item, id) => {
                        return <li key={id} className="hidden-icon list-group-item d-flex justify-content-between">
                            {item.label}
                            <span key={id} onClick={() => { deleteTask(item) }}><i className="fas fa-times text-secondary"></i></span>
                        </li>
                    })
                    }
                    <span className="list-group-item bg-light text-end fw-lighter">
                        {list.length === 0 ? "No tasks lefts" : list.length + " Item left"}
                    </span>
                </ul>
            </div>
            <button onClick={createList} type="button" className="btn btn-primary m-2">Start List</button>
            <button onClick={getList} type="button" className="btn btn-primary m-2">Get List</button>
            <button onClick={deleteList} type="button" className="btn btn-secondary m-2">Delete List</button>
        </div>

    );
};