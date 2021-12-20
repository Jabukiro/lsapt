<script>
    const cartDrawer = document.getElementById("cart-drawer");
    const [backdrop, drawerPaper] = cartDrawer.children;
    const openDrawer = () => {
        console.log(cartDrawer);
        cartDrawer.style.visibility = "visible";
        backdrop.style.opacity = 0.5;
        //drawerPaper.style.width = "500px";
        drawerPaper.style.right = 0;
    };
    const closeDrawer = () => {
        cartDrawer.style.visibility = "hidden";
        backdrop.style.opacity = 0;
        drawerPaper.style.right = "-500px";
        //drawerPaper.style.width = 0;
    };

    document.getElementById("cartIcon").addEventListener("click", () => {
        openDrawer();
    });
</script>

<div class="cart-paper">
    <slot>
        <em>No content provided</em>
    </slot>
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
        padding: 1rem;
    }
</style>
