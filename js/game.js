'use strict'
const personagens = [
    'Alisha',
    'Claudia',
    'CR7',
    'dani',
    'Davi',
    'falcao',
    'formiga',
    'mane',
    'marcelo',
    'Marta',
    'Messi',
    'ney',
    'Ronaldinho',
    'Ronaldo',
    'salah',

]
const duplicatedPersonagens = [...personagens, ...personagens]
let firstcard = null;
let seccard = null;

const virarCarta = ({ target }) => {
    const box = target;
    const boxClass = box.classList;
    const img = box.firstChild

    const showImg = () => {
        boxClass.add('rotate');
        setTimeout(() => {
            img.style.display = 'block'
        }, 295)
    }

    img.click = () => false;
    if (img.click()) return

    if (firstcard == null) {
        firstcard = target;
        firstcard.removeEventListener("click", virarCarta)
        showImg();
        return
    } else if (seccard == null) {
        seccard = target;
        firstcard.addEventListener('click', virarCarta)
        showImg()

        if (seccard.className != firstcard.className) {
            setTimeout(() => {
                let img1 = firstcard.firstChild
                let img2 = seccard.firstChild

                setTimeout(() => {
                    showAndHidImg(firstcard, 'rotate', 'none', img1)
                    showAndHidImg(seccard, 'rotate', 'none', img2)
                    firstcard = null;
                    seccard = null;
                }, 400)
            }, 295)
        } else {
            setTimeout(() => {
                firstcard.style.opacity = '0.6'
                seccard.style.opacity = '0.6'
                firstcard = null;
                seccard = null;
            }, 500)
        }
    }
    const divs = document.querySelectorAll('div.box')
    endGame(divs)
}

function showAndHidImg(card, className, display, img) {
    card.classList.add(className);
    (function imgStyleDisplay() {
        return setTimeout(() => img.style.display = display, 290)
    }())
    card.classList.remove(className);
}

const criarHTML = () => {
    const main = document.createElement('main')
    const body = document.querySelector('body')
    const elementsDuplicated = duplicatedPersonagens.length
    body.insertAdjacentElement('afterbegin', main)
    //criar
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < personagens.length; j++) {
            const div = document.createElement('div')
            const img = document.createElement('img')
            div.classList.add(`a${j}`, 'box')
            img.classList.add(`a${j}`)
            randomCards(div, elementsDuplicated) //random cards
            img.src = `../images/${personagens[j]}.png`
            main.appendChild(div)
            div.appendChild(img)
        }
    }
    const divs = document.querySelectorAll('.box')
    divs.forEach(div => div.addEventListener('click', virarCarta))
}
function randomCards(div, arrDuplicated) {
    return div.style.order = Math.floor(Math.random() * arrDuplicated * (-1))
}

document.addEventListener('DOMContentLoaded', criarHTML)

let min = 0;
let sec = 0;
let crom = null;
const tempo = () => {
    sec += 1;
    if (sec < 10) {
        crom = `0${min}:0${sec}`
    } else if (sec >= 10) {
        crom = `0${min}:${sec}`
    }
    if (sec == 60) {
        sec = 0;
        min += 1;
        crom = `0${min}:0${sec}`
    }
    if (min >= 10) {
        crom = `${min}:${sec}`
    }
    console.log(crom)
    return crom
};
setInterval(tempo,1000)

function endGame(divs) {
    let x = Array.from(divs).every(div => div.className.includes('rotate'))
    if (x === true) {
        setTimeout(() => {
            return alert(`O jogo acabou! Atualize a página para jogar novamente! Tempo de jogo: ${tempo()}! `)
        }, 700)
    }
}















