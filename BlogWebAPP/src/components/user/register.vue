<!--
    vue模板
    @author: hjj
    @date: 2018/11/22
    @desc:
-->
<template>
    <div class="register-container">
        <br/>
        <div class="uploader-container">
            <uploader class="uploader-head-img" @change="fileChangeEvent">
            </uploader>
        </div>
        <br/>
        <mt-field ref="focusDom" label="用户名" placeholder="登陆账号" type="url" v-model="loginName"></mt-field>
        <mt-field label="密码" placeholder="登陆密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="确认密码" type="password" v-model="checkPassword"></mt-field>
        <mt-field label="昵称" placeholder="系统怎么称呼您" v-model="staffName"></mt-field>
        <hr>
        <br/>
        <mt-button type="primary" size="large" @click="submitRegisterEvent">注册</mt-button>
        <br/>
        <mt-button size="large" @click="forwardLoginEvent">登陆</mt-button>
    </div>
</template>
<script type="text/javascript">

    import loadData from '../../assets/js/loadData';

    export default {
        name: 'register',
        props: ['toLogin'],
        mixins: [loadData],
        data() {
            return {
                formData: new FormData(),
                password: '',
                checkPassword: '',
                staffName: '',
                loginName: ''
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.$refs.focusDom.$el.querySelector("input").focus();
            });
        },
        methods: {
            submitRegisterEvent() {
                if (this.password !== this.checkPassword) {
                    this.$toast("两次密码输入不一致");
                    return false;
                }

                if (!this.formData.get("photo")) {
                    this.$toast("请选择头像");
                    return false;
                }

                let url = process.env.ROOT_API + 'main/createStaff.do',
                    resolve = (resp) => {
                        let body = JSON.parse(resp.bodyText)
                        if (body && body.success) {
                            this.$toast('注册成功')
                            this.$store.commit('togglePopup', {loginPopup: false})
                            this.$store.commit('toggleUser', {staffName: this.staffName})
                        }
                        else if (body) {
                            this.$toast(body.errorMsg)
                            this.state = 'error'
                        }
                        else {
                            this.$toast('服务端返回了错误的类型')
                        }
                    };
                this.formData.set('loginName', this.loginName);
                this.formData.set('staffName', this.staffName);
                this.formData.set('passWord', this.passWord);
                this.sendPost({url, param: this.formData, resolve})
            },
            forwardLoginEvent() {
                this.$emit('update:toLogin', true)
                this.$store.commit('toggleUser', {title: '登陆'})
            },
            fileChangeEvent(file) {
                this.formData.set('photo', file);
            }
        }
    }
</script>
<style type="text/css">
    .uploader-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
