var table = document.getElementById('table-task');
var tbody = table.getElementsByTagName('tbody')[0];
var nameOfTasks = ["Task1", "Task2", "Task3", "Task4", "Task5",]
var currentIndex = 0;

function tryAgainFun(){
    location.reload();
}

function addTask(){
    if(currentIndex < nameOfTasks.length){
        var newRow = document.createElement('tr');
        var newName = document.createElement('td');
        var newScore = document.createElement('td');
        var newFunction = document.createElement('td');

        newName.textContent = nameOfTasks[currentIndex];
        newScore.textContent = '5';

        newRow.appendChild(newName);
        newRow.appendChild(newScore);
        newRow.appendChild(newFunction);

        tbody.appendChild(newRow);

        currentIndex++;
    }
}

function resultScores() {
    let scoreResult1 = JSON.parse(localStorage.getItem('Task1'));
    let scoreResult2 = JSON.parse(localStorage.getItem('Task2'));
    let scoreResult3 = JSON.parse(localStorage.getItem('Task3'));
    let scoreResult4 = JSON.parse(localStorage.getItem('Task4'));

    document.getElementById("resultScore1").textContent = (scoreResult1.green);
    document.getElementById("resultScore2").textContent = (scoreResult2.green);
    document.getElementById("resultScore3").textContent = (scoreResult3.green);
    document.getElementById("resultScore4").textContent = (scoreResult4.green);
}

resultScores();

let btnConfirm = document.getElementById("btnConfirm");

function changeFun(arg)
{
    document.getElementsByClassName("start-to-vote")[0].style.display="block";
    document.getElementsByClassName("list-of-task")[0].style.display="none";

    var changeId = document.getElementById("text-of-answer").textContent = arg.id;

    let savedOptions = JSON.parse(localStorage.getItem(changeId));
    let selectGreen = document.getElementById('voteGreen');
    selectGreen.addEventListener('change', function(){
        saveSelectOption();
    });
    let optionGreen = Array.from(selectGreen.options).find((opt) => opt.value == savedOptions.green);
    if (optionGreen) {
        optionGreen.selected = true;
    }

    let selectRed = document.getElementById('voteRed');
    selectRed.addEventListener('change', function(){
        saveSelectOption();
    });
    let optionRed = Array.from(selectRed.options).find((opt) => opt.value == savedOptions.red);
    if (optionRed) {
        optionRed.selected = true;
    }

    let selectBlue = document.getElementById('voteBlue');
    selectBlue.addEventListener('change', function(){
        saveSelectOption();
    });
    let optionBlue = Array.from(selectBlue.options).find((opt) => opt.value == savedOptions.blue);
    if (optionBlue) {
        optionBlue.selected = true;
    }

    btnConfirm.addEventListener("click", saveSelectOption);
    function saveSelectOption(){
        let selectGreen = document.getElementById('voteGreen');
        let selectedOptionGreen = selectGreen.value;

        let selectRed = document.getElementById('voteRed');
        let selectedOptionRed = selectRed.value;

        let selectBlue = document.getElementById('voteBlue');
        let selectedOptionBlue = selectBlue.value;

        let objectId = changeId;
        objectId = {
            "green": selectedOptionGreen,
            "red" : selectedOptionRed,
            "blue" : selectedOptionBlue
        }

        localStorage.setItem(changeId, JSON.stringify(objectId));
    }

    btnConfirm.addEventListener("click", confirm);

    function confirm(){
        let newOptions = JSON.parse(localStorage.getItem(changeId));
        let selectedOptionGreen = newOptions.green;
        let selectedOptionRed = newOptions.red;
        let selectedOptionBlue = newOptions.blue;

        document.getElementsByClassName('start-to-vote')[0].style.display='none';
        if(selectedOptionGreen === selectedOptionRed && selectedOptionGreen === selectedOptionBlue && selectedOptionRed === selectedOptionBlue){
            document.getElementById('enterRes').textContent = (selectedOptionGreen);
            document.getElementsByClassName('lastEnter')[0].style.display='block';
        }
        else{
            document.getElementsByClassName('tryAgain')[0].style.display='block';
        }

        let textCommentGreen = document.getElementsByClassName('person-comment-green')[0].value;
        document.getElementById('green-score').textContent = (selectedOptionGreen);
        document.getElementById('green-text').textContent = (textCommentGreen);

        let textCommentRed = document.getElementsByClassName('person-comment-red')[0].value;
        document.getElementById('red-score').textContent = (selectedOptionRed);
        document.getElementById('red-text').textContent = (textCommentRed);

        let textCommentBlue = document.getElementsByClassName('person-comment-blue')[0].value;
        document.getElementById('blue-score').textContent = (selectedOptionBlue);
        document.getElementById('blue-text').textContent = (textCommentBlue);

        btnTryAgain.addEventListener("click", function(){
            document.getElementsByClassName('tryAgain')[0].style.display='none';
            document.getElementsByClassName('start-to-vote')[0].style.display='block';
        })
    };
}