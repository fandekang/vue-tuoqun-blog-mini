import Vue from 'vue';
import resource from 'vue-resource';

export default {
    mounted() {
        this.loadData(false);
    },
    watch: {
        'pager.curPage'() {
            this.loadData(false);
        },
        dataUrl() {
            // this.loadData(false);
            this.loadData(true);
        }
    },
    methods: {
        sliceArray(array) {
            let curPage = this.pager.curPage,
                pageSize = this.pager.pageSize;
            array.slice((curPage - 1) * pageSize, curPage * pageSize)
        },
        bottomEvent() {
            this.pager.curPage++;
            this.bottomMethod && this.bottomMethod();
            if (this.pager.curPage * this.pager.pageSize >= this.pager.total) {
                this.$emit("update:bottomAllLoaded", true);
            }
            this.$refs.loadMore.onBottomLoaded();
        },
        loadData(reload) {
            if (this.dataJson) {
                if (reload) {
                    this.source = this.sliceArray(this.dataJson);
                }
                else {
                    this.source = this.source.concat(this.sliceArray(this.dataJson));
                }
                this.$set(this.pager, 'total', this.dataJson.length);
            }
            else {
                Vue.use(resource);
                let url = this.dataUrl;
                let remoteParam = {}

                if (this.pager) {
                    remoteParam = {
                        curPage: this.pager.curPage || 1,
                        pageSize: this.pager.pageSize
                    }
                }

                if (this.remoteParam) {
                    Object.assign(remoteParam, this.remoteParam);
                }

                let indicator = this.$indicator,
                    toast = this.$toast;
                indicator.open();
                this.$http.post(url, remoteParam, {emulateJSON: true}).then(response => {
                    // console.log("成功");
                    // console.log(JSON.parse(response.bodyText))
                    const body = JSON.parse(response.bodyText)

                    if (body.errorMsg) {
                        toast(body.errorMsg);
                    }
                    // 后台菜单返回数据如果没有分页的,直接返回list,如果返回带分页,会返回{list: data, total: count}格式
                    else if (body.data && body.data.list) {
                        if (reload) {
                            this.source = JSON.parse(response.bodyText).data.list;
                        }
                        else {
                            this.source = this.source.concat(JSON.parse(response.bodyText).data.list);
                        }
                    }
                    else if (body.data) {
                        if (reload) {
                            this.source = JSON.parse(response.bodyText).data
                        }
                        else {
                            this.source = this.source.concat(JSON.parse(response.bodyText).data);
                        }
                    }
                    if (this.pager && body.data) {
                        this.$set(this.pager, 'total', body.data.total);
                        // 设置是否可以下拉加载更多
                        if (this.pager.curPage * this.pager.pageSize >= this.pager.total) {
                            this.$emit("update:bottomAllLoaded", true);
                        }
                    }
                    setTimeout(function() {
                        indicator.close();
                    }, 500);
                }, response => {
                    setTimeout(function() {
                        indicator.close();
                    }, 500);
                    if (response.status === 604) {
                        toast({
                            message: "您还没有登陆或超时登陆",
                            position: 'top'
                        });
                        this.$store.commit("togglePopup", {loginPopup: true});
                        this.$store.commit("toggleUser", {title: "登陆"});
                    }
                    else {
                        toast('调取远程数据失败，状态：' + response.status)
                    }
                    // this.$message.error("调取远程数据失败: " + JSON.stringify(response));
                })
            }
        }
    }
}
