document.getElementsByClassName('input_data')[0].style.display = "none";
// document.getElementById('table-task').style.display = "none";ta
document.getElementById('btnSave').style.display = "none";
document.getElementById('btnChange').style.display = "none";
document.getElementById('btnDel').style.display = 'none';

var btnSave = document.getElementById('btnSave');
var buttonChange = document.getElementById('btnChange');
var btnAdd = document.getElementById('btnAdd');
var btnDel = document.getElementById('btnDel');

document.getElementById('btnAdd').style.display = "block";
// var stateFromStorage = localStorage.getItem('state');
// stateFromStorage = JSON.parse(stateFromStorage);
// console.log(stateFromStorage)

var state = {
    tasks: [],
    users: [],
    scores: []
}

function test(){
    for(i = 0; i < stateFromStorage.tasks.length; i++){
        state.tasks.push(stateFromStorage.tasks[i])
        state.scores.push(stateFromStorage.scores[i])
    }
}



console.log(state.tasks)
console.log(state.scores)

function pushDataToStorage() {
    localStorage.setItem('state', JSON.stringify(state));
}

// function getDataToStorage() {
//     stateFromStorage = localStorage.getItem('state');
// }

var inputName = document.getElementsByClassName("input_data__input")[0];
var inputValue = document.getElementById("inputValue");
function addTask() {
    if (inputName.value) {
        setTask(state.tasks, inputName.value, 'task' + (state.tasks.length));
        setScore(state.scores, 'task' + (state.tasks.length - 1), inputValue.value);
    }

    renderTask(state.tasks, state.scores)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;

function setTask(tasks, name, id, props) {

    var found_id = -1;
    props = {
        id: id,
        name: name
    }

    tasks.forEach((element, index) => {
        if (element.id == id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        tasks[found_id] = Object.assign(props);
    } else {
        tasks.push(Object.assign(props));
    }
}

function setUser(users, id, name, color, props) {
    found_id = null;
    props = {
        id: '',
        name: '',
        color: ''
    }

    if (found_id) {
        users[found_id] = Object.assign(users[found_id], props);
    } else {
        users.push(Object.assign({ id: id, name: name, color: color }, props));
        console.log(users);
    }
}

function setScore(scores, task_id, value, props) {
    var found_id = -1;
    props = {
        task_id: task_id,
        value: value
    }

    scores.forEach((element, index) => {
        if (element.task_id == task_id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        scores[found_id] = Object.assign(props);
    }
    else {
        scores.push(Object.assign(props));
    }
}

function editTask(id) {
    state.tasks.forEach((element) => {
        if (element.id == id) {
            inputName.value = element.name;
        }
    });
    changeSwitchModal(id, true);
}

function changeTaskInTable() {
    if (inputName.value) {
        document.getElementById('table-task').style.display = "block";
        var id_task = document.getElementById('input_id__span').innerHTML;
        setTask(state.tasks, inputName.value, id_task);
        setScore(state.scores, id_task, inputValue.value);
        renderTask(state.tasks, state.scores)

        changeSwitchModal(null, false);
    }
    else {
        alert("Введите имя задачи!");
    }
}
buttonChange.onclick = changeTaskInTable;

var btnChange = document.createElement('button');

function renderTask(tasks, scores) {
    var table = document.querySelector('#table-task tbody');
    table.innerHTML = ''
    for (let i = 0; i < tasks.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editTask(\'${tasks[i].id}\')">Change</button>`

        if (tasks[i].name) {
            newName.textContent = tasks[i].name;
            newScore.textContent = scores[i].value;
            newRow.appendChild(newName);
            newRow.appendChild(newScore);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);

            table.appendChild(newRow);
        }
    }
}

function init() {
    var stateFromStorage = localStorage.getItem('state');
    if(stateFromStorage){
        state = JSON.parse(stateFromStorage);
    }
    // getDataToStorage();
    var tasks = state.tasks
    var scores = state.scores

    renderTask(tasks, scores);
}
init();

function switchModal(toggle) {
    if (toggle) {
        var selectOption = Array.from(selectInput.options).find((opt) => opt.value == '1');
        selectOption.selected = true;
        inputName.value = '';
        // document.getElementById('table-task').style.display = "none";
        document.getElementById('btnSave').style.display = "block";
        document.getElementById('btnAdd').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "block";
        // getDataToStorage();
    } else {
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnSave').style.display = "none";
        document.getElementById('btnAdd').style.display = "block";
        document.getElementsByClassName('input_data')[0].style.display = "none";
        pushDataToStorage();
        test()
    }
}
btnAdd.onclick = switchModal;

var selectInput = document.getElementById('inputValue');
function changeSwitchModal(id, toggle) {
    if (toggle) {
        state.scores.forEach((element) => {
            if (element.task_id == id) {
                var selectOption = Array.from(selectInput.options).find((opt) => opt.value == element.value);
                if (selectOption) {
                    selectOption.selected = true;
                }
            }
        });
        document.getElementById('input_id__span').innerHTML = id;
        document.getElementById('input_id__span').style.display = "none";
        document.getElementById('btnChange').style.display = "block";
        document.getElementById('btnAdd').style.display = "none";
        document.getElementById('btnDel').style.display = "block";
        document.getElementsByClassName('input_data')[0].style.display = "block";
        // document.getElementById('table-task').style.display = "none";
        // getDataToStorage();
    }
    else {
        document.getElementById('input_id__span').innerHTML = '';
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnChange').style.display = "none";
        document.getElementById('btnSave').style.display = "none";
        document.getElementById('btnAdd').style.display = "block";
        document.getElementById('btnDel').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "none";
        pushDataToStorage();
        test()
    }
}

function deleteTask() {
    inputName.value = "";
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setTask(state.tasks, inputName.value, id_task);
    setScore(state.scores, id_task, inputValue.value);
    renderTask(state.tasks, state.scores)

    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;

// var Test = document.getElementById('btnTest');
// Test.addEventListener('click', () => {
//     pushDataToStorage();
// })