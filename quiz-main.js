(function () {

    var currentLocale = window.location.hostname.substring(window.location.hostname.lastIndexOf('.')+1);

    var localizedTexts = {
        'complete-quiz-btn': {
            dk: 'Færdig',
            se: 'Färdiga',
            fi: 'Päättynyt',
            no: 'Ferdig',
            nl: 'Afgewerkt'
        },
        'incorrect-answers': {
            dk: ' forkerte svar',
            se: ' fel svar',
            fi: ' väärin',
            no: ' feil svar',
            nl: ' fout antwoord'
        },
        'percentage': {
            dk: 'Procent rigtige svar: ',
            se: 'Procentuella rätta svaren: ',
            fi: 'Oikein: ',
            no: 'Prosent riktige svar: ',
            nl: 'Percentage correcte antwoorden: '
        },
        'correct-answers': {
            dk: ' korrekte svar',
            se: ' rätt svar',
            fi: ' oikein',
            no: ' riktig svar',
            nl: ' correct antwoord'
        },
        'quiz-error': {
            dk: 'Venligst besvar alle spørgsmål før du fuldfører quiz’en',
            se: 'Vänligen svara på alla frågor innan du slutför frågesport',
            fi: 'Vastaa kaikkiin kysymyksiin ennen kuin täydellinen tietokilpailu',
            no: 'Vennligst svar på alle spørsmålene før du har fullført quizen',
            nl: 'Gelieve alle vragen te beantwoorden voordat je de quiz te voltooien'
        }
    };


    function getQuizResultHtml(quiz) {

        return '<ul class="quiz-results-stats list-unstyled">'+
        '<li class="incorrect-answers">'+
        '<img src="http://scripts.interactives.dk/quiz/img/icon_incorrect_30.png" alt=""/> '+quiz.wrongAnswers+localizedTexts['incorrect-answers'][currentLocale]+
        '</li>'+
        '<li class="correct-answers">'+
        '<img src="http://scripts.interactives.dk/quiz/img/icon_correct_30.png" alt="" /> '+quiz.correctAnswers+localizedTexts['correct-answers'][currentLocale]+
        '</li>'+
        '<li class="percentage">'+
        '<img src="http://scripts.interactives.dk/quiz/img/icon_graph_30.png" alt="" /> '+localizedTexts['percentage'][currentLocale]+quiz.percentageCorrect+'%'
        '</li>'+
        //'<li class="rating last">Resultat: Du er godt på vej.</li>'+
        '</ul>';
    }

    document.getElementById('complete-quiz-btn').innerHTML = localizedTexts['complete-quiz-btn'][currentLocale];
    document.getElementById('quiz-error').innerHTML = localizedTexts['quiz-error'][currentLocale];

    window.BonnierQuiz = {
        calculateQuizResults: function() {

            var quiz = {
                correctAnswers: 0,
                wrongAnswers: 0,
                questions: {},
                totalQuestions: 0,
                choices: null,
                totalAnswers: 0,
                percentageCorrect: 0
            };

            quiz.choices = document.getElementsByClassName('quiz-choice');

            for (var i = 0; i < quiz.choices.length; i++) {
                if(quiz.choices[i].checked) {
                    if(quiz.choices[i].dataset.correct == 'true') {
                        quiz.correctAnswers++;
                    } else {
                        quiz.wrongAnswers++;
                    }
                }
                if(typeof quiz.questions[quiz.choices[i].name] === 'undefined') {
                    quiz.questions[quiz.choices[i].name] = null;
                    quiz.totalQuestions++;
                }
            }

            quiz.totalAnswers = quiz.correctAnswers + quiz.wrongAnswers;
            quiz.percentageCorrect = parseInt((quiz.correctAnswers/quiz.totalQuestions)*100);

            if(quiz.totalAnswers != quiz.totalQuestions || quiz.totalAnswers == 0) {
                document.getElementById('quiz-error').style.display = 'block';
            } else {
                document.getElementById('quiz-wrapper').innerHTML = getQuizResultHtml(quiz);
                document.getElementsByClassName('article-header')[0].scrollIntoView(true);
            }

        }
    }

})();
