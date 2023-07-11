<script>
import { props } from "./props";
export default {
  name: "ZEllipsis",
  props,
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    ellipsisStyle() {
      const { lineClamp, expanded } = this;
      if (lineClamp !== undefined) {
        return {
          textOverflow: "",
          "-webkit-line-clamp": expanded ? "" : lineClamp
        };
      } else {
        return {
          textOverflow: expanded ? "" : "ellipsis",
          "-webkit-line-clamp": ""
        };
      }
    }
  },
  methods: {
    getTooltipDisabled(el) {
      let tooltipDisabled = false;
      const { expanded } = this;
      if (expanded) return true;

      console.log(el);

      return tooltipDisabled;
    }
  },
  render() {
    const {
      tooltip,
      lineClamp,
      expandTrigger,
      getTooltipDisabled,
      ellipsisStyle,
      $slots
    } = this;

    const renderTrigger = () => (
      <span
        ref="triggerRef"
        style={ellipsisStyle}
        onMouseenter={
          expandTrigger === "click" ? getTooltipDisabled : undefined
        }
      >
        {lineClamp ? (
          $slots.default
        ) : (
          <span ref="triggerInnerRef">{$slots.default}</span>
        )}
      </span>
    );

    if (tooltip) {
      return (
        <ElTooltip ref="tooltipRef" placement="top" {...tooltip}>
          <template slot="content">{$slots.tooltip || $slots.default}</template>
          {renderTrigger()}
        </ElTooltip>
      );
    }

    return null;
  }
};
</script>