import {generateUI, generateTodoUI} from './helpers.mjs';

const getFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks")

    if (tasks === null){
        return []
    }
    return JSON.parse(tasks)
}

const saveInLocalStorage = (task) => {
    const tasksArray = getFromLocalStorage()

    tasksArray.push({name: task, status: "active"})


    localStorage.setItem("tasks", JSON.stringify(tasksArray))
}

export const addTask = (input, list) => {
    // console.log(input.value)

    const taskName = input.value
    input.value = ""
    const todo = generateTodoUI(taskName, "active")
    list.appendChild(todo)
    saveInLocalStorage(taskName)
}

const deleteFromLocalStorage = (taskName) => {
    const tasksArr = getFromLocalStorage()

    const filteredTasks = tasksArr.filter((task) => {
        return task.name !== taskName
    })

    localStorage.setItem("tasks", JSON.stringify(filteredTasks))
}

export const deleteTodo = (todoListItem) => {
    const taskName = todoListItem.querySelector('.todo_lbl').innerText
    deleteFromLocalStorage(taskName)

    todoListItem.remove()
}

const changeStatusInLocalStorage = (taskName, taskStatus) => {
    const tasksArr = getFromLocalStorage()

    const newTaskArrStatus = tasksArr.map((task) => {
        if (task.name === taskName){
            task.status = taskStatus
        }
        return task
    })

    localStorage.setItem("tasks", JSON.stringify(newTaskArrStatus))
}

export const changeStatus = (todoListItem, checkbox) => {
    const taskName = todoListItem.querySelector(".todo_lbl").innerText


    if (checkbox.checked === true){
        todoListItem.classList.add('done')
        changeStatusInLocalStorage(taskName, "done")
    }else{
        todoListItem.classList.remove('done')
        changeStatusInLocalStorage(taskName, "active")
    }

    // console.log(checkbox.checked)
}




const startApp = () => {
    
const dashboard = generateUI()
document.body.appendChild(dashboard)

const tasks = getFromLocalStorage()
const list = dashboard.querySelector(".todo__list")
tasks.forEach((e) => {
    list.appendChild(generateTodoUI(e.name, e.status))
})
}

startApp()

// poprawić css po przeanalizowaniu