let deck_id = 'ndtahzliqnde'

let suits =
{
    'S': 'Spades',
    'C': 'Clubs',
    'D': 'Diamonds',
    'H': 'Heart'
}

let card_value =
{
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '0': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11,
}

let card_map = {}

for (let suit in suits) {
    for (let value in card_value) {
        let newKey = value + suit;
        card_map[newKey] = card_value[value];
    }
}

async function newDeck() {
    const website = await fetch('https://www.deckofcardsapi.com/api/deck/new/');
    const response = await website.json();
    const element = document.createElement('p');
    element.textContent = JSON.stringify(response, null, 2);
    document.querySelector('main').append(element);
}



async function draw() {
    const draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const draw_response = await draw.json();
    return draw_response;
}




function calcScoreDealer(){
    let score = 0
    const dealer_element = document.querySelector('#dealer_hand');
    const cards = dealer_element.querySelectorAll('img')
    const score_div = document.querySelector('#score_dealer')
    
    cards.forEach(function (element){
        const card_code = element.getAttribute('data-value')
        if (card_code in card_map){
            const old_score = score
            score += card_map[card_code]
            if (score > 21 & card_code.includes('A')){
                score = old_score + 1
            }
        }
    });

    if (score_div.childNodes.length < 1){
        const score_element = document.createElement('p')
        score_element.classList.add('score')
        score_element.textContent = `${score}`
        score_div.append(score_element)
    }else{
        score_div.children[0].textContent = `${score}`
    }

    return score

}



function calcScorePlayer(){
    let score = 0
    const player_element = document.querySelector('#player_hand');
    const cards = player_element.querySelectorAll('img')
    const score_div = document.querySelector('#score_player')
    
    cards.forEach(function (element){
        const card_code = element.getAttribute('data-value')
        if (card_code in card_map){
            const old_score = score
            score += card_map[card_code]
            if (score > 21 & card_code.includes('A')){
                score = old_score + 1
            }
        }
    });


    if (score_div.childNodes.length < 1){
        score_div.textContent = `${score}`
    }else{
        score_div.textContent = `${score}`
    }

    return score
}



async function showTwoCards(){
    const dealer_element = document.querySelector('#dealer_hand');
    const player_element = document.querySelector('#player_hand');
    const draw_promises  = [draw(), draw(), draw(), draw()];
    const cards = await Promise.all(draw_promises);
    


    cards.forEach(function (card, index){
        const card_img = document.createElement('img');
        card_img.classList.add('card_img');
        card_img.alt = 'Image of a Card from deckofcardsapi.com';
        card_img.setAttribute('data-value', card.cards[0].code);
        if (index === 3){
            card_img.src = 'https://www.deckofcardsapi.com/static/img/back.png';
        }else{
            card_img.src = card.cards[0].image;
        }

        if (index % 2 === 0){
            player_element.append(card_img);
        }else{
            dealer_element.append(card_img);
        }
    });
}



async function showOnePlayer(){
    const player_element = document.querySelector('#player_hand');
    const draw_promises  = [draw()];
    const cards = await Promise.all(draw_promises);
    


    cards.forEach(function (card){
        const card_img = document.createElement('img');
        card_img.classList.add('card_img');
        card_img.alt = 'Image of a Card from deckofcardsapi.com';
        card_img.setAttribute('data-value', card.cards[0].code);
        card_img.src = card.cards[0].image;
        player_element.append(card_img);
    });
}



async function showOneDealer(){
    const dealer_element = document.querySelector('#dealer_hand');
    const draw_promises  = [draw()];
    const cards = await Promise.all(draw_promises);
    


    cards.forEach(function (card){
        const card_img = document.createElement('img');
        card_img.classList.add('card_img');
        card_img.alt = 'Image of a Card from deckofcardsapi.com';
        card_img.setAttribute('data-value', card.cards[0].code);
        card_img.src = card.cards[0].image;
        dealer_element.append(card_img);
    }); 
}



async function flipHidden(){
    const dealer_element = document.querySelector('#dealer_hand');
    const hidden_card = dealer_element.children[1];
    hidden_card.src = `https://deckofcardsapi.com/static/img/${hidden_card.getAttribute('data-value')}.png`;
}



async function startGame() {
    const initial_shuffle = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
    const shuffle_response = await initial_shuffle.json();
    if (shuffle_response.success === true){
        await showTwoCards()
        const playerScore = calcScorePlayer()
        if (playerScore === 21){
            await flipHidden()
            declareWinner()
            setTimeout(() => {
                startGame();
            }, 5000)
        }
    }
}


async function playDealer(){
    let score = calcScoreDealer()

    while (score < 17){
        await showOneDealer()
        score = calcScoreDealer();
    }
}

function clearBoard(){
    const images = document.querySelectorAll('.table img')
    const dealer_score = document.querySelector('#score_dealer')
    const player_score = document.querySelector('#score_player')
    images.forEach(element => element.remove())
    dealer_score.textContent = ''
    player_score.textContent = ''
}

function declareWinner(){
    let playerScore = document.querySelector('#score_player')
    let dealerScore = document.querySelector('#score_dealer')
    const interval = setInterval(() => {
        dealerScore = document.querySelector('#score_dealer')
        if (dealerScore) {
            clearInterval(interval)
        }
    }, 50)
    const text = document.createElement('h1')
    const winner = document.createElement('h1')
    if (parseInt(playerScore.textContent) > parseInt(dealerScore.textContent) && parseInt(playerScore.textContent) <= 21){
        const winner_div = document.querySelector('#winner')
        text.textContent = `PLAYER WINS WITH ${playerScore.textContent}`
        winner_div.append(text)
        winner_div.classList.remove('hidden')
        setTimeout(() => {
            winner_div.classList.add('hidden')
            clearBoard()
            startGame()
            text.remove()
        }, 5000)
    }else if (parseInt(dealerScore.textContent) === parseInt(playerScore.textContent)){
        const winner_div = document.querySelector('#winner')
        text.textContent = `PLAYERS PUSH WITH ${dealerScore.textContent}`
        winner_div.append(text)
        winner_div.classList.remove('hidden')
        setTimeout(() => {
            winner_div.classList.add('hidden')
            clearBoard()
            startGame()
            text.remove()
        }, 5000)
    }else{
        const loser_div = document.querySelector('#loser')
        text.textContent = `DEALER WINS WITH ${dealerScore.textContent}`
        loser_div.append(text)
        loser_div.classList.remove('hidden')
        setTimeout(() => {
            loser_div.classList.add('hidden')
            clearBoard()
            startGame()
            text.remove()
        }, 5000)
    }
}

function disableButtons(duration) {
    hit.disabled = true;
    stand.disabled = true;
    setTimeout(() => {
        hit.disabled = false;
        stand.disabled = false;
    }, duration);
}


const hit = document.querySelector('#hit')
const stand = document.querySelector('#stand')

startGame()


let isProcessing = false;

hit.addEventListener('click', async function () {
    if (isProcessing) return;

    isProcessing = true;
    disableButtons(750);

    await showOnePlayer();
    const score = calcScorePlayer();

    if (score > 21) {
        await flipHidden()
        disableButtons(5000);
        calcScoreDealer()
        declareWinner()
        setTimeout(() => {
            isProcessing = false;
        }, 5000);
    } else {
        isProcessing = false;
    }
});




stand.addEventListener('click', async function() {
    if (isProcessing) return;
    stand.disabled = true;
    hit.disabled = true;

    await flipHidden()
    await playDealer()

    declareWinner()

    setTimeout(function() {
        stand.disabled = false;
        hit.disabled = false;
    }, 5000);
})