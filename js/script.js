/*
### confirmChoosing()
Функция вызывается при нажатии на кнопку "Press to confirm".
Блок с выбором скрывается. Переменные, заполненные пользователем в <select>, сравниваются.
- При их равенстве появляется блок с итоговым результатом и вызывается функция saveSelectOption().
- Иначе, появляется блок с промежуточными результатами, и вызываются функции saveSelectOption() и showComments(arg1, arg2, arg3).
 */

function confirmChoosing(){
    let voteOfGreen = document.getElementById('voteGreen').value;
    let voteOfRed = document.getElementById('voteRed').value;
    let voteOfBlue = document.getElementById('voteBlue').value;

    document.getElementsByClassName('start-to-vote')[0].style.display='none';
    if(voteOfBlue === voteOfGreen && voteOfGreen === voteOfRed && voteOfRed === voteOfGreen){
        document.getElementById('enterRes').textContent = (voteOfBlue);
        document.getElementsByClassName('lastEnter')[0].style.display='block';
        saveSelectOption();
    }
    else{
        document.getElementsByClassName('tryAgain')[0].style.display='block';
        showComments(voteOfGreen, voteOfRed, voteOfBlue);
        saveSelectOption();
    }
}

/*
### saveSelectOption()
Функция вызывается в confirmChoosing().
Задача saveSelectOption() взять из каждого <select> значения и сохранить их в localStorage.
 */

function saveSelectOption(){
    let selectGreen = document.getElementById('voteGreen');
    let selectedOptionGreen = selectGreen.value;
    localStorage.setItem('selectedOptionGreen', selectedOptionGreen);

    let selectRed = document.getElementById('voteRed');
    let selectedOptionRed = selectRed.value;
    localStorage.setItem('selectedOptionRed', selectedOptionRed);

    let selectBlue = document.getElementById('voteBlue');
    let selectedOptionBlue = selectBlue.value;
    localStorage.setItem('selectedOptionBlue', selectedOptionBlue);
}

/**
### showComments(arg1, arg2, arg3)
Функция вызывается в confirmChoosing().
Задача showComments(arg1, arg2, arg3) получить оценку и комментарии пользователя.
Затем вывести их на экран в блок с промежуточными результатами.
 */

function showComments(paramGreen, paramRed, paramBlue){
    let textCommentGreen = document.getElementsByClassName('person-comment-green')[0].value;
    let textCommentRed = document.getElementsByClassName('person-comment-red')[0].value;
    let textCommentBlue = document.getElementsByClassName('person-comment-blue')[0].value;

    document.getElementById('green-score').textContent = (paramGreen);
    document.getElementById('red-score').textContent = (paramRed);
    document.getElementById('blue-score').textContent = (paramBlue);

    document.getElementById('green-text').textContent = (textCommentGreen);
    document.getElementById('red-text').textContent = (textCommentRed);
    document.getElementById('blue-text').textContent = (textCommentBlue);
}

/**
### loadOptions()
Функция вызывается при загрузке страницы.
loadOptions() берет переменные из localStorage и присваивает каждому <select> по отдельности.
Array.from() используется для преобразования коллекции selectGreen.options в метод find(),
который возвращает первый элемент, устанавливающий условие, указанное в коллбэк-функциях.
Внутри коллбэк-функции сравнивается значение каждого <option> с уже существующими переменными из localStorage.
 */

function loadOptions() {
    let savedOptionsGreen = localStorage.getItem('selectedOptionGreen');
    let selectGreen = document.getElementById('voteGreen');
    let optionGreen = Array.from(selectGreen.options).find((opt) => opt.value === savedOptionsGreen);
    if (optionGreen) {
        optionGreen.selected = true;
    }

    let savedOptionsRed = localStorage.getItem('selectedOptionRed');
    let selectRed = document.getElementById('voteRed');
    let optionRed = Array.from(selectRed.options).find((opt) => opt.value === savedOptionsRed);
    if (optionRed) {
        optionRed.selected = true;
    }

    let savedOptionsBlue = localStorage.getItem('selectedOptionBlue');
    let selectBlue = document.getElementById('voteBlue');
    let optionBlue = Array.from(selectBlue.options).find((opt) => opt.value === savedOptionsBlue);
    if (optionBlue) {
        optionBlue.selected = true;
    }
}

/*
### tryAgainFun()
Функция вызывается при нажатии на кнопки "Next" и "Try Again" в блоках с итоговым и промежуточным результатами соответственно.
 */

function tryAgainFun(){
    location.reload();
}

window.onload = loadOptions;

/**
# task_for_scrum

### confirmChoosing()
Функция вызывается при нажатии на кнопку "Press to confirm".
Блок с выбором скрывается. Переменные, заполненные пользователем в <select>, сравниваются.
- При их равенстве появляется блок с итоговым результатом и вызывается функция saveSelectOption().
- Иначе, появляется блок с промежуточными результатами, и вызываются функции saveSelectOption() и showComments(arg1, arg2, arg3).

### saveSelectOption()
Функция вызывается в confirmChoosing().
Задача saveSelectOption() взять из каждого <select> значения и сохранить их в localStorage.

### showComments(arg1, arg2, arg3)
Функция вызывается в confirmChoosing().
Задача showComments(arg1, arg2, arg3) получить оценку и комментарии пользователя.
Затем вывести их на экран в блок с промежуточными результатами.

### loadOptions()
Функция вызывается при загрузке страницы.
loadOptions() берет переменные из localStorage и присваивает каждому <select> по отдельности.
Array.from() используется для преобразования коллекции selectGreen.options в метод find(),
который возвращает первый элемент, устанавливающий условие, указанное в коллбэк-функциях.
Внутри коллбэк-функции сравнивается значение каждого <option> с уже существующими переменными из localStorage.

### tryAgainFun()
Функция вызывается при нажатии на кнопки "Next" и "Try Again" в блоках с итоговым и промежуточным результатами соответственно.
*/