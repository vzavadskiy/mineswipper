"use strict"

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete');
}); 

const matrix = getMatrix(10, 10)
for (let i = 0; i < 20; i++){
    const cell = getRandomBomb(matrix)
}
console.log(matrix)

const gameField = matrixToHtml(matrix)

const addElement = document.querySelector('#general')
addElement.append(gameField)


// a = (z, x, c) => { let document = 10; return document; }
// e.style='width: 100px; height: 100px'
// e = document.createElement('div')
// console.dir(e)
// $0.innerHTML = ''
// document.body.append(e1)
// document.body.append(e)
// e1 = document.createElement('div')
// e.classList.add('tomato')
// e1.classList.add('second')
// e.setAttribute('id', 'tomato-1')
// document.body.children['tomato-1']
// e.addEventListener('click', (e) => console.log(''))

//для поиска в js
// a = document.querySelector('.gameField')
// a.style.gridTemplateColumns = 'repeat(20, 1fr)'
