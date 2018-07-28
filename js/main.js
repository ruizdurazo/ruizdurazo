/*
 * Enrique Ruiz Durazo.
 * 2018
 */

var i = 0
var word_count = words.length
var word_element = $('#slideshow-anim')

var anim_delay = 5000 //ms
var anim_duration = 500 //ms

var timerId
var num = 0

/*
$(document).ready(function() {
  timerId = setTimeout(function animRun() {
    i++
    if (i >= word_count) i = 0
    word_element.fadeTo(anim_duration, 0, function() {
      word_element.html(words[i])
      word_element.fadeTo(anim_duration, 1)
    })
    var timerId = setTimeout(animRun, anim_delay)
  }, anim_delay)
})
*/

/*
//console.log('hello')
$(document).ready(function() {
  if (window.innerWidth < 640) {
    word_element.html(words[0])
  } else {
    timerId = setInterval(function animRun() {
      //console.log(num)
      //num++
      i++
      if (i >= word_count) i = 0
      word_element.fadeTo(anim_duration, 0, function() {
        word_element.html(words[i])
        word_element.fadeTo(anim_duration, 1)
      })
    }, anim_delay)
  }
})

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    //console.log('bye')
    clearInterval(timerId)
  } else if (window.innerWidth >= 640) {
    //console.log('hello')
    timerId = setInterval(function animRun() {
      //console.log(num)
      //num++
      i++
      if (i >= word_count) i = 0
      word_element.fadeTo(anim_duration, 0, function() {
        word_element.html(words[i])
        word_element.fadeTo(anim_duration, 1)
      })
    }, anim_delay)
  }
}, false)





window.addEventListener('resize', function() {
  if (window.innerWidth < 640) {
    console.log('yeah boy')
    word_element.html(words[0])
    clearInterval(timerId)
  } else if (window.innerWidth >= 640) {
    timerId = setInterval(function animRun() {
      //console.log(num)
      //num++
      i++
      if (i >= word_count) i = 0
      word_element.fadeTo(anim_duration, 0, function() {
        word_element.html(words[i])
        word_element.fadeTo(anim_duration, 1)
      })
    }, anim_delay)
  }

}, false)

*/





/*
$(document).ready(function() {
  setInterval(function() {
    num++
    $("#slideshow-anim").fadeOut(anim_duration, function() {
      $(this).html(words[num % word_count]).fadeIn(anim_duration);
    })
  }, anim_delay)
})
*/

$(document).ready(function() {
  setInterval(function() {
    num++
    word_element.fadeOut(anim_duration, function() {
      word_element.html(words[num % word_count]).fadeIn(anim_duration);
    })
  }, anim_delay)
})
