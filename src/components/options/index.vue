<template>
  <div>
    <el-select v-model="form.workType" placeholder="请选择工种" filterable clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.no" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
      },
      url:
        "/bashUrl" +
        "/smart/worker/pDic/" +
        sessionStorage.getItem("userId") +
        "/management",
      data: JSON.stringify({ fieldName: "work_type" })
    }).then(
      res => {
        if (res.code == 200) {
          //  var options=[];
          // options = res.data;
          // console.log(res.data)
          //  return res.data
        }
      },
      err => {
        return errorfun(err);
      }
    );
  }
};
</script>
