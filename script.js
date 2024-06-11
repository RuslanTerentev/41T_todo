let todoContainer = document.getElementById('list');
let doneContainer = document.getElementById('done_list');
let todoCount = 0;
let doneCount = 0;

function addNote() {
    let noteText = document.querySelector('.validate').value;

    let todo = document.createElement('div');
    todo.classList.add('todo');

    let wrapper = document.createElement('div');
    wrapper.classList.add('todo_wrapper');

    let btnsCont = document.createElement('div');
    btnsCont.classList.add('todo_btns');

    let noteTextCont = document.createElement('p');
    noteTextCont.classList.add('todo_txt');
    noteTextCont.textContent = noteText;

    let check = document.createElement('img');
    check.src = 'Check.png';
    check.classList.add('todo_photo');

    let trash = document.createElement('img');
    trash.src = 'delete.png';
    trash.classList.add('todo_photo');

    btnsCont.appendChild(check);
    btnsCont.appendChild(trash);

    wrapper.appendChild(noteTextCont);
    wrapper.appendChild(btnsCont);

    todo.appendChild(wrapper);

    check.addEventListener('click', function() {
        let doneTaskCont = document.createElement("div");
        doneTaskCont.classList.add('todo');

        let doneTask = document.createElement("div");
        doneTask.classList.add('todo_wrapper_done');

        let doneTaskTxt = document.createElement("s");
        doneTaskTxt.textContent = noteText;
        doneTaskTxt.classList.add('todo_txt_done');

        doneTask.appendChild(doneTaskTxt);

        doneTaskCont.appendChild(doneTask);

        doneContainer.appendChild(doneTaskCont);

        todo.remove();
        todoCount -= 1;
        doneCount += 1;
        updateCounts();
    })

    trash.addEventListener('click', function() {
        todo.remove();
        todoCount -= 1;
        updateCounts();
    })

    todo.appendChild(wrapper);
    todoContainer.appendChild(todo);

    todoCount += 1;
    updateCounts();
}

function updateCounts() {
    document.getElementById('todo').innerText = "Tasks to do - " + todoCount;
    document.getElementById('done').innerText = "Done - " + doneCount;
}
