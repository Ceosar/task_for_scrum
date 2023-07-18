var elements = {
    tableElem: document.getElementById("table-task"),
    btnDel: document.getElementById("btnDel"),
    buttonChange: document.getElementById("btnChange"),
    btnSave: document.getElementById("btnSave"),
    btnAdd: document.getElementById("btnAdd"),
    inputIdSpan: document.getElementById("input_id__span"),
    inputData: document.getElementsByClassName("input_data")[0],
    userSelect: document.getElementById("user_select"),
    nameOfTaskSpan: document.getElementById("name_of_task__span"),
};

function getElement(elementName) {
    return elements[elementName];
}

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
    getTasks: function () {
        return this.privates.state.tasks;
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
                    "task" + this.privates.state.tasks.length,
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
    localStorage.setItem("state", JSON.stringify(stateManager.privates.state));
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
        user_id: user_id,
    };

    scores.forEach((element, index) => {
        if (element.user_id == user_id && element.task_id == task_id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        scores[found_id] = Object.assign(props);
        pushDataToStorage();
    } else {
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
    getElement("tableElem").style.display = "block";
    var id_task = getElement("inputIdSpan").innerHTML;
    setScore(
        stateManager.getScores(),
        id_task,
        userNow,
        Number(inputValue.value)
    );
    renderTask(state.tasks, state.scores);
    pushDataToStorage();

    changeSwitchModal(null, null, false);
}

var btnChange = document.createElement("button");
/**
 * Функция отрисовки таблицы
 * @param {*} tasks - массив tasks
 * @param {*} scores - массив scores
 */
function renderTask(tasks, scores) {
    redirect(state.tasks, state.users);
    var table = document.querySelector("#table-task tbody");
    table.innerHTML = "";
    var avgArray = [];
    for (let i = 0; i < stateManager.getScores().length; i++) {
        var newRow = document.createElement("tr");
        var newName = document.createElement("td");
        var newScore = document.createElement("td");
        var newFunction = document.createElement("td");

        newFunction.innerHTML = `<button class = "change-score-of-task" onclick = "editScore(\'${scores[i].task_id}\', \`${userNow}\`)">Проголосовать</button>`;

        avgArray = [];
        if (scores[i].user_id == userNow) {
            //получаю название задачи по id
            tasks.forEach((element) => {
                if (element.id == scores[i].task_id) {
                    newName.textContent = element.name;
                }
            });

            //нахожу средние значение каждой задач
            scores.forEach((elem) => {
                if (elem.task_id == scores[i].task_id) {
                    avgArray.push(elem.value);
                }
            });
            var avg = 0;
            if (avgArray.length > 0) {
                var sum = avgArray.reduce((partialSum, a) => partialSum + a, 0);
                avg = sum / avgArray.length;
            }

            if (isNaN(avg)) {
                newScore.textContent = "Не все проголосовали!";
            } else {
                newScore.textContent = avg.toFixed(1);
            }

            if (newName.textContent == "") {
                // if(!newName.textContent){
                //     alert("Создайте задачи!")
                //     window.location.href = "http://127.0.0.1:5500/html/index.html";
                // }
                continue;
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
                var selectOption = Array.from(inputValue.options).find(
                    (opt) => opt.value == element.value
                );
                if (selectOption) {
                    selectOption.selected = true;
                }
            }
        });
        getElement("inputData").style.display = "block";
        getElement("inputIdSpan").innerHTML = id;
        getElement("inputIdSpan").style.display = "none";
        getElement("nameOfTaskSpan").innerHTML = name;
        getElement("userSelect").style.display = "none";
        getElement("userSelect").innerHTML = user;
        getElement("tableElem").style.display = "none";
        getElement("buttonChange").style.display = "block";
    } else {
        getElement("inputIdSpan").innerHTML = "";
        getElement("tableElem").style.display = "block";
        getElement("inputData").style.display = "none";
        getElement("buttonChange").style.display = "none";
    }
}

var selectName = document.getElementById("selectUsers");
/**
 * Функция отрисовки пользователей в меню выбора
 */
function renderUsersSelect() {
    for (i = 0; i < state.users.length; i++) {
        var newOption = document.createElement("option");
        selectName.appendChild(newOption);
        if (state.users[i].user_name) {
            newOption.innerHTML = state.users[i].user_name;
        } else {
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
    });
    renderTask(state.tasks, state.scores, userNow);
}

function redirect(tasks, users) {
    if (tasks == "") {
        window.location.replace("http://127.0.0.1:5500/html/index.html");
    } else if (users == "") {
        window.location.href = "http://127.0.0.1:5500/html/users.html";
    }
}

var toggleInit;
/**
 * Главная функция
 */
function init() {
    getElement("buttonChange").style.display = "none";
    getElement("buttonChange").onclick = changeScoreInTable;
    selectName.addEventListener("change", switchUsers);

    var stateFromStorage = localStorage.getItem("state");
    if (stateFromStorage) {
        state = JSON.parse(stateFromStorage);
        stateManager.privates.state = state;
    } else {
        stateManager.privates.state = {
            tasks: [],
            scores: [],
            users: [],
        };
    }

    if (
        !stateManager.getScores().user_id ||
        stateManager.getScores().user_id == ""
    ) {
        var toggleInit = stateManager.getScores().length;
        if (toggleInit == 0) {
            for (j = 0; j < stateManager.getTasks().length; j++) {
                for (i = 0; i < stateManager.getUsers().length; i++) {
                    for (
                        l = 0;
                        l <
                        Math.pow(
                            stateManager.getTasks().length,
                            stateManager.getUsers().length
                        );
                        l++
                    ) {
                        try {
                            setScore(
                                stateManager.getScores(),
                                `task${j}`,
                                `user${i}`
                            );
                        } catch (err) {
                            console.log(scores[l]);
                        }
                    }
                }
            }
        }
    }

    try {
        renderUsersSelect();
        renderTask(stateManager.getTasks(), stateManager.getScores());
    } catch (error) {
        window.location.replace("http://127.0.0.1:5500/html/index.html");
    }

    switchUsers();
}
init();
