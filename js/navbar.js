/*
 * Enrique Ruiz Durazo
 * 2021-2025
 */

const navbar = document.getElementById('navbar')
const menuSVG = document.getElementById('menu-svg')
document.getElementById('menu-button').addEventListener('click', (event) => {
  if (menuSVG.alt === 'Menu') {
    document.getElementById('menu-button').blur()
    document
      .getElementById('menu-overlay')
      .setAttribute('style', 'max-height: 100svh;')
    document.getElementById('menu-overlay').innerHTML =
      '<div class="menu-list">' +
      '<a class="menu-list-item" href="/">Home</a>' +
      '<a class="menu-list-item" href="mailto:enrique@ruizdurazo.com" target="_blank">Email</a>' +
      '<a class="menu-list-item" href="https://x.com/ruizdurazo" target="_blank">X (Twitter)</a>' +
      '<a class="menu-list-item" href="https://github.com/ruizdurazo" target="_blank">GitHub</a>' +
      '<a class="menu-list-item" href="/lol">LinkedIn</a>' +
      '</div>'
    menuSVG.src = '/assets/images/icon-close.svg'
    menuSVG.alt = 'Close'
    menuSVG.width = '60'
    menuSVG.height = '60'
    navbar.style.backgroundColor = '#fff'
  } else {
    document.getElementById('menu-button').blur()
    document
      .getElementById('menu-overlay')
      .setAttribute('style', 'max-height: 0;')
    document.getElementById('menu-overlay').innerHTML = ''
    menuSVG.src = '/assets/images/icon-menu.svg'
    menuSVG.alt = 'Menu'
    menuSVG.width = '60'
    menuSVG.height = '60'
    navbar.style.backgroundColor = '#ffffffdd'
  }
})

document.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Escape') {
      if (document.getElementById('menu-svg').alt === 'Close') {
        document.getElementById('menu-button').click()
      }
    }
  },
  true
)
