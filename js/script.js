document.getElementsByClassName("input_data")[0].style.display = "none";
document.getElementsByClassName("select-user")[0].style.display = "none";
document.getElementsByClassName("scoreUsers")[0].style.display = "none";

var btnSave = document.getElementById("btnSave");
var buttonChange = document.getElementById("btnChange");
var btnAdd = document.getElementById("btnAdd");
var btnDel = document.getElementById("btnDel");

btnSave.style.display = "none";
document.getElementById("btnChange").style.display = "none";
document.getElementById("btnDel").style.display = "none";
document.getElementById("btnAdd").style.display = "block";

var stateManager = {
    privates: {
        state: {
            tasks: [],
            scores: [],
            users: [],
        },
    },
    syncStorage: function () {},
    getScores: function () {
        return this.privates.state.scores;
    },
    getTasks: function () {
        return this.privates.state.tasks;
    },
    changeTask: function () {
        this.syncStorage();
    },
};

stateManager.changeTask();

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

var inputName = document.getElementsByClassName("input_data__input")[0];
/**
 * Функция добавления задачи
 */
function addTask(value) {
    if (value) {
        setTask(state.tasks, value, "task" + state.tasks.length);
        for (i = 0; i < state.users.length; i++) {
            setScore(
                state.scores,
                "task" + (state.tasks.length - 1),
                "user" + i
            );
        }
    }
}

/**
 * Сеттер для tasks
 * @param {*} tasks - массив tasks
 * @param {*} name - название задачи
 * @param {*} id  - ID задчи
 * @param {*} value - голос пользователя
 * @param {*} props - пропс
 */
function setTask(tasks, name, id, value, props) {
    var found_id = -1;
    props = {
        id: id,
        name: name,
        value: value,
    };

    tasks.forEach((element, index) => {
        if (element.id == id) {
            found_id = index;
        }
    });

    if (found_id >= 0) {
        tasks[found_id] = Object.assign(props);
    } else {
        tasks.push(Object.assign(props));
        pushDataToStorage();
    }
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
 * Функция изменения задачи (повторно)
 * @param {*} id - ID пользователя
 */
function editTask(id) {
    state.tasks.forEach((element) => {
        if (element.id == id) {
            inputName.value = element.name;
        }
    });
    changeSwitchModal(id, true);
}

/**
 * Изменение названия задчи в таблице
 */
function changeTaskInTable() {
    if (inputName.value) {
        document.getElementById("table-task").style.display = "block";
        var id_task = document.getElementById("input_id__span").innerHTML;
        setTask(state.tasks, inputName.value, id_task);
        renderTask(state.tasks);
        pushDataToStorage();

        changeSwitchModal(null, false);
    } else {
        alert("Введите имя задачи!");
    }
}

var btnChange = document.createElement("button");
/**
 * Функция отрисовки таблицы пользователей
 * @param {*} tasks - массив задач
 */
function renderTask(tasks) {
    var table = document.querySelector("#table-task tbody");
    table.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        var newRow = document.createElement("tr");
        var newName = document.createElement("td");
        var newFunction = document.createElement("td");

        newFunction.innerHTML = `<button class="change-score-of-task" onclick = "editTask(\'${tasks[i].id}\')">Change</button>`;

        if (tasks[i].name) {
            newName.textContent = tasks[i].name;
            newRow.appendChild(newName);
            newRow.appendChild(newFunction);
            newFunction.appendChild(btnChange);

            table.appendChild(newRow);
        }
    }
}

/**
 * Функция выключает модульное окно
 * @param {*} toggle - переключатель
 * @param {*} _btnSave - кнопка "Сохранить"
 * @param {*} _btnAdd - кнопка "Добавить"
 */
function switchModal(toggle, _btnSave, _btnAdd) {
    if (toggle) {
        var selectOption = Array.from(selectInput.options).find(
            (opt) => opt.value == "1"
        );
        selectOption.selected = true;
        inputName.value = "";
        document.getElementsByClassName("input_data")[0].style.display =
            "block";
        btnSave.style.display = "block";
        btnAdd.style.display = "none";
    } else {
        document.getElementById("table-task").style.display = "block";
        document.getElementsByClassName("input_data")[0].style.display = "none";
        btnSave.style.display = "none";
        btnAdd.style.display = "block";
    }
}

var selectInput = document.getElementById("inputValue");

/**
 * Функция переключает модульное окно и таблицу
 * @param {*} id - ID задачи
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
        state.scores.forEach((element) => {
            if (element.task_id == id) {
                var selectOption = Array.from(selectInput.options).find(
                    (opt) => opt.value == element.value
                );
                if (selectOption) {
                    selectOption.selected = true;
                }
            }
        });
        document.getElementById("input_id__span").innerHTML = id;
        document.getElementById("input_id__span").style.display = "none";
        document.getElementsByClassName("input_data")[0].style.display =
            "block";
        document.getElementById("table-task").style.display = "none";
        buttonChange.style.display = "block";
        btnAdd.style.display = "none";
        btnDel.style.display = "block";
    } else {
        document.getElementById("input_id__span").innerHTML = "";
        document.getElementById("table-task").style.display = "block";
        document.getElementsByClassName("input_data")[0].style.display = "none";
        buttonChange.style.display = "none";
        btnSave.style.display = "none";
        btnAdd.style.display = "block";
        btnDel.style.display = "none";
    }
}

/**
 * Удаление пользователя
 */
function deleteTask() {
    inputName.value = "";
    document.getElementById("table-task").style.display = "block";
    var id_task = document.getElementById("input_id__span").innerHTML;
    setTask(state.tasks, inputName.value, id_task);
    renderTask(state.tasks, state.scores);
    pushDataToStorage();

    changeSwitchModal(null, false);
}

/**
 * Главная функция
 */
function init() {
    btnSave.onclick = function handleAdd() {
        stateManager.addTask(inputName.value);

        inputName.value = "";
        renderTask(state.tasks);
        switchModal(false);
    };

    buttonChange.onclick = changeTaskInTable;
    btnAdd.onclick = switchModal.bind();
    btnDel.onclick = deleteTask;

    var stateFromStorage = localStorage.getItem("state");
    if (stateFromStorage) {
        state = JSON.parse(stateFromStorage);
    }

    var tasks = state.tasks;

    renderTask(tasks);
}

init();
