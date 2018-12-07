<!--
    vue模板
    @author: hjj
    @date: 2018/11/6
    @desc: 弹出页面
-->
<template>
    <transition name="full-popup-fade">
        <div class="sy-full-popup" v-show="currentShow" :style="{'z-index': zIndex}">
            <mt-header class="sy-full-popup-title" fixed :title="title">
                <mt-button @click="backEvent()" icon="back" slot="left"></mt-button>
            </mt-header>
            <mt-popup ref="popup" :modal="false" :style="{width: '100%', height: '100%', 'box-sizing': 'border-box', overflow: 'auto'}" lockScroll="true"
                      v-model="currentShow"
                      :position="position">
                <slot></slot>
            </mt-popup>
        </div>
    </transition>
</template>
<script type="text/javascript">
    export default {
        name: 'full-popup',
        data() {
            return {
                currentShow: false,
                zIndex: ""
            }
        },
        watch: {
            currentShow(val) {
                this.$emit("input", val);
            },
            value(val) {
                if (val) {
                    let _this = this, el = _this.$refs.popup.$el;
                    setTimeout(function() {
                        _this.zIndex = el.style.zIndex;
                    }, 100);
                }
                this.currentShow = val;
            }
        },
        methods: {
            backEvent() {
                this.$emit("input", false);
                this.$emit("back");
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {},
            position: {
                default: "right"
            }
        }
    }
</script>
<style type="text/css">
    .sy-full-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .sy-full-popup-title.mint-header.is-fixed {
        z-index: 9999;
    }
    .sy-full-popup-title.mint-header.is-fixed .mint-header-title {
        font-size: 1.6rem;
    }
    .full-popup-fade-enter-active, .full-popup-fade-leave-active {
        transition: .2s ease-out;
    }
    .full-popup-fade-enter, .comment-fade-leave-to {
        opacity: 0;
    }
</style>
