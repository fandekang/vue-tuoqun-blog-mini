<!--
    vue模板
    @author: hjj
    @date: 2018/11/6
    @desc:
-->
<template>
    <div class="sy-app-footer" :style="{bottom: computedBottom, height: height}">
        <slot v-if="this.$slots.main" name="main"></slot>
        <div v-else @click="active(item)" :class="['sy-footer-item', {active: item.id === value}]" v-for="item in source" :key="item.id">
            <i :class="'mintui mintui-'+item.icon"></i>
            <div v-text="item.text"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'foot-wrapper',
        data() {
            return {
                activeIndex: 0
            }
        },
        methods: {
            active(item) {
                this.$emit("input", item.id);
                this.$emit('select', item);
            }
        },
        props: {
            value: {},
            bottom: {
                type: [String, Number],
                default: 0
            },
            height: {
                default: "55px"
            },
            source: {
                type: [Array],
                default() {
                    return [{
                        text: "选项卡1", icon: "success"
                    }, {
                        text: "选项卡2", icon: "success"
                    }, {
                        text: "选项卡3", icon: "success"
                    }];
                }
            }
        },
        computed: {
            computedBottom() {
                if (Object.prototype.toString(this.bottom) === "[object String]" &&
                    this.bottom.indexOf("px") < 0) {
                    return this.bottom + "px";
                }
                else {
                    return this.bottom;
                }
            }
        }
    }
</script>
<style type="text/css">
    .sy-app-footer {
        position: fixed;
        width: 100%;
        background-color: #F4F5F6;
        color: #4B4B4C;
        display: flex;
        left: 0;
        justify-content: center;
    }
    .sy-footer-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: .8rem!important;
    }
    .sy-footer-item div {
        padding-top: 2px;
    }
    .sy-footer-item > i {
        font-size: 2.3rem!important;
    }
    .sy-footer-item.active {
        background-color: #188BF7;
        color: #E7E7E7;
    }
</style>
