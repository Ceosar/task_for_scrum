// function tryAgainFun(){
//     location.reload();
// }

// function addTask(){
//     if(currentIndex < nameOfTasks.length){
//         var newRow = document.createElement('tr');
//         var newName = document.createElement('td');
//         var newScore = document.createElement('td');
//         var newFunction = document.createElement('td');

//         newName.textContent = nameOfTasks[currentIndex];
//         newScore.textContent = '5';

//         newRow.appendChild(newName);
//         newRow.appendChild(newScore);
//         newRow.appendChild(newFunction);

//         tbody.appendChild(newRow);

//         currentIndex++;
//     }
// }

// function addPerson() {

// }

// function resultScores() {
//  // task count
//     let scoreResult1 = JSON.parse(localStorage.getItem('Task1'));
//     let scoreResult2 = JSON.parse(localStorage.getItem('Task2'));
//     let scoreResult3 = JSON.parse(localStorage.getItem('Task3'));
//     let scoreResult4 = JSON.parse(localStorage.getItem('Task4'));

//     document.getElementById("resultScore1").textContent = (scoreResult1.green);
//     document.getElementById("resultScore2").textContent = (scoreResult2.green);
//     document.getElementById("resultScore3").textContent = (scoreResult3.green);
//     document.getElementById("resultScore4").textContent = (scoreResult4.green);
// }

// resultScores();

// let btnConfirm = document.getElementById("btnConfirm");

// function changeFun(arg)
// {

//     // user_count
//     // document.getElementsByClassName("start-to-vote")[0].style.display="block";
//     // document.getElementsByClassName("list-of-task")[0].style.display="none";

//     // var changeId = document.getElementById("text-of-answer").textContent = arg.id;

//     // let savedOptions = JSON.parse(localStorage.getItem(changeId));
//     // let selectGreen = document.getElementById('voteGreen');
//     // selectGreen.addEventListener('change', function(){
//     //     saveSelectOption();
//     // });
//     // let optionGreen = Array.from(selectGreen.options).find((opt) => opt.value == savedOptions.green);
//     // if (optionGreen) {
//     //     optionGreen.selected = true;
//     // }

//     // let selectRed = document.getElementById('voteRed');
//     // selectRed.addEventListener('change', function(){
//     //     saveSelectOption();
//     // });
//     // let optionRed = Array.from(selectRed.options).find((opt) => opt.value == savedOptions.red);
//     // if (optionRed) {
//     //     optionRed.selected = true;
//     // }

//     // let selectBlue = document.getElementById('voteBlue');
//     // selectBlue.addEventListener('change', function(){
//     //     saveSelectOption();
//     // });
//     // let optionBlue = Array.from(selectBlue.options).find((opt) => opt.value == savedOptions.blue);
//     // if (optionBlue) {
//     //     optionBlue.selected = true;
//     // }

//     btnConfirm.addEventListener("click", saveSelectOption);
//     function saveSelectOption(){
//         let selectGreen = document.getElementById('voteGreen');
//         let selectedOptionGreen = selectGreen.value;

//         let selectRed = document.getElementById('voteRed');
//         let selectedOptionRed = selectRed.value;

//         let selectBlue = document.getElementById('voteBlue');
//         let selectedOptionBlue = selectBlue.value;

//         let objectId = changeId;
//         objectId = {
//             "green": selectedOptionGreen,
//             "red" : selectedOptionRed,
//             "blue" : selectedOptionBlue
//         }

//         localStorage.setItem(changeId, JSON.stringify(objectId));
//     }

//     btnConfirm.addEventListener("click", confirm);

//     function confirm(){
//         let newOptions = JSON.parse(localStorage.getItem(changeId));
//         let selectedOptionGreen = newOptions.green;
//         let selectedOptionRed = newOptions.red;
//         let selectedOptionBlue = newOptions.blue;

//         document.getElementsByClassName('start-to-vote')[0].style.display='none';
//         if(selectedOptionGreen === selectedOptionRed &&
//             selectedOptionGreen === selectedOptionBlue &&
//             selectedOptionRed === selectedOptionBlue
//         ){
//             document.getElementById('enterRes').textContent = (selectedOptionGreen);
//             document.getElementsByClassName('lastEnter')[0].style.display='block';
//         }else{
//             document.getElementsByClassName('tryAgain')[0].style.display='block';
//         }

//         let textCommentGreen = document.getElementsByClassName('person-comment-green')[0].value;
//         document.getElementById('green-score').textContent = (selectedOptionGreen);
//         document.getElementById('green-text').textContent = (textCommentGreen);

//         let textCommentRed = document.getElementsByClassName('person-comment-red')[0].value;
//         document.getElementById('red-score').textContent = (selectedOptionRed);
//         document.getElementById('red-text').textContent = (textCommentRed);

//         let textCommentBlue = document.getElementsByClassName('person-comment-blue')[0].value;
//         document.getElementById('blue-score').textContent = (selectedOptionBlue);
//         document.getElementById('blue-text').textContent = (textCommentBlue);

//         btnTryAgain.addEventListener("click", function(){
//             document.getElementsByClassName('tryAgain')[0].style.display='none';
//             document.getElementsByClassName('start-to-vote')[0].style.display='block';
//         })
//     };
// }


// function setTask(tasks, id, name, props) {
//     var found_id = null;
//     props = {
//         id: '',
//         name: ''
//     }

//     // filter
//     // tasks.filter((value) => {
//     //     if (value.name) {
//     //         // console.log(value);
//     //         found_id = 1;
//     //         props.id = value.id;
//     //         props.name = value.name;
//     //         // localStorage.setItem("tasks", JSON.stringify(props));
//     //     }
//     // });

