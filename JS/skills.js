// Form inputs
const skillName = document.querySelector("#skill-name");
const skillDescription = document.querySelector("#skill-description");
const skillImage = document.querySelector("#image-url");

// Input messages
const skillNameMessage = document.querySelector("#name-message");
const skillDescriptionMessage = document.querySelector("#description-message");
const imageMessage = document.querySelector("#url-message");

// Prompt displayed if data is correct
const validPrompt = "Looks good!";

// Selecting the div container for all of the skills
var skillsContainer = document.querySelector("#skills");

// Array of all the skill elements 
var skillsElements = [];
// Populating this array
document.querySelectorAll(".skill").forEach(element => skillsElements.push(element));

class Skill {
    constructor(skillName, skillDescription, skillImage)
    {
        this.skillName = skillName;
        this.skillDescription = skillDescription;
        this.skillImage = skillImage;
    }
}

// Initializing empty array
var skills = [];

// Filling the array with skills
for(let i = 0; i < skillsElements.length; i++)
{
    skills.push(new Skill(
        skillsElements[i].children[0].innerText,
        skillsElements[i].children[1].innerText,
        skillsElements[i].children[2].src
    ));
}

// Deleting the oldest skill
document.querySelector("#remove-button").onclick = () => {
    if(skillsElements.length > 0) {
        skillsElements.pop().remove();
        skills.pop();
    }
}

document.querySelector("#add-button").onclick = () => {
    // Check if data is correct
    if(validateForm()) {
        // Add new skill to the beginning of the array
        skills.unshift(new Skill(skillName, skillDescription, skillImage));
        addNewFirstSkill();
        // Previous element had photo on the left
        let wasLeft = true;

        skillsElements.forEach(element => {
        if(wasLeft) {
            skillsContainer.innerHTML += 
                "<section class=\"skill skill-right\">" +
                    "<h2 class=\"section-title section-title--skill\">" +
                        element.children[0].innerText + 
                    "</h2>" +
                    "<p class=\"section-subtitle section-subtitle--skill\">" + 
                        element.children[1].innerText + 
                    "</p>" + 
                    "<img class=\"image-skills\" " + "src=\"" + element.children[2].src + 
                    "\" alt=\"Picture of a " + element.children[0].innerText + " skill\">" + 
                "</section>";
            wasLeft = false;
        } else {
            skillsContainer.innerHTML += 
                "<section class=\"skill skill-left\">" +
                    "<h2 class=\"section-title section-title--skill\">" +
                        element.children[0].innerText + 
                    "</h2>" +
                    "<p class=\"section-subtitle section-subtitle--skill\">" + 
                        element.children[1].innerText + 
                    "</p>" + 
                    "<img class=\"image-skills\" " + "src=\"" + element.children[2].src + 
                    "\" alt=\"Picture of a " + element.children[0].innerText + " skill\">" + 
                "</section>";
            wasLeft = true;
        }
        });

        // Repopulate skillsElements
        skillsElements = [];
        document.querySelectorAll(".skill").forEach(element => skillsElements.push(element));

        clearValidationStatusClasses();
        clearForm();
    }
}

function validateForm() {

    // Clear all validation status classes
    clearValidationStatusClasses();

    // no blank, less than 32 character
    if (skillName.validity.valueMissing) {
        skillNameMessage.innerHTML = "Please enter new skill's name!";
        skillNameMessage.classList.add("invalid-feedback");
        skillName.classList.add("is-invalid");
        return false;
    } else if (skillName.validity.tooLong) {
        skillNameMessage.innerHTML = "Skill's name must be less than 32 characters!";
        skillNameMessage.classList.add("invalid-feedback");
        skillName.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        skillNameMessage.innerHTML = validPrompt;
        skillNameMessage.classList.add("valid-feedback");
        skillName.classList.add("is-valid");
    }

    // No blank, proper url, less than 50 character
    if (skillImage.validity.valueMissing) {
        imageMessage.innerHTML = "Please enter URL to the skillImage!";
        imageMessage.classList.add("invalid-feedback");
        skillImage.classList.add("is-invalid");
        return false;
    } else if (skillImage.validity.tooLong) {
        imageMessage.innerHTML = "URL must be less than 128 characters!";
        imageMessage.classList.add("invalid-feedback");
        skillImage.classList.add("is-invalid");
        return false;
    } else if (skillImage.validity.typeMismatch) {
        imageMessage.innerHTML = "Write an URL adress!";
        imageMessage.classList.add("invalid-feedback");
        skillImage.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        imageMessage.innerHTML = validPrompt;
        imageMessage.classList.add("valid-feedback");
        skillImage.classList.add("is-valid");
    }

    // no blank, less than 1024 character
    if (skillDescription.validity.valueMissing) {
        skillDescriptionMessage.innerHTML = "Please enter new skill's description!";
        skillDescriptionMessage.classList.add("invalid-feedback");
        skillDescription.classList.add("is-invalid");
        return false;
    } else if (skillDescription.validity.tooLong) {
        skillDescriptionMessage.innerHTML = "Skill's description must be less than 1024 characters!";
        skillDescriptionMessage.classList.add("invalid-feedback");
        skillDescription.classList.add("is-invalid");
        return false;
    } else { // it goes to the next input
        skillDescriptionMessage.innerHTML = validPrompt;
        skillDescriptionMessage.classList.add("valid-feedback");
        skillDescription.classList.add("is-valid");
    }
    return true;
}

function addNewFirstSkill() {
    skillsContainer.innerHTML = 
        "<section class=\"skill skill-left\">" +
            "<h2 class=\"section-title section-title--skill\">" +
                skillName.value + 
            "</h2>" +
            "<p class=\"section-subtitle section-subtitle--skill\">" + 
                skillDescription.value + 
            "</p>" + 
            "<img class=\"image-skills\" " + "src=\"" + skillImage.value + "\" alt=\"Picture of a " + skillName.value + 
            " skill\">" + 
        "</section>";
}

// Clear css classes for validation status
function clearValidationStatusClasses() {
    let inputs = [skillName, skillDescription, skillImage];
    let messages = [skillNameMessage, skillDescriptionMessage, imageMessage];

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

function clearForm() {
    skillName.value = "";
    skillDescription.value = "";
    skillImage.value = "";
}