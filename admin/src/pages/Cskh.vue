<script setup>
import Header from '@/components/admin/Header.vue';
import { ref, onMounted } from 'vue';
import axios from '@/common/axios.js';
import {layer} from '@layui/layer-vue';

const formState = ref({
    url: '',
});

onMounted(() => {
    axios.get('/cskh').then((res) => {
        formState.value = res;
    });
});

const onFinish = async (values) => {
    const data = {
        ...values,
    };
    const layerLoad = layer.load(1);

    axios.put('/cskh', data).then((res) => {
        layer.msg('Cập nhật thành công', {
            icon: 1,
            time: 1500,
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

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
}
</script>

<template>
    <a-layout>
        <Header :selectedKeys="['6']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Chăm sóc khách hàng</h3>
                <a-row>
                    <a-col :span="24">
                        <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed" layout="vertical">
                            <a-form-item label="License livechat" name="url"
                                :rules="[{ required: true, message: 'Vui lòng nhập license' }]">
                                <a-input v-model:value="formState.url" />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" html-type="submit">Gửi</a-button>
                            </a-form-item>
                        </a-form>
                    </a-col>
                </a-row>
            </div>
        </a-layout-content>
    </a-layout>

</template>