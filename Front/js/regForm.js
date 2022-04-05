var athleteCount = 0
const parser = new DOMParser();
let isValid_flag = true;
const HOSTNAME = "https://lapt.localhost";
//Only to be called
const addAthleteRoutine = () => {
    const athleteFormTemplate = document.getElementById("accordionAthlete{{athleteNumber}}");
    const athleteFormDocument = parser.parseFromString(populateAthleteTemplate(athleteFormTemplate.outerHTML), "text/html");
    addAthleteEventListeners(athleteFormDocument.body.firstChild, athleteCount + 1);
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
 * returns null in case no match
*/
const extractAthleteNumber = id => {
    const possibleMatch = id.match("[0-9]+$");
    return possibleMatch === null ? null : possibleMatch[0];
}

//Based on athlete form group
//See /training/athleteFormTemplate.php for a template of the ahtlete's form.
//Enclose in a try/catch if using
//returns false if form is not valid. Extracted Athlete info otherwise.
const getAthleteInfo = (athleteForm, id) => {
    if (!athleteForm.checkValidity()) {
        //If there are required fields with no value
        //make sure the athlete accordion is opened
        //show Bootstrap custom validation messages.
        const elObject = $(`#collapse${id}`).collapse('show');
        elObject[0].classList.add("was-validated");
        isValid_flag = false;
        return false;
    }
    const result = {};
    const athleteInfoList = athleteForm.firstElementChild.lastElementChild.firstElementChild.children;
    result.full_name = athleteInfoList[0].children[1].value;
    result.gender = athleteInfoList[1].children[1].value;
    result.dob = athleteInfoList[2].children[1].value;
    result.school = athleteInfoList[3].children[1].value;
    return result
}

//Based on guardian form group
//See /training/guardianForm.php for a template of the ahtlete's form.
//returns false if form is not valid. Extracted Guardian info otherwise.
const getGuardianInfo = guardianElement => {
    const result = {}
    const guardianForm = guardianElement.firstElementChild;
    if (!guardianForm.checkValidity()) {
        //If there are required fields with no value
        //show Bootstrap custom validation messages.
        guardianForm.classList.add("was-validated");
        isValid_flag = false;
        return false;
    }
    const guardianInfo = guardianElement.firstElementChild.firstElementChild.children;
    result.full_name = guardianInfo[0].children[1].value;
    result.email = guardianInfo[1].children[1].value;
    result.contact_number = guardianInfo[2].children[1].value;
    result.address = guardianInfo[3].children[1].value;
    result.alt_name = guardianInfo[4].children[1].value;
    result.alt_contact_number = guardianInfo[5].children[1].value;
    return result;
}
const checkNotEmpty = (value, FieldName, Form) => {
    if (value === "") {
        isValid_flag = false;
    }
    return value;
}

//Parse to fetch active athleteElemetns and guardianElement nodes
//Relies on the structure of the registration form that can be seen at
// /training/regForm.php
//Returns false if validation failed. Otherwise returns the athleteList and guardian info
const getForms = () => {
    const athletePossibleElements = document.getElementById("athleteFormsContainer").children;
    //Check if there is an athlete form present. If there isn't show error message
    //There is already one Athlete Form in the document by default
    //But that form serves as a template
    if (athletePossibleElements.length <= 1) {
        const noAthleteFeedback = document.getElementById("noAthleteFeedback");
        noAthleteFeedback.style.display = "block";
        setTimeout(() => { noAthleteFeedback.style.display = "none"; }, 5000);
        return false;
    }
    //Gather athlete's info present on page
    let athleteList = [];
    for (let i = 0; i < athletePossibleElements.length; i++) {
        let id = extractAthleteNumber(athletePossibleElements[`${i}`].id);
        if (id !== null) {
            athleteList.push(
                getAthleteInfo(athletePossibleElements[`${i}`], id)
            );
        }
    }
    //gather guardian info present on page
    const guardianInfo = getGuardianInfo(document.getElementById("guardianFormContainer"));
    if (!isValid_flag) {
        //Validation isn't true
        //Show feedback
        const formsNotValid = document.getElementById("formsNotValid");
        formsNotValid.style.display = "block";
        setTimeout(() => { formsNotValid.style.display = "none"; }, 5000);
        isValid_flag = true;//reset validation flag
        return false;
    }
    return { guardianInfo, athleteList }
}
const getInputTextFromFormGroup = (formGroupElement) => {
    formGroupElement.lastElementChild.value
}
const addAthleteEventListeners = (athleteForm, athleteNumber) => {
    athleteForm.querySelector(`#athleteName${athleteNumber}`)
        .addEventListener("change", displayNameOnAccordionHeader);
}
/*document.getElementById("addAthleteBtn").addEventListener("click", () => {
    if (athleteCount === 0) {
        const athleteForm = document.getElementById('accordionAthlete1');
        addAthleteEventListeners(athleteForm, 1);
        document.getElementById('accordionAthlete1').style.display = 'block';
        athleteCount += 1;
        return;
    }
    addAthleteRoutine();
})*/
const openDrawer = () => {
    document.getElementById("cart-drawer").classList.add("open");
};

const serverLog = (message) => {
    fetch(`${HOSTNAME}:4000/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            query: `mutation Log($message: String!){ log(message:$message)}`,
            variables: { message },
        }),
    });
};

const generalFetch = ({
    body,
    resolve,
    reject = null,
    onCompletion = null,
    signal = null,
}) => {
    const start = new Date().getTime();
    fetch(`${HOSTNAME}:4000/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        body: body,
        signal,
    })
        .then((r) => {
            const elapsed = new Date().getTime() - start;
            serverLog(
                `Network Request to DataServer from CLient Side took: ${elapsed}ms`
            );
            return r.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((e) => {
            if (reject !== null) {
                reject(e);
                return;
            }
            console.log(e);
            return;
        })
        .finally(() => {
            if (onCompletion !== null) {
                onCompletion();
                return;
            }
        });
};
const addSessionfetchBody = (input) => {
    console.log("addSessionfetchBody provided with input:", input);
    return JSON.stringify({
        query: `mutation AddSession($input: SessionRegistration!) { addSessionToCart(input:$input) {
          session{
            id
            name
            description
            image
            attributes
            fee
            href
          }
          athleteList{
              full_name
          }
        }}`,
        variables: { input },
    });
}
const addSessionfetchResolve = (data) => {
    if (
        data &&
        data.data &&
        typeof data.data.addSessionToCart === "object"
    ) {
        setCartSessionsList(data.data.addSessionToCart);
        openDrawer();
        return;
    }
    if (data && data.data) {
        console.log("data returned but Cart Session List not object. Likely Internal server error", data);
        return;
    }
    //Something wrong with data
    console.log("Something wrong with db? Returned data: ", data);
}
//Expects two dom elements
//An element onto which a 'loading' class is added/removed depending on state
//A button that is disabled/enabled depending on state
const loadingCart = (id, state, productEl, productBtn) => {
    switch (state) {
        case "start":
            productEl.classList.add("loading");
            productBtn.setAttribute("disabled", "true");
            return;
        case "stop":
            productEl.classList.remove("loading");
            productBtn.removeAttribute("disabled");
            return;
        default:
            console.log(
                "loadingCart expected 'state' parameter to be one of 'start' or 'stop'. Instead state is: ",
                state
            );
            break;
    }
};
//Put loaders onto add to cart button
const domProduct = document.querySelector(".session-button-container");
domProduct.querySelector(".btn") //the Add To Cart button
    .addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const result = getForms();
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        loadingCart(id, "start", domProduct, e.target);
        result.sessionID = 1;
        generalFetch({
            body: addSessionfetchBody(result),
            resolve: addSessionfetchResolve,
            onCompletion: () => loadingCart(id, "stop", domProduct, e.target),
        });
    });

