import {observer} from "mobx-react";
import {observable, computed} from "mobx";

class ObservablToDoStore {
    @observable todos = [];


    @computed get printToDo() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". `;
    }

    // Get unfinished Todos count
     @computed get toDoCount() {
        return this.todos.length;
    }

    @computed get finishedTodosCount() {
        return this.todos.filter(
            todo => todo.finished === true
        ).length;
    }

    // Add task to store.
    addTodo(taskObj) {
        this.todos.push(taskObj)
    }
}

export default ObservablToDoStore;