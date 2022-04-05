<script>
  export let cartSession;
  export let removeItem;
  console.log("cartSession.svelte Provided cartSession: ", cartSession);
</script>

<div class="cart-product-card" data-loading-id={cartSession.session.id}>
  <div class="cart-product-card-header d-flex flex-row justify-content-between">
    <div>
      <h4 class="h5" style="display: inline">{cartSession.session.name}</h4>
      <span class="small-font" style="color: var(--main-color)"
        >x{cartSession.athleteList.length}</span
      >
    </div>
    <button
      id="removeItemBtn"
      type="button"
      class="close small-font"
      aria-label="Remove product"
      on:click={removeItem(cartSession.session.id)}
    >
      <span aria-hidden="true">Remove</span>
    </button>
  </div>
  <div class="cart-product-card-content d-flex flex-row">
    <div class="round-image-container">
      <img
        src={cartSession.session.image}
        alt="Product"
        style="width: inherit;"
      />
    </div>
    <div class="cart-product-description">
      <p>
        {@html `${cartSession.session.attributes}<br>${cartSession.session.description}`}
      </p>
      <div class="cart-product-card-bottom">
        <span class="small-font font-weight-bold"
          >{`$${(
            cartSession.session.fee * cartSession.athleteList.length
          ).toFixed(2)}`}</span
        >
        <a
          class="btn btn-link btn-sm"
          type="button"
          href="{cartSession.session.href}">Add Athlete</a
        >
      </div>
    </div>
  </div>
  <div id="storeCreationLoading" class="angel-linear-loading">
    <div class="line" />
    <div class="subline inc" />
    <div class="subline dec" />
  </div>
</div>
