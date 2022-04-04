const session = require("express-session");

exports.add = (newProduct, productList) => {
    let addFlag = false;
    if (productList.length === 0) {
        //Adding first product
        newProduct.count = 1;
        productList.push(newProduct);
        return productList;
    }
    productList.map((cartProduct, index) => {
        if (newProduct.id == cartProduct.id) {
            cartProduct.count += 1;
            addFlag = true;
        }
        if (productList.length === index + 1 && !addFlag) {
            newProduct.count = 1;
            productList.push(newProduct);
            addFlag = false;
        }
    });
    return productList;
}
exports.addSession = (newSession, sessionList) => {
    //If there is a sessionRegistration for a particular sessionID
    //Overwrite with new sessionRegistration
    //Done in case an athlete needs
    console.log("cartProduct.js: sessionList", JSON.stringify(sessionList));
    for (let i = 0; i < sessionList.length; i++) {
        if (newSession.session.id == sessionList[i].session.id) {
            sessionList[i] = newSession;
            return sessionList;
        }
    }
    //Covers the case where the particular sessionID isn't present
    //or sessionList is empty
    sessionList.push(newSession)
    return sessionList;
}
exports.decrementItem = (id, productList) => {
    const index = productList.findIndex((product) => product.id == id); //Find where the product with corresponding ID is
    if (index === -1) { return productList; } // no such product in cart
    if (productList[index].count === 1) {
        //Remove Item as decrementing count would make count === 0
        return productList.filter((product) => product.id != id);
    }
    productList[index].count -= 1; //decrement
    return productList;
};
getProducts = (cartSession) => {
    return typeof cartSession.value === "object" ? cartSession.value : [];
}
getRegisteredSessions = (cartSession) => {
    return typeof cartSession.registeredSessions === "object" ? cartSession.registeredSessions : [];
}
exports.removeItem = (id, productList) => {
    return productList.filter((product) => product.id != id);
}