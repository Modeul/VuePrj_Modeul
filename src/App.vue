<script>
    import Loader from './components/common/loader.vue';

    export default {
        components:{
            Loader
        }
    }
</script>
<template>
    <!-- <span v-text="test"></span> -->
    <router-view></router-view>
    <Loader :loading="this.$store.state.loadingstatus"></Loader>
    
</template>