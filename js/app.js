// Please add all Javascript code to this file.

// Grabbing DOM Elements
const search = document.querySelector('#search');
const popUp = document.querySelector('#popUp');
const closePopUp = document.querySelector('.closePopUp');
const navLink = document.querySelectorAll('nav ul li ul li a');

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
