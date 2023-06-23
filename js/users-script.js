document.getElementsByClassName('input_data__user')[0].style.display = "none";
document.getElementById('btnSaveUser').style.display = "none";
document.getElementById('btnChangeUser').style.display = "none";
document.getElementById('btnDelUser').style.display = 'none';

var btnSave = document.getElementById('btnSaveUser');
var buttonChange = document.getElementById('btnChangeUser');
var btnAdd = document.getElementById('btnAddUser');
var btnDel = document.getElementById('btnDelUser');

var inputName = document.getElementsByClassName('input_data__input__user');
document.getElementById('btnAddUser').style.display = "block";

var state = {
    tasks: [],
    scores: [],
    users: []
}

function pushDataToStorage() {
    localStorage.setItem('state', JSON.stringify(state));
}


function switchModal(toggle) {
    if (toggle) {
        inputName.value = '';
        document.getElementById('btnSaveUser').style.display = "block";
        document.getElementById('btnAddUser').style.display = "none";
        document.getElementsByClassName('input_data__user')[0].style.display = "block";
        document.getElementById('table-users').style.display = "none";
    } else {
        document.getElementById('table-users').style.display = "block";
        document.getElementById('btnSaveUser').style.display = "none";
        document.getElementById('btnAddUser').style.display = "block";
        document.getElementsByClassName('input_data__user')[0].style.display = "none";
    }
}
btnAdd.onclick = switchModal;

function changeSwitchModal(id, toggle) {
    if (toggle) {
        document.getElementById('input_id__span__user').innerHTML = id;
        document.getElementById('input_id__span__user').style.display = "none";
        document.getElementById('btnChangeUser').style.display = "block";
        document.getElementById('btnAddUser').style.display = "none";
        document.getElementById('btnDelUser').style.display = "block";
        document.getElementsByClassName('input_data__user')[0].style.display = "block";
        document.getElementById('table-users').style.display = "none";
    }
    else {
        document.getElementById('input_id__span__user').innerHTML = '';
        document.getElementById('table-users').style.display = "block";
        document.getElementById('btnChangeUser').style.display = "none";
        document.getElementById('btnSaveUser').style.display = "none";
        document.getElementById('btnAddUser').style.display = "block";
        document.getElementById('btnDelUser').style.display = "none";
        document.getElementsByClassName('input_data__user')[0].style.display = "none";
    }
}

var btnChangeUser = document.createElement('button');

function renderTask(users) {
    var table = document.querySelector('#table-users tbody');
    table.innerHTML = ''
    for (let i = 0; i < users.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editUser(\'${users[i].user_id}\')">Change</button>`

        if (users[i].user_name) {
            newName.textContent = users[i].user_name;
            newRow.appendChild(newName);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChangeUser);

            table.appendChild(newRow);
        }
    }
}

function init() {
    var stateFromStorage = localStorage.getItem('state');
    if (stateFromStorage) {
        state = Object.assign(state, JSON.parse(stateFromStorage));
    }
    var users = state.users;

    renderTask(users);
}
init();

function setUser(users, user_id, user_name, props) {
    found_id = -1;
    props = {
        user_id: user_id,
        user_name: user_name
    }

    users.forEach((element, index) => {
        if (element.user_id == user_id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        users[found_id] = Object.assign(props);
    } else {
        users.push(Object.assign(props));
    }
    pushDataToStorage();
}

function setScore(scores, task_id, user_id, value, props) {
    console.log(task_id)
    console.log(user_id)
    var found_id = -1;
    props = {
        task_id: task_id,
        value: value,
        user_id: user_id
    }

    scores.forEach((element, index) => {
        if (element.user_id == user_id && element.task_id == task_id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        scores[found_id] = Object.assign(props);
        console.log('no pushing')
        pushDataToStorage();
    }
    else {
        scores.push(Object.assign(props));
        pushDataToStorage();
        console.log('pushing')
    }
}

var inputName = document.getElementsByClassName("input_data__input__user")[0];
function addTask() {
    if (inputName.value) {
        setUser(state.users, 'user' + (state.users.length), inputName.value);
        for (i = 0; i < state.tasks.length; i++) {
            setScore(state.scores, 'task' + i, 'user' + ((state.users.length) - 1));
        }
    }

    renderTask(state.users)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;

function editUser(id) {
    state.users.forEach((element) => {
        if (element.user_id == id) {
            inputName.value = element.user_name;
        }
    });
    changeSwitchModal(id, true);
}

function changeTaskInTable() {
    if (inputName.value) {
        document.getElementById('table-users').style.display = "block";
        var id_user = document.getElementById('input_id__span__user').innerHTML;
        setUser(state.users, id_user, inputName.value);
        renderTask(state.users);
        changeSwitchModal(null, false);
    }
    else {
        alert("Введите имя пользователя!");
    }
}
buttonChange.onclick = changeTaskInTable;

function deleteTask() {
    inputName.value = "";
    document.getElementById('table-users').style.display = "block";
    var id_user = document.getElementById('input_id__span__user').innerHTML;
    console.log(id_user)
    setUser(state.users, id_user, inputName.value);
    renderTask(state.users)

    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;