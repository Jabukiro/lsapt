var athleteCount = 0
const parser = new DOMParser();

//Only to be called
const addAthleteRoutine = () => {
    const athleteFormTemplate = document.getElementById("accordionAthlete{{athleteNumber}}");
    const athleteFormDocument = parser.parseFromString(populateAthleteTemplate(athleteFormTemplate.outerHTML), "text/html");
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
document.getElementById("addAthleteBtn").addEventListener("click", () => {
    if (athleteCount === 0) {
        document.getElementById('accordionAthlete1').style.display = 'block';
        athleteCount += 1;
        return;
    }
    addAthleteRoutine();
})