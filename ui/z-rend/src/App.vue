<template>
  <div class="demo">
    <div style="height: 300px;width:25%;margin-top:30px">
      <ZEllipsis>
        22123123123
      </ZEllipsis>
    </div>
  </div>
</template>

<script>
import ZList from "@/components/z-list";
import ZCheckbox from "@/components/z-checkbox";
import ZSql from "@/components/z-sql";
import ZSelect from "@/components/z-select";
import ZTable from "@/components/z-table";
import ZEllipsis from "@/components/z-ellipsis";
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
    ZTable,
    ZEllipsis
  },
  data() {
    return {
      list: items,
      sql: undefined,
      columns: [
        {
          field: "rowIndex",
          key: "rowIndex",
          title: "#",
          width: 50,
          fixed: "left"
        },
        {
          field: "expand",
          key: "expand",
          title: "",
          width: 100,
          fixed: "left",
          type: "expand"
        },
        {
          title: "Basic Info",
          fixed: "left",
          width: 300,
          children: [
            {
              field: "name",
              key: "name",
              title: "Name",
              width: 200,
              align: "left"
            },
            {
              field: "sex",
              key: "sex",
              title: "Sex",
              width: 100,
              align: "center",
              sortBy: "",
              edit: true
            }
          ]
        },
        {
          title: "Personal Experience",
          align: "center",
          width: 800,
          children: [
            {
              title: "Profession",
              field: "profession",
              key: "profession",
              width: 200,
              align: "left"
            },
            {
              title: "IT Skills",
              children: [
                {
                  field: "proficiency",
                  key: "proficiency",
                  title: "Proficiency",
                  width: 300,
                  sortBy: "",
                  edit: true
                },
                {
                  field: "skills",
                  key: "skills",
                  title: "Skills",
                  width: 300,
                  align: "left",
                  edit: true
                }
              ]
            }
          ]
        },
        {
          field: "address",
          key: "address",
          title: "Address",
          width: 350,
          align: "left"
        },
        {
          field: "status",
          key: "status",
          title: "Status",
          width: 100,
          fixed: "right",
          align: "left",
          filter: {
            filterList: [
              {
                value: 0,
                label: "Working",
                selected: false
              },
              {
                value: 1,
                label: "Metting",
                selected: false
              },
              {
                value: 2,
                label: "Traveling",
                selected: false
              }
            ],
            isMultiple: true
          }
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