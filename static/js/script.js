window.onload = () => {
	'use strict';
	
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('./sw.js').then(function (registration) {
			
			// Service worker registered correctly.
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		},
		function (err) {
			
			// Troubles in registering the service worker. :(
			console.log('ServiceWorker registration failed: ', err);
		});
	}
}

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
}

$("form[name=signup_form").submit(function(e) {
	
	var $form = $(this);
	var $error = $form.find(".error");
	var data = $form.serialize();
	
	$.ajax({
		url: "/user/signup",
		type: "POST",
		data: data,
		dataType: "json",
		success: function(resp) {
			window.location.href = "/User/";
		},
		error: function(resp) {
			$error.text(resp.responseJSON.error).removeClass("error--hidden");
		}
	});
	
	e.preventDefault();
});

$("form[name=login_form").submit(function(e) {
	
	var $form = $(this);
	var $error = $form.find(".error");
	var data = $form.serialize();
	
	$.ajax({
		url: "/user/login",
		type: "POST",
		data: data,
		dataType: "json",
		success: function(resp) {
			window.location.href = "/User/";
		},
		error: function(resp) {
			$error.text(resp.responseJSON.error).removeClass("error--hidden");
		}
	});
	
	e.preventDefault();
});

