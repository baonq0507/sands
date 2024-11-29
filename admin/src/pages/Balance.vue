<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { layer } from '@layui/layer-vue';
import { formatCurrency } from '@/common';
import { socket } from '@/socket';
const formState = ref({
    userId: '',
    balance: '',
    note: '',
    type: 'add',
});
const userList = ref([]);

const getUserList = async () => {
    const res = await axios.get('/users/list', {
        params: {
            limit: 1000,
            page: 1,
        },
    });
    userList.value = res.docs;
}

const onFinish = (values) => {
    const data = {
        ...values,
    };
    if (data.type === 'sub' && userSelect.value.balance < data.balance) {
        layer.msg('Số dư không đủ', {
            icon: 2,
            time: 1500,
        });
        return;
    }
    const layerLoad = layer.load(1);
    axios.put(`/users/update-balance/${data.userId}`, data).then((res) => {
        layer.msg('Cập nhật thành công', {
            icon: 1,
            time: 1500,
        });
        userSelect.value = res

        socket.emit('update-balance', {
            userId: data.userId,
            balance: res.balance,
        });
    }).catch((err) => {
        layer.msg('Cập nhật thất bại', {
            icon: 2,
            time: 1500,
        });
    }).finally(() => {
        layer.close(layerLoad);
    });
}
const userSelect = ref('');
const handleChangeUser = value => {
    userSelect.value = userList.value.find((user) => user._id === value);
};
onMounted(() => {
    getUserList();
});
const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<template>
    <a-layout>
        <Header :selectedKeys="['7']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Công trừ tiền</h3>
                <a-form layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
                    <a-form-item name="userId" label="Người dùng"
                        :rules="[{ required: true, message: 'Vui lòng nhập ID người dùng' }]">
                        <a-select @change="handleChangeUser" show-search v-model:value="formState.userId"
                            style="width: 100%">
                            <a-select-option v-for="user in userList" :key="user._id" :value="user._id" :filter-option="filterOption">
                                <div class="notranslate">{{ user.username }}</div>
                            </a-select-option>
                        </a-select>
                        {{ userSelect ? 'số dư người dùng: ' + formatCurrency(userSelect.balance) : '' }}
                    </a-form-item>
                    <a-form-item name="type" label="Công hoặc trừ"
                        :rules="[{ required: true, message: 'Vui lòng nhập ID người dùng' }]">
                        <a-select v-model:value="formState.type" style="width: 100%">
                            <a-select-option value="add">Cộng</a-select-option>
                            <a-select-option value="sub">Trừ</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item name="balance" label="Số tiền"
                        :rules="[{ required: true, message: 'Vui lòng nhập số tiền' }]">
                        <a-input-number v-model:value="formState.balance" style="width: 100%;" />
                    </a-form-item>
                    <a-form-item name="note" label="Lý do">
                        <a-input v-model:value="formState.note" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">Công trừ</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>