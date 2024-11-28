<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios';
import {layer} from '@layui/layer-vue';

const formState = ref({
    widthDrawSound: '',
    depositSound: '',
});
const user = ref(null);

onMounted(() => {
    axios.get('/me/profile').then(res => {
        user.value = res.user;
        axios.get('/setting-noti').then(res => {
            formState.value = res;
        });
    });

});

const onFinish = (values) => {
    const layerLoading = layer.load(1);
    axios.put('/setting-noti', values).then(res => {
        console.log(res);
        layer.msg('Cập nhật thành công', {
            icon: 1,
            time: 1000,
        });
    }).catch(err => {
        console.log(err);
        layer.msg('Cập nhật thất bại', {
            icon: 2,
            time: 1000,
        });
    }).finally(() => {
        layer.close(layerLoading);
    });
};
</script>

<template>
    <a-layout>
        <Header :selectedKeys="['9']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Cài đặt thông báo</h3>
                <a-form layout="vertical" :model="formState" @finish="onFinish">
                    <a-form-item label="Thông báo rút tiền" name="widthDrawSound" :rules="[
                        { required: true, message: 'Vui lòng chọn thông báo rút tiền' }
                    ]">
                        <a-radio-group v-model:value="formState.widthDrawSound">
                            <a-radio :value="0">Tắt</a-radio>
                            <a-radio :value="1">Bật</a-radio>
                            <a-radio :value="2">Giọng nói</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="Thông báo nạp tiền" name="depositSound" :rules="[
                        { required: true, message: 'Vui lòng chọn thông báo nạp tiền' }
                    ]">
                        <a-radio-group v-model:value="formState.depositSound">
                            <a-radio :value="0">Tắt</a-radio>
                            <a-radio :value="1">Bật</a-radio>
                            <a-radio :value="2">Giọng nói</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item v-if="user && user.permissions.settingNoti.includes('edit')">
                        <a-button type="primary" html-type="submit">Lưu</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>