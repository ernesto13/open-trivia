$(document).ready(() => {

  let scoreCard = $('.score-card');
  let jumbotron = $('.jumbotron');
  let jumbotronFluid = $('.jumbotron-fluid');
  let startForm = $('#choose-form');
  let generalBtn = $('#general-knowledge');
  let categoryDisp = $('.category');
  let restart = $('#start-over');
  let modalScore = $('#modal-score');
  jumbotronFluid.show();
  restart.hide();
  categoryDisp.hide();
  startForm.show();
  jumbotron.hide();


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
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);
  darkmode.showWidget();


  // end of darkmode

  function generalKnowledge() {


    const API = "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple";

    $.ajax({
      url: API,
      method: "GET"
    }).then(function(data) {

      console.log("success got data", data);

      let correctChoice = 0;
      let incorrectChoice = 0;
      let missed = 0;
      let nextQuest = 0;
      let questCount = 0;
      let interval;
      let timeLeft;
      let dataArray = data.results;



      function playTrivia() {
        if (nextQuest < 15) {

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

            let newDiv = $("<div>").addClass("answer btn btn-primary btn-block active mb-2").html(value);
            if (value === correctAnswer) {
              console.log('if value correctAnswer: ' + correctAnswer);
              newDiv.attr("id", "correctAnswer");

            }
            $("#question").append(newDiv);
          });

          timeLeft = 15;


          interval = setInterval(function() {
            if (timeLeft === 0) {
              //             put missed here and time up and add to missed
              missed++;
              questCount++
              $('.question-count').html('Question ' + questCount + ' out of 15')
              $('#missed').html('Missed: ' + missed);
              $('.time').html('Time is UP!');

              clearInterval(interval);
              $("#correctAnswer").addClass("btn btn-info animated bounce faster");
              //             correctAnswer

              setTimeout(function() {
                nextQuest++;
                playTrivia();
              }, 2000);

            } else {
   
              $('.time').html('<i class="fas fa-stopwatch"></i> ' + timeLeft);
              timeLeft--;

            }
          }, 1000);


          //  start over button here
          restart.on('click', function(e) {
            e.preventDefault();
            scoreCard.hide();
            jumbotronFluid.fadeIn('slow');
            startForm.fadeIn('slow');
            restart.hide();
            window.location.reload();
            categoryDisp.html('');
            correctChoice = 0;
            incorrectChoice = 0;
            missed = 0;

          });


          $('.answer').on('click', function() {
            clearInterval(interval);
            $('.answer').off('click');
            if (this.id === "correctAnswer") {
              correctChoice++;
              questCount++
              $('.question-count').html('Question ' + questCount + ' out of 15')
              console.log('corrrrecto: ' + correctAnswer + correctChoice);
              $('#wins').html('Correct: ' + correctChoice);
              $(this).addClass("btn btn-info animated bounce faster");
              $('.time').html('Correct!');

            } else {
              incorrectChoice++;

              questCount++
              $('.question-count').html('Question ' + questCount + ' out of 15')
              $('#losses').html('Incorrect: ' + incorrectChoice);
              $(this).addClass('btn btn-danger animated shake faster');
              //             incorrectAnswer

              setTimeout(function() {
                $("#correctAnswer").addClass("btn btn-info animated bounce faster");
                //               correctAnswer
              }, 2000);

            }

            setTimeout(function() {
              nextQuest++;

              playTrivia();
            }, 3500);


          });


        } else {
          modalScore.modal('show');
          restart.fadeIn('slow');

          jumbotron.hide();
          generalKnowledge();

        }

      }

      //     end of function

      // start trivia button
      generalBtn.on('click', function(e) {
        e.preventDefault();
        jumbotronFluid.hide();
        playTrivia()
        startForm.hide();
        jumbotron.show();
        categoryDisp.fadeIn('slow');

      });

    });

  }

  generalKnowledge()

});