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
    users: [],
    scores: []
}
console.log(state.users)

function pushDataToStorage() {
    console.log(state.users)
    localStorage.setItem('state', JSON.stringify(state));
}


function switchModal(toggle) {
    console.log(state.users)
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
    console.log(state.users)
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
        console.log(state.users)
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

function renderTask(users) {
    console.log(state.users)
    var table = document.querySelector('#table-users tbody');
    table.innerHTML = ''
    for (let i = 0; i < users.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editUser(\'${users[i].id}\')">Change</button>`

        if (users[i].user_name) {
            console.log(users[i].user_name)
            newName.textContent = users[i].user_name;
            newRow.appendChild(newName);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChangeUser);

            table.appendChild(newRow);
        }
    }
}

function init() {
    console.log(state.users)
    var stateFromStorage = localStorage.getItem('state');
    if(stateFromStorage){
        // state = JSON.parse(stateFromStorage);
        console.log(state)
    }
    // getDataToStorage();
    // var tasks = state.tasks
    // var scores = state.scores
    var users = state.users;

    renderTask(users);
}
init();

function setUser(users, user_id, user_name, props) {
    console.log(state.users)
    found_id = -1;
    props = {
        user_id: user_id,
        user_name: user_name
    }

    users.forEach((element, index) => {
        if (element.user_id == id) {
            found_id = index;
            console.log(users);
        }
    });

    if (found_id >=0) {
        console.log(state.users)
        users[found_id] = Object.assign(props);
        console.log(props)
    } else {
        console.log(state.users)
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
    console.log(state.users)
    console.log(state)
    if (inputName.value) {
        console.log(inputName.value);
        console.log(state.users, 'user' + (state.users), inputName.value)
        setUser(state.users, 'user' + (state.users.length), inputName.value);
    }

    // renderTask(state.users)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;