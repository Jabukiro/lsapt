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
exports.removeItem = (id, productList) => {
    return productList.filter((product) => product.id != id);
}