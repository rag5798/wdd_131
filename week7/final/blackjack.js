let deck_id = '6wlgxbis9nli'

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
            if (score > 21 & card_code.match('A.')){
                score = old_score + 1
            }
        }
    });

    if (score_div.childNodes.length < 1){
        const score_element = document.createElement('p')
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
            if (score > 21 & card_code.match('A.')){
                score = old_score + 1
            }
        }
    });


    if (score_div.childNodes.length < 1){
        const score_element = document.createElement('p')
        score_element.textContent = `${score}`
        score_div.append(score_element)
    }else{
        score_div.children[0].textContent = `${score}`
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
        card_img.alt = 'Image of a Card from deckofcardsapi.com';
        card_img.setAttribute('data-value', card.cards[0].code);
        card_img.src = card.cards[0].image;
        dealer_element.append(card_img);
    }); 
}



async function flipHidden(){
    return new Promise((resolve) => {
        // Simulate a delay for the hidden card flip
        setTimeout(() => {
            const dealer_element = document.querySelector('#dealer_hand');
            const hidden_card = dealer_element.children[1];

            // Change the card's `src` attribute to display the actual card image
            hidden_card.src = `https://deckofcardsapi.com/static/img/${hidden_card.getAttribute('data-value')}.png`;

            // Log for debugging
            console.log('Hidden card flipped.');

            // Resolve the promise to signal that the flipping is done
            resolve();
        }, 1000); // Adjust the delay time (1000ms = 1 second) as needed
    });
}



async function startGame() {
    const initial_shuffle = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
    const shuffle_response = await initial_shuffle.json();
    if (shuffle_response.success === true){
        await showTwoCards()
        const score = calcScorePlayer()
        if (score === 21){
            alert('BLACKJACK')
            startGame()
        }
    }
}


async function playDealer(){
    return new Promise(async function(resolve){
        let score = calcScoreDealer()

        while (score < 17){
            await showOneDealer()
            score = calcScoreDealer()
            setTimeout(() => {}, 1000)
        }
        resolve()
    })
}

function clearBoard(){
    const images = document.querySelectorAll('img')
    const dealer_score = document.querySelector('#score_dealer')
    const player_score = document.querySelector('#score_player')
    images.forEach(element => element.remove())
    dealer_score.textContent = ''
    player_score.textContent = ''
}

function delclareWinner(){
    const scores = document.querySelectorAll('.score')
    const text = document.createElement('h1')
    if (parseInt(scores[1].textContent) > parseInt(scores[0].textContent) || parseInt(scores[0].textContent) > 21){
        const winner_div = document.querySelector('#winner')
        text.textContent = `PLAYER WINS PLAYER: ${scores[1].textContent} DEALER: ${scores[0].textContent}`
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
        text.textContent = `DEALER WINS DEALER: ${scores[0].textContent} PLAYER: ${scores[1].textContent}`
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



const hit = document.querySelector('#hit')
const stand = document.querySelector('#stand')

startGame()


hit.addEventListener('click', async function(){
    hit.disabled = true;
    await showOnePlayer()
    const score = calcScorePlayer()
    if (score > 21){
        await flipHidden()
        const loser_div = document.querySelector('#loser')
        const scores = document.querySelectorAll('.score')
        const text = document.createElement('h1')
        text.textContent = `DEALER WINS DEALER: ${scores[0].textContent} PLAYER: ${scores[1].textContent}`
        loser_div.append(text)
        loser_div.classList.remove('hidden')
        setTimeout(() => {
            loser_div.classList.add('hidden')
            clearBoard()
            startGame()
            text.remove()
        }, 5000)
    }
    setTimeout(function() {
        hit.disabled = false;
    }, 1000);
})



stand.addEventListener('click', async function() {
    stand.disabled = true;
    const dealer_hand = document.querySelector('#dealer_hand')

    await flipHidden()
    await playDealer()

    delclareWinner()

    setTimeout(function() {
        stand.disabled = false;
    }, 500);
})