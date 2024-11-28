<script setup>
import { ref, defineProps, onMounted } from 'vue';
// const selectedKeys = ref(['2']);
import axios from '@/common/axios.js';
import { getStorage } from '../../common';
const props = defineProps(['selectedKeys'])
const user = ref(getStorage('profile'));

onMounted(() => {
    axios.get('/me/profile').then(res => {
        console.log(res);
        user.value = res.user;
        console.log(user.value.permissions.user.length);
    });
});



</script>
<template>
    <a-layout-header>
        <div class="logo" />
        <a-menu v-if="user" v-model:selectedKeys="props.selectedKeys" theme="dark" mode="horizontal"
            :style="{ lineHeight: '64px' }">
            <a-menu-item key="1" v-if="user && user.permissions?.user?.includes('view')">
                <router-link to="/">Người dùng</router-link>
            </a-menu-item>
            <a-menu-item key="2" v-if="user && user?.permissions.game?.includes('view')">
                <router-link to="/game">Game</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link to="/profile">Đổi mật khẩu</router-link>
            </a-menu-item>
            <a-menu-item key="4" v-if="user && user.permissions?.setting?.includes('view')">
                <router-link to="/setting">Cài đặt người dùng</router-link>
            </a-menu-item>
            <a-menu-item key="5" v-if="user && user.permissions?.requestMoney?.includes('view')">
                <router-link to="/request-money">Quản lý nạp rút</router-link>
            </a-menu-item>
            <a-menu-item key="6" v-if="user && user.permissions?.cskh?.includes('view')">
                <router-link to="/cskh">Chăm sóc khách hàng</router-link>
            </a-menu-item>
            <a-menu-item key="7" v-if="user && user.permissions?.userBalance?.includes('edit')">
                <router-link to="/user-balance">Cộng trừ tiền</router-link>
            </a-menu-item>
            <a-menu-item key="8" v-if="user && user.permissions?.inviteCode?.includes('view')">
                <router-link to="/invite-code">Mã mời</router-link>
            </a-menu-item>
            <a-menu-item key="9" v-if="user && user.permissions?.settingNoti?.includes('view')">
                <router-link to="/setting-noti">Cài đặt thông báo</router-link>
            </a-menu-item>
            <a-menu-item key="10" v-if="user && user.permissions?.game?.includes('view')">
                <router-link to="/history-bet">Lịch sử đặt cược</router-link>
            </a-menu-item>
            <a-menu-item key="11">
                <router-link to="/banner">Banner</router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>