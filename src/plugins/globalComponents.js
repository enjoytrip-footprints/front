import Badge from "../components/base/Badge";
import BaseAlert from "../components/base/BaseAlert";
import BaseButton from "../components/base/BaseButton";
import BaseCheckbox from "../components/base/BaseCheckbox";
import BaseInput from "../components/base/BaseInput";
import BasePagination from "../components/base/BasePagination";
import BaseProgress from "../components/base/BaseProgress";
import BaseRadio from "../components/base/BaseRadio";
import BaseSlider from "../components/base/BaseSlider";
import BaseSwitch from "../components/base/BaseSwitch";
import Card from "../components/base/Card";
import Icon from "../components/base/Icon";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  }
};
