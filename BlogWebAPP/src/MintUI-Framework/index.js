import HeaderWrapper from "./packages/HeadWrapper/index.js";
import FootWrapper from "./packages/FootWrapper/index.js";
import LoadMoreCell from "./packages/LoadMoreCell/index.js";
import PanelWrapper from "./packages/PanelWrapper/index.js";
import LoadMorePanel from "./packages/LoadMorePanel/index.js";
import FullPopup from "./packages/FullPopup/index.js";
import Uploader from "./packages/Uploader/index.js";

const components = [
    HeaderWrapper,
    FootWrapper,
    LoadMoreCell,
    PanelWrapper,
    LoadMorePanel,
    FullPopup,
    Uploader
];

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};
export default install;
