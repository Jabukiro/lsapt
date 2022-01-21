<script>
  import { prevent_default } from "svelte/internal";

  import CartProduct from "./cartProductCard.svelte";
  const openDrawer = () => {
    const cartDrawer = document.getElementById("cart-drawer");
    const [backdrop, drawerPaper] = cartDrawer.children;
    cartDrawer.style.visibility = "visible";
    backdrop.style.opacity = 0.5;
    drawerPaper.style.right = 0;
  };
  const closeDrawer = () => {
    const cartDrawer = document.getElementById("cart-drawer");
    const [backdrop, drawerPaper] = cartDrawer.children;
    cartDrawer.style.visibility = "hidden";
    backdrop.style.opacity = 0;
    drawerPaper.style.right = "-500px";
  };
  const getProduct = (id, signal = null) => {
    fetch("https://lapt.localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query GetProduct($id: ID!) { getProduct(id:$id) {
          id
          name
          attributes
          description
          image
          fee
        }}`,
        variables: { id },
      }),
      signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (
          data &&
          data.data &&
          typeof data.data.getProduct === "object" &&
          data.data.getProduct.id != null
        ) {
          Products.add(data.data.getProduct);
          console.log(Products);
          return;
        }
        if (data && data.data && typeof data.data.getProduct === "object") {
          console.log("No such product in db? Returned data: ", data);
          //No such product?!?!
          return;
        }
        //Something wrong with data
        console.log("Something wrong with db? Returned data: ", data);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  document
    .querySelectorAll(".session-product-container .content-actions .btn")
    .forEach((closer) => {
      closer.addEventListener("click", (e) => {
        getProduct(e.target.getAttribute("data-id"));
      });
    });
  const backdrop = document.getElementById("cart-drawer").children[0];
  backdrop.addEventListener("click", () => {
    closeDrawer();
  });
  document.getElementById("cartIcon").addEventListener("click", () => {
    openDrawer();
  });
  //Add all these 3 functions to Product Object
  const incrementItem = (id) => {
    const index = Products.list.findIndex((product) => product.id === id); //Find where the product with corresponding ID is
    Products.list[index].count += 1;
  };
  const decrementItem = (id) => {
    const index = Products.list.findIndex((product) => product.id === id); //Find where the product with corresponding ID is
    if (Products.list[index].count === 1) {
      return;
    }
    Products.list[index].count -= 1;
  };
  const removeItem = (id) => {
    Products.list = Products.list.filter((product) => product.id !== id);
  };

  const Products = {
    __addFlag: false,
    list: [],
    //It is assumed that a single product is added
    //The list keeps no duplicate products and rather uses count to keep track of how many of each product
    //This function might be covering an edge case really as there is an incrementing button on cart.
    add: (product) => {
      if (Products.list.length === 0) {
        //Adding first product
        product.count = 1;
        Products.push(product);
        console.log("product added to cart", product);
        return;
      }
      Products.list.map((cartProduct, index) => {
        console.log("add() considering Cart Product: ", cartProduct);
        if (product.id === cartProduct.id) {
          cartProduct.count += 1;
          console.log("cartProduct count incremented: ", cartProduct);
          Products.__addFlag = true;
        }
        if (Products.list.length === index + 1 && !Products.__addFlag) {
          product.count = 1;
          Products.push(product);
          Products.__addFlag = false;
          console.log("product added to cart", product);
        }
      });
      console.log("add() processed product: ", product);
    },
    //Replicates push behavior for svelte reactivity
    push: (product) => {
      Products.list.push(product);
      Products.list = Products.list;
    },
  };
  $: subTotal = Products.list.reduce((previous, current) => {
    return previous + current.fee * current.count;
  }, 0);
  //Reserved. Might be usefull if discounts are available.
  $: total = subTotal;
</script>

<div class="cart-header">
  <div class="cart-header-main">
    <h2 class="h3">Shopping Cart</h2>
    <label for="cart-drawer" class="small-font">{Products.list.length}</label>
  </div>
  <button
    on:click={closeDrawer}
    type="button"
    class="close"
    aria-label="Close Cart"
  >
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="cart-body-wrapper">
  <div class="cart-body">
    {#each Products.list as product (product.id)}
      <CartProduct
        {product}
        incrementItem={() => incrementItem(product.id)}
        decrementItem={() => decrementItem(product.id)}
        {removeItem}
      />
    {/each}
  </div>
  <div class="cart-checkout" class:displayHide={Products.list.length === 0}>
    <div class="cart-checkout-totals mb-3">
      <div
        class="cart-checkout-subtotals d-flex flex-row justify-content-between small-font"
      >
        <span class="font-weight-bold text-uppercase">SUBTOTAL:</span>
        <span class="font-weight-bold">{`$${subTotal.toFixed(2)}`}</span>
      </div>
      <div class="horizontal-divider" style="margin: 0.5rem 0" />
      <div
        class="cart-checkout-estimated-totals d-flex flex-row justify-content-between"
      >
        <span class="font-weight-bold text-uppercase">Total:</span>
        <span class="font-weight-bold">{`$${total.toFixed(2)}`}</span>
      </div>
    </div>
    <div class="cart-checkout-proceed d-flex flex-column align-items-center">
      <button class="btn btn-primary text-uppercase mb-2"
        >Proceed to Checkout</button
      >
      <span class="cart-checkout-info">We accept Debit cards and Paypal.</span>
    </div>
  </div>
</div>

<style>
  .displayHide {
    display: none;
  }
</style>
