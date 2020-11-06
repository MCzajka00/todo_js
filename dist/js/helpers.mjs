
import {addTask, deleteTodo, changeStatus} from './app.mjs'

export const generateTag = (config) => {
    const nodeTag = document.createElement(config.tagName)

    if (typeof config.tagText !== 'undefined'){
        const textTag = document.createTextNode(config.tagText)
        nodeTag.appendChild(textTag)
    } 

    if (typeof config.className !== 'undefined' && Array.isArray(config.className)){
        config.className.forEach((cl) => {
            nodeTag.classList.add(cl)
        })   
    } else if (typeof config.className !== 'undefined'){
        nodeTag.classList.add(config.className)
    }

    if (typeof config.tagId !== 'undefined'){
        nodeTag.id = config.tagId
    }

    if (typeof config.tagAttrs !== 'undefined'){
        config.tagAttrs.forEach((attr) => {
            nodeTag.setAttribute(attr.name, attr.value)
        })
    }

    if (typeof config.evt !== 'undefined'){
        nodeTag.addEventListener(config.evt.type, config.evt.cb)
    }

    return nodeTag
}

export const generateUI = () => {
    const appTag = generateTag({
        tagName: "section",
        className: "todo",
    })
    
    const titleTag = generateTag({
        tagName: "h1",
        className: "todo__hdl",
        tagText: "todos"
    })

    const todoList = generateTag({
        tagName: "ul",
        className:"todo__list",
        tagId: "todoList"
    })

    const todoInputTag = generateTag({
        tagName: "input",
        className: "todo__ui",
        tagAttrs: [{
            name: "type",
            value: "text"
        },
    {
        name: "placeholder",
        value: "What needs to be done?",
    }],
        evt: {
            type: "keyup",
            cb: (event) => {
                if (event.key === 'Enter'){
                addTask(todoInputTag, todoList)
            }
        }
        }
    })   
    
    appTag.appendChild(titleTag)
    appTag.appendChild(todoInputTag)
    appTag.appendChild(todoList)

    return appTag
}

export const generateTodoUI = (todoName,isDone) => {
    const todoListItem = generateTag({
        tagName: "li",
        className: ["list__item", isDone]
    })

    const isChecked = {
        name: "checked",
        value: true 
    }

    const checkboxAttrs = [
        {
            name: "type",
            value: "checkbox"
        }]

        if (isDone === "done") {
            checkboxAttrs.push(isChecked)
        }


    const checkboxTag = generateTag({
            tagName: "input",
            className: "todo__checkbox",
            tagAttrs: checkboxAttrs,
        evt: {
            type: "click",
            cb: (event) => {
                changeStatus(todoListItem, checkboxTag)
            }
        }
})

    const todoLabelTag = generateTag({
        tagName: "label",
        className: "todo_lbl",
        tagText: todoName
    })

    const todoButtonTag = generateTag({
        tagName: "button",
        className: "todo__btn",
        tagText: "x",
        evt: {
            type: "click",
            cb: (event) => {
                deleteTodo(todoListItem)
            }
        }
    })

    todoListItem.appendChild(checkboxTag)
    todoListItem.appendChild(todoLabelTag)
    todoListItem.appendChild(todoButtonTag)

    return todoListItem
}