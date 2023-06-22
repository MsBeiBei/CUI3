<script>
import Item from "./item.vue";

const FRONT = "front";
const BEHIND = "behind";

export default {
  name: "ZList",
  props: {
    rootTag: {
      type: String,
      default: "div"
    },
    bodyTag: {
      type: String,
      default: "div"
    },
    data: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: [Function, String],
      required: true
    },
    keeps: {
      type: Number,
      default: 30
    },
    estimatedSize: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      range: Object.create(null),
      sizes: new Map()
    };
  },
  computed: {
    rowKeys() {
      const { rowKey } = this;
      return this.data.map(item =>
        typeof rowKey === "function" ? rowKey(item) : item[rowKey]
      );
    }
  },
  methods: {
    onResized(key, size) {
      this.sizes.set(key, size);
    },
    updateRange(start, end) {
      this.range.start = start
      this.range.end = end
    }
  },
  render() {
    const { rootTag: RootTag, bodyTag: BodyTag, onResized, rowKey } = this;

    const { start, end } = this.range;

    const data = this.data.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" role="list">
        <div class="z-list__scroll" ref="scroll"></div>

        <BodyTag class="z-list__body" ref="body">
          {data.map((item, index) => {
            const key =
              typeof rowKey === "function" ? rowKey(item) : item[rowKey];

            return (
              <Item key={key} rowKey={key} data-key={key} onResized={onResized}>
                {this.$scopedSlots.default
                  ? this.$scopedSlots.default(item, index, key)
                  : null}
              </Item>
            );
          })}
        </BodyTag>
      </RootTag>
    );
  }
};
</script>

<style lang="scss" scoped>
.z-list {
  height: 100%;
  position: relative;
  overflow: auto;

  &__body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  * {
    box-sizing: border-box;
  }
}
</style>