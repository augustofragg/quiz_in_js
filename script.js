//Initial Data

let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

//events

document.querySelector('.scoreArea button').addEventListener('click',resetQuiz);


//functions

function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion/questions.length) * 100);

        document.querySelector('.progress .progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';

        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionshtml = '';

        for(let i in q.options) {
            optionshtml += `<div data-op=${i} class='option'><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionshtml; 
        
        document.querySelectorAll('.option').forEach((item) =>{
            item.addEventListener('click',clickQuestion);
        });
    }
    else {
        finishQuiz();
    }
}

function clickQuestion(e) {
   
   let clickedOption = parseInt(e.target.getAttribute('data-op'))

   if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;    
   }

   currentQuestion++;
  
   showQuestion();
}

function finishQuiz() {
    let points =  Math.floor((correctAnswer/questions.length) *100)

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    
    }

    document.querySelector('.scorePct').innerHTML = `Acerto ${points}%`;
    document.querySelector('.scoreText2').innerHTML =  `Você responde ${questions.length} e acertou ${correctAnswer}.` ;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswer = 0;

    showQuestion();
}

