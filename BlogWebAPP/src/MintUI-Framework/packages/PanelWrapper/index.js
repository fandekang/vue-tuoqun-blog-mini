import PanelWrapper from "./src/panel.vue";

PanelWrapper.install = function(Vue) {
    Vue.component(PanelWrapper.name, PanelWrapper);
};

export default PanelWrapper;
