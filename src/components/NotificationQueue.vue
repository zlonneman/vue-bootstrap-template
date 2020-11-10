<template>
    <div class="notification-items">
        <div v-for="(item,index) in notificationItems"
                    :class="['notification-item drop-shadow', item.type ]"
                    :key="item.id"
                    :value="true"
                    :style="{ bottom: `${(60 * index) + 8}px`}"
                    :timeout="item.timeout"
                    :color="item.color">
            <div class="p-3">
                {{ item.text }}
            </div>

            <div class="p-3 pointer" @click="removeItem(item.id)">
                Close
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "NotificationQueue",
        computed: {
            ...mapState(['notificationItems'])
        },
        methods: {
            removeItem(id){
                this.$store.dispatch('REMOVE_NOTIFICATION', id);
            }
        }
    }
</script>

<style scoped lang="scss">
    .notification-items {
        z-index: 4000;
        bottom: 8px;
        left: calc(50% - 150px);
        position: fixed;
        display: flex;
        flex-direction: column;

        .notification-item {
            z-index:5000;
            display: flex;
            flex-direction: row;
            width: 300px;
            min-height: 50px;
            border-radius: 4px;
            margin-bottom: 7px;
            color: white;
            justify-content: space-between;
            background-color: $brand-grey;
            align-items: center;
            opacity: 0;
            animation: fade-out 1000ms ease forwards;

            .pointer {
                cursor: pointer;
            }

            @keyframes fade-out {
                to {
                    opacity: 1;
                }
            }

          
            &.success {
                background-color: $green;
            }
            &.info {
                background-color: $primary;
            }
            &.error {
                background-color: $brand-red;
            }
            &.warning{
                color: black;
                background-color: $yellow;
            }
        }

        .drop-shadow{
            filter:drop-shadow(5px 5px 10px #cdcdcd);
        }
    }

    // fade in
    .notification-item{
        opacity: 0;
        animation: fade-out 300ms ease forwards;
    }
    @keyframes fade-out {
        to {
            opacity: 1;
        }
    }

</style>
