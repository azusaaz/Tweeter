/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // Fake data taken from tweets.json
  const data = [{
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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

