<!--
    vue模板
    @author: hjj
    @date: 2018/11/22
    @desc:
-->
<template>
    <div class="join-container">
        <login v-if="toLogin" :toLogin.sync="toLogin"></login>
        <register v-else :toLogin.sync="toLogin"></register>
    </div>
</template>
<script type="text/javascript">
    import Register from './register.vue';
    import Login from './login.vue';

    export default {
        components: {Register, Login},
        name: 'join',
        data() {
            return {
                toLogin: true
            }
        }
    }
</script>
<style type="text/css">
    .join-container {
        margin-top: 39px;
        padding-left: 15px;
        padding-right: 15px;
        height: 100%;
    }
</style>
