<script>
export default {
  name: "ZTableColGroup",
  props: {
    colgroup: {
      type: Array,
      required: true
    }
  },
  render() {
    return (
      <colgroup>
        {this.colgroup.map(item => {
          const style = {
            width: item.width
          };
          return <col key={item.key} style={style}></col>;
        })}
      </colgroup>
    );
  }
};
</script>