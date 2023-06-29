<template>
  <div class="demo">
    <ZList :data="list" row-key="id" style="height: 500px;width: 375px;">
      <template v-slot:default="record">
        <div
          style="border-bottom:1px solid #efefef;box-sizing:border-box; padding: 15px;font-size: 14px;color: #262626;"
        >
          <span class="index">#{{ record.id }}</span>
          <span>{{ record.value }}</span>
        </div>
      </template>
    </ZList>

    <div style="height: 300px;width:25%;margin-top:30px">
      <ZCheckbox />
      <ZCheckbox disabled />
      <ZCheckbox size="small" />
      <ZCheckbox size="large" />
    </div>
    <div style="height: 300px;width:25%;margin-top:30px">
      <ZTable :columns="columns" :data="data" />
    </div>
  </div>
</template>

<script>
import ZList from "@/components/z-list";
import ZCheckbox from "@/components/z-checkbox";
import ZSql from "@/components/z-sql";
import ZSelect from "@/components/z-select";
import ZTable from "@/components/z-table";
import Mock from "mockjs";

let count = 10000;
let items = [];
for (let i = 0; i < count; i++) {
  items.push({ id: String(i), value: Mock.Random.cparagraph(1, 5) });
  // items.push({ id: String(i), value: 222 });
}
Object.freeze(items);

export default {
  name: "App",
  components: {
    ZList,
    ZSql,
    ZSelect,
    ZCheckbox,
    ZTable
  },
  data() {
    return {
      list: items,
      sql: undefined,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: 100,
          fixed: "left"
        },
        {
          title: "Other",
          children: [
            {
              title: "Age",
              dataIndex: "age",
              key: "age",
              width: 150
            },
            {
              title: "Address",
              children: [
                {
                  title: "Street",
                  dataIndex: "street",
                  key: "street",
                  width: 150
                },
                {
                  title: "Block",
                  children: [
                    {
                      title: "Building",
                      dataIndex: "building",
                      key: "building",
                      width: 100
                    },
                    {
                      title: "Door No.",
                      dataIndex: "number",
                      key: "number",
                      width: 100
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Company",
          children: [
            {
              title: "Company Address",
              dataIndex: "companyAddress",
              key: "companyAddress",
              width: 200
            },
            {
              title: "Company Name",
              dataIndex: "companyName",
              key: "companyName"
            }
          ]
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
          width: 80,
          fixed: "right"
        }
      ],
      data: []
    };
  }
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
}
.index {
  font-weight: bold;
  margin-right: 4px;
  color: red;
}
</style>