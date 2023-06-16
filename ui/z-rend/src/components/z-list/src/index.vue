<script>
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
    }
  },
  render() {
    const { rootTag: RootTag, bodyTag: BodyTag } = this;

    return (
      <RootTag class="z-list" ref="root">
        <BodyTag class="z-list__body"></BodyTag>
      </RootTag>
    );
  }
};
</script>

<style lang="scss" scoped>
.z-list {
  height: 100%;
  overflow: auto;
}
</style>