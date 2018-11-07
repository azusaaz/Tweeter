/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

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
      <h4>${data.content.text}</h4>
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

  function renderTweets(tweets) {
    for (let tweetData of tweets) {
      var $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    }
  }

  $("form").on('submit', function (event) {
    event.preventDefault();
  console.log( $( this ).serialize() );
  });

  function loadTweets() {

    $.ajax('http://localhost:8080/tweets', {
        method: 'GET'
      })
      .then(function (tweetsHtml) {
        renderTweets(tweetsHtml);
      });
  }

  loadTweets();
});

