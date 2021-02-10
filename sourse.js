// function main() {
//     let e = document.querySelector('.gameField');

//     for (let i = 0; i < 100; i++) {
//         let buff = document.createElement('div');
//         buff.classList.add('cell');
//         e.append(buff);
//     }
// }

function getMatrix(columns, rows) {
    const matrix = []
    let ID = 0
    for (let y = 0; y < rows; y++) {
        let row = []
            for (let x = 0; x < columns; x++) {
                row.push({
                    id: ID++,
                    y: y,
                    x: x,
                    bomb: false,
                    show: false,
                    flag: false,
                    countBomb: 0
                })
            }
        matrix.push(row)
    }
    return matrix
}

function getRandomEmptyCell(matrix) {
    const emptyCells = []
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            if(!cell.bomb){
                emptyCells.push(cell)
            }
        }
    }
    const index = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[index]
}

function getRandomBomb(matrix){
    const cell = getRandomEmptyCell(matrix)
    cell.bomb = true

    const cells = getAroundCells(matrix, cell.y, cell.x)
    cells.forEach((item) => item.countBomb++)
}

function getCell(matrix, y, x){
    if(!matrix[y] || !matrix[y][x]){
        return 0
    }
    return matrix[y][x]
}

function getAroundCells(matrix, y, x){
    const cells = []
    for (let dy = -1; dy <= 1 ; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy == 0 && dx == 0){
                continue
            }
            const cell = getCell(matrix, y + dy, x + dx)
            if(cell){
                cells.push(cell)
            }
        }
    }
    return cells
}

function matrixToHtml(){
    const gameField = document.createElement('div')
    gameField.classList.add('swipper')
    
    for (let y = 0; y < matrix.length; y++) {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            const imgElement = document.createElement('img')
            //imgElement.addEventListener('click', (event) => {console.log(cell); cell.show = true})
            rowElement.append(imgElement)
            if (!cell.show){
                //imgElement.src = 'img/empt.png'
            } else if (cell.bomb){
                imgElement.src = 'img/bomb.png'   
            } else if (cell.flag){
                imgElement.src = 'img/flag.png'
            } else if (cell.countBomb > 0){
                imgElement.src = `img/${cell.countBomb}.png`
            }
        }
        gameField.append(rowElement)
    }
    return gameField
}

// e.addEventListener('click', (e) => console.log(''))
