var inputName = document.getElementsByClassName("input_data__input__user")[0];

var elements = {
    inputDataUser: document.getElementsByClassName("input_data__user")[0],
    inputIdSpanUser: document.getElementById("input_id__span__user"),
    btnSave: document.getElementById("btnSaveUser"),
    buttonChange: document.getElementById("btnChangeUser"),
    btnDel: document.getElementById("btnDelUser"),
    btnAdd: document.getElementById("btnAddUser"),
    tableElem: document.getElementById("table-users"),
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
    addUser: function (value) {
        if (value) {
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
    removeUserScores: function (user_id) {
        var scores = this.privates.state.scores;
        var removedIndexes = [];

        for (var i = 0; i < scores.length; i++) {
            if (scores[i].user_id === user_id) {
                removedIndexes.push(i);
            }
        }

        for (var j = removedIndexes.length - 1; j >= 0; j--) {
            scores.splice(removedIndexes[j], 1);
        }

        this.syncStorage();
    },
};

/**
 * Функция отправляет данные в LocalStorage
 */
function pushDataToStorage() {
    localStorage.setItem("state", JSON.stringify(stateManager.privates.state));
}

/**
 * Функция выключает модульное окно
 * @param {*} toggle - переключатель
 * @param {*} _btnSave - кнопка "Сохранить"
 * @param {*} _btnAdd - кнопка "Добавить"
 */
function switchModal(toggle, _btnSave, _btnAdd) {
    if (toggle) {
        inputName.value = "";
        getElement("inputDataUser").style.display = "block";
        getElement("tableElem").style.display = "none";
        getElement("btnSave").style.display = "block";
        getElement("btnAdd").style.display = "none";
    } else {
        getElement("tableElem").style.display = "block";
        getElement("inputDataUser").style.display = "none";
        getElement("btnSave").style.display = "none";
        getElement("btnAdd").style.display = "block";
    }
}

/**
 * Функция переключает модульное окно и таблицу
 * @param {*} id - ID пользоватея
 * @param {*} toggle - переключатель
 * @param {*} _buttonChange - кнопка "Изменить"
 * @param {*} _btnAdd - кнопка "Добавить"
 * @param {*} _btnDel - кнопка "Удалить"
 * @param {*} _btnSave - кнопка "Сохранить"
 */
function changeSwitchModal(
    id,
    toggle,
    _buttonChange,
    _btnAdd,
    _btnDel,
    _btnSave
) {
    if (toggle) {
        getElement("inputIdSpanUser").innerHTML = id;
        getElement("inputIdSpanUser").style.display = "none";
        getElement("inputDataUser").style.display = "block";
        getElement("tableElem").style.display = "none";
        getElement("buttonChange").style.display = "block";
        getElement("btnAdd").style.display = "none";
        getElement("btnDel").style.display = "block";
    } else {
        getElement("inputIdSpanUser").innerHTML = "";
        getElement("inputIdSpanUser").style.display = "block";
        getElement("tableElem").style.display = "block";
        getElement("inputDataUser").style.display = "none";
        getElement("buttonChange").style.display = "none";
        getElement("btnAdd").style.display = "block";
        getElement("btnDel").style.display = "none";
        getElement("btnSave").style.display = "none";
    }
}

var btnChangeUser = document.createElement("button");
/**
 * Функция отрисовки таблицы пользователей
 * @param {*} users - массив пользователей
 */
function renderUser() {
    users = stateManager.getUsers();
    var table = document.querySelector("#table-users tbody");
    table.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        var newRow = document.createElement("tr");
        var newName = document.createElement("td");
        var newFunction = document.createElement("td");

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "stateManager.editUser(\'${users[i].user_id}\')">Изменить</button>`;

        if (users[i].user_name) {
            newName.textContent = users[i].user_name;
            newRow.appendChild(newName);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChangeUser);

            table.appendChild(newRow);
        }
    }
}

/**
 * Сеттер для users
 * @param {*} users - массив users
 * @param {*} user_id - ID задачи
 * @param {*} user_name  - ID пользователя
 * @param {*} props - пропс
 */
function setUser(users, user_id, user_name, props) {
    found_id = -1;
    props = {
        user_id: user_id,
        user_name: user_name,
    };

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

function removeUserScores(user_id) {
    stateManager.removeUserScores(user_id);
    renderUser();
    // renderTask(stateManager.getTasks(), stateManager.getScores());
}

function removeUser() {
    var id_user = getElement("inputIdSpanUser").innerHTML;
    var user_name = inputName.value;
    setUser(stateManager.getUsers(), id_user, user_name);
    removeUserScores(id_user);

    changeSwitchModal(null, false);
}

// var inputName = document.getElementsByClassName("input_data__input__user")[0];
/**
 * Функция добавления пользователя
 */
// function addUser() {
//     if (inputName.value) {
//         setUser(state.users, "user" + state.users.length, inputName.value);
//         for (i = 0; i < state.tasks.length; i++) {
//             setScore(
//                 state.scores,
//                 "task" + i,
//                 "user" + (state.users.length - 1)
//             );
//         }
//     }

//     renderUser(state.users);
//     inputName.value = "";

//     switchModal(false);
// }

/**
 * Функция изменения имени пользователя (повторно)
 * @param {*} id - ID пользователя
 */
// function editUser(id) {
//     state.users.forEach((element) => {
//         if (element.user_id == id) {
//             inputName.value = element.user_name;
//         }
//     });
//     changeSwitchModal(id, true);
// }

/**
 * Изменение пользователя
 */
function changeUserInTable() {
    if (inputName.value) {
        getElement("tableElem").style.display = "block";
        var id_user = getElement("inputIdSpanUser").innerHTML;
        setUser(state.users, id_user, inputName.value);
        renderUser();
        changeSwitchModal(null, false);
    } else {
        alert("Введите имя пользователя!");
    }
}

/**
 * Функция удаления пользователя
 */
function deleteUser() {
    inputName.value = "";
    getElement("tableElem").style.display = "block";
    var id_user = getElement("inputIdSpanUser").innerHTML;
    setUser(state.users, id_user, inputName.value);
    renderUser();
    removeUserScores(id_user);
    changeSwitchModal(null, false);
    checkUserState();
}

function checkUserState() {
    var userState = JSON.parse(localStorage.getItem("state"));
    console.log(userState.users);
    for (var i = userState.users.length - 1; i >= 0; i--) {
        if (userState.users[i].user_name === "") {
            userState.users.splice(i, 1);
        }
    }

    console.log(userState);

    if(userState){
        localStorage.setItem("state", JSON.stringify(userState));
    }
}

/**
 * Главная функция
 */
function init() {
    getElement("inputDataUser").style.display = "none";
    getElement("btnSave").style.display = "none";
    getElement("buttonChange").style.display = "none";
    getElement("btnDel").style.display = "none";
    getElement("btnAdd").style.display = "block";


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
    getElement("btnSave").onclick = function handleAdd() {
        stateManager.addUser(inputName.value);

        inputName.value = "";
        renderUser(stateManager.getUsers());
        switchModal(false);
    };

    getElement("buttonChange").onclick = function () {
        console.log(inputName.value);
        changeUserInTable(inputName.value);
    };
    getElement("btnAdd").onclick = switchModal;
    getElement("btnDel").onclick = deleteUser;

    renderUser(stateManager.getUsers());
}
init();
