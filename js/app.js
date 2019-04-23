// Grabbing DOM Elements
const logo = document.querySelector('.logo');
const search = document.querySelector('#search a');
const popUp = document.querySelector('#popUp');
const closePopUp = document.querySelector('.closePopUp');
// const navLink = document.querySelectorAll('nav ul li ul li a');
const cnnLink = document.querySelector('.cnn-link');
const espnLink = document.querySelector('.espn-link');
const nytimesLink = document.querySelector('.nytimes-link');
const mainSection = document.querySelector('#main');
const	title = document.querySelector('h3');

// DOM and UI Interactions
search.addEventListener('click', function(){ 
	document.querySelector('#search').classList.toggle('active');
});

closePopUp.addEventListener('click', function(){ 
	popUp.classList.add('hidden');
});

// API variables
const xhr = new XMLHttpRequest();
const url = `https://newsapi.org/v2/top-headlines?sources=`;
let apiKey = `&apiKey=39cd29a6a549437caac9b3b0c71c7c4c`;
let cleanData = {};

// API Work
function APITime(source) {
	xhr.open('GET', url + source + apiKey);
	xhr.send();
	xhr.onload = onSuccess;
	xhr.onerror = onError;
}

function onSuccess() {
	popUp.classList.add('hidden');
	cleanData = JSON.parse(xhr.responseText);
  changeHTML(cleanData);
}

function onError(){
	alert('Error loading results');
}

// Adding and formatting articles
function changeHTML(data) {
	mainSection.innerHTML = '';
	let moreInfo = [];
	  for(let i = 0; i < data.articles.length; i++) {
			let imgSRC = data.articles[i].urlToImage;
			let articleTitle = data.articles[i].title;
			let articleDesc = data.articles[i].description;
			let impCount = data.articles[i].publishedAt.substring(0, 10); // Only want date, so using substring to slice the end off 

			let articleElement = document.createElement('article');
			articleElement.className = 'article';

			// Putting API content in HTML format
			articleElement.innerHTML = `<section class="featuredImage">
											              <img src="${imgSRC}" alt="" />
											            </section>
											            <section class="articleContent">
										                <a href="#"><h3>${articleTitle}</h3></a>
										                <h6>${articleDesc}</h6>
											            </section>
											            <section class="impressions">
											              ${impCount}
											            </section>
											            <div class="clearfix"></div>`;

			// Adding article to section
			mainSection.appendChild(articleElement);
			// Links to open pop up
			moreInfo.push(articleElement.querySelector('.articleContent a'));
	}
	seeMore(moreInfo, cleanData);
}

// Article content popup

function seeMore(buttonArray, data) {
	buttonArray.forEach(function(current, index) {
    current.addEventListener('click', function() {
        popUp.classList.remove('hidden');
        popUp.classList.remove('loader');
        popUp.querySelector('.container h1').innerText = data.articles[index].title;
        if (data.articles[index].url == 'null') {
        	popUp.querySelector('.container h3').innerText = '';
        } else {
        	popUp.querySelector('.container h3').innerText = data.articles[index].author;
      	}
        popUp.querySelector('.container p').innerText = data.articles[index].description;
        popUp.querySelector('.container img').src = data.articles[index].urlToImage;
        popUp.querySelector('.popUpAction').href = data.articles[index].url;
    });
	});
}

// Clicking on Logo loads all three sources - tried to use 'all' as the source but the API was throwing errors, so I did it this way, which feels a bit hack-y
logo.addEventListener('click', function() {
        popUp.classList.add('loader');
        popUp.classList.remove('hidden');
        APITime('cnn,espn,the-new-york-times');
});

// Source drop down - Should probably think of way to make this more DRY and not repeat code three times
cnnLink.addEventListener('click', function() {
        popUp.classList.add('loader');
        popUp.classList.remove('hidden');
        APITime('cnn');
});

espnLink.addEventListener('click', function() {
        popUp.classList.add('loader');
        popUp.classList.remove('hidden');
        APITime('espn');
});

nytimesLink.addEventListener('click', function() {
        popUp.classList.add('loader');
        popUp.classList.remove('hidden');
        APITime('the-new-york-times');
});

// Initial Call - tried to use 'all' as the source but the API was throwing errors, so I did it this way, which feels a bit hack-y
APITime('cnn,espn,the-new-york-times');

















