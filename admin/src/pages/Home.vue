<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { layer } from '@layui/layer-vue';
import { formatCurrency } from '../common';
import { banks } from '@/common/constants';
import {PlusCircleOutlined} from '@ant-design/icons-vue';

const dataSource = ref([
    {
        _id: '1',
        username: 'admin',
        phone: '0123456789',
        email: 'admin@gmail.com',
    }
]);
const pagination = ref({
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total) => `Total ${total} items`,
});
const user = ref(null);
const columns = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'IP đăng nhập',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
    },
    {
        title: 'Quyền',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Mã giới thiệu',
        dataIndex: 'inviteCode',
        key: 'email',
    },
    {
        title: 'Người giới thiệu',
        dataIndex: 'userInvited',
        key: 'userInvited',
        customRender: (text) => {
            return text.text ? text.text?.username : 'Hệ thống';
        },
    },
    {
        title: 'Số dư',
        dataIndex: 'balance',
        key: 'balance',
        customRender: (text) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Tiền lãi',
        dataIndex: 'interest',
        key: 'interest',
        customRender: (text) => {
            return formatCurrency(text.text);
        }
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        customRender: (text) => {
            return text.text === 'active' ? 'Kích hoạt' : 'Khóa';
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
        title: 'Đăng nhập cuối',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
        customRender: (text) => {
            return formatDateTime(text.text)
        }
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
const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    console.log(editableData[key]);
    const data = cloneDeep(editableData[key]);
    data.balance = data.balance.replace(/\D/g, '');

    axios.put(`/users/${key}`, data).then((res) => {

    }).catch((err) => {
        console.log(err);
    });
    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};
const dle = (id) => {
    axios.delete(`/users/${id}`).then((res) => {

        dataSource.value = dataSource.value.filter(item => item._id !== id);
        layer.msg('Xóa thành công', {
            icon: 1,
            time: 3000,
        });
    }).catch((err) => {
        console.log(err);
    });
}
onMounted(() => {
    axios.get('/me/profile').then(res => {
        user.value = res.user;
        axios.get('/users/list').then((res) => {
            const data = res;
            dataSource.value = data.docs.map((item, index) => {
                return {
                    ...item,
                    key: item._id,
                    balance: formatCurrency(item.balance),
                    interest: item.historyBet.reduce((acc, item) => acc + item.interest, 0) > 0 ? item.historyBet.reduce((acc, item) => acc + item.interest, 0) : 0
                }
            });
            pagination.value = {
                ...pagination.value,
                total: res.totalDocs + 1,
                pageSize: res.limit,
                current: res.page,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `Tổng kết qủa ${res.totalDocs} kết quả`,
            }
        }).catch((err) => {
            console.log(err);
        });
    });

});
const userAction = ref({
    bankName: '',
    bankAccountNumber: '',
    bankBranch: '',
    bankAccountName: ''

});
const visible = ref(false);
const visibleChangePass = ref(false);
const visibleChangePass2 = ref(false);

const showModal = (record) => {
    console.log(record);
    userAction.value = record;
    visible.value = true;
};
const handleOk = e => {
    console.log(e);
    visible.value = false;
};
const showModalChangePass = (record) => {
    console.log(record);
    userAction.value = record;
    visibleChangePass.value = true;
};
const showModalChangePass2 = (record) => {
    console.log(record);
    userAction.value = record;
    visibleChangePass2.value = true;
};
const handleOkChangePass = e => {
    console.log(e);
    visibleChangePass.value = false;
};
const run = (params) => {
    loading.value = true;
    axios.get('/users/list', {
        params: {
            page: params.current,
            limit: params.pageSize,
            search: params.search || ''
        }
    }).then((res) => {

        // dataSource.value = res;
        const data = res;
        dataSource.value = data.docs.map((item, index) => {
            return {
                ...item,
                key: item._id,
                balance: formatCurrency(item.balance),
                interest: item.historyBet.reduce((acc, item) => acc + item.interest, 0) > 0 ? item.historyBet.reduce((acc, item) => acc + item.interest, 0) : 0
            }
        });
        pagination.value = {
            ...pagination.value,
            total: res.totalDocs + 1,
            pageSize: res.limit,
            current: res.page,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `Tổng kết qủa ${res.totalDocs} kết quả`,
        }
        loading.value = false;
    }).catch((err) => {
        console.log(err);
        loading.value = false;
    });
}

const formStatePassword = reactive({
    password: '',
    confirmPassword: ''
});
const formStatePassword2 = reactive({
    password2: '',
    confirmPassword2: ''
});
const handelChangeTable = (params) => {
    run(params);
}
const formState = ref({
    search: '',
});
const onFinish = values => {
    console.log('Success:', values);
};
const loading = ref(false);
const search = (value) => {
    loading.value = true;
    console.log(value);
    run({
        current: 1,
        pageSize: 10,
        search: value
    });
}
const onFinishPassword = values => {
    console.log('Success:', values);
    axios.put(`/users/change-password/${userAction.value._id}`, {
        password: formStatePassword.password,
        confirmPassword: formStatePassword.confirmPassword
    }).then((res) => {

        layer.msg('Thay đổi mật khẩu thành công', {
            icon: 1,
            time: 3000,
        });
        visibleChangePass.value = false;
    }).catch((err) => {
        console.log(err);
        layer.msg(err.response.data.message, {
            icon: 2,
            time: 3000,
        });
    });
};
const onFinishPassword2 = values => {
    axios.put(`/users/change-password-withdraw/${userAction.value._id}`, {
        password2: formStatePassword2.password2,
        confirmPassword2: formStatePassword2.confirmPassword2
    }).then((res) => {
        layer.msg('Thay đổi mật khẩu thành công', {
            icon: 1,
            time: 3000,
        });
        visibleChangePass2.value = false;
    }).catch((err) => {
        console.log(err);
        layer.msg(err.response.data.message, {
            icon: 2,
            time: 3000,
        });
    });
};
const changeBank = (values) => {
    console.log('Success:', values);
    axios.put(`/users/change-bank/${userAction.value._id}`, values).then((res) => {

        layer.msg('Thay đổi ngân hàng thành công', {
            icon: 1,
            time: 3000,
        });
        visible.value = false;
    }).catch((err) => {
        console.log(err);
        layer.msg(err.response.data.message, {
            icon: 2,
            time: 3000,
        });
    });
}

</script>
<template>
    <a-layout>
        <Header :selectedKeys="['1']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Người dùng</h3>
                <a-row>
                    <a-col :span="12">
                        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish">
                            <a-form-item v-model:value="formState.search">
                                <a-input-search @search="search" placeholder="Tìm kiếm" :loading="loading"
                                    enter-button />
                            </a-form-item>
                        </a-form>
                    </a-col>
                    <a-col :span="12" style="text-align: right;"
                        v-if=" user && user.permissions.user.includes('create')">
                        <router-link to="/user/create">
                            <a-button type="primary">
                                <plus-circle-outlined />
                                Thêm người dùng
                            </a-button>
                        </router-link>
                    </a-col>
                </a-row>

                <a-table v-if="user" @change="handelChangeTable" :columns="columns" :data-source="dataSource" bordered
                    :pagination="pagination" :scroll="{ x: 1500, y: 700 }">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['username'].includes(column.dataIndex)">
                            <router-link :to="`/user/${record._id}`" v-if="user.permissions.user.includes('edit')">
                                <span class="notranslate">{{ text }}</span>
                            </router-link>
                            <template v-else>
                                <span class="notranslate">{{ text }}</span>
                            </template>
                        </template>
                        <template v-if="['phone', 'email'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    <span class="notranslate">{{ text }}</span>
                                </template>
                            </div>
                        </template>
                        <template v-if="['status'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="active">Kích hoạt</a-select-option>
                                    <a-select-option value="inactive">Khóa</a-select-option>
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
                        <template v-else-if="column.dataIndex === 'operation'">
                            <div class="editable-row-operations">
                                <span v-if="editableData[record.key]">
                                    <a-typography-link @click="save(record.key)">Lưu</a-typography-link>
                                    <a-popconfirm title="Bạn có muốn hủy thao thác?" @confirm="cancel(record.key)">
                                        <a>Hủy</a>
                                    </a-popconfirm>
                                </span>
                                <span v-else>
                                    <a @click="edit(record.key)" v-if="user.permissions.user.includes('edit')">Chỉnh
                                        sửa</a>
                                    <a-popconfirm v-if="user.permissions.user.includes('delete')"
                                        title="Bạn có muốn xóa người dùng này" ok-text="Xóa" cancel-text="Hủy"
                                        @confirm="dle(record._id)">
                                        <a href="#" style="color: red;">Xóa</a>
                                    </a-popconfirm>
                                    <a @click="showModal(record)" style="color: green"
                                        v-if="user.permissions.user.includes('edit')">Ngân hàng</a>
                                    <a @click="showModalChangePass(record)" style="color: yellowgreen"
                                        v-if="user.permissions.user.includes('edit')">Mật
                                        khẩu</a>
                                    <a @click="showModalChangePass2(record)" style="color: #000"
                                        v-if="user.permissions.user.includes('edit')">Mật
                                        khẩu rút tiền</a>

                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </a-layout-content>
        <a-modal v-model:visible="visible" title="Chi tiết ngân hàng" @ok="handleOk" :footer="null">
            <a-form layout="vertical" :model="userAction" autocomplete="off" @finish="changeBank">
                <a-form-item label="Chọn ngân hàng" name="bankName"
                    :rules="[{ required: true, message: 'Vui lòng chọn ngân hàng' }]">
                    <a-select v-model:value="userAction.bankName">
                        <a-select-option :value="bank.short_name" v-for="bank in banks" :key="bank.short_name">
                            {{ `(${bank.short_name}) ${bank.name}` }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Tên tài khoản" name="bankAccountName" :rules="[
                    { required: true, message: 'Vui lòng nhập tên tài khoản' }
                ]">
                    <a-input v-model:value="userAction.bankAccountName" />
                </a-form-item>
                <a-form-item label="Số tài khoản" name="bankAccountNumber" :rules="[
                    { required: true, message: 'Vui lòng nhập số tài khoản' }
                ]">
                    <a-input v-model:value="userAction.bankAccountNumber" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">Lưu</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="visibleChangePass" title="Thay đổi mật khẩu" @ok="handleOk" :footer="null">
            <a-form layout="vertical" :model="formStatePassword" autocomplete="off" @finish="onFinishPassword">
                <a-form-item label="Mật khẩu mới" name="password" :rules="[
                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                    { min: 6, message: 'Mật khẩu phải lớn hơn 6 ký tự' }
                ]">
                    <a-input-password v-model:value="formStatePassword.password" />
                </a-form-item>
                <a-form-item label="Nhập lại mật khẩu" name="confirmPassword" :rules="[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu' },
                    { min: 6, message: 'Mật khẩu phải lớn hơn 6 ký tự' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== formStatePassword.password) {
                                callback('Mật khẩu không khớp');
                            }
                            callback()
                        }
                    }
                ]">
                    <a-input-password v-model:value="formStatePassword.confirmPassword" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">Lưu</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="visibleChangePass2" title="Thay đổi mật khẩu rút tiền" @ok="handleOk2" :footer="null">
            <a-form layout="vertical" :model="formStatePassword2" autocomplete="off" @finish="onFinishPassword2">
                <a-form-item label="Mật khẩu mới" name="password2" :rules="[
                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                    { min: 6, message: 'Mật khẩu phải lớn hơn 6 ký tự' }
                ]">
                    <a-input-password v-model:value="formStatePassword2.password2" />
                </a-form-item>
                <a-form-item label="Nhập lại mật khẩu" name="confirmPassword2" :rules="[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu' },
                    { min: 6, message: 'Mật khẩu phải lớn hơn 6 ký tự' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== formStatePassword2.password2) {
                                callback('Mật khẩu không khớp');
                            }
                            callback()
                        }
                    }
                ]">
                    <a-input-password v-model:value="formStatePassword2.confirmPassword2" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">Lưu</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
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
    /* margin-right: 8px; */
    display: block;
    text-align: center;
}
</style>