/* 
 * Enrique Ruiz Durazo
 * 2019
 */

// Get number of words, location to render 
var word_count = words.length
var word_element = $('#slideshow-anim')

// Animation durations
var anim_delay = 4000 //ms
var anim_duration = 500 //ms

// Counter
var num = 0

// Function
$(document).ready(function() {
  setInterval(function() {
    num++
    word_element.fadeOut(anim_duration, function() {
      word_element.html(words[num % word_count]).fadeIn(anim_duration)
    })
  }, anim_delay)
})
