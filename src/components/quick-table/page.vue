<template>
    <div class="admin-page-container">
        <div class="admin-tool-bar">
            <div class="tool-left">
            </div>
            <div class="tool-right">
                <Button class="btn" @click="add" v-if="addAble">添加{{ modelNameZh }}</Button>
            </div>
        </div>

        <Table :columns="columns" :data="data" ref="table" :height="500"></Table>

        <!--<my-pagination page="pagination" />-->

        <div class="debug">调试模式</div>
        <!--<p style="text-align:right;padding-right:40px;color:black;">-->
            <!--商品数量:-->
            <!--<span style="color:black;margin:5px;display:inline-block;">{{this.numberC}}</span>-->
        <!--</p>-->

        <my-footer />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                pagination: {},
            }
        },
        props: {
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            modelName: {
                type: String
            },
            modelNameZh: {
                type: String
            },
            addAble: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            this.getData()
            for (let i = 0; i < this.columns.length; i++) {
                let column = this.columns[i]
                if (column.key === 'action' && column.buttons) {
                    this.columns.splice(i, 1, {
                        title: "操作",
                        key: "action",
                        width: column.width || 150,
                        render: (h, params) => {
                            let buttons = typeof column.buttons === 'function' ? column.buttons(params) : column.buttons
                            return h("div", this.getButtons(h, params, buttons));
                        }
                    })
                }
            }
        },
        methods: {
            getButtons(h, params, btns) {
                let buttons = []
                for (let item of btns) {
                    if (item === 'BUTTON_VIEW') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "default",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        // 单词的复数形式
                                        let editUrl = this.modelName
                                        if (this.modelName.match(/y$/)) {
                                            editUrl = editUrl.substring(0, editUrl.length - 1) + 'ies'
                                        } else {
                                            editUrl += 's'
                                        }
                                        this.$router.push(`/${editUrl}/${this.data[params.index].id}`)
                                    }
                                }
                            },
                            "查看"
                        ))
                    }
                    else if (item === 'BUTTON_EDIT') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "default",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        // 单词的复数形式
                                        let editUrl = this.modelName
                                        if (this.modelName.match(/y$/)) {
                                            editUrl = editUrl.substring(0, editUrl.length - 1) + 'ies'
                                        } else {
                                            editUrl += 's'
                                        }
                                        this.$router.push(`/${editUrl}/${this.data[params.index].id}/edit`)
                                    }
                                }
                            },
                            "修改"
                        ))
                    }
                    else if (item === 'BUTTON_REMOVE') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.removeItem(this.data[params.index], params.index)
                                    }
                                }
                            },
                            "删除"
                        ))
                    }
                    else {
                        buttons.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: item.type,
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "8px"
                                    },
                                    on: {
                                        click: () => {
                                            item.click && item.click(params)
                                        }
                                    }
                                },
                                item.text
                            ))
                    }
                }
                return buttons
            },
            getData() {
                this.$http.get(this.modelName + '/all').then(
                    response => {
                        this.data = response.data.data
                        this.pagination = response.data.page
                        console.log(this.data)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            add() {
                this.$router.push(`/${this.modelName}/add`)
            },
            removeItem(item, index) {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '确定删除数据？',
                    onOk: () => {
                        this.$http.post(`/${this.modelName}/remove?id=` + item.id).then(
                            response => {
                                this.getData()
                            },
                            response => {
                                console.log(response)
                            }
                        )
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .debug {
        margin: 24px 0;
        color: #ccc;
    }
</style>
