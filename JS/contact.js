// Form inputs
const firstName = document.querySelector("#input-first-name");
const lastName = document.querySelector("#input-last-name");
const gender = document.querySelector("#input-gender");
const age = document.querySelector("#input-age");
const email = document.querySelector("#input-email");
const website = document.querySelector("#input-website");
const comment = document.querySelector("#input-comment");

// Input messages
const firstNameMessage = document.querySelector("#first-name-message");
const lastNameMessage = document.querySelector("#last-name-message");
const genderMessage = document.querySelector("#gender-message");
const ageMessage = document.querySelector("#age-message");
const emailMessage = document.querySelector("#email-message");
const websiteMessage = document.querySelector("#website-message");
const commentMessage = document.querySelector("#comment-message");

// Prompt to show when form is correct
const  validPrompt = "Looks good!";

const commentButton = document.querySelector("#comment-button");

commentButton.onclick = () => {
    // If input correct add new comment
    if(validateInput())
    {
        // Add comment to the comment section
        addComment();

        // clear the form
        clearValidationStatusClasses();
        clearInputs();
    }
}

// Clear all form data and validation statuses
document.querySelector("#reset-button").onclick = () => {
    clearValidationStatusClasses();
    clearInputs();
}

// Validates user input if everything is corrent form data is cleared, 
//if not message is displayed about what is wrong
function validateInput() {

    // Clear all validation status classes
    clearValidationStatusClasses();

    // No blank, less than 25 character
    if (firstName.validity.valueMissing) {
        firstNameMessage.innerHTML = "Please enter your first name!";
        firstNameMessage.classList.add("invalid-feedback");
        firstName.classList.add("is-invalid");
        return false;
    } else if (firstName.validity.tooLong) {
        firstNameMessage.innerHTML = "First name must be less than 25 characters!";
        firstNameMessage.classList.add("invalid-feedback");
        firstName.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        firstNameMessage.innerHTML =  validPrompt;
        firstNameMessage.classList.add("valid-feedback");
        firstName.classList.add("is-valid");
    }

    // No blank, less than 25 character
    if (lastName.validity.valueMissing) {
        lastNameMessage.innerHTML = "Please enter your last name!";
        lastNameMessage.classList.add("invalid-feedback");
        lastName.classList.add("is-invalid");
        return false;
    } else if (lastName.validity.tooLong) {
        lastNameMessage.innerHTML = "Last name must be less than 25 characters!";
        lastNameMessage.classList.add("invalid-feedback");
        lastName.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        firstNameMessage.innerHTML =  validPrompt;
        lastNameMessage.classList.add("valid-feedback");
        lastName.classList.add("is-valid");
    }

    //  No blank
    if (gender.value === "blank") {
        genderMessage.innerHTML = "Please select gender!";
        genderMessage.classList.add("invalid-feedback");
        gender.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        genderMessage.innerHTML =  validPrompt;
        genderMessage.classList.add("valid-feedback");
        gender.classList.add("is-valid");
    }

    // No blank, older than 18, below 100
    if (age.validity.valueMissing) {
        ageMessage.innerHTML = "Please enter your age!";
        ageMessage.classList.add("invalid-feedback");
        age.classList.add("is-invalid");
        return false;
    } else if (age.validity.rangeOverflow) {
        ageMessage.innerHTML = "Age must be below 100!";
        ageMessage.classList.add("invalid-feedback");
        age.classList.add("is-invalid");
        return false;
    } else if (age.validity.rangeUnderflow) {
        ageMessage.innerHTML = "Age must be over 18!";
        ageMessage.classList.add("invalid-feedback");
        age.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        ageMessage.innerHTML =  validPrompt;
        ageMessage.classList.add("valid-feedback");
        age.classList.add("is-valid");
    }

    // No blank, proper email, less than 50 character
    if (email.validity.valueMissing) {
        emailMessage.innerHTML = "Please enter your E-mail!";
        emailMessage.classList.add("invalid-feedback");
        email.classList.add("is-invalid");
        return false;
    } else if (email.validity.tooLong) {
        emailMessage.innerHTML = "E-mail must be less than 50 characters!";
        emailMessage.classList.add("invalid-feedback");
        email.classList.add("is-invalid");
        return false;
    } else if (email.validity.typeMismatch) {
        emailMessage.innerHTML = "Write an E-mail adress!";
        emailMessage.classList.add("invalid-feedback");
        email.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        emailMessage.innerHTML =  validPrompt;
        emailMessage.classList.add("valid-feedback");
        email.classList.add("is-valid");
    }

    // No blank, proper url, less than 50 character
    if (website.validity.valueMissing) {
        websiteMessage.innerHTML = "Please enter your website URL!";
        websiteMessage.classList.add("invalid-feedback");
        website.classList.add("is-invalid");
        return false;
    } else if (website.validity.tooLong) {
        websiteMessage.innerHTML = "URL must be less than 50 characters!";
        websiteMessage.classList.add("invalid-feedback");
        website.classList.add("is-invalid");
        return false;
    } else if (website.validity.typeMismatch) {
        websiteMessage.innerHTML = "Write an URL adress!";
        websiteMessage.classList.add("invalid-feedback");
        website.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        websiteMessage.innerHTML =  validPrompt;
        websiteMessage.classList.add("valid-feedback");
        website.classList.add("is-valid");
    }

    // No blank, less than 255 characters
    if (comment.validity.valueMissing) {
        commentMessage.innerHTML = "Please enter your comment!";
        commentMessage.classList.add("invalid-feedback");
        comment.classList.add("is-invalid");
        return false;
    } else if (comment.validity.tooLong) {
        commentMessage.innerHTML = "Comment must be less than 255 characters!";
        commentMessage.classList.add("invalid-feedback");
        comment.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        commentMessage.innerHTML =  validPrompt;
        commentMessage.classList.add("valid-feedback");
        comment.classList.add("is-valid");
    }
    // If here means that all the data is correct
    return true;
}

function clearValidationStatusClasses() {
    let inputs = [firstName, lastName, gender, age, email, website, comment];
    let messages = [firstNameMessage, lastNameMessage, genderMessage, ageMessage, emailMessage,
                    websiteMessage, commentMessage];

    for(let i = 0; i < inputs.length; i++) {
        removeInputClasses(inputs[i]);
        removeMessageClasses(messages[i]);
    }
}

function removeInputClasses(element) {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
}

function removeMessageClasses(element) {
    element.classList.remove("valid-feedback");
    element.classList.remove("invalid-feedback");
    clearMessageContent(element);
}

function clearMessageContent(element) {
    element.innerHTML = "";
}

function clearInputs() {
    firstName.value = "";
    lastName.value = "";
    gender.value = "blank";
    age.value = "";
    email.value = "";
    website.value = "";
    comment.value = "";
}

function addComment() {
    document.querySelector("#comments").innerHTML += 
        "<section>" +
            "<div class=\"section-comment\">" + 
                "<p class=\"comment-name\">" + 
                    firstName.value + " " + lastName.value + ", " +
                    "<a class=\"comment-mail\" href=\"mailto:" + email.value + "\">" + 
                        email.value + 
                    "</a>" +
                "</p>" +
                "<a class=\"comment-url\" href=\"" + website.value + "\">" 
                    + website.value + 
                "</a>" +
                "<p class=\"comment\">" +
                    comment.value + 
                "</p>" +
            "</div>" +
        "</section>";
}