document.getElementsByClassName("input_data__user")[0].style.display = "none";
document.getElementById("btnSaveUser").style.display = "none";
document.getElementById("btnChangeUser").style.display = "none";
document.getElementById("btnDelUser").style.display = "none";
document.getElementById("btnAddUser").style.display = "block";

var btnSave = document.getElementById("btnSaveUser");
var buttonChange = document.getElementById("btnChangeUser");
var btnAdd = document.getElementById("btnAddUser");
var btnDel = document.getElementById("btnDelUser");

var inputName = document.getElementsByClassName("input_data__input__user");

var state = {
    tasks: [],
    scores: [],
    users: [],
};

/**
 * Функция отправляет данные в LocalStorage
 */
function pushDataToStorage() {
    localStorage.setItem("state", JSON.stringify(state));
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
        document.getElementsByClassName("input_data__user")[0].style.display =
            "block";
        document.getElementById("table-users").style.display = "none";
        btnSave.style.display = "block";
        btnAdd.style.display = "none";
    } else {
        document.getElementById("table-users").style.display = "block";
        document.getElementsByClassName("input_data__user")[0].style.display =
            "none";
        btnSave.style.display = "none";
        btnAdd.style.display = "block";
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
        document.getElementById("input_id__span__user").innerHTML = id;
        document.getElementById("input_id__span__user").style.display = "none";
        document.getElementsByClassName("input_data__user")[0].style.display =
            "block";
        document.getElementById("table-users").style.display = "none";
        buttonChange.style.display = "block";
        btnAdd.style.display = "none";
        btnDel.style.display = "block";
    } else {
        document.getElementById("input_id__span__user").innerHTML = "";
        document.getElementById("table-users").style.display = "block";
        document.getElementsByClassName("input_data__user")[0].style.display =
            "none";
        buttonChange.style.display = "none";
        btnAdd.style.display = "block";
        btnDel.style.display = "none";
        btnSave.style.display = "none";
    }
}

var btnChangeUser = document.createElement("button");
/**
 * Функция отрисовки таблицы пользователей
 * @param {*} users - массив пользователей
 */
function renderUser(users) {
    var table = document.querySelector("#table-users tbody");
    table.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        var newRow = document.createElement("tr");
        var newName = document.createElement("td");
        var newFunction = document.createElement("td");

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editUser(\'${users[i].user_id}\')">Change</button>`;

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

var inputName = document.getElementsByClassName("input_data__input__user")[0];
/**
 * Функция добавления пользователя
 */
function addUser() {
    if (inputName.value) {
        setUser(state.users, "user" + state.users.length, inputName.value);
        for (i = 0; i < state.tasks.length; i++) {
            setScore(
                state.scores,
                "task" + i,
                "user" + (state.users.length - 1)
            );
        }
    }

    renderUser(state.users);
    inputName.value = "";

    switchModal(false);
}

/**
 * Функция изменения имени пользователя (повторно)
 * @param {*} id - ID пользователя
 */
function editUser(id) {
    state.users.forEach((element) => {
        if (element.user_id == id) {
            inputName.value = element.user_name;
        }
    });
    changeSwitchModal(id, true);
}

/**
 * Изменение пользователя
 */
function changeUserInTable() {
    if (inputName.value) {
        document.getElementById("table-users").style.display = "block";
        var id_user = document.getElementById("input_id__span__user").innerHTML;
        setUser(state.users, id_user, inputName.value);
        renderUser(state.users);
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
    document.getElementById("table-users").style.display = "block";
    var id_user = document.getElementById("input_id__span__user").innerHTML;
    setUser(state.users, id_user, inputName.value);
    renderUser(state.users);

    changeSwitchModal(null, false);
}

/**
 * Главная функция
 */
function init() {
    btnAdd.onclick = switchModal;
    btnSave.onclick = addUser;
    buttonChange.onclick = changeUserInTable;
    btnDel.onclick = deleteUser;

    var stateFromStorage = localStorage.getItem("state");
    if (stateFromStorage) {
        state = Object.assign(state, JSON.parse(stateFromStorage));
    }
    var users = state.users;

    renderUser(users);
}
init();