//     tasks.forEach(element => {
//         if(element.name){
//             console.log(element)
//             found_id = 1;
//         }
//     });

//     // console.log(tasks);

//     if (found_id) {
//         tasks[found_id] = Object.assign(tasks[found_id], props);
//         // console.log(found_id);
//         // console.log(tasks);
//     } else {
//         tasks.push(Object.assign({ id: id, name: name }, props));
//         // console.log(found_id);
//     }

// }



//

// function setTask(tasks, id, name, props) {
//     var foundIndex = -1;

//     tasks.forEach((task, index) => {
//         if (task.task_name === name) {
//             foundIndex = index;
//             return;
//         }
//     });

//     if (foundIndex !== -1) {
//         tasks[foundIndex].task_name.id = id;
//         tasks[foundIndex].task_name.name = name;
//     } else {
//         tasks.push({
//             task_name: {
//                 id: id,
//                 name: name
//             },
//             props: props
//         });
//     }

//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }


//

document.getElementsByClassName('input_data')[0].style.display = "none";
document.getElementById('table-task').style.display = "none";
document.getElementById('btnSave').style.display = "none";
document.getElementById('btnChange').style.display = "none";
document.getElementById('btnDel').style.display = 'none';

var btnSave = document.getElementById('btnSave');
var buttonChange = document.getElementById('btnChange');
var btnAdd = document.getElementById('btnAdd');
var btnDel = document.getElementById('btnDel');

document.getElementById('btnAdd').style.display = "block";

var state = {
    tasks: [],
    users: [
        // {
        // id: 'user1',
        // name: 'Ivan',
        // color: 'red'
        // }
    ],
    scores: [
        // {
        //     user_id: 'user1',
        //     task_id: '1',
        //     value: 5
        // }
    ]
}

var inputName = document.getElementsByClassName("input_data__input")[0];
var inputValue = document.getElementById("inputValue");
function addTask() {
    if (inputName.value) {
        setTask(state.tasks, inputName.value, 'task' + (state.tasks.length));
        setScore(state.scores, 'task' + (state.tasks.length - 1), inputValue.value);
        // console.log(inputValue.value)
    }

    renderTask(state.tasks, state.scores)
    inputName.value = ""

    //показать таблицы, показать Добавить, убрать Сохранить, убрать Ввести данные, убрать Модалку
    // document.getElementById('table-task').style.display = "block";
    // document.getElementById('btnSave').style.display = "none"; //показываю кнопку Сохранить
    // document.getElementById('btnAdd').style.display = "block";
    // document.getElementsByClassName('input_data')[0].style.display = "none"; //вывожу modal окно
    switchModal(false)
}
btnSave.onclick = addTask;

// function setTask(tasks, id, name) {
//     var foundIndex = tasks.findIndex(task => task.id === id || task.name === name);
// console.log(foundIndex)
//     if (foundIndex !== -1) {
//         tasks[foundIndex].id = id;
//         tasks[foundIndex].name = name;
//         console.log('found index != -1');
//     } else {
//         tasks.push(Object.assign({ id: id, name: name }));
//         console.log('found index else');
//     }
// }

function setTask(tasks, name, id, props) {
    var found_id = -1;
    props = {
        id: id,
        name: name
    }


    // filter
    tasks.forEach((element, index) => {
        if (element.id == id) {
            found_id = index;
            // props.id = value.id;
            // props.name = value.name;
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

// function setScore(scores, user_id, task_id, value, props) {
//     var found_id = -1;
//     props = {
//         user_id: user_id,
//         task_id: task_id,
//         value: value
//     }

//     if (found_id) {
//         scores[found_id] = Object.assign(scores[found_id], props);
//     }
//     else {
//         scores.push(Object.assign({ user_id: user_id, task_id: task_id }, props));
//         console.log(scores);
//     }
// }


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
    if(inputName.value){
        document.getElementById('table-task').style.display = "block";
        var id_task = document.getElementById('input_id__span').innerHTML;
        setTask(state.tasks, inputName.value, id_task);
        setScore(state.scores, id_task, inputValue.value);
        renderTask(state.tasks, state.scores)

        // document.getElementById('table-task').style.display = "block";
        // document.getElementById('btnChange').style.display = "none";
        // document.getElementById('btnSave').style.display = "none";
        // document.getElementById('btnAdd').style.display = "block";
        // document.getElementsByClassName('input_data')[0].style.display = "none";
        changeSwitchModal(null, false);
    }
    else{
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
            // newName.appendChild(inputName);
            newRow.appendChild(newScore);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);

            table.appendChild(newRow);
        }
    }
}

function init() {
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
        document.getElementById('table-task').style.display = "none";
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
        document.getElementById('table-task').style.display = "none";
    }
    else {
        document.getElementById('input_id__span').innerHTML = '';
        document.getElementById('table-task').style.display = "block";
        document.getElementById('btnChange').style.display = "none";
        document.getElementById('btnSave').style.display = "none";
        document.getElementById('btnAdd').style.display = "block";
        document.getElementById('btnDel').style.display = "none";
        document.getElementsByClassName('input_data')[0].style.display = "none";
    }
}

function deleteTask(){
    inputName.value = "";
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setTask(state.tasks, inputName.value, id_task);
    setScore(state.scores, id_task, inputValue.value);
    renderTask(state.tasks, state.scores)

    // document.getElementById('table-task').style.display = "block";
    // document.getElementById('btnChange').style.display = "none";
    // document.getElementById('btnSave').style.display = "none";
    // document.getElementById('btnAdd').style.display = "block";
    // document.getElementsByClassName('input_data')[0].style.display = "none";
    changeSwitchModal(null, false);
}
btnDel.onclick = deleteTask;