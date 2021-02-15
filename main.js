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
    const checkBox = document.getElementById('checkboxForGame')
    let size 
    let countBomb
    let value

    if (checkBox.checked) {
        size = getSizeGameField()
        countBomb = getCountBombOnGameField()
    } else {
        value = getDefaultValues()
        switch (value) {
            case '0': {
                size = 10
                countBomb = 20
                break
            } 
            case '1': {
                size = 15
                countBomb = 50
                break
            } 
            case '2': {
                size = 20
                countBomb = 100
                break
            } 
        }
    }

    if (size && countBomb)
    {
        const matrix = createGameField(size, countBomb)
        const gameField = renderToHTML(matrix, size)
        const generalElement = document.querySelector('#general')
        generalElement.append(gameField)
    } else { 
        return false
    }

}

function getDefaultValues() {
    return Number(document.forms.isCheckradio.r1.value);
  }
  //document.forms.isCheckradio.r1.value

  //f = (event) => console.log(event, event.target.checked)
  //input.addEventListener('change', f)

  //document.forms.isCheckradio.r1.value