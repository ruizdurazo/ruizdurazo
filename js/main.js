/*
 * Enrique Ruiz Durazo.
 *
 */

var i = 0;
var word_count = words.length;
var word_element = $('#slideshow-anim');

var anim_delay = 3500; //ms
var anim_duration = 750; //ms

$(document).ready(function() {
  var timerId = setTimeout(function animRun() {
    i++;
    if (i >= word_count) i = 0;
    word_element.fadeTo(anim_duration, 0, function() {
      word_element.html(words[i]);
      word_element.fadeTo(anim_duration, 1)
    });
    var timerId = setTimeout(animRun, anim_delay);
  }, anim_delay);
});
