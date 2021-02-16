
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
        return null
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

function renderToHTML(matrix, size, countBombsOnField) {
    const gameField = document.createElement('div')
    gameField.classList.add('swipper')
    
    for (let y = 0; y < matrix.length; y++) {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        rowElement.style.height = 'calc((100% - 2px *' + size +') / ' + size +')';
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            const imgElement = document.createElement('img')
            imgElement.style.width = 'calc((100% - 2px *' + size +') / ' + size +')';
            imgElement.src = 'img/default.png'
            imgElement.draggable= false
            cell.element = imgElement;
            // `${1 + 1} qasdasdas ${} `
            imgElement.addEventListener('click', (event) => {
                if (!cell.none && !cell.flag && !cell.show) {
                    // console.log(cell.id); 
                    cell.show = true; 
                    if (cell.bomb){
                        imgElement.src = 'img/bomb.png'
                        setTimeout(() => {
                            if (confirm("You're loser, try again?")) letsGo()
                        }, 400);
                        //setTimeout(() => alert('Try again'), 400, ) 
                    } else if (cell.countBomb > 0){
                        imgElement.src = `img/${cell.countBomb}.png`
                    } else {
                        imgElement.src = 'img/empty.png'
                        getAroundFourConnected(matrix, cell.y, cell.x)
                    }
                }
                checkEndGame(matrix, countBombsOnField)
            })

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
                checkEndGame(matrix, countBombsOnField)
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

document.querySelectorAll('.swipper').forEach((element) => {
    element.remove();
})

function checkEndGame (matrix, bombs) {
    if (countFlags(matrix) == countCloseCells(matrix) && countCloseCells(matrix) == bombs) {
        setTimeout(() => alert('You are winner'), 500)
    }
}

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
            if(!cell.show){
                countCells++
            }
        }
    }
    return countCells
}

function checkCellIsEmpty(cell) {
    return !cell.bomb && !cell.show && !cell.flag && (cell.countBomb == 0);
}

function checkCellIsNumber(cell) {
    return !cell.bomb && !cell.show && !cell.flag && (cell.countBomb != 0);
}

function getAroundFourConnected(matrix, y, x){
    const cell = getCell(matrix, y, x)
    let numberCells = new Set()
    let cells = new Set()
    cells.add(cell);
    
    const template = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],           [1, 0],
        [-1, 1],  [0, 1],  [1, 1],
    ];

    let index = 0
    while (index < cells.size) {
        const currentCell = [...cells][index];
        currentCell.show = true
        currentCell.element.src = 'img/empty.png'

        
        template.forEach(([dx, dy]) => {
            const _cell = getCell(matrix, currentCell.y + dy, currentCell.x + dx);
            if (_cell != null) {
                if (checkCellIsEmpty(_cell)) cells.add(_cell);
                else if (checkCellIsNumber(_cell)) numberCells.add(_cell);
            }
        });
        index++;
    }
    numberCells.forEach((cell) => {
        cell.show = true
        cell.element.src = `img/${cell.countBomb}.png`
    });
    
}

//function processing


function getCountBombOnGameField(){ 
    const buff = Number(document.getElementById("countBomb").value);
    if (buff == 0) {
        alert('Бомбы не могут отсутствовать на поле!')
        return false    
    } else {
        return buff
    }
}

function getSizeGameField(){ 
    const buff = Number(document.getElementById("sizeField").value);
    if(buff == 0) { 
        alert('Размер поля не может быть пустым!')
        return false
    } else {
        return buff;
    }
}

function getDefaultValues() {
    return Number(document.forms.isCheckradio.r1.value);
  }


  //добавление людей в список игроков
  // localStorage.setItem('test', JSON.stringify({name: 'Vasya'}))
  // localStorage.getItem('test')
  // JSON.parse(localStorage.getItem('test'))