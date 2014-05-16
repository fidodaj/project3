window.onload = function(){
	var deck = createDeck();
    setnames();
	showDeck(deck);
	layout_cards();
    player1score= 0;
    player2score= 0;

    whos_turn = true;
    changeturn();
    $( ".cover" ).click(function() {
        flipcard($(this));
    });
}

function window_setup(){
    $(".sideBox").html('');
    var deck = createDeck();
    setnames();
    showDeck(deck);
    layout_cards();
    player1score= 0;
    player2score= 0;
    updatescores();
    whos_turn = true;
    changeturn();
    $( ".cover" ).click(function() {
        flipcard($(this));
    });
}

function createDeck() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
    var ranks = ["A", "K" , "Q", "J"]; // Limit to royals.
    var suits = ["♣", "♦", "♥", "♠"]; // Add the unicode signs of the cards eg. ♠,♥,♦,♣
    var j, k, index=0;
    var pack_size;

    // Set array of cards.
    // total number of cards
    pack_size = ranks.length * suits.length;
    var cards = [];


    // Fill the array with 'n' packs of cards.
    while (index < (pack_size)){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
    console.log(cards.length);
    return cards;
}

// creates the card divs and adds them to side box. Also adds class
// Card is also given id. 
function showCards(cardJSON, card_num) {
    txt = cardJSON.rank + cardJSON.suite;    
    card = document.createElement("div");
    card2 = document.createElement("div");
    card.innerHTML = "<p>"+cardJSON.rank+"</p>";
    card2.innerHTML = "<p>"+cardJSON.rank+"</p>";
    card.classList.add('card');
    card2.classList.add('card');
    card.classList.add(txt);
    card2.classList.add(txt);

    if (cardJSON.suite=='♥') {
        card.classList.add('heart_suit');
        card2.classList.add('heart_suit');
    } else if(cardJSON.suite =='♦' ){
        card.classList.add('diamond_suit');
        card2.classList.add('diamond_suit');
    }else if(cardJSON.suite =='♣'){
        card.classList.add('club_suit');
        card2.classList.add('club_suit');
    }else{
        card.classList.add('spade_suit');
        card2.classList.add('spade_suit');
    };
    document.querySelector(".sideBox").appendChild(card);
    document.querySelector(".sideBox").appendChild(card2);
}

function showDeck(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            showCards(deck[idx], idx);
    }
}
// Arranges the cards on the document and creates covers for them
function layout_cards(){
    var  cards = [].slice.call(document.getElementsByClassName('card'));
    console.log(cards);
    var shuffled = shuffle(cards);
    console.log(cards);
    var index= 0;
    for (var h =0; h<4;h++) {
        for (var w =0; w<8;w++){
            cards[index].style.top= (h*2.6)+"em";
            cards[index].style.left= (w*2.1)+"em"; 
            cards[index].id = index;
            cover = document.createElement("div");
            cover.classList.add("cover");
            cover.classList.add(index);
            // console.log("the cover is linked to " + cover.classList[1])
            document.querySelector(".sideBox").appendChild(cover);
            cover.style.top= (h*2.6)+"em";
            cover.style.left= (w*2.1)+"em";
            index++;
        };
    };

    if (localStorage.attempts== null) {
        localStorage.attempts= 1;
    } else{
        localStorage.attempts = parseInt(localStorage.attempts)+1;
    };

   
}

function shuffle(list){
    for (var i = list.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}

function setnames () {
    playernames = JSON.parse(localStorage.playernames);
    dog = (playernames);
    $("#playername1").text(playernames.player1);
    $("#playername2").text(playernames.player2);
}


function flipcard(e){
    
    console.log(e);
    $('.flip').get(0).play();
    classes= e.attr('class').match(/[\d\w-_]+/g);
    card_id= classes[1];
    e.addClass('flippedcover');
    $('#'+card_id).addClass('flipped');
    console.log("class changed");
    setTimeout(checkmatch, 700);
    console.log("Changing turns");
    
    
}

function checkmatch(){
    var check= $('.flipped');
    if (check.length>=2) {
        
        var card1= check[0];
        console.log(card1);
        id1=card1.className.match(/[\d\w-_♣♦♥♠]+/g)[1];
        console.log(id1);
        var card2 = check[1];
        id2=card2.className.match(/[\d\w-_♣♦♥♠]+/g)[1];
        console.log(id2);
        if (id1==id2) {
            $('.ping').get(0).play();
            $('.flipped').addClass('permflipped');
            $('.permflipped').removeClass('flipped');
            $('.flippedcover').addClass('permflippedcover');
            $('.permflippedcover').removeClass('flippedcover');
            if (whos_turn) {
                player1score++;
            } else{
                player2score++;
            };
            updatescores();

        }else{
            $(".flipped").removeClass('flipped');
            $('.flippedcover').removeClass('flippedcover');
            whos_turn= (!whos_turn);
            changeturn();
        }
        win_check();
        
        
        
    };
    
}

function changeturn(){
    if (whos_turn) {
        $('#player1').addClass('playingplayer');
        $('#player2').removeClass('playingplayer');
    } else{
        $('#player2').addClass('playingplayer');
        $('#player1').removeClass('playingplayer');
    };
}

function updatescores(){
    $("#player1score").text(player1score);
    $("#player2score").text(player2score);
}

function win_check() {
    if ($('.permflippedcover').length ==$('.card').length) {
            $('.clap').get(0).play();
            if (player1score>player2score) {
                alert("Player 1 Wins");
            };
            if (player2score>player1score) {
                alert("Player 2 Wins");
            }else{
                alert("Its a draw");
            }

            window_setup();

    };
}

function save_game() {
    localStorage.game_state = $('.sideBox').html();
    localStorage.player1score = player1score;
    localStorage.player2score = player2score
}

function load_game(){

    
    $('.sideBox').html(localStorage.game_state);
    var deck = createDeck();
    setnames();
    showDeck(deck);
    layout_cards();
    player1score= parseInt(localStorage.player1score);
    player2score= parseInt(localStorage.player2score);
    updatescores();
    whos_turn = true;
    changeturn();
    $( ".cover" ).click(function() {
        flipcard($(this));
    });


}