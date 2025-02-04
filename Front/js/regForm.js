var athleteCount = 0
const parser = new DOMParser();
let isValid_flag = true;
let alreadyRegistered_flag = false;
let cartSessionsList = [];
const pageUrl = new URL(window.location.href);
const HOSTNAME = "https://lapt.localhost";

//Maps the attributes of the guardian/athlete form to their corresponding
//index in the guardian/athlete form.
//Used to iterate through the DOMelements with the correct attributes to the object from DataServer
//To be changed when/if the html structure of each is changed
const guardianFormMapping = ["full_name", "address", "email", "contact_number", "alt_name", "alt_contact_number"];
const athleteFormMapping = ["full_name", "gender", "dob", "school"];
const sessionsHref = ["/training/speed-agility/", "/training/linear-speed/", "/training/holiday-program/"];

//Only to be called
const addAthleteRoutine = (athleteInfo) => {
    const athleteFormTemplate = document.getElementById("accordionAthlete{{athleteNumber}}");
    const athleteFormDocument = parser.parseFromString(populateAthleteTemplate(athleteFormTemplate.outerHTML), "text/html");
    addAthleteEventListeners(athleteFormDocument.body.firstChild, athleteCount + 1);
    //Inject information about the athlete if it has been given
    if (typeof athleteInfo === 'object') {
        console.log("Athlete Info contents: ", athleteInfo);
        setAthleteInfo(athleteFormDocument, athleteInfo);
    }
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
//returns the session href that matches with the current page url
const getSessionHref = () => {
    return sessionsHref.find(sessionHref => pageUrl.pathname.match(sessionHref) !== null);
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
    athleteFormMapping.forEach((attribute, index) => {
        result[attribute] = athleteInfoList[index].children[1].value;
    })
    return result
}
const setAthleteInfo = (athleteForm, athleteInfo) => {
    athleteFormMapping.forEach((attribute, index) => {
        athelteForm.firstElementChild.lastElementChild.firstElementChild.children[index].children[1].value
            = athleteInfo[attribute];
    })
    athleteForm.classList.add("was-validated");
}
const getGuardianForm = () => document.getElementById("guardianFormContainer").firstElementChild;
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
    guardianFormMapping.forEach((attribute, index) => {
        result[attribute] = guardianInfo[index].children[1].value;
    })
    return result;
}

const setGuardianInfo = (guardianForm, guardianInfo) => {
    guardianFormMapping.forEach((attribute, index) => {
        guardianForm.firstElementChild.children[index].children[1].value = guardianInfo[attribute];
    })
    guardianForm.classList.add("was-validated");
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
        if (alreadyRegistered_flag) {
            const isOk = confirm("Are you sure you want to overwrite the already registered session?");
            if (!isOk) return;
        }
        const id = e.target.getAttribute("data-id");
        const result = getForms();
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        loadingCart(id, "start", domProduct, e.target);
        result.sessionHref = getSessionHref();
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

document.getElementById("addAthleteBtn").addEventListener("click", () => addAthleteRoutine());

var CSLintervalID = setInterval(() => {
    if (window.getCartSessionsList().length > 0) {
        //do stuff
        console.log("cartSessionList not empty");
        rePopulateFormsRoutine();
        return;
    }
    console.log("cartSessionList empty");
}, 1000)

//For the current page script is running on,
//Return the relevant cart Session
//Used to populate cart content back onto the form.
const getRelevantCartSession = () => {
    return window.getCartSessionsList().find((cartSession) => pageUrl.pathname.match(cartSession.session.href) !== null);
}
const rePopulateFormsRoutine = () => {
    clearInterval(CSLintervalID);
    const cartSession = getRelevantCartSession();
    if (cartSession == undefined) {
        //no session mathcing to this page
        return;
    }
    //There is a registered session in the cart corresponding to this session page
    alreadyRegistered_flag = true;
    console.log("Matching cartSession:", cartSession);
    setGuardianInfo(getGuardianForm(), cartSession.guardianInfo)
    cartSession.athleteList.map(singleAthleteInfo => { athleteRoutine });
}