<template>
  <el-table :data="data.jobs" style="width: 100%">
    <el-table-column
      v-for="column in columns"
      :label="column.label"
      :prop="column.props"
    >
      <template #default="{ row }">
        <el-tag
          v-if="column.props === 'status'"
          :type="
            row[column.props].toUpperCase() === 'FULLED'
              ? 'info'
              : row[column.props].toUpperCase() === 'OPENING'
              ? 'success'
              : 'danger'
          "
          >{{ row[column.props].toUpperCase() }}</el-tag
        >
        <span v-else>{{ row[column.props] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { getListJob } from "~/api/job.api";
const data = toReactive<any>({
  jobs: [],
  current_page: 1,
  limit: 10,
  total: 1,
});
const params = toReactive<any>({
  page: 1,
  limit: 10,
  search_key: "",
});
const getJobs = async () => {
  const response: any = await getListJob(params);
  if (response?.success) {
    data.jobs = response.data.data.map((item: any) => {
      console.log("ITEM", item);
      console.log("KEYS", Object.keys(item));
      return {
        status: item.status,
        name: item.name,
        company_name: item.company_name,
        position: item.position,
        quantity: item.quanlity,
        salary: item.salary,
        description: item.description,
      };
    });
    data.current_page = response.data.current_page;
    data.total = response.data.total;
  }
};
const columns = [
  {
    props: "status",
    label: "Status",
  },
  {
    props: "name",
    label: "Name",
  },
  {
    props: "company_name",
    label: "Company Name",
  },
  {
    props: "position",
    label: "Position",
  },
  {
    props: "quantity",
    label: "Quantity",
  },
  {
    props: "salary",
    label: "Salary",
  },
  {
    props: "description",
    label: "Description",
  },
];
console.log("DATA", data.jobs);
onMounted(() => {
  getJobs();
});
</script>
<style lang=""></style>
