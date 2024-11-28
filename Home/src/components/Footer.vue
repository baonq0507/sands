<script setup>
import { useRouter } from 'vue-router'
import iconHome from '@/assets/images/icons/home.png'
import iconLottery from '@/assets/images/icons/lottery.svg'
import iconHistoryBet from '@/assets/images/icons/historyBet.png'
import iconCSKH from '@/assets/images/icons/cskh.svg'
import iconProfile from '@/assets/images/icons/profile.png'
import { openLink } from '@/common'

const router = useRouter()
</script>

<template>

    <div class="footer">
        <a-space align="center" style="justify-content:space-around; display: flex; cursor: pointer;">
            <a-space direction="vertical" @click="router.push('/')">
                <img :src="iconHome" alt="" style="width: 20px;">
                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    Trang chủ
                </a-typography-text>
            </a-space>
            <a-space direction="vertical" @click="router.push('/profile/historybet')" style="cursor: pointer;">
                <img :src="iconHistoryBet" alt="" style="width: 20px;">
                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    Lịch sử cược
                </a-typography-text>
            </a-space>
            <a-space direction="vertical" @click="openLink()">
                <img :src="iconCSKH" alt="" style="max-width: 20px;">
                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    CSKH
                </a-typography-text>
            </a-space>
            <a-space direction="vertical" @click="router.push('/profile')" style="cursor: pointer;">
                <img :src="iconProfile" alt="" style="max-width: 20px;">
                <a-typography-text style="color: #fff; font-size: 14px; display: block;">
                    Tôi
                </a-typography-text>
            </a-space>
        </a-space>
    </div>
</template>

<style>
.footer {
    background-color: rgb(19, 34, 53);
    padding: 15px 25px;
    text-align: center;
    /* position: fixed; */
    bottom: 0;
    max-width: 576px;
    width: -webkit-fill-available;
    position: fixed;
}
</style>