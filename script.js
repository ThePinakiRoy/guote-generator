const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter-btn');
const loader = document.getElementById('loader');

// show loader 
function showLoadingSpinner() {   
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader & show quote container
function removeLoadingSpinner () {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }    
}

// Get quote from http://api.forismatic.com/api/1.0/ 
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();
        // if author is blank, add unkown
        if ( data.quoteAuthor === '' ) {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font size for long quote
        if ( data.quoteText.length > 120 ){
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        // stop loader & show quote
        removeLoadingSpinner();
    } catch(err) {
        getQuote();        
    }
}
// tweet quote
function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

// Event listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();