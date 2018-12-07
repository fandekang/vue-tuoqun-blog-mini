<!--
    vue模板
    @author: hjj
    @date: 2018/11/6
    @desc: 个人中心
-->
<template>
    <div class="personal-container">
        <br/>
        <div class="uploader-container">
            <uploader v-model="image" class="uploader-head-img" @change="fileChangeEvent">
            </uploader>
        </div>
        <br/>
        <mt-field ref="registerEl" disabled label="用户名" placeholder="登陆账号" type="url" v-model="loginName"></mt-field>
        <mt-field label="密码" placeholder="登陆密码" type="password" v-model="passWord"></mt-field>
        <mt-field label="确认密码" placeholder="确认密码" type="password" v-model="checkPassword"></mt-field>
        <mt-field label="昵称" placeholder="系统怎么称呼您" v-model="staffName"></mt-field>
        <mt-field label="ID" v-show="false" v-model="staffID"></mt-field>
        <hr>
        <br/>
        <mt-button size="large" type="primary" @click="submitSettingsEvent">修改信息</mt-button>
    </div>
</template>
<script type="text/javascript">

    import loadData from '../../assets/js/loadData';
    export default {
        name: 'personal',
        mixins: [loadData],
        data() {
            return {
                loginName: "",
                passWord: "",
                checkPassword: "",
                image: "",
                staffName: "",
                formData: new FormData()
            }
        },
        computed: {
            staffID: {
                get() {
                    return this.$store.state.ModuleHead.staffID;
                },
                set(val) {
                    if (val) {
                        this.fetchCurStaff();
                    }
                    this.$store.commit("toggleUser", {staffID: val});
                }
            }
        },
        methods: {
            submitSettingsEvent() {
                if (this.passWord !== this.checkPassword) {
                    this.$toast("两次密码输入不一致");
                    return false;
                }

                let url = process.env.ROOT_API + 'main/editSettings.do',
                    resolve = (resp) => {
                        let body = JSON.parse(resp.bodyText)
                        if (body && body.success) {
                            this.$toast('设置成功')
                            this.$store.commit('toggleUser', {staffName: this.staffName})
                        }
                        else if (body) {
                            this.$toast(body.errorMsg)
                            this.state = 'error'
                        }
                        else {
                            this.$toast('服务端返回了错误的类型')
                        }
                    }
                this.formData.set('loginName', this.loginName);
                this.formData.set('staffName', this.staffName);
                this.formData.set('passWord', this.passWord);
                this.sendPost({url, param: this.formData, resolve})
            },
            fileChangeEvent(file) {
                this.formData.set('photo', file);
            },
            fetchCurStaff() {
                let url = process.env.ROOT_API + 'main/getCurStaff.do?dt=' + Math.random();
                this.sendGet({
                    url,
                    success: (resp) => {
                        let body = JSON.parse(resp.bodyText), staff = body.data;
                        this.loginName = staff.loginName;
                        this.passWord = staff.passWord;
                        this.checkPassword = staff.passWord;
                        this.staffName = staff.staffName;
                        this.image = process.env.ROOT_API + 'main/getStaffImg.do?dt=' + Math.random();
                    }
                });
            }
        }
    }
</script>
<style type="text/css">
    .personal-container {
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
    }
    .uploader-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
