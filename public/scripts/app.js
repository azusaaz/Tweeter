/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //slide toggle the new tweet window
  $("#nav-button").on('click', function () {
    if ($("#new-tweet").is(':visible')) {
      $("#new-tweet").slideUp();

    } else {
      $("#new-tweet").slideDown();
      $("#new-tweet textarea").focus();

    }
  });

  //when clicked tweet button
  $("form").on('submit', function (event) {
    event.preventDefault();
    // console.log("serial",$( this ).serialize());

    if ($(this).find("textarea").val().length === 0) {
      $('#error').html("Please input something");
      $('#error').slideDown();

    } else if ($(this).find("textarea").val().length > 140) {
      $('#error').html("Cannot tweet more than 140 letters");
      $('#error').slideDown();

    } else {

      var $text = $(this).find("textarea");

      $.ajax({
          url: 'http://localhost:8080/tweets',
          method: 'POST',
          data: $(this).serialize(),
        })

        .done(function (data, status, response) {
          // console.log(data,status,response.status)
          if (response.status === 503) {
            alert("something wrong");
          }
          if (response.status === 201) {
            $('#tweets-container').empty();
            $text.val("");
            loadTweets();
          }
        });
    }
  });

  function createTweetElement(data) {
    var daysAgo = Math.floor((Date.now() - data.created_at) / 1000 / 86400);

    var text =
      `<article class="tweet">
    <header>
      <div class="img-container">
        <img src="${data.user.avatars.small}" alt="">
      </div>
      <h2>${data.user.name}</h2>
      <h4>${data.user.handle}</h4>
    </header>
    <div class="comment">
      <h4>${escape(data.content.text)}</h4>  
    </div>
    <footer>
      <h5>${daysAgo} days ago</h5>
      <div id="icons">
        <i class="icon-heart"></i>         
        <i class="icon-retweet"></i>
        <i class="icon-flag"></i>
      </div>
    </footer>
    </article>`

    return text;
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function renderTweets(tweets) {
    let newTweets = tweets.reverse();
    for (let tweetData of newTweets) {
      var $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    }
  }

  function loadTweets() {

    $.ajax('http://localhost:8080/tweets', {
        method: 'GET'
      })
      .done(function (tweetsHtml) {
        renderTweets(tweetsHtml);
      });
  }

  loadTweets();
});
