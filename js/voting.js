document.getElementsByClassName('input_data')[0].style.display = "none";
document.getElementById('btnChange').style.display = "none";

var buttonChange = document.getElementById('btnChange');

var stateManager = {
    privates: {
        state: {
            tasks: [],
            scores: [],
            users: [],
        },
    },
    syncStorage: function () {
        localStorage.setItem("state", JSON.stringify(this.privates.state));
    },
    getScores: function () {
        return this.privates.state.scores;
    },
    getUsers: function () {
        return this.privates.state.users;
    },
    addUser: function (value) {
        if (value) {
            // var userId = "user" + this.privates.state.users.length;
            // var userName = value;
            // this.setUser(userId, userName);
            setUser(
                this.privates.state.users,
                "user" + this.privates.state.users.length,
                value
            );

            for (var i = 0; i < this.privates.state.users.length; i++) {
                setScore(
                    this.privates.state.scores,
                    "task" + (this.privates.state.tasks.length - 1),
                    "user" + i
                );
            }
            this.syncStorage();

            // for (var i = 0; i < this.privates.state.tasks.length; i++) {
            //     var taskId = "task" + i;
            //     this.setScore(taskId, userId);
            // }
        }

        renderUser();
        inputName.value = "";

        switchModal(false);
    },
    editUser: function (id) {
        this.getUsers().forEach((element) => {
            if (element.user_id == id) {
                inputName.value = element.user_name;
            }
        });
        changeSwitchModal(id, true);
    },
};

// var state = {
//     tasks: [],
//     scores: [],
//     users: []
// }

/**
 * Функция отправляет данные в LocalStorage
 */
function pushDataToStorage() {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Сеттер для scores
 * @param {*} scores - массив scores
 * @param {*} task_id - ID задачи
 * @param {*} user_id  - ID пользователя
 * @param {*} value - голос пользователя
 * @param {*} props - пропс
 */
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

/**
 * Функция повторного голосования
 * @param {*} id - ID пользователя
 * @param {*} user - текущий (выбранный) пользователь
 */
function editScore(id, user) {
    var name;
    state.tasks.forEach((element) => {
        if (element.id == id) {
            name = element.name;
        }
    });
    changeSwitchModal(id, name, true, user);
}

var inputValue = document.getElementById("inputValue");
/**
 * Изменение очков в таблице
 */
function changeScoreInTable() {
    document.getElementById('table-task').style.display = "block";
    var id_task = document.getElementById('input_id__span').innerHTML;
    setScore(state.scores, id_task, userNow, Number(inputValue.value));
    renderTask(state.tasks, state.scores)
    pushDataToStorage();

    changeSwitchModal(null, null, false);
}

var avgArray = [];
var btnChange = document.createElement('button');
/**
 * Функция отрисовки таблицы
 * @param {*} tasks - массив tasks
 * @param {*} scores - массив scores
 */
function renderTask(tasks, scores) {
    var table = document.querySelector('#table-task tbody');
    table.innerHTML = ''
    for (let i = 0; i < scores.length; i++) {
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

        newFunction.innerHTML = `<button class = "change-score-of-task" onclick = "editScore(\'${scores[i].task_id}\', \`${userNow}\`)">Проголосовать</button>`

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

/**
 * Функция переключает модульное окно и таблицу
 * @param {*} id - ID задачи
 * @param {*} name - название задачи
 * @param {*} toggle - переключатель
 * @param {*} user - ID пользователя
 * @param {*} _btnChange - кнопка "Проголосовать"
 */
function changeSwitchModal(id, name, toggle, user, _btnChange) {
    if (toggle) {
        state.scores.forEach((element) => {
            if (element.task_id == id) {
                var selectOption = Array.from(inputValue.options).find((opt) => opt.value == element.value);
                if (selectOption) {
                    selectOption.selected = true;
                }
            }
        });
        document.getElementsByClassName('input_data')[0].style.display = "block";
        document.getElementById('input_id__span').innerHTML = id;
        document.getElementById('input_id__span').style.display = "none";
        document.getElementById('name_of_task__span').innerHTML = name;
        document.getElementById('user_select').style.display = 'none';
        document.getElementById('user_select').innerHTML = user;
        document.getElementById('table-task').style.display = "none";
        buttonChange.style.display = "block";
    }
    else {
        document.getElementById('input_id__span').innerHTML = '';
        document.getElementById('table-task').style.display = "block";
        document.getElementsByClassName('input_data')[0].style.display = "none";
        buttonChange.style.display = "none";
    }
}

var selectName = document.getElementById('selectUsers');
/**
 * Функция отрисовки пользователей в меню выбора
 */
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

var userNow;
/**
 * Функция смены пользователя
 */
function switchUsers() {
    var userNameNow = selectName.options[selectName.selectedIndex].text;
    state.users.forEach((element) => {
        if (element.user_name == userNameNow) {
            userNow = element.user_id;
        }
    })
    renderTask(state.tasks, state.scores, userNow);
}

var toggleInit;
/**
 * Главная функция
 */
function init() {
    buttonChange.onclick = changeScoreInTable;
    selectName.addEventListener('change', switchUsers);

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