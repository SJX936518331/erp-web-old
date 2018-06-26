<template>
    <div class="container">
        <Card>
            <div>
                <Form ref="form" :model="store" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="仓库编号" prop="code">
                        <Input v-model="store.code" placeholder="请输入仓库编号"></Input>
                    </FormItem>
                    <FormItem label="仓库名称" prop="name">
                        <Input v-model="store.name" placeholder="请输入仓库名称"></Input>
                    </FormItem>
                    <FormItem label="部门负责人" prop="manager_id">
                        <div>{{ store.manager_name }}</div>
                        <my-user-selector @select="selectUserItem" />
                    </FormItem>
                    <FormItem label="分支机构" prop="branch_id">
                        <div>{{ store.branch_name }}</div>
                        <my-branch-selector @select="onBranchSelect" />
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input v-model="store.address" placeholder="请输入地址"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input v-model="store.note" placeholder=""></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
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
      store: {},
      validate: {
        code: [
          {
            required: true,
            message: "仓库编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "仓库名称不能为空",
            trigger: "blur"
          }
        ],
        branch_id: [
          {
            required: true,
            message: "分支机构不能为空",
            trigger: "content"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        note: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
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
      this.$http.get("/store/detail?id=" + this.storeId).then(
        response => {
          let data = response.data;
          this.store = data.data;
          console.log(this.store);
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
        let url = this.storeId ? "/store/update" : "/store/add";
        this.$http.post(url, this.store).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
    onBranchSelect(branch) {
      this.store.branch_id = branch.code;
      this.store.branch_name = branch.name;
    },
    selectUserItem(user) {
      console.log("选择了2", user);
      this.store.manager_id = user.id;
      this.store.manager_name = user.name;
    }
  }
};
</script>
