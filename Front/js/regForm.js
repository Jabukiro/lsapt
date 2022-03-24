var athleteCount = 0
const parser = new DOMParser();

//Only to be called
const addAthleteRoutine = () => {
    const athleteFormTemplate = document.getElementById("accordionAthlete{{athleteNumber}}");
    const athleteFormDocument = parser.parseFromString(populateAthleteTemplate(athleteFormTemplate.outerHTML), "text/html");
    addAthleteEventListeners(athleteFormDocument.body.firstChild, athleteCount += 1);
    athleteFormDocument.body.firstChild.style.display = "block";
    document.getElementById(`athleteFormsContainer`).appendChild(athleteFormDocument.body.firstChild);
    athleteCount += 1;
}
/**Expects an htmlString. Get it via element.outerHtml or element.innerHtml
 * Returns an htmlString. You can use DOMParser API to create a DOM element from the string
  */
const populateAthleteTemplate = (athleteFormTemplateString) => {
    return athleteFormTemplateString.replaceAll("{{athleteNumber}}", athleteCount + 1);
}
/** Function to link entered full name to displayed text on athlete accordion
 * function to be called by event emmited by text input
*/
const displayNameOnAccordionHeader = e => {
    const athleteNumber = extractAthleteNumber(e.target.id);
    document.getElementById(`accordionHeaderAthlete${athleteNumber}`).textContent = e.target.value;
}
/**elements on an athlete's form have the pattern "^[a-Z]+[0-9]+$" as id
 * where [0-9]+ represents the athleteNumber
 * athleteNumber is just an arbritrary number to differentiate the similar athlete forms
 * in case there is more than 1
*/
const extractAthleteNumber = id => {
    return id.match("[0-9]+$")[0];
}
const addAthleteEventListeners = (athleteForm, athleteNumber) => {
    athleteForm.querySelector(`#athleteName${athleteNumber}`)
        .addEventListener("change", displayNameOnAccordionHeader);
}
document.getElementById("addAthleteBtn").addEventListener("click", () => {
    if (athleteCount === 0) {
        const athleteForm = document.getElementById('accordionAthlete1');
        addAthleteEventListeners(athleteForm, 1);
        document.getElementById('accordionAthlete1').style.display = 'block';
        athleteCount += 1;
        return;
    }
    addAthleteRoutine();
})