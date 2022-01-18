<script>
    import CartContent from "./cartContent.svelte";
</script>

<div class="cart-paper">
    <CartContent />
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
</style>
