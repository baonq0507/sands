<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { listGame } from '../common/constants';
import { useRouter } from 'vue-router';
import { layer } from '@layui/layer-vue';
import { socket } from '@/socket.js';

const router = useRouter();
const settingGame = ref(null)
const userOptions = ref([]);


const pagination = ref({
    total: 0,
    pageSize: 10,
    current: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `Tổng kết qủa ${total} kết quả`,
});
const loading = ref(false);
const user = ref(null);

onMounted(() => {
    axios.get('/me/profile').then(res => {
        user.value = res.user;
        getUserList();
        run(pagination.value);
    });
});


const formState = ref({
    username: '',
    value: '',
});

const formStateAll = ref({
    value: '1.98',
});

const dataSource = ref([
    {
        name: 'game',
        value: '1.98',
        userId: 1,
    },
]);
const columns = [
    {
        title: 'Giá trị',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: 'Người dùng',
        dataIndex: 'userId',
        key: 'userId',
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
        title: 'Hành động',
        dataIndex: 'operation',
        align: 'center',
    },
];

const run = (params) => {
    loading.value = true;
    axios.get('/setting', {
        params: {
            page: params.current,
            limit: params.pageSize,
            username: formState.value.username ? formState.value.username : null,
            value: formState.value.value ? formState.value.value : null,
        }
    }).then((res) => {

        const data = res;
        dataSource.value = data.docs.map((item, index) => {
            return {
                ...item,
                key: item._id,
                createdAt: formatDateTime(item.createdAt),
                value: item.value,
                userId: item?.user?.username,
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
const handelChangeTable = (params) => {
    run(params);
}

const search = (value) => {
    run({
        ...pagination.value,
        current: 1,
    });
}
const getUserList = async () => {
    const res = await axios.get('/users/list');
    userOptions.value = res.docs

    console.log(userOptions.value);
}

const editableData = reactive({});
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    console.log(editableData[key]);
    const data = cloneDeep(editableData[key]);
    console.log(data);
    data.userId = data.user._id;
    axios.put(`/setting/${key}`, data).then((res) => {
        console.log(res);
        socket.emit(`update-setting`, {
            userId: data.userId,
            value: data.value,
        });
        run({
            ...pagination.value,
        });
    }).catch((err) => {
        console.log(err);
    });
    delete editableData[key];
};

const cancel = key => {
    delete editableData[key]; getUserList();
    run(pagination.value);
};

const dle = (id) => {
    axios.delete(`/setting/${id}`).then((res) => {

        run({
            ...pagination.value,
            current: 1,
        });
    }).catch((err) => {
        console.log(err);
    });
}

const onFinishAll = (values) => {
    console.log('Success:', values);
    const loading = layer.load(2);
    axios.post('/setting/update-all', values).then((res) => {
        console.log(res);
        run({
            ...pagination.value,
            current: 1,
        });
        layer.msg('Cập nhật thành công', { icon: 1 });
    }).catch((err) => {
        console.log(err);
        layer.msg(err.response.data.message, { icon: 2 });
    }).finally(() => {
        layer.close(loading);
    });
}

</script>
<template>
    <a-layout>
        <Header :selectedKeys="['4']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Cài đặt</h3>
                <a-row gutter="10">
                    <a-col :span="12">
                        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onFinish">
                            <a-form-item v-model:value="formState.username">
                                <a-input-search @search="search" placeholder="Tìm kiếm" :loading="loading"
                                    enter-button />
                            </a-form-item>
                            <a-form-item v-model:value="formState.value">
                                <a-select v-model:value="formState.value" placeholder="Chọn giá trị">
                                    <a-select-option value="1.98">1.98</a-select-option>
                                    <a-select-option value="2.1">2.1</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-form>
                    </a-col>
                    <a-col :span="12">
                        <a-form layout="vertical" :model="formStateAll" autocomplete="off" @finish="onFinishAll">
                            <a-form-item name="value">
                                <a-select v-model:value="formStateAll.value" placeholder="Chọn giá trị">
                                    <a-select-option value="1.98">1.98</a-select-option>
                                    <a-select-option value="2.1">2.1</a-select-option>
                                </a-select>
                            </a-form-item>
                            <!-- // button submit -->
                            <a-form-item>
                                <a-button style="width: 100%;" type="primary" html-type="submit">Cập nhật tất cả</a-button>
                            </a-form-item>
                        </a-form>
                    </a-col>

                </a-row>

                <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" :loading="loading"
                    @change="handelChangeTable">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['value'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0">
                                    <a-select-option value="1.98">1.98</a-select-option>
                                    <a-select-option value="2.1">2.1</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <!-- <template v-if="['userId'].includes(column.dataIndex)">
                            <div>
                                <a-select v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0; width: 100%">
                                    <a-select-option :value="user._id" v-for="user in userOptions" :key="user._id">
                                        {{ user.username }}
                                    </a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template> -->

                        <template v-else-if="column.dataIndex === 'operation'">
                            <div class="editable-row-operations">
                                <span v-if="editableData[record.key]">
                                    <div>
                                        <a-typography-link style="color: green;"
                                            @click="save(record.key)">Lưu</a-typography-link>
                                    </div>
                                    <div>
                                        <a-popconfirm title="Bạn có muốn hủy thao thác?" @confirm="cancel(record.key)">
                                            <a style="color: red">Hủy</a>
                                        </a-popconfirm>
                                    </div>

                                </span>
                                <span v-else>
                                    <div v-if="user && user.permissions.setting.includes('edit')">
                                        <a @click="edit(record.key)">Chỉnh sửa</a>
                                    </div>
                                    <!-- <div>
                                        <a-popconfirm title="Bạn có muốn xóa người dùng này" ok-text="Xóa"
                                            cancel-text="Hủy" @confirm="dle(record._id)">
                                            <a href="#" style="color: red;">Xóa</a>
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
#app {
    margin: 0;
    max-width: 100% !important;
    overflow-x: hidden;
}

.list_game_item .ant-space-item {
    width: 25%;
    min-height: 100px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.bg_game {
    min-height: 100px;
    background-image: url(@/assets/images/icons/games/bg.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

.bg_game:hover {
    opacity: 0.5;
}
</style>