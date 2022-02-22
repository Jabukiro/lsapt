<script>
  export let closeDrawer;
  //expects a list, whether empty or not.
  //if not empty then it is a list containing CartProducts
  export let cartList;
  export let cartOps;
  import CartProduct from "./cartProductCard.svelte";
  const HOSTNAME = "https://live.linespeedapt.com";

  function toggleLoading(id, state) {
    const domEls = Array.from(document.querySelectorAll(".cart-product-card"));
    for (let i = 0; i < domEls.length; i++) {
      if (domEls[i].getAttribute("data-loading-id") === String(id)) {
        if (state === "start") {
          domEls[i].classList.add("loading");
          return;
        }
        domEls[i].classList.remove("loading");
        return;
      }
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

  function goToCheckout(e) {
    e.preventDefault();
    const c = encodeURIComponent(getCookie("angel"));
    window.location.href = `${HOSTNAME}/checkout/?s=${c}`;
  }

  const backdrop = document.getElementById("cart-drawer").children[0];
  backdrop.addEventListener("click", () => {
    closeDrawer();
  });
  //Add all these 3 functions to Product Object
  const incrementItem = (id) => {
    toggleLoading(id, "start");
    cartOps({
      id,
      type: "add",
      onCompletion: () => {
        toggleLoading(id, "stop");
      },
    }); //Server side logic will increment if product already in cart.
  };
  const decrementItem = (id) => {
    toggleLoading(id, "start");
    cartOps({
      id,
      type: "decrement",
      onCompletion: () => {
        toggleLoading(id, "stop");
      },
    });
  };
  const removeItem = (id) => {
    toggleLoading(id, "start");
    cartOps({
      id,
      type: "remove",
      onCompletion: () => {
        toggleLoading(id, "stop");
      },
    });
  };

  $: subTotal = cartList.reduce((previous, current) => {
    return previous + current.fee * current.count;
  }, 0);
  //Reserved. Might be usefull if discounts are available.
  $: total = subTotal;
</script>

<div class="cart-header">
  <div class="cart-header-main">
    <h2 class="h3">Shopping Cart</h2>
    <label for="cart-drawer" class="small-font">{cartList.length}</label>
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
  <div class="mb-5 cart-body">
    {#each cartList as product (product.id)}
      <CartProduct
        {product}
        incrementItem={() => incrementItem(product.id)}
        decrementItem={() => decrementItem(product.id)}
        {removeItem}
      />
    {/each}
  </div>
  <div class="cart-checkout" class:displayHide={cartList.length === 0}>
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
    <form
      action="/checkout"
      class="cart-checkout-proceed d-flex flex-column align-items-center"
      on:submit={goToCheckout}
    >
      <button type="submit" class="btn btn-dark btn-accent mb-2"
        >Proceed to Checkout</button
      >
      <span class="cart-checkout-info">We accept Debit cards.</span>
    </form>
  </div>
</div>

<style>
  .displayHide {
    display: none;
  }
</style>
