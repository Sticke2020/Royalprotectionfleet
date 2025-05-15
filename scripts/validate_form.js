"use strict";

// Create functions
const getElement = (selector) => document.querySelector(selector);

const setFocus = (selector) => getElement(selector).focus();

const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

setFocus("#email");

const validateForm = () => {
	let validEmail = validateEmail();
	let validName = validateName();
	let validReason = validateReason();

	return validEmail && validName && validReason;
};

const validateReason = () => {
	let isValid = true;
	try {
		checkIfExists(getElement("#reason").value, "reason");
	} catch (error) {
		getElement("#span_reason").textContent = error.message;
		isValid = false;
		setFocus("#reason");
	}
	return isValid;
};

const validateName = () => {
	let isValid = true;
	try {
		checkIfExists(getElement("#first_name").value, "first_name");
	} catch (error) {
		getElement("#span_name").textContent = error.message;
		isValid = false;
		setFocus("#first_name");
	}
	return isValid;
};

const validateEmail = () => {
	let isValid = true;
	try {
		let email = checkIfExists(getElement("#email").value, "email");
		if (!emailPattern.test(email)) {
			getElement("#span_email").textContent = "Enter valid Email";
			isValid = false;
		} else {
			getElement("#span_email").textContent = "";
		}
	} catch (error) {
		getElement("#span_email").textContent = error.message;
		isValid = false;
		setFocus("#email");
	}
	return isValid;
};

const checkIfExists = (text, name) => {
	if (!text) {
		switch (name) {
			case "email":
				throw new Error("Email Required");
			case "first_name":
				throw new Error("Name Required");
			case "reason":
				throw new Error("Reason Required");
		}
	}
	return text;
};

const redirect = () => {
	const form = document.querySelector("form");
	const formData = new FormData(form);

    fetch("https://formspree.io/f/mgvkprvo", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "../pages/thank_you.html"; 
        } else {
            alert("There was a problem with your submission. Please try again.");
        }
    })
    .catch(error => {
        console.error("Submission error:", error);
        alert("There was a network error.");
    });
};

document.addEventListener("DOMContentLoaded", () => {
	getElement("#process_information").addEventListener("click", (e) => {
		e.preventDefault();
		if (validateForm()) {
			redirect();
		}
	});
});