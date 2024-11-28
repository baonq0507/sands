<!-- // đổi mật khẩu -->
<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { listGame } from '../common/constants';
import { useRouter } from 'vue-router';
import { layer } from "@layui/layer-vue";

const router = useRouter();
const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const onFinish = (values) => {
    axios.put('/me/change-password', values).then((res) => {

        layer.msg('Đổi mật khẩu thành công', { icon: 1, time: 2000 });
    }).catch((err) => {
        layer.msg(err.response.data.message, { icon: 2, time: 2000 });
    });
};

onMounted(() => {

});

</script>
<template>
    <a-layout>
        <Header :selectedKeys="['3']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Đổi mật khẩu</h3>
                <a-form :model="form" @finish="onFinish" layout="vertical">
                    <a-form-item label="Mật khẩu cũ" name="oldPassword" :rules="[
                        { required: true, message: 'Vui lòng nhập mật khẩu cũ' }
                    ]">
                        <a-input-password v-model:value="form.oldPassword" />
                    </a-form-item>
                    <a-form-item label="Mật khẩu mới" name="newPassword" :rules="[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới' }
                    ]">
                        <a-input-password v-model:value="form.newPassword" />
                    </a-form-item>
                    <a-form-item label="Nhập lại mật khẩu mới" name="confirmPassword" :rules="[
                        { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== form.newPassword) {
                                    callback('Mật khẩu không khớp');
                                }
                                callback();
                            }
                        }
                    ]">
                        <a-input-password v-model:value="form.confirmPassword" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">Đổi mật khẩu</a-button>
                    </a-form-item>
                </a-form>
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