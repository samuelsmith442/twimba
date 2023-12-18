import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Retrieve tweetsData from localStorage and parse it; 
// if it doesn't exist, use the default tweetsData array
let storedTweetsData = JSON.parse(localStorage.getItem('tweetsData')) || tweetsData;

// Check if storedTweetsData is truthy (i.e., not null or undefined)
if (storedTweetsData) {
    // Update the data in localStorage with the parsed or default tweetsData
    localStorage.setItem('tweetsData', JSON.stringify(storedTweetsData));
}


    // Listen for click events on the document
document.addEventListener('click', function (e) {
    // Check if the clicked element has a 'data-like' attribute
    if (e.target.dataset.like) {
        // If so, call the handleLikeClick function and pass the 'data-like' value
        handleLikeClick(e.target.dataset.like);
    }
    // Check if the clicked element has a 'data-retweet' attribute
    else if (e.target.dataset.retweet) {
        // If so, call the handleRetweetClick function and pass the 'data-retweet' value
        handleRetweetClick(e.target.dataset.retweet);
    }
    // Check if the clicked element has a 'data-reply' attribute
    else if (e.target.dataset.reply) {
        // If so, call the handleReplyClick function and pass the 'data-reply' value
        handleReplyClick(e.target.dataset.reply);
    }
    // Check if the clicked element has an 'id' attribute equal to 'tweet-btn'
    else if (e.target.id === 'tweet-btn') {
        // If so, call the handleTweetBtnClick function
        handleTweetBtnClick();
    }
    // Check if the clicked element has a 'data-comment' attribute
    else if (e.target.dataset.comment) {
        // If so, call the handleReplyTextBtnClick function and pass the 'data-comment' value
        handleReplyTextBtnClick(e.target.dataset.comment);
    }
    // Check if the clicked element has a 'data-delete' attribute
    else if (e.target.dataset.delete) {
        // If so, call the handleDelete function and pass the 'data-delete' value
        handleDelete(e.target.dataset.delete);
    }
});

    // Define a function named handleDelete that takes a tweetId as a parameter
function handleDelete(tweetId) {
    // Get the tweetsData from the local storage and parse it as a JSON object, or use an empty array if it is null
    let tweetData = JSON.parse(localStorage.getItem('tweetsData')) || []
    // Filter out the tweet that has the same uuid as the tweetId from the tweetData array
    tweetData = tweetData.filter(function (tweet) {
        return tweet.uuid !== tweetId
    })

    // Stringify the tweetData and store it back to the local storage
    localStorage.setItem('tweetsData', JSON.stringify(tweetData))
    // Call the render function to update the user interface with the new tweetData
    render()

}



function handleLikeClick(tweetId) {
    // Retrieve the 'tweetsData' from local storage and parse it as JSON
    let tweetsData = JSON.parse(localStorage.getItem('tweetsData'))

    // Filter the 'tweetsData' to find the target tweet object with the given 'tweetId'
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    // Toggle the 'isLiked' property and update the 'likes' count accordingly
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;

    // Update the 'tweetsData' in local storage with the modified data
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData));

    // Render the updated tweet feed
    render();
}


function handleRetweetClick(tweetId) {
    // Retrieve the 'tweetsData' from local storage and parse it as JSON
    let tweetsData = JSON.parse(localStorage.getItem('tweetsData'));

    // Filter the 'tweetsData' to find the target tweet object with the given 'tweetId'
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    // Toggle the 'isRetweeted' property and update the 'retweets' count accordingly
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

    // Update the 'tweetsData' in local storage with the modified data
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData));

    // Render the updated tweet feed
    render();
}


function handleReplyClick(replyId) {
    // Find the HTML element with the specified replyId and toggle its 'hidden' class
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}


function handleReplyTextBtnClick(tweetId) {
    // Log the tweetId to the console
    console.log("T ID: " + tweetId);

    // Retrieve tweetsData from localStorage and parse it into a JavaScript object
    let tweetsData = JSON.parse(localStorage.getItem('tweetsData'));

    // Get the value of the reply input field associated with the given tweetId
    let replyInput = document.getElementById(`reply-input-${tweetId}`).value;
    
    // Log the reply input value to the console
    console.log(replyInput);

    // Check if the reply input is not empty
    if (replyInput) {
        // Find the target tweet object in tweetsData array based on tweetId
        const targetTweetObj = tweetsData.find(function (tweet) {
            return tweet.uuid === tweetId;
        });

        // Add a new reply object to the target tweet's replies array
        targetTweetObj.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: replyInput,
        });

        // Update the tweetsData in localStorage with the modified array
        localStorage.setItem('tweetsData', JSON.stringify(tweetsData));

        // Clear the reply input field
        replyInput = '';

        // Render the updated tweetsData
        render(tweetsData);
    }
}




// Function triggered when the tweet button is clicked
function handleTweetBtnClick() {
    // Get the tweet input element by its ID
    const tweetInput = document.getElementById('tweet-input')

    // Retrieve tweetsData from localStorage; if it doesn't exist, default to an empty array
    let tweetsData = JSON.parse(localStorage.getItem('tweetsData')) || []

    // Check if the tweet input has a value
    if (tweetInput.value) {
        // Create a new tweet object and add it to the beginning of the tweetsData array
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })

        // Save the updated tweetsData to localStorage
        localStorage.setItem('tweetsData', JSON.stringify(tweetsData))

        // Render the updated feed
        render()

        // Clear the tweet input field
        tweetInput.value = ''
    }
}



// Function to generate HTML for the tweet feed
function getFeedHtml() {
    // Retrieve tweetsData from localStorage
    let tweetsData = JSON.parse(localStorage.getItem('tweetsData'))
    
    // Initialize an empty string to store the HTML content
    let feedHtml = ``

    // Loop through each tweet in tweetsData
    tweetsData.forEach(function (tweet) {
        // Determine the CSS class for the like icon based on whether the tweet is liked or not
        let likeIconClass = tweet.isLiked ? 'liked' : ''

        // Determine the CSS class for the retweet icon based on whether the tweet is retweeted or not
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        // Initialize an empty string to store HTML content for replies
        let repliesHtml = ''

        // If the tweet has replies, loop through each reply and generate HTML
        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        // Generate HTML for the reply input and button
        repliesHtml += `
            <div class="tweet-reply">
                <textarea id='reply-input-${tweet.uuid}' placeholder="Write your reply..."></textarea>
                <button class='reply-button' data-comment="${tweet.uuid}">Reply</button>
            </div>
        `

        // Generate HTML for the main tweet
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                        </div>
                        <div class="delete-container">
                            <i class="fa-solid fa-x delete-icon"
                            data-delete="${tweet.uuid}"
                            ></i>
                        </div> 
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>   
            </div>
        `
    })

    // Return the generated HTML content
    return feedHtml
}

// Function to render reply buttons and attach click event listeners
function renderReplyTexts() {
    // Select all elements with the class 'reply-button'
    const replyButtons = document.querySelectorAll('.reply-button')

    // Loop through each reply button
    replyButtons.forEach(button => {
        // Add a click event listener to each reply button
        button.addEventListener('click', function () {
            // Extract the tweet ID from the button's dataset
            const tweetId = button.dataset.tweetId
            
            // Find the corresponding reply input element
            const replyInput = document.getElementById(`reply-input-${tweetId}`)

            // Call the function to handle the click on the reply button
            handleReplyTextBtnClick(tweetId, replyInput)
        })
    })
}


function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()

    renderReplyTexts()
}

render()

