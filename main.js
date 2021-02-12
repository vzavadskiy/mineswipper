"use strict"

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete');
}); 

const matrix = getMatrix(10, 10)
for (let i = 0; i < 10; i++){
    const cell = getRandomBomb(matrix)
}

const gameField = matrixToHtml(matrix)

const addElement = document.querySelector('#general')
addElement.append(gameField)
