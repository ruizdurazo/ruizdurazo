let menuSVG = document.getElementById('menu-svg')
document.getElementById('menu').addEventListener('click', event => {
  if (menuSVG.alt === 'Menu') {
    document.getElementById('menu-overlay').setAttribute('style', 'max-height: 100vh;')
    document.getElementById('menu-overlay').innerHTML =
      '<div class="lang-list">' +
      '<a class="lang lang-current" href="/">English</a>' +
      '<a class="lang" href="#">Deutsch <span class="lang-arrow">&nearr;</span></a>' +
      '<a class="lang" href="#">Español <span class="lang-arrow">&nearr;</span></a>' +
      '</div>'
    menuSVG.src = '/assets/images/icon-close.svg'
    menuSVG.alt = 'Close'
  } else {
    document.getElementById('menu-overlay').setAttribute('style', 'max-height: 0;')
    document.getElementById('menu-overlay').innerHTML = ''
    menuSVG.src = '/assets/images/icon-menu.svg'
    menuSVG.alt = 'Menu'
  }
})
