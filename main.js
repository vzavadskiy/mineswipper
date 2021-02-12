"use strict"

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete');
}); 


//const size = getSizeGameField()
//const countBomb = getCountBombOnFameField()



function createGameField(size, countBomb) {
    const matrix = getMatrix(size, size)
    for (let i = 0; i < countBomb; i++){
        const cell = getRandomBomb(matrix)
    }
    return matrix
}

function letsGo(){
    const size = getSizeGameField()
    const countBomb = getCountBombOnGameField()
    const matrix = createGameField(size, countBomb)
    const gameField = renderToHTML(matrix)
    const generalElement = document.querySelector('#general')
    generalElement.append(gameField)
}
