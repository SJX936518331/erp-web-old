<template>
  <div class="container">
    <Card>
      <div>
        <Form ref="form" :model="storageCheck" :label-width="100" label-position="right" :rules="validate">
          <FormItem label="盘点单编号" prop="code">
            <Input v-model="storageCheck.code" placeholder="请输入盘点单编号"></Input>
          </FormItem>
          <FormItem label="日期" prop="make_time">
            <Input v-model="storageCheck.make_time" placeholder="请输入仓库名称"></Input>
          </FormItem>
          <FormItem label="盘点单仓库" prop="store_id">
            {{ storageCheck.store_name }}
            <my-store-selector @select="onStoreSelect" />
          </FormItem>
          <FormItem label="备注" prop="note">
            <Input v-model="storageCheck.note" placeholder="请输入备注"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button @click="check">审核</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>

    <my-footer />
  </div>

</template>

<script>
export default {
  data() {
    return {
      modelName:'storage_check',
      storageCheck: {},
      validate: {
        code: [
          {
            required: true,
            message: "盘点单编号不能为空",
            trigger: "blur"
          }
        ],
        make_time: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ]
        // store_id: [
        //   {
        //     required: true,
        //     message: "盘点仓库不能为空",
        //     trigger: "content"
        //   }
        // ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.storeId = this.$route.params.id;
      if (!this.storeId) {
        return;
      }
      this.$http.get("/storage_check/detail?id=" + this.storeId).then(
        response => {
          let data = response.data;
          this.storageCheck = data.data;
          console.log(this.storageCheck);
        },
        response => {
          console.log(response);
        }
      );
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$Message.error("请完善表单");
          return;
        }
        this.storageCheck.id = this.storeId;
        let url = this.storeId ? "/storage_check/update" : "/storage_check/add";
        this.$http.post(url, this.storageCheck).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    onStoreSelect(store) {
      this.storageCheck.store_id = store.id;
      this.storageCheck.make_user_id = store.id;
      this.storageCheck.time = this.storageCheck.make_time;
      this.storageCheck.department_id = store.id;
      this.storageCheck.business_user_id = store.id;
      this.storageCheck.check_user_id = store.id;
      this.storageCheck.branch_id = store.id;
      this.storageCheck.store_name = store.name;
    },
    check() {
      this.$http.post(`/${this.modelName}/check?id=${this.storeId}`).then(
        response => {
          this.$Message.success("审核成功");
          this.getData();
        },
        response => {
          this.$Message.error("系统出错");
        }
      );
    }
  }
};
</script>
