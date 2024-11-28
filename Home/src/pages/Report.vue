<script setup>
import { getStorage } from '@/common'
import { onMounted, watch, computed } from 'vue'
import { formatCurrency, openLink } from '../common';
import iconDeposit from '@/assets/images/icons/profile/deposit.svg'
import { CaretRightOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import axios from '@/common/axios.js';
import { useRouter } from 'vue-router';
import { layer } from '@layui/layer-vue';
import { useStore } from 'vuex';
import { socket } from '@/socket';
import { getStaticFile } from '@/common'

const user = ref(getStorage('user'))
const router = useRouter();
const staticUrl = import.meta.env.VITE_APP_STATIC_URL ?? 'http://localhost:3000'
const formattedBalanceUser = ref(formatCurrency(user.value?.balance))
const formattedBetTodayUser = ref(formatCurrency(user.value?.betToday))
const formattedWinTodayUser = ref(formatCurrency(user.value?.balance))
const totalOnbet = ref({
    totalOnbet: 0,
    totalWin: 0
});
const store = useStore();

const cskh = computed(() => {
    return store.state.cskh;
});
onMounted(() => {
    socket.on(`update-balance-${user.value?._id}`, (data) => {
        formattedBalanceUser.value = formatCurrency(data.balance);
    })
    // console.log(user)
    axios.get('/me/profile').then((res) => {
        user.value = res.user;
        totalOnbet.value = res.totalOnbet || {
            totalOnbet: 0,
            totalWin: 0
        };
    }).catch((err) => {
        console.log(err);
        router.push('/login');
    });
})
watch(user, (newVal) => {
    formattedBalanceUser.value = formatCurrency(newVal.balance);
    // formattedBetTodayUser.value = formatCurrency(newVal.totalOnbet.totalOnbet);
})
watch(totalOnbet, (newVal) => {
    console.log(newVal);
    formattedBetTodayUser.value = formatCurrency(newVal.totalOnbet);
    formattedWinTodayUser.value = formatCurrency(newVal.totalWin);
})
const logout = () => {
    axios.post('/auth/logout').then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        layer.msg('Đăng xuất thành công', {
            icon: 1,
            time: 2000
        });
        router.push('/login');
    }).catch((err) => {
        console.log(err);
    });
}
</script>

<template>
    <div id="profile">
        <div class="info">
            <a-space align="center" style="display: flex; justify-content: space-around;">
                <HomeOutlined style="color: #fff; font-size: 25px; display: block;" @click="router.push('/')" />
                <a-avatar :size="64" :src="getStaticFile(user.avatar)" :alt="user.username" v-if="user"></a-avatar>
                <a-typography.Title style="color: #fff; font-size: 18px;" class="notranslate ">{{ user.username
                    }}</a-typography.Title>
            </a-space>
        </div>

        <div class="info_description">
            <a-row gutter="5" style="text-align: center; justify-content: center;">
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Số dư tài khoản
                        </a-typography.Title>
                        <a-typography.Title level="5" style="color: #fff; font-size: 16px;" class="notranslate ">
                            {{ formattedBalanceUser }}
                        </a-typography.Title>
                    </a-space>
                </a-col>
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Đặt cược hôm nay
                        </a-typography.Title>
                        <a-typography.Title level="5" style="color: #fff; font-size: 16px;">
                            {{ formattedBetTodayUser }}
                        </a-typography.Title>
                    </a-space>
                </a-col>
                <a-col :span="8">
                    <a-space direction="vertical">
                        <a-typography.Title level="5" style="color: #5d636e; display: block; height: 30px;">
                            Lãi và lỗ hôm nay
                        </a-typography.Title>
                        <a-typography.Title level="5" style="color: #fff; font-size: 16px;">
                            {{ formattedWinTodayUser }}
                        </a-typography.Title>
                    </a-space>
                </a-col>
            </a-row>
        </div>

        <div class="action_money">
            <a-space style="width: 100%; display: flex; justify-content: space-around;">
                <a-button type="primary" @click="openLink(cskh?.url)">
                    <a-space>
                        <img :src="iconDeposit" alt=""></img>
                        <span>Nạp tiền</span>
                    </a-space>
                </a-button>
                <a-button class="width_draw" @click="router.push('/withdraw')">
                    <a-space>
                        <img :src="iconDeposit" alt=""></img>
                        <span>Rút tiền</span>
                    </a-space>
                </a-button>
            </a-space>
        </div>

        <a-divider style="height: 1px; background-color: #ccc; margin: 0 10px"></a-divider>

        <a-row gutter="10">
            <a-col span="12">
                <a-card title="Thu nhập thanh toán">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
            <a-col span="12">
                <a-card title="Tiền cá cược">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
            <a-col span="12">
                <a-card title="Số tiền hoàn lại">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
            <a-col span="12">
                <a-card title="Tiền mặt cho sự kiện">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
            <a-col span="12">
                <a-card title="Nạp tiền và chuyển khoản">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
            <a-col span="12">
                <a-card title="Rút tiền và chuyển khoản">
                    <h2 style="text-align: center;">0.00</h2>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style>
.navigation {
    padding: 15px;
}

.action_money {
    padding: 10px;
    background-color: #0f1d30;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

#profile {
    background-color: #0C192C;
    min-height: 100vh;
}

.width_draw {
    width: 100%;
    background-image: linear-gradient(124deg, #efdaaf, #dbb579);
}

.info_description {
    padding: 10px;
    background-color: #0f1d30;
    min-height: 100px;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 0;
}

.info {
    padding-top: 20px;
    padding-left: 20px;
}
.ant-card {
    padding: 10px;
    background-color: #132235 !important;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #fff;
}

.ant-card-head {
    /* background-color: #0f1d30 !important; */
    border-radius: 15px;
    color: #fff !important;
}
</style>