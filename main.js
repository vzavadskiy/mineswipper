"use strict"

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete');
}); 


//const size = getSizeGameField()
//const countBomb = getCountBombOnFameField()

const input = document.querySelector('#checkboxForGame')
input.addEventListener('change', () => {document.forms.isCheckradio.querySelectorAll('div').forEach((item) => item.classList.toggle('is-hidden'))})

function createGameField(size, countBomb) {
    const matrix = getMatrix(size, size)
    for (let i = 0; i < countBomb; i++){
        const cell = getRandomBomb(matrix)
    }
    return matrix
}

function letsGo(){
    if (document.querySelector('.swipper')) {
        document.querySelector('.swipper').remove()
    }
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
                case 0: {
                    size = 10
                    countBomb = 15
                    break
                } 
                case 1: {
                    size = 15
                    countBomb = 40
                    break
                } 
                case 2: {
                    size = 20
                    countBomb = 80
                    break
                } 
            }
        }
        if (size && countBomb)
        {
            const matrix = createGameField(size, countBomb)
            const gameField = renderToHTML(matrix, size, countBomb)
            const generalElement = document.querySelector('#general')
            generalElement.append(gameField)
        } else { 
            return false
        }
    }


  //document.forms.isCheckradio.r1.value

  //f = (event) => console.log(event, event.target.checked)
  //input.addEventListener('change', f)

  //document.forms.isCheckradio.r1.value


  //для формы 
  //document.forms.isCheckradio.r1.value
  // document.forms.isCheckradio.querySelector('div').classList.toggle('is-hidden')
  // document.forms.isCheckradio.querySelectorAll('div').forEach((item) => item.classList.toggle('is-hidden'))