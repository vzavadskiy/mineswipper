"use strict"
// let doc = document
// let age1 = null
// let name = "Mery"
// alert(age1);
// alert(age2);

// function sayName(_name) {
//     alert(_name);
//   }

// sayName(name);
function main() {
    let e = document.querySelector('.gameField');

    for (let i = 0; i < 100; i++) {
        let buff = document.createElement('div');
        buff.classList.add('cell');
        e.append(buff);
    }
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') main();
});

// //   let age = prompt('Сколько тебе лет?', 100);

// // alert(`Тебе ${age} лет!`); // Тебе 100 лет!

// // let flag = 0;
// // alert(Boolean(flag));
// // alert(String(flag));

// alert( 2 + (2 + "2"))

// alert( 2 + 2 + "1")
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
