
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
                    countBomb: 0,
                    element: null
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
            imgElement.src = 'img/default.png'
            imgElement.draggable= false
            cell.element = imgElement;

            imgElement.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                if (!cell.show) {
                    if(cell.flag) {
                        imgElement.src = 'img/default.png'
                        cell.flag = false
                    } else {
                        imgElement.src = 'img/flag.png'
                        cell.flag = true
                    }
                }
                return false;
            })

            imgElement.addEventListener('click', (event) => {
                if (!cell.none && !cell.flag && !cell.show) {
                    console.log(cell.id); 
                    cell.show = true; 
                    if (cell.bomb){
                        imgElement.src = 'img/bomb.png'
                        setTimeout(alert('Try again'), 3000)
                    } else if (cell.countBomb > 0){
                        imgElement.src = `img/${cell.countBomb}.png`
                    } else {
                        imgElement.src = 'img/empty.png'
                        getAroundEmpty(matrix, cell)
                    }
                }
            })
            rowElement.append(imgElement)
            // ------
            // cell.show = true;
            // if (!cell.show){
            //     //imgElement.src = 'img/empty.png'
            // } else if (cell.bomb){
            //     imgElement.src = 'img/bomb.png'   
            // } else if (cell.flag){
            //     imgElement.src = 'img/flag.png'
            // } else if (cell.countBomb > 0){
            //     imgElement.src = `img/${cell.countBomb}.png`
            // } else { imgElement.src = 'img/empty.png' }
            
        }
        gameField.append(rowElement)
    }
    return gameField
}

function getAroundEmpty (matrix, cell) {
        //let cells = new Set()
        //if (cell)
        const cells = getAroundCells(matrix, cell.y, cell.x)
        cells.forEach((item) => {
            if (item.countBomb === 0 && !item.bomb && !item.flag){
                item.show = true
                item.element.src = 'img/empty.png'
            }
        })
}

function checkEnd (matrix) {
    if (countFlags(matrix) === countCloseCells(matrix) && countCloseCells(matrix) === 20) {
        alert('You are winner')
    }
}
// e.addEventListener('click', (e) => console.log(''))

function countFlags (matrix) {
    let countFlag = 0 
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            if(cell.flag){
                countFlag++
            }
        }
    }
    return countFlag
}

function countCloseCells (matrix) {
    let countCells = 0 
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            if(!cell.show && !cell.bomb){
                countCells++
            }
        }
    }
    return countCells
}

function getAroundFourConnected(matrix, y, x){
    let cells = new Set()
    const cell = getCell(matrix, y + 0, x + 1)

    cell = getCell(matrix, y, x + -1)

    cell = getCell(matrix, y + dy, x + dx)

    return cells
}