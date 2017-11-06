$.fn.PGAnswerInput = function(data) {
    var answer = data.answer;
    var contentId = '#' + this[0].id;
    var letters = [];
    var suffleLetterContentId = 'contentShuffleLetter';
    var AnswerContentId = 'contentAnswerLetter';
    var voyelles = ['a', 'e', 'i', 'o', 'u'];
    var randomVoyelles = [];

    CreateDivAnswerLetters();
    CreateDivSuffleLetters();

    generateAnswerInput();

    parseAnswer(letters);

    keyPressPage();
    clickShuffleSpan();
    clickAnswerSpan();


    // generate letters
    function parseAnswer(letters) {
        addOtherLetters();
        letters = letters.concat(randomVoyelles);
        shuffle(letters);
        for (var i = 0; i < letters.length; i++) {
            generateLetter(letters[i]);
        }
    }

    function addOtherLetters() {
        for(var i = 0; i< letters.length;i++){
            var rand = random(0, voyelles.length);
            randomVoyelles.push(voyelles[rand]);
        }
    }

    // generate element in page
    function generateLetter(letter) {
        var span = document.createElement('span');
        var textnode = document.createTextNode(letter);
        span.className = 'letter';
        span.appendChild(textnode);
        $('#' + suffleLetterContentId)[0].append(span);
    }

    function generateAnswerInput() {
        for (var i = 0; i < answer.length; i++) {
            var span = document.createElement('span');
            // todo change this
            if (answer[i] === "'") {
                var textnode = document.createTextNode("'");
                span.appendChild(textnode);
            } else {
                span.className = 'letter blank';
                letters.push(answer[i]);
            }
            $('#'+AnswerContentId)[0].append(span);
        }
    }

    function CreateDivSuffleLetters() {
        var div = document.createElement('div');
        div.id = suffleLetterContentId;
        $(contentId)[0].append(div);
    }

    function CreateDivAnswerLetters() {
        var div = document.createElement('div');
        div.id = AnswerContentId;
        $(contentId)[0].append(div);
    }

    // utils
    function shuffle(a) {
        for (var i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    function random(min, max) {
        return (Math.floor((max - min) * Math.random()) + min);
    }

    function checkAnswerIsRight(userAnswer) {
        if(userAnswer == answer){
            alert('Bravo !!!');
        }else{
            alert(':(');
        }
    }

    // event users
    function keyPressPage() {
        document.onkeypress = function (e) {
            e = e || window.event;
            if(e.keyCode === 8){
                removeLastUsedSpanContentAnswer();
                return;
            }
            searchValueSpanShuffleLetter(e.key);
        };
    }

    function clickShuffleSpan() {
        $('#'+suffleLetterContentId+' .letter').on( "click", function() {
            if($(this).hasClass('used')){
                return;
            }
            $(this).addClass('used');
            var textSpan = $(this).html();
            AddContentAnswer(textSpan);
        });
    }
    function clickAnswerSpan() {
        $('#'+AnswerContentId+' .letter').on( "click", function() {
            if($(this).hasClass('blank')){
                return;
            }
            $(this).addClass('blank');
            var textSpan = $(this).html();
            $(this).text('');
            searchValueSpanShuffleLetter(textSpan,  true);
        });
    }

    function searchValueSpanShuffleLetter(letterToSearch, removeUsed) {
        var div = $('#'+suffleLetterContentId)[0];

        var spans = div.getElementsByTagName("span");

        for(var i=0;i<spans.length;i++)
        {
            var classValue = $(spans[i]).attr('class');

            classValue =  classValue.split(" ");

            if(!removeUsed){
                if(spans[i].innerHTML === letterToSearch && classValue[1] !== 'used'){
                    $(spans[i]).addClass('used');
                    AddContentAnswer(letterToSearch);
                    break;
                }
            }else{
                if(spans[i].innerHTML === letterToSearch && classValue[1] === 'used'){
                    $(spans[i]).removeClass('used');
                    break;
                }
            }
        }
    }

    function AddContentAnswer(letter) {
        var div = $('#'+AnswerContentId)[0];
        var spans = div.getElementsByTagName("span");
        const regex = /blank/g;

        for(var i=0;i<spans.length;i++)
        {
            var classValue = $(spans[i]).attr('class');
            var isUsedLetter =  regex.exec(classValue);
            if(isUsedLetter !== null){
                var curentSpan = $(spans[i]);
                curentSpan.removeClass('blank');
                curentSpan.text(letter);
                break;
            }
        }

        // check end letter
        if($('#'+AnswerContentId +' span:not(.blank).letter').length === letters.length){
            var rep = '';
            for(var i=0;i<spans.length;i++) {
                rep+=spans[i].innerHTML;
            }
            checkAnswerIsRight(rep);
            return;
        }
    }

    function removeLastUsedSpanContentAnswer() {
        var div = $('#'+AnswerContentId)[0];

        var spans = div.getElementsByTagName("span");

        for(var i = spans.length - 1; i >=  0;i--)
        {
            var isLetter =  $(spans[i].classList.contains('letter'));
            var isBlank =  $(spans[i].classList.contains('blank'));

            if(isLetter[0] && !isBlank[0]){
                $(spans[i]).addClass('blank');
                var textSpan = $(spans[i]).html();
                $(spans[i]).text('');
                searchValueSpanShuffleLetter(textSpan,  true);
                break;
            }
        }
    }
};