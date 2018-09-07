# inputQuizz
>  inputQuizz is a JS plugin that generates boxes containing letters in relation to an answer, other letters are added randomly
the user can click on the letters or use the keyboard.
<img src="https://image.noelshack.com/fichiers/2018/34/5/1535096645-pg.png" alt="exemple1">
<img src="https://image.noelshack.com/fichiers/2018/34/5/1535096785-pg2.png" alt="exemple2">


### How init this project ?

#### in your file JS : 

```
$(document).ready(function () {
      var PGQuizz = $('#content-input').PGAnswerInput({'answer':"mcdonald's",functionCallback:YOUR_FUNCTION});
      
      
      // callback user send
      YOUR_FUNCTION(answerUser){
     
      }
      
      // OR 
     var PGQuizz = $('#content-input').PGAnswerInput({'answer':"mcdonald's"});
     
     $('#valide').on('click',function(){
            PGQuizz.checkAnswerIsRight(); // return true | false
     })
      
  });
```

####Available function : 

 * checkAnswerIsRight
 * clearAll
 * BGcolorAnswerLetter

