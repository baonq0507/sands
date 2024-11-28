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
import { PlusCircleOutlined, InboxOutlined } from '@ant-design/icons-vue';

const dataSource = ref([]);
const pagination = ref({
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total) => `Total ${total} items`,
});
const user = ref(null);
const columns = [
    {
        title: 'Ảnh',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: 'Vị trí',
        dataIndex: 'position',
        key: 'position',
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
    axios.delete(`/banner/${id}`).then((res) => {

        dataSource.value = dataSource.value.filter(item => item._id !== id);
        layer.msg('Xóa thành công', {
            icon: 1,
            time: 3000,
        });
    }).catch((err) => {
        console.log(err);
    });
}
const logoFile = ref(null);
onMounted(() => {
    axios.get('/me/profile').then(res => {
        user.value = res.user;
        axios.get('/banner/').then((res) => {
            const data = res;
            dataSource.value = data.docs;
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
        axios.get('/logo').then(res => {
            logoFile.value = res.url;
        }).catch(err => {

        })
    });

});

const run = (params) => {
    loading.value = true;
    axios.get('/banner', {
        params: {
            page: params.current,
            limit: params.pageSize,
            search: params.search || ''
        }
    }).then((res) => {
        // dataSource.value = res;
        const data = res;
        dataSource.value = data.docs;
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
const openModalAdd = () => {
    visible.value = true;
}

const visible = ref(false);
const handleOk = () => {
    console.log(formStateAdd.value);
    if(!formStateAdd.value.url) {
        layer.msg('Vui lòng chọn ảnh', {
            icon: 2,
            time: 3000,
        });
        return;
    }

    if(!formStateAdd.value.position) {
        layer.msg('Vui lòng nhập vị trí', {
            icon: 2,
            time: 3000,
        });
        return;
    }
    axios.post('/banner', formStateAdd.value).then((res) => {
        run({
            current: 1,
            pageSize: 10,
            search: ''
        });
        layer.msg('Thêm thành công', {
            icon: 1,
            time: 3000,
        });
        formStateAdd.value = {
            url: '',
            position: 0,
        };
        fileList.value = [];

    }).catch((err) => {
        console.log(err);
    });
    visible.value = false;
}
const fileList = ref([]);
const handleChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (status === 'done') {
        layer.msg(`${info.file.name} tải lên thành công`, {
            icon: 1,
            time: 2000,
        });
        formStateAdd.value.url = info.file.response.url;
    } else if (status === 'error') {
        layer.msg(`${info.file.name} Lỗi tải lên`, {
            icon: 2,
            time: 2000,
        });
    }
}
const formStateAdd = ref({
    url: '',
    position: 0,
});
const actionUrl = `${import.meta.env.VITE_API_URL}/upload`;
const staticUrl = import.meta.env.VITE_API_URL;
const getStaticFile = (url) => {
    if(!url) return '';

    const urlRe = url.replace('public', '');
    console.log(urlRe);

    return staticUrl + urlRe;
}
const visibleLogo = ref(false);
const openModalLogo = () => {
    visibleLogo.value = true;
}
const fileListLogo = ref([]);
const handleChangeLogo = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log(info.file, info.fileListLogo);
    }
    if (status === 'done') {
        layer.msg(`${info.file.name} tải lên thành công`, {
            icon: 1,
            time: 2000,
        });
        logoFile.value = info.file.response.url;
    } else if (status === 'error') {
        layer.msg(`${info.file.name} Lỗi tải lên`, {
            icon: 2,
            time: 2000,
        });
    }
}
const handleLogo = () => {
    if(!logoFile.value) {
        layer.msg('Vui lòng chọn ảnh', {
            icon: 2,
            time: 3000,
        });
        return;
    }
    axios.put('/logo', { url: logoFile.value }).then((res) => {
        layer.msg('Thay đổi logo thành công', {
            icon: 1,
            time: 3000,
        });
    }).catch((err) => {
        console.log(err);
    });
    visibleLogo.value = false;
}
</script>
<template>
    <a-layout>
        <Header :selectedKeys="['1']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Logo</h3>
                <a-row>
                    <a-col :span="12">
                        <a-image :src="getStaticFile(logoFile)" width="100%" />
                    </a-col>
                    <a-col :span="12" style="text-align: right; margin-bottom: 10px">
                        <a-button type="primary" @click="openModalLogo">
                            <plus-circle-outlined />
                            Thay đổi logo
                        </a-button>
                    </a-col>
                </a-row>
                <h3 style="margin: 10px;">Banner</h3>
                <a-row>
                    <a-col :span="12">

                    </a-col>
                    <a-col :span="12" style="text-align: right; margin-bottom: 10px">
                        <a-button type="primary" @click="openModalAdd">
                            <plus-circle-outlined />
                            Thêm banner
                        </a-button>
                    </a-col>
                </a-row>

                <a-table v-if="user" @change="handelChangeTable" :columns="columns" :data-source="dataSource" bordered
                    :pagination="pagination" :scroll="{ x: 1500, y: 700 }">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['url'].includes(column.dataIndex)">
                            <a :href="getStaticFile(record.url)" target="_blank">
                                <img :src="getStaticFile(record.url)" alt="" style="width: 200px; height: 150px;">
                            </a>
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
                                    <a-popconfirm title="Bạn có muốn xóa ảnh này" ok-text="Xóa" cancel-text="Hủy"
                                        @confirm="dle(record._id)">
                                        <a href="#" style="color: red;">Xóa</a>
                                    </a-popconfirm>
                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </a-layout-content>
        <Footer></Footer>
        <a-modal v-model:visible="visible" title="Thêm banner" @ok="handleOk">
            <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="false" @change="handleChange"
                :action="actionUrl">
                <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">
                    Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                <p class="ant-upload-hint">
                    Hỗ trợ tải lên một lần
                </p>
            </a-upload-dragger>
            <a-form layout="vertical" :model="formStateAdd" autocomplete="off" @finish="onFinishAdd">
                <a-form-item label="Vị trí" v-model:value="formStateAdd.position">
                    <a-input-number style="width: 100%;" v-model:value="formStateAdd.position" />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="visibleLogo" title="Thêm banner" @ok="handleLogo">
            <a-upload-dragger v-model:fileList="fileListLogo" name="file" :multiple="false" @change="handleChangeLogo"
                :action="actionUrl">
                <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">
                    Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                <p class="ant-upload-hint">
                    Hỗ trợ tải lên một lần
                </p>
            </a-upload-dragger>
        </a-modal>
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