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
    const backdrop = document.getElementById("cart-drawer").children[0];
    backdrop.addEventListener("click", () => {
        closeDrawer();
    });
    document.getElementById("cartIcon").addEventListener("click", () => {
        openDrawer();
    });
    const incrementItem = (id) => {
        const index = PRODUCTS.findIndex((product) => product.id === id); //Find where the product with corresponding ID is
        PRODUCTS[index].count += 1;
    };
    const decrementItem = (id) => {
        const index = PRODUCTS.findIndex((product) => product.id === id); //Find where the product with corresponding ID is
        if (PRODUCTS[index].count === 1) {
            return;
        }
        PRODUCTS[index].count -= 1;
    };
    const removeItem = (id) => {
        PRODUCTS = PRODUCTS.filter((product) => product.id !== id);
    };
    let PRODUCTS = [
        {
            id: 1,
            name: "Sprint Training (Holiday Program)",
            description:
                "Improve your top speed over the holidays. Better than spending time in front of Netflix.",
            fee: 99.99,
            image: "https://lapt.localhost/media/dec/1.jpg",
            count: 1,
        },
        {
            id: 2,
            name: "SAT Training (Holiday Program)",
            description:
                "Improve your top speed over the holidays. Better than spending time in front of Netflix.",
            fee: 199.99,
            image: "https://lapt.localhost/media/dec/2.jpg",
            count: 1,
        },
        {
            id: 3,
            name: "SAT Training (Holiday Program)",
            description:
                "Improve your top speed over the holidays. Better than spending time in front of Netflix.",
            fee: 199.99,
            image: "https://lapt.localhost/media/dec/2.jpg",
            count: 1,
        },
    ];
    $: subTotal = PRODUCTS.reduce((previous, current) => {
        return previous + current.fee * current.count;
    }, 0);
    //Reserved. Might be usefull if discounts are available.
    $: total = subTotal;
</script>

<div class="cart-header">
    <div class="cart-header-main">
        <h2 class="h3">Shopping Cart</h2>
        <label for="cart-drawer" class="small-font">{PRODUCTS.length}</label>
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
        {#each PRODUCTS as product (product.id)}
            <CartProduct
                {product}
                incrementItem={() => incrementItem(product.id)}
                decrementItem={() => decrementItem(product.id)}
                {removeItem}
            />
        {/each}
    </div>
    <div class="cart-checkout">
        <div class="cart-checkout-totals mb-3">
            <div
                class="cart-checkout-subtotals d-flex flex-row justify-content-between small-font"
            >
                <span class="font-weight-bold text-uppercase">SUBTOTAL:</span>
                <span class="font-weight-bold">{`$${subTotal.toFixed(2)}`}</span
                >
            </div>
            <div class="horizontal-divider" style="margin: 0.5rem 0" />
            <div
                class="cart-checkout-estimated-totals d-flex flex-row justify-content-between"
            >
                <span class="font-weight-bold text-uppercase">Total:</span>
                <span class="font-weight-bold">{`$${total.toFixed(2)}`}</span>
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
