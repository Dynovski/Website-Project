// Selecting the div container for all of the skills
var skillsContainer = document.querySelector("#skills");

// Array of all the skill elements 
var skillsElements = [];
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
    ))
}

document.querySelector("#remove-button").onclick = () => {
    if(skillsElements.length > 0)
    skillsElements.pop().remove();
    skills.pop();
}

document.querySelector("#add-button").onclick = () => {
    let skillName = document.querySelector("#skill-name");
    let skillDescription = document.querySelector("#skill-description");
    let image = document.querySelector("#image-url");

    // Check if data was provided
    if(skillName.value.trim() === "") {
        alert("Skill name must be provided in the form!");
        return;
    } else if(skillDescription.value.trim() === "") {
        alert("Skill description must be provided in the form!");
        return;
    } else if(image.value.trim() === "") {
        alert("Skill image must be provided in the form!");
        return;
    }

    skills.push(new Skill(skillName, skillDescription, image));

    skillsContainer.innerHTML = 
    "<section class=\"skill skill-left\">" +
        "<h2 class=\"section-title section-title--skill\">" +
            skillName.value + 
        "</h2>" +
        "<p class=\"section-subtitle section-subtitle--skill\">" + 
            skillDescription.value + 
        "</p>" + 
        "<img class=\"image-skills\" " + "src=\"" + image.value + "\" alt=\"Picture of a " + skillName.value + 
        " skill\">" + 
    "</section>";

    var wasLeft = true;

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

    skillsElements = [];
    document.querySelectorAll(".skill").forEach(element => skillsElements.push(element));

    // Clear the form
    skillName.value = "";
    skillDescription.value = "";
    image.value = "";
}