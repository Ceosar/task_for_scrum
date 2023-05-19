function confirmChoosing(){
    let voteOfGreen = document.getElementById('voteGreen').value;
    let voteOfRed = document.getElementById('voteRed').value;
    let voteOfBlue = document.getElementById('voteBlue').value;

    if(voteOfBlue === voteOfGreen && voteOfGreen === voteOfRed && voteOfRed === voteOfGreen){
        document.getElementsByClassName('start-to-vote')[0].style.display='none';
        document.getElementById('enterRes').textContent = (voteOfBlue);
        document.getElementsByClassName('lastEnter')[0].style.display='block';
    }
    else{
        document.getElementsByClassName('tryAgain')[0].style.display='block';
        showComments(voteOfGreen, voteOfRed, voteOfBlue);
        saveSelectOption();
    }

    // let users=[
    //     {name:green, score: voteOfGreen},
    //     {name:red, score: voteOfRed},
    //     {name:blue, score: voteOfBlue}
    // ];

    // localStorage.setItem(users, JSON.stringify(users));
}

function showComments(paramGreen, paramRed, paramBlue){
    document.getElementsByClassName('lastEnter')[0].style.display='none';
    document.getElementsByClassName('btn-conf-choose')[0].style.display='none';
    document.getElementsByClassName('start-to-vote')[0].style.display='none';

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

function tryAgainFun(){
    location.reload();
    loadOptions();
}

function loadOptions() {
    let savedOptions = localStorage.getItem('selectedOptionGreen');
    let select = document.getElementById('voteGreen');

}

function saveSelectOption(){
    let selectGreen = document.getElementById('voteGreen');
    let selectedOptionGreen = selectGreen.value;
    localStorage.setItem('selectedOptionGreen', selectedOptionGreen);
    console.log(selectedOptionGreen);

    let selectRed = document.getElementById('voteRed');
    let selectedOptionRed = selectRed.value;
    localStorage.setItem('selectedOptionRed', selectedOptionRed);
    console.log(selectedOptionRed);

    let selectBlue = document.getElementById('voteBlue');
    let selectedOptionBlue = selectBlue.value;
    localStorage.setItem('selectedOptionBlue', selectedOptionBlue);
    console.log(selectedOptionBlue);
}
