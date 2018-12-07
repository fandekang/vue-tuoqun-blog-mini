<!--
    vue模板
    @author: hjj
    @date: 2018/11/20
    @desc: 登陆界面
-->
<template>
    <div class="login-container">
        <mt-field ref="focusDom" label="用户名" :state="state" placeholder="登陆账号" type="url" v-model="username"></mt-field>
        <mt-field label="密码" :state="state" placeholder="登陆密码" type="password" v-model="password"></mt-field>
        <hr>
        <br/>
        <mt-button type="primary" size="large" @click="submitLoginEvent">登陆</mt-button>
        <br/>
        <mt-button size="large" @click="forwardRegisterEvent">注册</mt-button>
    </div>
</template>
<script type="text/javascript">

    import loadData from '../../assets/js/loadData';

    export default {
        name: 'login',
        mixins: [loadData],
        props: ['toLogin'],
        data() {
            return {
                username: "",
                password: "",
                state: ""
            }
        },
        watch: {
            toLogin(newVal) {
                if (newVal) {
                    this.$refs.registerEl.querySelector("input").focus();
                }
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.$refs.focusDom.$el.querySelector("input").focus();
            });
        },
        methods: {
            submitLoginEvent() {
                let url = process.env.ROOT_API + "main/login.do",
                    param = {username: this.username, password: this.password},
                    resolve = (resp) => {
                        let body = JSON.parse(resp.bodyText);
                        if(body && body.success) {
                            this.$toast("登陆成功");
                            this.$store.commit("togglePopup", {loginPopup: false});
                            this.$store.commit("toggleUser", body.data);
                        }
                        else if (body) {
                            this.$toast(body.errorMsg);
                            this.state = "error";
                        }
                        else {
                            this.$toast("服务端返回了错误的类型");
                        }
                    };
                this.sendPost({url, param, resolve});
            },
            forwardRegisterEvent() {
                this.$emit("update:toLogin", false);
                this.$store.commit("toggleUser", {title: "注册"});
            }
        }
    }
</script>
<style type="text/css">
</style>
