<template>
  <div style="height: 300px;border:1px solid red;width:200px">
    <ZList :dataSource="dataSource">
      <template v-slot:default="record">
        <div style="height:30px">{{ record.key }}</div>
      </template>
    </ZList>
  </div>
</template>

<script>
import ZList from "@/components/z-list";
export default {
  name: "App",
  components: {
    ZList
  },
  data() {
    return {
      dataSource: Array.from({ length: 1000 }).map((_, index) => ({
        key: index,
        index
      }))
    };
  }
};
</script>