const cartOps = ({
    id,
    type,
    reject = null,
    resolve = null,
    onCompletion = null,
    signal = null,
}) => {
    const start = new Date().getTime();
    fetch(`${HOSTNAME}:4000/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            query: `mutation CartOperations($input: CartOperationsInput!) { cartOperations(input:$input) {
              list{
                id
                name
                attributes
                description
                image
                fee
                count
              }
            }}`,
            variables: { input: { id, type } },
        }),
        signal,
    })
        .then((r) => {
            const elapsed = new Date().getTime() - start;
            serverLog(
                `Network Request to DataServer from CLient Side took: ${elapsed}ms`
            );
            return r.json();
        })
        .then((data) => {
            if (
                data &&
                data.data &&
                typeof data.data.cartOperations === "object" &&
                typeof data.data.cartOperations.list === "object"
            ) {
                cartProductList = data.data.cartOperations.list;
                return;
            }
            if (data && data.data && typeof data.data.cartOperations === "object") {
                console.log("Cart List not object? Returned data: ", data);
                //No such product?!?!
                return;
            }
            //Something wrong with data
            console.log("Something wrong with db? Returned data: ", data);
        })
        .catch((e) => {
            console.log(e);
            return;
        })
        .finally(() => {
            if (onCompletion !== null) {
                onCompletion();
                return;
            }
        });
};
document.getElementById("addAthleteBtn").addEventListener("click", addAthleteRoutine)