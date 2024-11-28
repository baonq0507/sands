<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { layer } from '@layui/layer-vue';
import { formatCurrency } from '@/common';
import { socket } from '@/socket';
const dataSource = ref([]);
const columns = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
        scopedSlots: { customRender: 'username' }
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        customRender: (text, value) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Số dư trước',
        dataIndex: 'beforeBalance',
        key: 'balance',
        customRender: (text, value) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Số dư sau',
        dataIndex: 'afterBalance',
        key: 'balance',
        customRender: (text, value) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',

    },
    {
        title: 'Trạng thái sử lý',
        dataIndex: 'statusProcess',
        key: 'statusProcess',
        customRender: (text) => {
            return text.text == 0 ? 'Đang chờ' : 'Đã xử lý'
        }

    },
    {
        title: 'Tạo ngày',
        dataIndex: 'createAt',
        key: 'createAt',
        customRender: (text) => {
            return formatDateTime(text.text)
        }
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: 'Lý do',
        dataIndex: 'reson',
        key: 'reson',
    },
    {
        title: 'Nạp/Rút',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Hành động',
        dataIndex: 'operation',
    },
]
const editableData = reactive({});
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const type = ref('');
const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    console.log(editableData[key]);
    axios.put(`/users/update-request-money/${key}`, editableData[key]).then((res) => {
        layer.msg('Lưu thành công', {
            icon: 1,
            time: 3000,
        });
        console.log(res);
        if (res.userID) {
            socket.emit('update-balance', {
                userId: res.userID,
                balance: res.afterBalance,
            });
        }
        // update data
        const data = dataSource.value.find(item => item.key === key);
        dataSource.value = dataSource.value.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    ...editableData[key],
                    username: data.username,
                    status: item.status == 'pending' ? 'Đang chờ' : item.status == 'accept' ? 'Đã chấp nhận' : 'Từ chối',
                    type: item.type == 'deposit' ? 'Nạp tiền' : 'Rút tiền',
                }
            }
            return item;
        });
    }).catch((err) => {
        console.log(err);
    });
    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};
// const dle = (id) => {
//     axios.delete(`/users/${id}`).then((res) => {
//
//         dataSource.value = dataSource.value.filter(item => item._id !== id);
//         layer.msg('Xóa thành công', {
//             icon: 1,
//             time: 3000,
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// }
const rangePicker = ref([]);

const pagination = ref({
    current: 1,
    pageSize: 10,
    total: dataSource.value.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `Total ${total} items`,
})
const run = (params) => {
    axios.get('/users/get-request-money', {
        params: {
            page: params.current,
            limit: params.pageSize,
            type: params.type || null,
            username: params.username || null,
            fromDate: params.fromDate || null,
            toDate: params.toDate || null,
        }
    }).then((res) => {
        const data = res;
        dataSource.value = data.docs.map((item, index) => {
            return {
                ...item,
                key: item._id,
                username: item?.user ? item.user.username : '',
                status: item.status == 'pending' ? 'Đang chờ' : item.status == 'accept' ? 'Đã chấp nhận' : 'Từ chối',
                type: item.type == 'deposit' ? 'Nạp tiền' : 'Rút tiền',
            }
        });
        pagination.value = {
            current: data.page,
            pageSize: data.limit,
            total: data.totalDocs,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `Tổng kết qủa ${res.totalDocs} kết quả`,
        }
    }).catch((err) => {
        console.log(err);
    });
}

const handelChangeTable = (params) => {
    console.log(params);
    run(params)
}
const searchValue = ref('');
const onSearch = (value) => {
    run({
        page: 1,
        limit: 10,
        username: value,
    });
}
const user = ref(null)
onMounted(() => {
    axios.get('/me/profile').then(res => {
        user.value = res.user;
    });
    run({ page: 1, limit: 10 })
    socket.on('deposit', async (data) => {
        run({ page: 1, limit: 10 })
    });
});
const changeType = (value) => {
    type.value = value;
    run({
        type: value,
    });
}
const changeRangePicker = (value) => {
    if (value && value.length > 0) {
        run({
            fromDate: value[0],
            toDate: value[1],
        });
    } else {
        run({
            page: 1,
            limit: 10
        });
    }
}

</script>
<template>
    <a-layout>
        <Header :selectedKeys="['5']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Quản lý nạp rút</h3>
                <a-row gutter="10" style="margin: 10px 0;">
                    <a-col :span="12">
                        <a-input-search v-model:value="searchValue" @search="onSearch"
                            placeholder="Tìm kiếm theo tên người dùng" enter-button />
                    </a-col>
                    <!-- // select option type -->
                    <a-col :span="12">
                        <a-select v-model:value="type" style="width: 100%" placeholder="Chọn tình trạng"
                            @change="changeType" allowClear>
                            <a-select-option value="deposit">Nạp tiền</a-select-option>
                            <a-select-option value="withdraw">Rút tiền</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="24" style="margin-top: 10px;">
                        <p>Tìm kiếm theo ngày</p>
                        <a-range-picker v-model:value="rangePicker" @change="changeRangePicker" />
                    </a-col>
                </a-row>
                <a-table :columns="columns" :data-source="dataSource" bordered :pagination="pagination"
                    @change="handelChangeTable">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['balance', 'phone', 'email'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['status'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="pending">Đang chờ</a-select-option>
                                    <a-select-option value="accept">Chấp nhận</a-select-option>
                                    <a-select-option value="reject">Từ chối</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['role'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="admin">Admin</a-select-option>
                                    <a-select-option value="user">Người dùng</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['note'].includes(column.dataIndex)">
                            <div>
                                <a-textarea v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>

                        <template v-else-if="column.dataIndex === 'operation'">
                            <div class="editable-row-operations">
                                <span v-if="editableData[record.key]">
                                    <div>
                                        <a-typography-link style="color: green;" @click="save(record.key)">Lưu</a-typography-link>
                                    </div>
                                    <div>
                                        <a-popconfirm title="Bạn có muốn hủy thao thác?" @confirm="cancel(record.key)"
                                            ok-text="OK" cancel-text="Tiếp tục">
                                            <a style="color: red;">Hủy</a>
                                        </a-popconfirm>
                                    </div>
                                </span>
                                <span v-else>
                                    <div v-if="user && user.permissions.requestMoney.includes('edit')">
                                        <a @click="edit(record.key)">Chỉnh sửa</a>
                                    </div>
                                    <!-- <div>
                                        <a-popconfirm title="Bạn có muốn xóa người dùng này" ok-text="Xóa"
                                            cancel-text="Hủy" @confirm="dle(record._id)">
                                            <a href="#">Xóa</a>
                                        </a-popconfirm>
                                    </div> -->
                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>

<style>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
    background: #141414;
}

#app {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden;
}
</style>

<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>