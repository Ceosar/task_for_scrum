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

var stateUsers = {
    users: []
}
console.log(stateUsers.users)

function pushDataToStorage() {
    console.log(stateUsers.users)
    localStorage.setItem('stateUsers', JSON.stringify(stateUsers));
}


function switchModal(toggle) {
    console.log(stateUsers.users)
    if (toggle) {
        inputName.value = '';
        // document.getElementById('table-task').style.display = "none";
        document.getElementById('btnSaveUser').style.display = "block";
        document.getElementById('btnAddUser').style.display = "none";
        document.getElementsByClassName('input_data__user')[0].style.display = "block";
        // getDataToStorage();
    } else {
        document.getElementById('table-users').style.display = "block";
        document.getElementById('btnSaveUser').style.display = "none";
        document.getElementById('btnAddUser').style.display = "block";
        document.getElementsByClassName('input_data__user')[0].style.display = "none";
        // pushDataToStorage();
        // test()
    }
}
btnAdd.onclick = switchModal;

function changeSwitchModal(id, toggle) {
    console.log(stateUsers.users)
    if (toggle) {
        // state.scores.forEach((element) => {
        //     if (element.task_id == id) {
        //         var selectOption = Array.from(selectInput.options).find((opt) => opt.value == element.value);
        //         if (selectOption) {
        //             selectOption.selected = true;
        //         }
        //     }
        // });
        document.getElementById('input_id__span__user').innerHTML = id;
        document.getElementById('input_id__span__user').style.display = "none";
        document.getElementById('btnChangeUser').style.display = "block";
        document.getElementById('btnAddUser').style.display = "none";
        document.getElementById('btnDelUser').style.display = "block";
        document.getElementsByClassName('input_data__user')[0].style.display = "block";
        // document.getElementById('table-task').style.display = "none";
        // getDataToStorage();
    }
    else {
        console.log(stateUsers.users)
        document.getElementById('input_id__span__user').innerHTML = '';
        document.getElementById('table-users').style.display = "block";
        document.getElementById('btnChangeUser').style.display = "none";
        document.getElementById('btnSaveUser').style.display = "none";
        document.getElementById('btnAddUser').style.display = "block";
        document.getElementById('btnDelUser').style.display = "none";
        document.getElementsByClassName('input_data__user')[0].style.display = "none";
        // pushDataToStorage();
        // test()
    }
}

var btnChangeUser = document.createElement('button');

function renderTask(users) {
    console.log(stateUsers.users)
    var table = document.querySelector('#table-users tbody');
    table.innerHTML = ''
    for (let i = 0; i < users.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editUser(\'${users[i].user_id}\')">Change</button>`

        console.log(users[i].user_name)
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
    console.log(stateUsers.users)
    var stateFromStorage = localStorage.getItem('stateUsers');
    if(stateFromStorage){
        stateUsers = JSON.parse(stateFromStorage);
        console.log(stateUsers)
    }
    // getDataToStorage();
    // var tasks = state.tasks
    // var scores = state.scores
    var users = stateUsers.users;

    renderTask(users);
}
init();

function setUser(users, user_id, user_name, props) {
    console.log(stateUsers.users)
    found_id = -1;
    props = {
        user_id: user_id,
        user_name: user_name
    }

    users.forEach((element, index) => {
        if (element.user_id == user_id) {
            found_id = index;
            console.log(users);
        }
    });

    if (found_id >=0) {
        console.log(stateUsers.users)
        users[found_id] = Object.assign(props);
        console.log(props)
    } else {
        console.log(stateUsers.users)
        users.push(Object.assign(props));
        pushDataToStorage();
        console.log(props)
    }
}

// function setTask(tasks, name, id, props) {
//     var found_id = -1;
//     props = {
//         id: id,
//         name: name
//     }

//     tasks.forEach((element, index) => {
//         if (element.id == id) {
//             found_id = index;
//         }
//     });

//     if (found_id >= 0) {
//         tasks[found_id] = Object.assign(props);
//     } else {
//         tasks.push(Object.assign(props));
//         // pushDataToStorage();
//     }
// }

var inputName = document.getElementsByClassName("input_data__input__user")[0];
function addTask() {
    console.log(stateUsers.users)
    console.log(stateUsers)
    if (inputName.value) {
        console.log(inputName.value);
        console.log(stateUsers.users, 'user' + (stateUsers.users.length), inputName.value)
        setUser(stateUsers.users, 'user' + (stateUsers.users.length), inputName.value);
    }

    renderTask(stateUsers.users)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;

function editUser(id) {
    stateUsers.users.forEach((element) => {
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
        setUser(stateUsers.users, id_user, inputName.value);
        renderTask(stateUsers.users);
        pushDataToStorage();

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
    setUser(stateUsers.users, id_user, inputName.value);
    renderTask(stateUsers.users)
    pushDataToStorage();

    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;