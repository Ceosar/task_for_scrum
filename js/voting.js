document.getElementsByClassName('input_data')[0].style.display = "none";
document.getElementById('btnSave').style.display = "none";
document.getElementById('btnChange').style.display = "none";
document.getElementById('btnDel').style.display = 'none';
document.getElementById('btnAdd').style.display = 'none';

var btnSave = document.getElementById('btnSave');
var buttonChange = document.getElementById('btnChange');
var btnAdd = document.getElementById('btnAdd');
var btnDel = document.getElementById('btnDel');
var resetBtn = document.getElementById('resetBtn');

// document.getElementById('btnAdd').style.display = "block";

var state = {
    tasks: [],
    scores: [],
    users: []
}

// var stateUsers = {
//     users: []
// }

function pushDataToStorage() {
    localStorage.setItem('state', JSON.stringify(state));
}

var inputName = document.getElementsByClassName("input_data__input")[0];
var inputValue = document.getElementById("inputValue");
function addTask() {
    if (inputName.value) {
        // setTask(state.tasks, inputName.value, 'task' + (state.tasks.length));
        setScore(state.scores, 'task' + (state.tasks.length - 1), inputValue.value);
    }

    renderTask(state.scores)
    inputName.value = ""

    switchModal(false)
}
btnSave.onclick = addTask;

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
//         pushDataToStorage();
//     }
// }

