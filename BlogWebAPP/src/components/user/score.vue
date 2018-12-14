<template>
    <div class="ranking-list">
        <div class="ranking-item" v-for="(item, index) in source" :key="item.articleid">
            <div class="ranking">{{index + 1}}</div>
            <div class="avatar">
                <img v-if="item.staffID" :src="root + 'main/getStaffImg.do?staffID=' + item.staffID + '&dt=' + Math.random()" height="60px" width="60px">
                <img v-else src="../../assets/images/pic01.jpg" height="60px" width="60px">
            </div>
            <div class="info">
                <div class="name">{{item.staffName}}</div>
                <div class="integration">{{item.isManager}}分</div>
            </div>
            <div class="me" v-if="item.staffID === staffID">我</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import loadData from '../../assets/js/loadData'

    export default {
        name: 'score',
        mixins: [loadData],
        data() {
            return {
                source: [],
                root: process.env.ROOT_API
            }
        },
        computed: {
            staffID() {
                return this.$store.state.ModuleHead.staffID
            }
        },
        mounted() {
            let url = process.env.ROOT_API + "main/getStaffList.do",
                param = {
                    pager: {
                        curPage: 1,
                        pageSize: 10
                    }
                },
                success = (res) => {
                    // console.log(res.body.data)
                    this.source = res.body.data
                },
                error = () => {
                    this.$toast('请求失败')
                }
            this.sendPost({url, param, success, error})
        }
    }
</script>
<style scoped>
    .ranking-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
    }
    .ranking-item .ranking {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 1.6rem;
        color: #fff;
        background: #ccc;
        border-radius: 100%;
    }
    .ranking-item:nth-child(1) .ranking {
        background: #f63031;
    }
    .ranking-item:nth-child(2) .ranking {
        background: #fb9139;
    }
    .ranking-item:nth-child(3) .ranking {
        background: #f3c122;
    }
    .ranking-item .avatar {
        margin: 0 15px;
        width: 60px;
        height: 60px;
        overflow: hidden;
        border: 2px solid #ccc;
        border-radius: 100%;
    }
    .ranking-item .avatar img {
        width: 100%;
        height: 100%;
    }
    .ranking-item .info .name {
        font-size: 1.6rem;
        color: #333;
    }
    .ranking-item .info .integration {
        font-size: 1.4rem;
    }
    .ranking-item .me {
        margin-left: 20px;
        font-size: 1.5rem;
        color: #f63031;
    }
</style>
