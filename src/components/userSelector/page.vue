<template>
    <div>
        <Button @click="selectUser">选择员工</Button>

        <Modal v-model="userModalVisible" title="选择员工" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="userColumn" :data="users"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
                userModalVisible: false,
                userColumn: [
                    {
                        title: "员工编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        width: 240,
                    },
                    {
                        title: '职位',
                        key: 'position',
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectUserItem(this.users[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        props: {
//            onSelect: {
//                type: Function
//            }
        },
        methods: {
            selectUser() {
                this.userModalVisible = true
                this.$http.get('/user/all').then(
                    response => {
                        let data = response.data
                        this.users = data.data
                        console.log(this.users)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                this.userModalVisible = false
                this.$emit('select', user)
            },
            userModalOk() {
            },
            userModalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