function setScore(scores, task_id, value, user_id, props) {
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

function editTask(id, user) {
    var name;
    state.tasks.forEach((element) => {
        if (element.id == id) {
            // inputName.value = element.name;
            name = element.name;
        }
    });
    changeSwitchModal(id, name, true, user);
}

function changeTaskInTable() {
    console.log(Number(inputValue.value))
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    var user_name = document.getElementById('user_select').innerHTML;
    setScore(state.scores, id_task, Number(inputValue.value), user_name);
    renderTask(state.tasks, state.scores)
    pushDataToStorage();

    changeSwitchModal(null, null, false);
}
buttonChange.onclick = changeTaskInTable;

var btnChange = document.createElement('button');
function renderTask(tasks, scores) {
    var table = document.querySelector('#table-task tbody');
    table.innerHTML = ''
    for (let i = 0; i < scores.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class = "change-score-of-task" onclick = "editTask(\'${scores[i].task_id}\', \`${scores[i].user_id}\`)">Проголосовать</button>`

        // console.log(scores[i].value, scores[i].task_id)
        // console.log(tasks[i].name, scores[i].task_id)
        // if(tasks[i].name == scores[i].task_id){
        //     console.log(scores[i].value)
        // }

        
        console.log(scores[i].user_id, userNow)
        if (scores[i].user_id == userNow) {
            //получаю название задачи по id
            tasks.forEach((element) => {
                if (element.id == scores[i].task_id) {
                    newName.textContent = element.name;
                }
            })

            //нахожу средние значение каждой задач
            var avgArray = [];
            scores.filter((elem) => {
                if (elem.task_id == scores[i].task_id) {
                    avgArray.push(elem.value);
                    console.log(avgArray)
                }
            })
            var avg = 0;
            if (avgArray.length > 0) {
                var sum = avgArray.reduce((partialSum, a) => partialSum + a, 0);
                avg = sum / avgArray.length;
            }
            console.log(avg)

            // newName.textContent = scores[i].task_id;
            // var avg;
            // scores.forEach((element) => {
            //     console.log(element.value);
            //     element.value;
            // })
            // newScore.textContent = scores[i].value;
            newScore.textContent = avg.toFixed(1);
            newRow.appendChild(newName);
            newRow.appendChild(newScore);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);

            table.appendChild(newRow);

        }

        // if(vote == 0){
        //     console.log(userNow);
        //     console.log(scores[0].user_id);
        //     newName.textContent = scores[i].task_id;
        //     newScore.textContent = scores[i].value;
        //     newRow.appendChild(newName);
        //     newRow.appendChild(newScore);
        //     newRow.appendChild(newFunction);
        //     newFunction.appendChild(btnChange);
        //     table.appendChild(newRow);
        // }
    }
}

function averageSum(...props) {
    scores = state.scores;
    console.log(props);
}

// function renderTask(tasks, scores) {
//     var table = document.querySelector('#table-task tbody');
//     table.innerHTML = '';

//     // Group scores by task_id
//     var taskScores = {};
//     scores.forEach(score => {
//         if (!taskScores[score.task_id]) {
//             taskScores[score.task_id] = [];
//         }
//         taskScores[score.task_id].push(score.value);
//     });

//     // Iterate over the tasks
//     tasks.forEach(task => {
//         var taskScoresArray = taskScores[task.id];
//         if (taskScoresArray && taskScoresArray.length > 0) {
//             var averageScore = taskScoresArray.reduce((a, b) => a + b, 0) / taskScoresArray.length;

//             var newRow = document.createElement('tr');
//             var newName = document.createElement('td');
//             var newScore = document.createElement('td');
//             var newFunction = document.createElement('td');
//             newFunction.innerHTML = `<button class="change-score-of-task" onclick="editTask('${task.id}', '${task.user_id}')">Проголосовать</button>`;

//             newName.textContent = task.name;
//             newScore.textContent = averageScore.toFixed(2); // Display average score with 2 decimal places

//             newRow.appendChild(newName);
//             newRow.appendChild(newScore);
//             newRow.appendChild(newFunction);

//             table.appendChild(newRow);
//         }
//     });
// }

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

    // debugger
    // var stateUsersFromStorage = localStorage.getItem('stateUsers')
    // if(stateUsersFromStorage){
    //     stateUsers = JSON.parse(stateUsersFromStorage);
    // }

    if (!scores.user_id || scores.user_id == '') {
        console.log('work')
        var toggleInit = scores.length;
        console.log(scores.length)
        if (toggleInit == 0) {
            for (j = 0; j < tasks.length; j++) {
                for (i = 0; i < users.length; i++) {
                    // console.log(inputValue.value);
                    console.log(scores.length)
                    console.log(tasks.length, users.length)
                    for (l = 0; l < Math.pow(tasks.length, users.length); l++) {
                        try {
                            // console.log("value:" +  scores[l].value)
                            // setScore(scores, `task${j}`, 1, `user${i}`);
                            // console.log(scores[l].value)
                        }
                        catch (err) {
                            console.log(scores[l])
                        }
                        // debugger
                    }
                    // if (!scores[j].user_id) {
                    //     console.log('remove');
                    //     scores.splice(j, 1);
                    // }
                    // console.log(state.users);
                    console.log('setter');
                }
            }
        }
    }

    // 
    renderTask(tasks, scores);
    // 
    renderUsersSelect();

    switchUsers()

    // state.users.forEach((element) => {
    //     if (element.user_id == user_id) {
    //         var selectOption = Array.from(selectName.options).find((opt) => opt.value == element.value);
    //         if (selectOption) {
    //             selectOption.selected = true;
    //         }
    //     }
    // });
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
    // console.log(id)
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
    }
    else {
        document.getElementById('input_id__span').innerHTML = '';
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnChange').style.display = "none";
        document.getElementById('btnSave').style.display = "none";
        // document.getElementById('btnAdd').style.display = "block";
        document.getElementById('btnDel').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "none";
    }
}

function deleteTask() {
    inputName.value = "";
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setTask(state.tasks, inputName.value, id_task);
    setScore(state.scores, id_task, inputValue.value, userNow);
    renderTask(state.tasks, state.scores)
    pushDataToStorage();

    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;

var userNow;
function renderUsersSelect() {
    // var stateUsersFromStorage = localStorage.getItem('stateUsers')
    // stateUsers = JSON.parse(stateUsersFromStorage);
    for (i = 0; i < state.users.length; i++) {
        // var selectName = document.getElementById('selectUsers');
        var newOption = document.createElement('option');
        selectName.appendChild(newOption);
        if (state.users[i].user_name) {
            newOption.innerHTML = state.users[i].user_name;
            // userNow = state.users[i].user_name;
        }
        else {
            newOption.remove();
        }
    }
}

function switchUsers() {

    var userNameNow = selectName.options[selectName.selectedIndex].text;
    console.log(userNameNow);
    state.users.forEach((element) => {
        if (element.user_name == userNameNow) {
            userNow = element.user_id;
        }
    })
    console.log(userNow)
    renderTask(state.tasks, state.scores, userNow);
}

selectName.addEventListener('change', switchUsers);

function resetList(){
    state.scores = []
    localStorage.setItem('state', JSON.stringify(state));
    location.reload();
}
resetBtn.onclick = resetList;