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

document.getElementsByClassName('input_data')[0].style.display="none";
document.getElementById('table-task').style.display="none";
document.getElementById('btnSave').style.display="none";


var btnSave = document.getElementById('btnSave');

document.getElementsByClassName('btn-add')[0].style.display="block";
// document.getElementById('btnSave').style.display="block";


var state = {
    tasks: [{
        id: 'user1',
        name: null
    }],
    users: [{
        id: 'user1',
        name: 'Ivan',
        color: 'red'
    }],
    scores: [{
        user_id: 'user1',
        task_id: '1',
        value: 5
    }]
}

var inputName = document.getElementsByClassName("input_data__input")[0];
function addTask() {
    if(inputName.value){
        state.tasks.push({
            id: 'user' + state.tasks.length,
            name: inputName.value
        });
    }

    document.getElementById('table-task').style.display="block";
    renderTask(state.tasks)

    inputName.value = ""

    document.getElementById('btnSave').style.display="none"; //показываю кнопку Сохранить
    document.getElementsByClassName('btn-add')[0].style.display="block"; //выключаю кнопку Добавить
    document.getElementsByClassName('input_data')[0].style.display="none"; //вывожу modal окно
}
btnSave.onclick = addTask;

function setTask(tasks, id, name, props) {
    var found_id = null;
    props = {
        id:'',
        name:''
    }

    // filter

    if(found_id){
        tasks[found_id] = Object.assign(tasks[found_id], props);
    } else{
        tasks.push(Object.assign({id: id, name: name}, props));
        console.log(tasks);
    }
}

function setUser(users, id, name, color, props) {
    found_id=null;
    props = {
        id:'',
        name:'',
        color:''
    }

    if(found_id){
        users[found_id] = Object.assign(users[found_id], props);
    } else{
    users.push(Object.assign({id: id, name: name, color: color}, props));
    console.log(users);
    }
}

function setScore(scores, user_id, task_id, props) {
    var found_id = null;
    props = {
        user_id: "",
        task_id: "",
        value: 1
    }

    if (found_id){
        scores[found_id] = Object.assign(scores[found_id], props);
    }
    else{
        scores.push(Object.assign({user_id: user_id, task_id: task_id}, props));
        console.log(scores);
    }
}
// setScore();
// var inputName = document.createElement('input');

// var newRow = document.createElement('tr');
// var newName = document.createElement('td');
// var newScore = document.createElement('td');
var btnChange = document.createElement('button');

function renderTask(tasks) {
    var table = document.querySelector('#table-task tbody');
    table.innerHTML = ''
    // debugger
    for(let i = 0; i < tasks.length; i++){
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

            // for(let eachTask in tasks){
            //     newScore.textContent = tasks[eachTask].score;
            // }
        if(tasks[i].name){
            newName.textContent = tasks[i].name;
            newRow.appendChild(newName);
            // newName.appendChild(inputName);
            newRow.appendChild(newScore);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);
    
            table.appendChild(newRow);
        }

            // if(i == Object.keys(tasks).length){
            //     console.log('hi')
            //     document.getElementsByClassName('btn-add')[0].style.display="none";
            // }
    }
}

// btnSave.addEventListener('click', saveNameOfTask);
// function saveNameOfTask() {
//     var inputName = document.getElementsByClassName("input_data__input")[0];
//     console.log(inputName.value)
//     if(inputName.value){
//         // inputName.style.display="none";
//         newName.textContent = inputName.value;
//         document.getElementsByClassName('btn-add')[0].style.display="block";
//         document.getElementById('btnSave').style.display="none";
//         document.getElementsByClassName('input_data')[0].style.display="none";
//         document.getElementById('table-task').style.display="block";
//         // setTask(tasks, 1, newName.textContent, "first");
//     }
// }

function init() {
    // var tasks = JSON.parse(localStorage.getItem('tasks')) || [{name: '', score:''}];
    var tasks = state.tasks

    // switchModal();
    renderTask(tasks);
    // достаем стейт из localstorage
    // вызываем renderTasks передаем state.tasks
}
init();
// function test() {
//     var obj = {
//         task1:{name:'task1', score: 5}
//     }
//     localStorage.setItem('tasks', JSON.stringify(obj));
// }
// initTask();

function switchModal() {
    document.getElementById('btnSave').style.display="block"; //показываю кнопку Сохранить
    document.getElementsByClassName('btn-add')[0].style.display="none"; //выключаю кнопку Добавить
    document.getElementsByClassName('input_data')[0].style.display="block"; //вывожу modal окно
    document.getElementById('table-task').style.display="none";
}