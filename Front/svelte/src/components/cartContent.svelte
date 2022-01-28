<script>
  export let closeDrawer;
  //expects a list, whether empty or not.
  //if not empty then it is a list containing CartProducts
  export let cartList;
  export let cartOps;
  import CartProduct from "./cartProductCard.svelte";

  const loadingIncrement = () => {};
  const backdrop = document.getElementById("cart-drawer").children[0];
  backdrop.addEventListener("click", () => {
    closeDrawer();
  });
  //Add all these 3 functions to Product Object
  const incrementItem = (id) => {
    cartOps({ id, type: "add" }); //Server side logic will increment if product already in cart.
  };
  const decrementItem = (id) => {
    cartOps({ id, type: "decrement" });
  };
  const removeItem = (id) => {
    cartOps({ id, type: "remove" });
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
  <div class="cart-body">
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
