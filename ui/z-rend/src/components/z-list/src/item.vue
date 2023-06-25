<script>
export default {
  name: "ZItem",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    rowKey: {
      type: String,
      required: true
    },
    horizontal: Boolean
  },
  computed: {
    shape() {
      return this.horizontal ? "offsetWidth" : "offsetHeight";
    }
  },
  mounted() {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        const size = this.$el ? this.$el[this.shape] : 0;
        this.$emit("resized", this.rowKey, size);
      });
      this.resizeObserver.observe(this.$el);
    }
  },
  update() {
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  },
  render() {
    const { tag: Tag } = this;

    return (
      <Tag class="z-item">
        {this.$slots.default ? this.$slots.default : null}
      </Tag>
    );
  }
};
</script>
