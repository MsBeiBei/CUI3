<template>
  <div class="z-sql" ref="sql"></div>
</template>

<script>
import * as monaco from "monaco-editor";
import { format } from "sql-formatter";

export default {
  name: "ZSql",
  props: {
    value: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "vs-light"
    },
    readOnly: Boolean
  },
  data() {
    return {
      editor: null
    };
  },

  mounted() {
    const el = this.$refs.sql;
    if (el) {
      const { theme, readOnly, value } = this;
      this.editor = monaco.editor.create(el, {
        value,
        language: "sql",
        fontSize: 14,
        automaticLayout: true,
        theme,
        readOnly
      });
      const beautyFunc = {
        id: "ms-beauty",
        label: "SQL beauty",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B],
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: ed => {
          const sql = format(ed.getValue());
          ed.setValue(sql);
          this.$emit("format", sql);
        }
      };
      this.editor.addAction(beautyFunc);
      const testFunc = {
        id: "ms-test",
        label: "SQL Testing",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_E],
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: ed => {
          this.$emit("test", ed.getValue());
        }
      };
      this.editor.addAction(testFunc);
      this.editor.focus();
    }
  },
  beforeDestroy() {
    this.editor && this.editor.dispose();
  }
};
</script>
<style lang="scss" scoped>
.z-sql {
  min-height: 150px;
  width: 100%;
  border: 1px solid #dcdfe6;
}
</style>