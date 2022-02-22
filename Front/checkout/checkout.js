// This is your test publishable API key.
const stripe = Stripe("pk_test_v8zYABn7Mg3koVWzEqQJzw1S00nIEnghw1");
// The items the customer wants to buy
const HOSTNAME = "https://live.linespeedapt.com";

const items = Array.from(document.querySelectorAll(".cart-product-card-content"));


let elements;
let paymentIntent;

initialize();
checkStatus();

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);


// Fetches a payment intent and captures the client secret

async function initialize() {
    const c = encodeURIComponent(getCookie("angel"));
    const data = await fetch(`/checkout/create.php?s=${c}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
    paymentIntent = data.paymentIntent;
    elements = stripe.elements({ clientSecret: paymentIntent.client_secret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const email = getEmailDOM();
    const receipt_email = email.value.replace(/\s+/g, '');
    if (!validateEmail(receipt_email)) {
        inputErrorToggle(email);
        showMessage("A Valid email address is required to send a proof of payment");
        setLoading(false);
        return;
    }
    const data = await fetch(
        `/checkout/paymentIntent.php?payment_intent=${paymentIntent.id}&receipt_email=${encodeURIComponent(receipt_email)}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((r) => r.json());
    const c = encodeURIComponent(getCookie("angel"));
    const error = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `${HOSTNAME}/checkout/confirmed.php?s=${c}`,
            payment_method_data: {
                billing_details: {
                    email: receipt_email,
                },
            },
        },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    console.log(error)
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occured.");
    }
    setLoading(false);
}
// Fetches the payment intent status after payment submission

async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    if (!clientSecret) {
        return;
    }
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!");
            break;
        case "processing":
            showMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
        default:
            showMessage("Something went wrong.");
            break;
    }
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//RFC5322 compliant (precluding comments)
function validateEmail(input) {
    const regex = new RegExp(/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/);
    return regex.test(input);
}
function getEmailDOM() {
    return document.getElementById("receipt_email");
}


// ------- UI helpers -------
function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}
// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}
// Show a red box shadow on an input
function inputErrorToggle(target, state = "error") {
    if (state === "error") {
        target.classList.add("inputError");
        return;
    }
    target.classList.remove("inputError");
}

//EventsListeners
getEmailDOM().addEventListener("change", (e) => {
    if (!validateEmail(e.target.value)) {
        inputErrorToggle(e.target);
        return
    }
    inputErrorToggle(e.target, "ok");
})