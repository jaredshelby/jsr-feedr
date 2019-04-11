// Please add all Javascript code to this file.

// Grabbing DOM Elements
const search = document.querySelector('#search');
const popUp = document.querySelector('#popUp');
const closePopUp = document.querySelector('.closePopUp');
const navLink = document.querySelectorAll('nav ul li ul li a');
const featImage = document.querySelector('.featuredImage img');
const articleTitle = document.querySelector('.articleContent a h3');
const articleDesc = document.querySelector('.articleContent h6');
const impCount = document.querySelector('.impressions');

// DOM and UI Interactions
search.addEventListener('click', function(){ 
	search.classList.toggle('active');
});

closePopUp.addEventListener('click', function(){ 
	popUp.classList.add('hidden');
});

navLink.forEach(function(elem) {
    elem.addEventListener('click', function() {
        popUp.classList.remove('hidden');
    });
});

// API variables
const xhr = new XMLHttpRequest();
const NEWSAPI_KEY = '39cd29a6a549437caac9b3b0c71c7c4c';
let cleanData = {};
let url = `https://newsapi.org/v2/top-headlines?` +
          `country=us&` +
          `apiKey=${NEWSAPI_KEY}`;


// API Work
xhr.open('GET', url);
xhr.send();
xhr.onload = onSuccess;

function onSuccess() {
	cleanData = JSON.parse(xhr.responseText);
  	console.log(cleanData);
  	changeHTML(cleanData);
}

function changeHTML(data) {
	var artArray = data.articles;
	artArray.forEach(function(article, index) {
	  featImage.src = data.articles[index].urlToImage;
	  articleTitle.innerHTML = data.articles[index].title;
	  articleDesc.innerHTML = data.articles[index].description;
	  impCount.innerHTML = data.articles[index].publishedAt;
	});
}

function changeHTML(data) {
	var artArray = data.articles;
	artArray.forEach(function(article, index) {
	  featImage.src = data.articles[index].urlToImage;
	  articleTitle.innerHTML = data.articles[index].title;
	  articleDesc.innerHTML = data.articles[index].description;
	  impCount.innerHTML = data.articles[index].publishedAt;
	  console.log(index);
	});
}





















