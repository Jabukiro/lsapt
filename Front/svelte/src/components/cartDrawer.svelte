<script>
  import CartContent from "./cartContent.svelte";
  const HOSTNAME = "https://lapt.localhost";
  let isOpen = false;

  //Represent the location of flyer like products
  //Will be used for merch
  const PRODUCTSLOCATION = [];

  //Represent the location of session products. Differet UI as flyer products
  //The different UI means different targeting and loading state appearance
  //The cart itself represents all cart products in the same vein.
  const SESSIONLOCATION = [/^\/training\/.*$/];
  const pageUrl = new URL(window.location.href);

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

  let cartList = [];
  const cartQuery = ({ onCompletion = null } = {}) => {
    const start = new Date().getTime();
    fetch(`${HOSTNAME}:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query: `query Cart { cart {
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
      }),
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
          typeof data.data.cart === "object" &&
          typeof data.data.cart.list === "object"
        ) {
          cartList = data.data.cart.list;
          return;
        }
        if (data && data.data && typeof data.data.cart === "object") {
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
  cartQuery(); //Fetch cart saved on server if there is any

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
          cartList = data.data.cartOperations.list;
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

  const openDrawer = () => {
    document.getElementById("cart-drawer").classList.add("open");
  };

  const closeDrawer = () => {
    document.getElementById("cart-drawer").classList.remove("open");
  };

  document.getElementById("cartIcon").addEventListener("click", () => {
    openDrawer();
  });

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

  //put loaders onto products
  if (PRODUCTSLOCATION.some((location) => pageUrl.pathname.match(location))) {
    //Lets load the products that are displayed on the page
    //Needed so that they can be target by loading indicators
    const domProducts = Array.from(
      document.querySelectorAll(".session-product-container")
    );

    domProducts.forEach((productEl) => {
      const productBtn = productEl
        .querySelector(".content-actions .btn") //the Add To Cart button
        .addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          loadingCart(id, "start", productEl, e.target);
          cartOps({
            id,
            type: "add",
            onCompletion: () => {
              loadingCart(id, "stop", productEl, e.target);
              openDrawer();
            },
          });
        });
    });
  }

  //Put loaders onto action buttons for sessions
  if (SESSIONLOCATION.some((location) => pageUrl.pathname.match(location))) {
    console.log("Page pathname matches target pages with sessions");
    const domProducts = Array.from(
      document.querySelectorAll(".session-button-container")
    );
    domProducts.forEach((productEl) => {
      productEl
        .querySelector(".btn") //the Add To Cart button
        .addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          loadingCart(id, "start", productEl, e.target);
          cartOps({
            id,
            type: "add",
            onCompletion: () => {
              loadingCart(id, "stop", productEl, e.target);
              openDrawer();
            },
          });
        });
    });
  }
</script>

<div class="cart-paper" class:open={isOpen === true}>
  <CartContent {cartOps} {cartList} {closeDrawer} />
</div>

<style>
  .cart-paper {
    width: 500px;
    height: 100%;
    max-width: 100vw;
    position: fixed;
    right: -500px; /**Will use right positioning to move cart in and out of plane*/
    top: 0;
    z-index: 3000;
    transition-property: right;
    transition-timing-function: inherit;
    transition-duration: inherit;
    background-color: white;
    overflow-x: hidden;
  }
  .open.cart-paper {
    right: 0px;
  }
</style>
