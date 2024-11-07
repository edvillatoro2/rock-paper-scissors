const closeBtn = document.querySelector('.close-btn')
const rulesBtn = document.querySelector('.rules-btn')
const modal = document.querySelector('.modal')
const selectedsBtns = document.querySelectorAll('.btn-selected')
const choices = [
    {
        name: "rock",
        beats: "scissors"
    },
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    }
]
const game = document.querySelector('.game')
const getResults = document.querySelector('.results')
const getResult = document.querySelectorAll('.result')
const resultWinner = document.querySelector(".winner");
const resultText = document.querySelector(".results-text");

const playAgainBtn = document.querySelector(".play-again");

const scoreTotal = document.querySelector(".number");
let score = 0;
// toggle rules button
rulesBtn.addEventListener('click', () => {
    modal.classList.toggle('show-modal')
})
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})

// game result(s)
selectedsBtns.forEach(button => {
    button.addEventListener('click', () => {
        let choiceName = button.dataset.choice;
        let choice = choices.find(choice => choice.name === choiceName)
        chose(choice)
    })
})

function chose(choice) {
    let aiChoice = aiChose()
    displayResult([choice, aiChoice]);
    displayWinner([choice, aiChoice]);
}

function aiChose() {
    let random = Math.floor(Math.random() * choices.length)
    return choices[random]
}

function displayResult(res) {
    getResult.forEach((getResults, indx) => {
        setTimeout(() => {
            getResults.innerHTML = `<div class="choice ${res[indx].name}">
            <img src="images/icon-${res[indx].name}.svg" alt=" ${res[indx].name}"/></div>`;
        }, indx * 1000)
    })

    game.classList.toggle("hidden");
    getResults.classList.toggle("hidden");
}

function displayWinner(res) {
    setTimeout(() => {
      let userWins = isWinner(res);
      let aiWins = isWinner(res.reverse());
  
      if (userWins) {
        resultText.innerText = "you win";
        getResult[0].classList.toggle("winner");
        keepScore(1);
      } else if (aiWins) {
        resultText.innerText = "you lose";
        getResult[1].classList.toggle("winner");
        keepScore(-1);
      } else {
        resultText.innerText = "draw";
      }
      resultWinner.classList.toggle("hidden");
      getResults.classList.toggle("show-winner");
    }, 1000);
  }

  function isWinner(res) {
    return res[0].beats === res[1].name;
  }

  function keepScore(point) {
    score += point;
    scoreTotal.innerText = score;
  }

  // Play Again
playAgainBtn.addEventListener("click", () => {
    game.classList.toggle("hidden");
    getResults.classList.toggle("hidden");
  
    getResult.forEach((getResults) => {
      getResults.innerHTML = "";
      getResults.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    getResults.classList.toggle("show-winner");
  });