$(document).ready(function () {

  $("#new-tweet form textarea").on('keyup', function () {
    var $textarea = $(this);
    var count = 140 - $textarea.val().length;
    var $counter = $textarea.siblings('.counter')

    if (count < 0) {
      $counter.addClass('error');
    } else {
      $counter.removeClass('error');
    }
    $counter.html(count);
  });
});

// before refactor
// $(document).ready(function () {

//   $("#new-tweet form textarea").on('keydown', function () {
//     var $textarea = $(this);
//     var max = 140;
//     var txt = $textarea.val().length + 1;
//     var $counter = $textarea.siblings('.counter')

//     if (max - txt < 0) {
//       $textarea.siblings('.counter').css('color', 'red');
//     }
//     $counter.html(max - txt);
//   });
// });