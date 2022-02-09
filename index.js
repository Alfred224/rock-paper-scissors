function response(arr) {
    const choices = arr;
    return choices[Math.floor(Math.random() * choices.length)];
};

function computerPlay() {
    //Computer's Choice
    return response(["rock", "paper", "scissors"])
};

function playRound(playerSelection="", computerSelection="") {
    //RPS round
    const person = playerSelection.toLowerCase(), cpu = computerSelection.toLowerCase();
    const replies = {"rock scissors": "You win, rock beats scissors.",
        "scissors paper": "You win, scissors beats paper.",
        "paper rock": "You win, paper beats rock.",
        "scissors rock": "You lose, rock beats scissors.",
        "paper scissors": "You lose, scissors beats paper.",
        "rock paper": "You lose, paper beats rock."};
    const result = person + " " + cpu;
    const reply = replies[result] || "draw";
    return reply;
}

function gamePlayInit(e, round) {
    const text = e.target.className;
    const userPlay = (text.match("rock") || text.match("paper") || text.match("scissors")).toString();
    const CPU = computerPlay();
    const reply = playRound(userPlay, CPU);
    comment.innerHTML = `<img src="./images/${userPlay}.png">` + `<img src="./images/${CPU}.png">`;
    comment.style.transform = "scale(1)";
    round.childNodes[0].innerText = `Rounds(${rnd})`;
    rndComment.style.transform = "scale(1)";
    return reply;
}

function gameplay(e) {
    rnd++
    const round = document.querySelector(".round");
    const cumscore = document.querySelector(".cumscore");
    const reply = gamePlayInit(e, round);
    
    if (reply.includes("win")) {
        rndComment.style.color = "green";
        rndComment.innerText = response(compliments);
        playerPoint = 1;
        computerPoint = 0;
    } else if (reply.includes("lose")){
        rndComment.style.color = "red";
        rndComment.innerText = response(criticism);
        playerPoint = 0;
        computerPoint = 1;
    } else {
        rndComment.style.color = "yellow";
        rndComment.innerText = rnd == 1 ? "Tough round" : response(["Tough round", "Pretty intense"]);
        playerPoint = 0;
        computerPoint = 0;
    }

    playerScore += playerPoint;
    computerScore += computerPoint;
    round.childNodes[1].innerText = playerPoint;
    round.childNodes[2].innerText = computerPoint;
    cumscore.childNodes[1].innerText = playerScore;
    cumscore.childNodes[2].innerText = computerScore;

    if (playerScore >=5 || computerScore >= 5) {
        comment.innerText = playerScore != computerScore ? result[playerScore > computerScore] : "A Tie";
        playerScore = 0;
        computerScore = 0;
        rndComment.style.transform = "scale(0)";
        selections.style.transform = "scale(0)";
        play.innerText = "Play Again"
        play.style.transform = "scale(1)";  
        rnd = 0;
    }
}

//Webpage initializers
const gamePlay = document.querySelector("#gameplay");
const comment = document.querySelector("#comment");
const play = document.querySelector("#play");
const selections = document.querySelector(".selections");
const table = document.createElement("table");
table.classList.add("scores");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const rndComment = document.querySelector("#rnd-comment");

play.addEventListener("click", () => {
    comment.style.transform = "scale(0)"
    selections.style.transform = "scale(1)";
    play.style.transform = "scale(0)";
    gamePlay.insertBefore(table, gamePlay.childNodes[2]);
    thead.innerHTML = "<tr><th></th><th>Player</th><th>CPU</th></tr>";
    tbody.innerHTML = "<tr class='round'><td>Round</td><td>0</td><td>0</td></tr><tr class='cumscore'><td>Cummulative score</td><td>0</td><td>0</td></tr>";
    table.appendChild(thead);
    table.appendChild(tbody);
});

//Gameplay initializers
let rnd = 0;
let playerPoint = 0;
let computerPoint = 0;
let playerScore = 0;
let computerScore = 0;
const compliments = ["Good job", "You are amazing", "Nice shot", "Impressive", "You are a natural"];
const criticism = ["Too bad", "Better luck next time", "Don't lose hope"];
const result = {true: "You Won!!!", false: "You Lost!!!"};
const btnchoice = document.querySelectorAll(".choice");
btnchoice.forEach(item => item.addEventListener("click", gameplay));


