<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import Header from '../components/Header.vue';
import { message } from 'ant-design-vue';
import axios from '@/common/axios'
import { socket } from '@/socket'
import { layer } from "@layui/layer-vue"
import { formatCurrency, openLink } from '@/common'

const formState = reactive({
    amount: 0,
});
const $swal = inject('$swal');

const onFinish = (values) => {
    loading.value = true;
    axios.post('/me/deposit', {
        amount: values.amount
    }).then(res => {
        $swal.fire({
            title: 'Thông báo',
            text: `Yêu cầu nạp tiền thành công. Vui lòng đợi duyệt lệnh`,
            icon: 'success',
            confirmButtonText: 'Đóng',
        });
        formState.amount = 0;
        openLink()
    }).catch(err => {
        console.log(err);
        message.error('Yêu cầu nạp tiền thất bại');
    })
};

const user = ref(null);
const loading = ref(false);
onMounted(() => {
    document.title = 'Nạp tiền';
    axios.get('/me/profile').then(res => {
        user.value = res.user;
        socket.on(`update-balance-${user.value._id}`, (data) => {
            console.log(data);
            $swal.fire({
                title: 'Thông báo',
                text: `${data.note}`,
                icon: 'success',
                confirmButtonText: 'Đóng',
            });
            loading.value = false;
        });
    }).catch(err => {
        console.log(err);
        // router.push('/login');
    });
});

const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error('Vui lòng nhập số tiền');
};
</script>

<template>
    <div class="home" id="main">
        <Header />
        <div class="content">
            <div class="container">
                <div class="title">
                    <h3 style="color: #fff; text-align: center;">Nạp tiền</h3>
                </div>
                <!-- card -->
                <a-alert style="margin-bottom: 20px;" message="Vui lòng liên hệ chăm sóc khách hàng để cung cấp số tài khoản nạp tiền" type="info" />
                <a-card style="margin-bottom: 20px;">
                    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish"
                        @finishFailed="onFinishFailed" style="width: 100%; text-align: center;">
                        <a-form-item name="amount" label="Số tiền" style="color: #fff;"
                            :rules="[{ required: true, message: 'Vui lòng nhập số tiền' }]">
                            <a-input-number v-model:value="formState.amount" style="width: 100%;" />
                        </a-form-item>
                        <a-form-item>
                            <a-button :loading="loading" type="primary" html-type="submit">Nạp tiền</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>

                <!-- <a-alert message="Vui lòng liên hệ chăm sóc khách hàng để cung cấp số tài khoản nạp tiền" type="info" /> -->

                <a-alert type="warning">
                    <template #message>
                        <div style="font-size: 14px; text-align: center;">
                            Vui lòng liên hệ chăm sóc khách hàng để cung cấp số tài khoản nạp tiền
                        </div>
                        <div>
                            <ul>
                                <li>Sau đó CSKH sẽ thông báo số tiền đã quy đổi để bạn nhập Số Tiền mà CSKH đã thông báo vào khung trên để bạn tạo lệnh nạp</li>
                                <li>Sau khi hoàn tất bạn báo lại với CSKH, họ sẽ duyệt đơn để tiền được cộng vào TK của bạn</li>
                                <li>
                                    CHÚ Ý: ĐƠN VỊ TÍNH THEO USD, TỶ GIÁ NHẬN THEO TỶ GIÁ USD HÀNG NGÀY
                                </li>
                            </ul>
                        </div>
                    </template>
                </a-alert>
            </div>
        </div>
    </div>
</template>

<style>
.content {
    margin: 20px;
}
.home {
    background-color: #0C192C;
    min-height: 100vh;
}
.main {
    padding: 10px;
    margin-top: 15px;
}
.ant-card {
    background-color: #182840;
}
.ant-form-item {
    color: #fff;
}
label {
    color: #fff !important;
}
</style>

