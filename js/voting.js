document.getElementsByClassName('input_data')[0].style.display = "none";
document.getElementById('btnSave').style.display = "none";
document.getElementById('btnChange').style.display = "none";
document.getElementById('btnDel').style.display = 'none';
document.getElementById('btnAdd').style.display = 'none';
document.getElementById('resetBtn').style.display = 'none'

var btnSave = document.getElementById('btnSave');
var buttonChange = document.getElementById('btnChange');
var btnAdd = document.getElementById('btnAdd');
var btnDel = document.getElementById('btnDel');
var resetBtn = document.getElementById('resetBtn');

var state = {
    tasks: [],
    scores: [],
    users: []
}

function pushDataToStorage() {
    localStorage.setItem('state', JSON.stringify(state));
}

var inputName = document.getElementsByClassName("input_data__input")[0];
var inputValue = document.getElementById("inputValue");
function addTask() {
    if (inputName.value) {
        setScore(state.scores, 'task' + (state.tasks.length - 1), inputValue.value);
    }

    renderTask(state.scores)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;

function setScore(scores, task_id, user_id, value, props) {
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
        pushDataToStorage();
    }
    else {
        scores.push(Object.assign(props));
        pushDataToStorage();
    }
}

function editTask(id, user) {
    var name;
    state.tasks.forEach((element) => {
        if (element.id == id) {
            name = element.name;
        }
    });
    changeSwitchModal(id, name, true, user);
}

function changeTaskInTable() {
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setScore(state.scores, id_task, userNow, Number(inputValue.value));
    renderTask(state.tasks, state.scores)
    pushDataToStorage();

    changeSwitchModal(null, null, false);
}
buttonChange.onclick = changeTaskInTable;

var avgArray = [];

var btnChange = document.createElement('button');
function renderTask(tasks, scores) {
    var table = document.querySelector('#table-task tbody');
    table.innerHTML = ''
    for (let i = 0; i < scores.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class = "change-score-of-task" onclick = "editTask(\'${scores[i].task_id}\', \`${userNow}\`)">Проголосовать</button>`

        if (scores[i].user_id == userNow) {
            //получаю название задачи по id
            tasks.forEach((element) => {
                if (element.id == scores[i].task_id) {
                    newName.textContent = element.name;
                }
            })

            //нахожу средние значение каждой задач
            avgArray = [];
            scores.filter((elem) => {
                if (elem.task_id == scores[i].task_id) {
                    avgArray.push(elem.value);
                }
            })
            var avg = 0;
            if (avgArray.length > 0) {
                var sum = avgArray.reduce((partialSum, a) => partialSum + a, 0);
                avg = sum / avgArray.length;
            }

            if (isNaN(avg)) {
                newScore.textContent = 'Не все проголосовали!';
            }
            else {
                newScore.textContent = avg.toFixed(1);
            }

            if (newName.textContent == '') {
                continue
            }
            newRow.appendChild(newName);
            newRow.appendChild(newScore);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);

            table.appendChild(newRow);

        }
    }
}

var toggleInit;
var selectName = document.getElementById('selectUsers');
function init() {
    var stateFromStorage = localStorage.getItem('state');
    if (stateFromStorage) {
        state = JSON.parse(stateFromStorage);
    }
    var tasks = state.tasks
    var scores = state.scores
    var users = state.users

    if (!scores.user_id || scores.user_id == '') {
        var toggleInit = scores.length;
        if (toggleInit == 0) {
            for (j = 0; j < tasks.length; j++) {
                for (i = 0; i < users.length; i++) {
                    for (l = 0; l < Math.pow(tasks.length, users.length); l++) {
                        try {
                            setScore(scores, `task${j}`, `user${i}`);
                        }
                        catch (err) {
                            console.log(scores[l])
                        }
                    }
                }
            }
        }
    }

    renderUsersSelect();
    renderTask(tasks, scores);

    switchUsers()
}
init();

function switchModal(toggle) {
    if (toggle) {
        var selectOption = Array.from(selectInput.options).find((opt) => opt.value == '1');
        selectOption.selected = true;
        inputName.value = '';
        document.getElementById('btnSave').style.display = "block";
        document.getElementById('btnAdd').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "block";
    } else {
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnSave').style.display = "none";
        document.getElementById('btnAdd').style.display = "block";
        document.getElementsByClassName('input_data')[0].style.display = "none";
    }
}
btnAdd.onclick = switchModal;

var selectInput = document.getElementById('inputValue');
function changeSwitchModal(id, name, toggle, user) {
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
        document.getElementById('name_of_task__span').innerHTML = name;
        document.getElementById('btnChange').style.display = "block";
        document.getElementById('btnAdd').style.display = "none";
        document.getElementById('btnDel').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "block";
        document.getElementById('user_select').style.display = 'none';
        document.getElementById('user_select').innerHTML = user;
        document.getElementById('table-task').style.display = "none";
    }
    else {
        document.getElementById('input_id__span').innerHTML = '';
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnChange').style.display = "none";
        document.getElementById('btnSave').style.display = "none";
        document.getElementById('btnDel').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "none";
    }
}

function deleteTask() {
    inputName.value = "";
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setTask(state.tasks, inputName.value, id_task);
    setScore(state.scores, id_task, userNow, inputValue.value);
    renderTask(state.tasks, state.scores)
    pushDataToStorage();

    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;

var userNow;
function renderUsersSelect() {
    for (i = 0; i < state.users.length; i++) {
        var newOption = document.createElement('option');
        selectName.appendChild(newOption);
        if (state.users[i].user_name) {
            newOption.innerHTML = state.users[i].user_name;
        }
        else {
            newOption.remove();
        }
    }
}

function switchUsers() {
    var userNameNow = selectName.options[selectName.selectedIndex].text;
    state.users.forEach((element) => {
        if (element.user_name == userNameNow) {
            userNow = element.user_id;
        }
    })
    renderTask(state.tasks, state.scores, userNow);
}

selectName.addEventListener('change', switchUsers);

function resetList() {
    state.scores = []
    localStorage.setItem('state', JSON.stringify(state));
    location.reload();
}
resetBtn.onclick = resetList;