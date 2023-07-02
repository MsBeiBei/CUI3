<script>
import Header from "./header/index.vue";
import Colgroup from "./colgroup/index.vue";
import Body from "./body/index.vue";
import Footer from "./footer/index.vue";
import { useColumns } from "./hooks/useColumns";
export default {
  name: "ZTable",
  components: {
    // Header,
    // Body,
    // Footer,
    // Colgroup
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      colgroups: []
    };
  },
  render() {
    const { columns, showHeader } = this;

    useColumns(columns)

    const rootProps = {
      ref: "tableRootRef",
      class: ["z-table"]
    };

    const tableProps = {
      ref: "tableRef",
      class: ["z-table-content"]
    };

    const headerProps = {
      ref: "tableHeaderRef"
    };

    const bodyProps = {
      ref: "tableBodyRef",
      class: ["z-table-body"],
      props: {},
      on: {}
    };

    const footerProps = {
      ref: "tableFooterRef",
      class: ["z-table-footer"]
    };

    return (
      <div {...rootProps}>
        <table {...tableProps}>

          {showHeader && <Header {...headerProps} />}

          <Body {...bodyProps} />

          <Footer {...footerProps} />
        </table>
      </div>
    );
  }
};
</script>