<!--
    vue模板
    @author: hjj
    @date: 2018/11/13
    @desc: 移动端面板
-->
<template>
    <div class="sy-app-panel" :style="{height: height, width: width}">
        <div v-if="this.$slots.img" class="sy-panel-img">
            <slot name="img"></slot>
        </div>
        <div class="sy-panel-main">
            <slot name="header"></slot>
            <div class="sy-panel-body">
                <slot name="body"></slot>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'panel-wrapper',
        props: {
            width: {
                type: [String, Number],
                default: "100%"
            },
            height: {
                type: [String, Number],
                default: "auto"
            }
        }
    }
</script>
<style type="text/css">
    .sy-app-panel {
        display: flex;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .sy-panel-img {
        padding-right: 10px;
    }
    .sy-panel-main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .sy-panel-body {
        flex: 1;
        color: #a2a2a2;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>
