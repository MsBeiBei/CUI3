<template>
  <div class="demo">
    <div style="height: 500px;width: 375px;">
      <ZList :data="list" row-key="id">
        <template v-slot:default="record,index">
          <div
            style="border-bottom:1px solid #efefef; padding: 15px;font-size: 14px;color: #262626;"
          >
            <span class="index">#{{ index + 1 }}</span>
            <span>{{ record.value }}</span>
          </div>
        </template>
      </ZList>
    </div>

    <div style="height: 300px;width:25%">
      <div>{{sql}}</div>
      <ZSql v-model="sql" />
    </div>
  </div>
</template>

<script>
import ZList from "@/components/z-list";
import ZSql from "@/components/z-sql";
import ZSelect from "@/components/z-select";
import Mock from "mockjs";

let count = 10000;
let items = [];
for (let i = 0; i < count; i++) {
  items.push({ id: i, value: Mock.Random.cparagraph(1, 5) });
}
Object.freeze(items);
export default {
  name: "App",
  components: {
    ZList,
    ZSql,
    ZSelect
  },
  data() {
    return {
      list: items,
      sql: undefined
    };
  }
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  justify-content: space-between;
}
.index {
  font-weight: bold;
  margin-right: 4px;
  color: red;
}
</style>