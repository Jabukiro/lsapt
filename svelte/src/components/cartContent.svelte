<div class="cart-header">
    <div class="cart-header-main">
        <h2 class="h3">Shopping Cart</h2>
        <label for="cart-drawer" class="small-font">0 items</label>
    </div>
    <button
        id="cartCloseBtn"
        type="button"
        class="close"
        aria-label="Close Cart"
    >
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="cart-body-wrapper">
    <div class="cart-body">
        <div class="cart-product-card">
            <div
                class="cart-product-card-header d-flex flex-row justify-content-between"
            >
                <h4 class="h5">Product Name</h4>
                <button
                    id="removeItemBtn"
                    type="button"
                    class="close small-font"
                    aria-label="Remove product"
                >
                    <span aria-hidden="true">Remove</span>
                </button>
            </div>
            <div class="cart-product-card-content d-flex flex-row">
                <img
                    src="/media/sprint_bullet_icon.jpg"
                    alt=""
                    class="cart-product-image"
                />
                <div class="cart-product-description">
                    <p>Product Description</p>
                    <div class="cart-product-card-bottom">
                        <span class="small-font font-weight-bold">$50</span>
                        <div class="cart-product-quantity">
                            <button
                                class="minus-button disable_button_bacground"
                            />
                            <input
                                class="cart-product-quantity-amount disable_button_bacground text-center"
                                value="1"
                            />
                            <button
                                class="plus-button disable_button_bacground"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="cart-checkout">
        <div class="cart-checkout-totals mb-3">
            <div
                class="cart-checkout-subtotals d-flex flex-row justify-content-between small-font"
            >
                <span class="font-weight-bold text-uppercase">SUBTOTAL:</span>
                <span class="font-weight-bold">$59</span>
            </div>
            <div class="horizontal-divider" style="margin: 0.5rem 0" />
            <div
                class="cart-checkout-estimated-totals d-flex flex-row justify-content-between"
            >
                <span class="font-weight-bold text-uppercase">Total:</span>
                <span class="font-weight-bold">$59</span>
            </div>
        </div>
        <div
            class="cart-checkout-proceed d-flex flex-column align-items-center"
        >
            <button class="btn btn-primary text-uppercase mb-2"
                >Proceed to Checkout</button
            >
            <span class="cart-checkout-info"
                >We accept Debit cards and Paypal.</span
            >
        </div>
    </div>
</div>
