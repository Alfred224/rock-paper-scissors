function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
};

function playRound(playerSelection="", computerSelection="") {
    const person = playerSelection.toLowerCase(), cpu = computerSelection.toLowerCase();
    const replies = {"rock scissors": "You win, rock beats scissors.",
        "scissors paper": "You win, scissors beats paper.",
        "paper rock": "You win, paper beats rock.",
        "scissors rock": "You lose, rock beats scissors.",
        "paper scissors": "You lose, scissors beats paper.",
        "rock paper": "You lose, paper beats rock."};
    const result = person + " " + cpu;
    return replies[result];
}

function game() {
    const playerRecord = [];
    const cpuRecord = [];
    const result = {true: "Winner", false: "Loser"}
    for (let i = 0; i < 5; i++) {
        let reply;
        do {
            reply = playRound(prompt("Make a choice."), computerPlay());
        } while(!reply);
        alert(reply);
        reply.includes("win") ? (playerRecord.push(1), cpuRecord.push(0)) : (playerRecord.push(0), cpuRecord.push(1));
    }
    const playerScore = playerRecord.reduce((a, b) => a + b);
    const cpuScore = cpuRecord.reduce((a, b) => a + b);
    return result[playerScore > cpuScore];
}

game()


