<template>
    <div class="loading-modal" v-show="showModal">
        <div class="spinner-container">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoadingModal",
        computed: {
            showModal(){
                return this.$store.state.openRequestCount !== 0;
            }
        }
    }
</script>

<style scoped lang="scss">
    .loading-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: $brand-grey;
        opacity: .75;
        width: 100%;
        height: 100%;
        z-index: 12000;
    }
    .spinner-container {
        text-align: center;
        padding-top: 50vh;
    }
    .spinner-border {
        color: $primary;
    }
</style>
