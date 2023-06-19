<template>
  <div class="demo">
    <div style="height: 300px;width:25%">
      <ZList :dataSource="dataSource">
        <template v-slot:default="record">
          <div style="height:30px;border-bottom:1px solid #dcdfe6">{{ record.key }}</div>
        </template>
      </ZList>
    </div>
    <!-- <div style="height: 300px;width:25%">
      <ZList :dataSource="dataSource">
        <template v-slot:default="record">
          <div style="height:30px">{{ record.key }}</div>
        </template>
      </ZList>
    </div> -->

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
export default {
  name: "App",
  components: {
    ZList,
    ZSql,
    ZSelect
  },
  data() {
    return {
      dataSource: Array.from({ length: 1000 }).map((_, index) => ({
        key: index,
        index
      })),
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
</style>