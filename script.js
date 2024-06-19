class Task {
    constructor(text, taskManager) {
        this.text = text;
        this.taskManager = taskManager;
        this.element = this.createTaskElement();
    }

    createTaskElement() {
        let todo = document.createElement('div');
        todo.classList.add('todo');

        let wrapper = document.createElement('div');
        wrapper.classList.add('todo_wrapper');

        let btnsCont = document.createElement('div');
        btnsCont.classList.add('todo_btns');

        let noteTextCont = document.createElement('p');
        noteTextCont.classList.add('todo_txt');
        noteTextCont.textContent = this.text;

        let check = document.createElement('img');
        check.src = 'Check.png';
        check.classList.add('todo_photo');

        let trash = document.createElement('img');
        trash.src = 'delete.png';
        trash.classList.add('todo_photo');

        check.addEventListener('click', () => this.markAsDone());
        trash.addEventListener('click', () => this.remove());

        btnsCont.appendChild(check);
        btnsCont.appendChild(trash);

        wrapper.appendChild(noteTextCont);
        wrapper.appendChild(btnsCont);

        todo.appendChild(wrapper);

        return todo;
    }

    markAsDone() {
        let doneTaskCont = document.createElement("div");
        doneTaskCont.classList.add('todo');

        let doneTask = document.createElement("div");
        doneTask.classList.add('todo_wrapper_done');

        let doneTaskTxt = document.createElement("s");
        doneTaskTxt.textContent = this.text;
        doneTaskTxt.classList.add('todo_txt_done');

        doneTask.appendChild(doneTaskTxt);
        doneTaskCont.appendChild(doneTask);
        this.taskManager.doneContainer.appendChild(doneTaskCont);

        this.element.remove();
        this.taskManager.updateCounts(-1, 1);
        this.taskManager.saveTasks();
    }

    remove() {
        this.element.remove();
        this.taskManager.updateCounts(-1, 0);
        this.taskManager.saveTasks();
    }
}


class TaskManager {
    constructor() {
        this.todoContainer = document.getElementById('list');
        this.doneContainer = document.getElementById('done_list');
        this.todoCount = 0;
        this.doneCount = 0;
        
        this.loadTasks();
    }

    addNote() {
        let noteText = document.querySelector('.validate').value;
        if (noteText) {
            let task = new Task(noteText, this);
            this.todoContainer.appendChild(task.element);
            this.updateCounts(1, 0);
            this.saveTasks();
            document.querySelector('.validate').value = '';
        }
    }

    updateCounts(todoDelta, doneDelta) {
        this.todoCount += todoDelta;
        this.doneCount += doneDelta;
        document.getElementById('todo').innerText = "Tasks to do - " + this.todoCount;
        document.getElementById('done').innerText = "Done - " + this.doneCount;
        this.saveTasks();
    }

    saveTasks() {
        const todos = [];
        const dones = [];

        this.todoContainer.querySelectorAll('.todo_wrapper .todo_txt').forEach(task => {
            todos.push(task.textContent);
        });

        this.doneContainer.querySelectorAll('.todo_wrapper_done .todo_txt_done').forEach(task => {
            dones.push(task.textContent);
        });

        const tasks = {
            todos: todos,
            dones: dones
        };

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.todos.forEach(taskText => {
                let task = new Task(taskText, this);
                this.todoContainer.appendChild(task.element);
                this.todoCount++;
            });

            savedTasks.dones.forEach(taskText => {
                let doneTaskCont = document.createElement("div");
                doneTaskCont.classList.add('todo');

                let doneTask = document.createElement("div");
                doneTask.classList.add('todo_wrapper_done');

                let doneTaskTxt = document.createElement("s");
                doneTaskTxt.textContent = taskText;
                doneTaskTxt.classList.add('todo_txt_done');

                doneTask.appendChild(doneTaskTxt);
                doneTaskCont.appendChild(doneTask);
                this.doneContainer.appendChild(doneTaskCont);
                this.doneCount++;
            });

            document.getElementById('todo').innerText = "Tasks to do - " + this.todoCount;
            document.getElementById('done').innerText = "Done - " + this.doneCount;
        }
    }
}


const taskManager = new TaskManager();
