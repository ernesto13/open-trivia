$(document).ready(() => {

  let scoreCard = $('.score-card');
  let jumbotron = $('.jumbotron');
  jumbotron.show();
  scoreCard.hide();

  //   darkmode 
  var options = {
    bottom: '64px', // default: '32px'
    right: '32px', // default: '32px'
    left: 'unset', // default: 'unset'
    time: '0.8s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff', // default: '#fff'
    buttonColorDark: '#100f2c', // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);
  darkmode.showWidget();




  const API = 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple';
  var xhr = $.get(API);
  xhr.done(function(data) {

    console.log("success got data", data);

    let correctChoice = 0;
    let incorrectChoice = 0;
    let missed = 0;
    let nextQuest = 0;
    let questCount = 0;
    let inverval;
    let timeLeft;
    let dataArray = data.results;

    let playTrivia = function() {
      if(nextQuest < 20) {
        
        
//         inside of if 
        
        
        
//         end of if
        let categoryDisplay = dataArray[nextQuest].category;
      console.log('cat disp: ' + categoryDisplay);

      let correctAnswer = dataArray[nextQuest].correct_answer;
      console.log('correct answer: ' + correctAnswer);
      let wrongAnswers = dataArray[nextQuest].incorrect_answers;
      console.log('wrongAnswers' + wrongAnswers);

      let question = $('<h3>').html(dataArray[nextQuest].question);
      wrongAnswers.push(correctAnswer);
      wrongAnswers.sort();
      $('.category').empty().append(categoryDisplay);
      $('#question').empty().append(question);
      //     for loop here

      $.each(wrongAnswers, function(index, value) {

        let newDiv = $("<div>").addClass("answer btn btn-primary mb-2 ml-3").html(value);
        if (value === correctAnswer) {
          console.log('if value correctAnswer: ' + correctAnswer);
          newDiv.attr("id", "correctAnswer");

        }
        $("#question").append(newDiv);
      });

      $('.answer').on('click', function() {

        if (this.id === "correctAnswer") {
          correctChoice++;
          console.log('corrrrecto: ' + correctAnswer + correctChoice);
          $('#wins').html('Correct: ' + correctChoice);
          $(this).addClass("correctAnswer");
          nextQuest++;
          playTrivia();
        } else {
          incorrectChoice++;

          $('#losses').html('Incorrect: ' + incorrectChoice);
          $(this).addClass('incorrectAnswer');
          nextQuest++;
          playTrivia();
        }


      });
        
        
      } else {
        scoreCard.show();
        jumbotron.hide();
       
      }



    }
    //     end of function
    
    
    playTrivia();


  });

});