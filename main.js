"use strict"

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete');
}); 

document.querySelector('#checkboxForGame').addEventListener('change', () => {
    document.forms.isCheckradio.querySelectorAll('div').forEach((item) => item.classList.toggle('is-hidden'))})

function letsGo(){
    if (document.querySelector('.swipper')) {
        document.querySelector('.swipper').remove()
    }
        let size 
        let countBomb
        ({size, countBomb} = getDefaultValue())
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
