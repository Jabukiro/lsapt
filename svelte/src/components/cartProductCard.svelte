<script>
    export let product;
    export let incrementItem;
    export let decrementItem;
    export let removeItem;
</script>

<div class="cart-product-card">
    <div
        class="cart-product-card-header d-flex flex-row justify-content-between"
    >
        <h4 class="h5">{product.name}</h4>
        <button
            id="removeItemBtn"
            type="button"
            class="close small-font"
            aria-label="Remove product"
            on:click={removeItem(product.id)}
        >
            <span aria-hidden="true">Remove</span>
        </button>
    </div>
    <div class="cart-product-card-content d-flex flex-row">
        <img src={product.image} alt="" class="cart-product-image" />
        <div class="cart-product-description">
            <p>{product.description}</p>
            <div class="cart-product-card-bottom">
                <span class="small-font font-weight-bold"
                    >{`$${(product.fee * product.count).toFixed(2)}`}</span
                >
                <div class="cart-product-quantity">
                    <button
                        class="minus-button disable_button_bacground"
                        on:click={decrementItem()}
                    />
                    <input
                        class="cart-product-quantity-amount disable_button_bacground text-center"
                        value={product.count}
                    />
                    <button
                        class="plus-button disable_button_bacground"
                        on:click={incrementItem()}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
