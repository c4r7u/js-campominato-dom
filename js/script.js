
const playButton = document.getElementById('play-button');
playButton.addEventListener('click', startGame);


function startGame() {

    const bombsAmount = 16;


    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    const mainGrid = document.getElementById('grid');
    mainGrid.classList.remove('hidden');
    mainGrid.innerHTML = '';
    document.getElementById('final-message').classList.add('hidden');


    const levelSelect = parseInt( document.getElementById('select-level').value );
    let maxGridNumber;
    let gridItemDimension;
    if( levelSelect === 1 ) {
        maxGridNumber = 100;
        gridItemDimension = 10;
    } else if ( levelSelect === 2 ) {
        maxGridNumber = 81;
        gridItemDimension = 9;
    } else if ( levelSelect === 3 ) {
        maxGridNumber = 49;
        gridItemDimension = 7;
    }


    const bombsArray = generateBombs(maxGridNumber, bombsAmount);
    console.log(bombsArray);

    const maxAttempts = maxGridNumber - bombsArray.length;

    const rightAttemptsArray = [];


    for( let i = 1; i <= maxGridNumber; i++ ) {

        const newGeneratedCell = generateGridItem(i, gridItemDimension);

        newGeneratedCell.addEventListener('click', handleCellClick);

        mainGrid.appendChild(newGeneratedCell);
    }




    function handleCellClick() {

        const clickedNumber = parseInt( this.querySelector('span').textContent );

       

        if( bombsArray.includes(clickedNumber) ) {
            this.classList.add('bomb');
            endGame('lose');
        } else {

            this.classList.add('clicked');
            this.style.pointerEvents = "none";


            rightAttemptsArray.push(clickedNumber);
            console.log(rightAttemptsArray);


            if(rightAttemptsArray.length >= maxAttempts) {
                endGame('win');
            }
        }
    }

    function endGame(winOrLose) {
        let finalMessage;
        if(winOrLose === 'win') {

            finalMessage = 'Hai vinto';
        } else {

            finalMessage = 'Hai perso, hai azzeccato ' + rightAttemptsArray.length + ' tentativi';
        }


        const finalMessageContainer = document.getElementById('final-message');
        finalMessageContainer.innerHTML = finalMessage;
        finalMessageContainer.classList.remove('hidden');

        const allCells = document.getElementsByClassName('square');
        for( let i = 0; i < allCells.length; i++ ) {
            const thisCell = allCells[i];
            thisCell.style.pointerEvents = "none";
        }
    }
}




function generateBombs(maxRangeNumber, numberOfBombs) {

    const arrayOfBombs = [];
    while( arrayOfBombs.length < numberOfBombs ) {
        const randomNumber = getRndInteger(1, maxRangeNumber);

        if(!arrayOfBombs.includes(randomNumber)) {
            arrayOfBombs.push(randomNumber);
        }
    }

    return arrayOfBombs;
}




function generateGridItem(innerNumber, cellDimension) {

    const newCell = document.createElement('div');
    newCell.classList.add('square');
    newCell.innerHTML = `<span>${innerNumber}</span>`;
    newCell.style.width = `calc(100% / ${cellDimension})`;
    newCell.style.height = `calc(100% / ${cellDimension})`;

    return newCell;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}