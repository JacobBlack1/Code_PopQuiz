var questions = [
    {
        title: "What does Html stand for?",
        choices: ["Hyper Text Markup Language", "Hyper Tent Mom Land", "HTml", "nothing"],
        answer: "Hyper Text MarkUp Language"
    },
    {
        title: "js stands for?.",
        choices: ["jelly slime", "jerk slum", "jam slam", "Java script"],
        answer: "Java script"
    },
    {
        title: "What tag defines the body of the HTML document, and usually includes all the contents such as the text, hyperlinks, images, tables, lists, and more?",
        choices: ["<head></head>", "<body></body>", "<title></title>", "<br>"],
        answer: "<body></body>"
    },
    {
        title: "What ar the git push comands?",
        choices: ["Git add, git commit, git push", "git push, git add, git commit", "git, githelp, gitquit "],
        answer: "<Git add, git commit, git push>"
    },
    {
        title: "CSS stands for ____ Style Sheets.",
        choices: ["Curious", "Concept", "Cascading", "Concave"],
        answer: "Cascading"
    }
];


var totalTime = 60;
var start = document.querySelector("#startQuiz");
var count = 0;
var totalPoints = 0;
var scoreH1 = document.querySelector("#score");
var lastQ = false;
var submitBtn = document.querySelector("#submit");
var highscore;
var highscoreBtn = document.querySelector("#highscores");
var scoresDiv = document.querySelector("#scoresDiv");

highscoreBtn.addEventListener("click", function () {
	document.getElementById("highscoreDisp").innerHTML = "";
	var hsList = JSON.parse(localStorage.getItem("Highscore")).highscoreArr || [];
	if (scoresDiv.style.display === "none") {
		scoresDiv.style.display = "flex";
		hsList.map(a => {
			var ele = document.createElement("h3");
			var node = document.createTextNode(a);
			ele.appendChild(node);
			document.getElementById("highscoreDisp").appendChild(ele);
		});
	} else {
		scoresDiv.style.display = "none";

	}
	console.log("Hello");
});

submitBtn.addEventListener("click", function () {
	if (localStorage.getItem("Highscore") === null) {
		localStorage.setItem("Highscore", JSON.stringify({
			highscore: 0,
			highscoreArr: []
		}));
	}

	var input = document.querySelector("#initials").value;
	var score = totalPoints + totalTime;
	highscore = JSON.parse(localStorage.getItem("Highscore")).highscore;
	var allscores = JSON.parse(localStorage.getItem("Highscore")).highscoreArr;

	if (score > highscore) {
		highscore = score;
	}
	allscores.push(input + score);
	localStorage.setItem('Highscore', JSON.stringify({
		highscore,
		highscoreArr: allscores
	}));

	startAgain();
});


var startOverScreen = document.querySelector("#startOver");
var restartBtn = document.querySelector("#restart");

function startAgain() {
	endQuiz.style.display = "none";
	startOverScreen.style.display = "flex";
}

restartBtn.addEventListener("click", function () {
	totalTime = 75;
	count = 0;
	totalPoints = 0;
	lastQ = false;
	startDiv.style.display = "block";
	quizDiv.style.display = "none";
	startOverScreen.style.display = "none";
});

endGame = () => {
	lastQ = true;
	quizDiv.style.display = "none";
	endQuiz.style.display = "block";
	var score = totalPoints + totalTime;
	scoreH1.textContent = score;
};

answeredRight = () => {
	alert("YOU GOT IT RIGHT!");
	totalPoints += 10;
	console.log(highscore);
	count++;
	if (count === questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};

answeredWrong = () => {
	alert("YOU GOT IT WRONG!");
	totalPoints -= 5;
	count++;
	totalTime -= 10;
	if (count === questions.length) {
		endGame();
	} else {
		generateQuestions();
	}
};

generateQuestions = () => {
	document.getElementById("quizQ").innerHTML = questions[count].title;
	document.getElementById("choiceBtns").innerHTML = "";

	questions[count].choices.map((choice, i) => {
		var btn = document.createElement("button");
		var textnode = document.createTextNode(choice);
		btn.appendChild(textnode);
		document.getElementById("choiceBtns").appendChild(btn);
		btn.setAttribute("data", choice);
		btn.setAttribute("id", `btn${i}`);
		btn.setAttribute("answer", questions[count].answer);

		document.querySelector(`#btn${i}`).addEventListener("click", function (e) {
			console.log(e.target.getAttribute("data"));
			if (e.target.getAttribute("data") === e.target.getAttribute("answer")) {
				answeredRight();
			} else {
				answeredWrong();
			}
		});
	});
};
var timerSpan = document.querySelector("#timer");
var startDiv = document.querySelector("#startDiv");
var quizDiv = document.querySelector("#quizDiv");
var endQuiz = document.querySelector("#endQuiz");

start.addEventListener("click", function () {
	console.log(totalTime);
	startDiv.style.display = "none";
	quizDiv.style.display = "block";
	generateQuestions();

	var interval = setInterval(function () {
		totalTime--;
		timerSpan.innerHTML = totalTime;
		console.log("tick .. " + totalTime);
		if (totalTime === 0 || lastQ) {
			clearInterval(interval);
			console.log("Time's out");
			endGame();
		}
	}, 1000);

});