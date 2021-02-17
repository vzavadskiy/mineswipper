
function createMatrix(columns, rows) {
    const matrix = []
    let ID = 0
    for (let y = 0; y < rows; y++) {
        let row = []
            for (let x = 0; x < columns; x++) {
                row.push({
                    id: ID++,
                    y,
                    x,
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

function createBomb(matrix){
    const cell = getRandomEmptyCell(matrix)
    cell.bomb = true
    getAroundCell(matrix, cell.y, cell.x).forEach((item) => item.countBomb++)
}

function getCell(matrix, y, x){
    if(!matrix[y] || !matrix[y][x]){
        return null
    }
    return matrix[y][x]
}

function createGameField(size, countBomb) {
    const matrix = createMatrix(size, size)
    for (let i = 0; i < countBomb; i++){
        createBomb(matrix)
    }
    return matrix
}

function getAroundCell(matrix, y, x){
    const cells = []
    const template = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],          [1,  0],
        [-1,  1], [0,  1] ,[1,  1]
    ];
        template.forEach(([dx, dy]) => {
            const cell = getCell(matrix, y + dy, x + dx);
            if (cell != null) {
                cells.push(cell)
            }
        });
    return cells
}

function addPropertiesImg(imgElement, matrix, cell, size, countBombsOnField) {
    imgElement.style.width = `calc((100% - 2px *${size}) / ${size})`;
            imgElement.src = 'img/default.png'
            imgElement.draggable= false
            imgElement.addEventListener('click', (event) => {
                if (!cell.none && !cell.flag && !cell.show) {
                    cell.show = true; 
                    if (cell.bomb){
                        imgElement.src = 'img/bomb.png'
                        setTimeout(() => {
                            if (confirm("You're loser, try again?")) letsGo()
                        }, 200);
                    } else if (cell.countBomb > 0){
                        imgElement.src = `img/${cell.countBomb}.png`
                    } else {
                        imgElement.src = 'img/empty.png'
                        openEmptyField(matrix, cell.y, cell.x)
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
}

function renderToHTML(matrix, size, countBombsOnField) {
    const gameField = document.createElement('div')
    gameField.classList.add('swipper')
    for (let y = 0; y < matrix.length; y++) {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        rowElement.style.height = `calc((100% - 2px *${size}) / ${size})`

        for (let x = 0; x < matrix[y].length; x++) {
            const cell = matrix[y][x]
            const imgElement = document.createElement('img')
            cell.element = imgElement;
            addPropertiesImg(imgElement, matrix, cell, size, countBombsOnField)
            rowElement.append(imgElement)            
        }
        rowElement.addEventListener('contextmenu', (event) => {event.preventDefault()})
        gameField.append(rowElement)
    }
    return gameField
}

function checkEndGame (matrix, bombs) {
    if (countFlagsOnField(matrix) == countCloseCellsOnField(matrix) && countCloseCellsOnField(matrix) == bombs) {
        setTimeout(() => alert('You are winner'), 400)
    }
}

function countFlagsOnField (matrix) {
    let countFlag = 0 
    matrixTraversal(matrix, (cell) => {
        if (cell.flag) countFlag++
    })
    return countFlag
}

function countCloseCellsOnField (matrix) {
    let countCells = 0 
    matrixTraversal(matrix, (cell) => {
        if (!cell.show) countCells++
    })
    return countCells
}

function matrixTraversal (matrix, callback) {
  matrix.forEach((row) => row.forEach(callback));
}

function openEmptyField(matrix, y, x){
    const cell = getCell(matrix, y, x)
    let numberCells = new Set()
    let cells = new Set()
    cells.add(cell);
    const template = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],          [1,  0],
        [-1,  1], [0,  1] ,[1,  1] 
    ];
    let index = 0
    while (index < cells.size) {
        const currentCell = [...cells][index];
        currentCell.show = true
        currentCell.element.src = 'img/empty.png'
        
        template.forEach(([dx, dy]) => {
            const _cell = getCell(matrix, currentCell.y + dy, currentCell.x + dx);
            if (_cell != null) {
                if (!_cell.bomb && !_cell.show && !_cell.flag) {
                    if (_cell.countBomb == 0) cells.add(_cell);
                    else numberCells.add(_cell);
                }
            }
        });
        index++;
    }
    numberCells.forEach((cell) => {
        cell.show = true
        cell.element.src = `img/${cell.countBomb}.png`
    });
}

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

function getDefaultValue() {
    const value = Number(document.forms.isCheckradio.r1.value)
    let size = 10
    let countBomb  = 15
    if (document.getElementById('checkboxForGame').checked) {
        size = getSizeGameField()
        countBomb = getCountBombOnGameField()
    } else {
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
    return {size, countBomb}
}


  //добавление людей в список игроков
  // localStorage.setItem('test', JSON.stringify({name: 'Vasya'}))
  // localStorage.getItem('test')
  // JSON.parse(localStorage.getItem('test'))
