<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import slider1 from '@/assets/images/slider/1.jpg'
import slider2 from '@/assets/images/slider/2.jpg'
import slider3 from '@/assets/images/slider/3.jpg'
import slider4 from '@/assets/images/slider/4.jpg'
import iconDeposit from '@/assets/images/icons/deposit.png'
import iconWithdraw from '@/assets/images/icons/withdraw.png'
import iconAccount from '@/assets/images/icons/account.png'

import sliderFooter from '@/assets/images/slider/5.png'
import iconHome from '@/assets/images/icons/home.png'
import iconLottery from '@/assets/images/icons/lottery.svg'
import iconHistoryBet from '@/assets/images/icons/historyBet.png'
import iconCSKH from '@/assets/images/icons/cskh.svg'
import iconProfile from '@/assets/images/icons/profile.png'
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/common/axios'
import { layer } from "@layui/layer-vue"
import { useStore } from 'vuex'
import { NotificationOutlined } from '@ant-design/icons-vue'
import iconNoti from '@/assets/images/icons/noti.svg'

import { getStorage, formatCurrency, baotri, openLink, setStorage } from '@/common'
import { listGame, userList } from '../common/constants'
import Header from '../components/Header.vue'

import {socket} from '@/socket'


const store = useStore()
const user = ref(getStorage('user'));

const urlCskh = computed(() => {
    return store.state.cskh;
});

const router = useRouter();
const formattedBalanceUser = ref(formatCurrency(user?.value?.balance));
const staticUrl = import.meta.env.VITE_API_URL;

const getStaticFile = (url) => {

    const urlRe = url.replace('public', '');
    console.log(urlRe);

    return staticUrl + urlRe;
}
const userRan = ref(userList[Math.floor(Math.random() * userList.length)]);
const slider = ref(getStorage('banner'));

onMounted(() => {
    socket.on(`update-balance-${user.value._id}`, (data) => {
        formattedBalanceUser.value = formatCurrency(data.balance);
        layer.msg(`Bạn đã nạp tiền thành công. Số dư hiện tại: ${formattedBalanceUser.value}`, {
            icon: 1,
            time: 3000,
        });
    })

    axios.get('/me/profile').then(res => {
        user.value = res.user;
        formattedBalanceUser.value = formatCurrency(user.value.balance);

        if (!slider.value) {
            axios.get('/banner').then(res => {
                slider.value = res.docs.map(item => {
                    return {
                        image: getStaticFile(item.url)
                    }
                })
                setStorage('banner', JSON.stringify(slider.value));
            }).catch(err => { })
        }
    }).catch(err => {
        console.log(err);
    })




})
const getUserRandom = () => {
    userRan.value = userList[Math.floor(Math.random() * userList.length)];
}

//cứ sau 1p sẽ chạy hàm getUserRandom
setInterval(() => {
    getUserRandom();
}, 12800);



</script>

<template>
    <div class="home" id="main">
        <Header />

        <div class="slider">
            <carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
                <slide v-for="slide in slider" :key="slide">
                    <div class="carousel__item">
                        <img :src="slide.image" style="max-width: 100%;" />
                    </div>
                </slide>

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
        <div id="notification" style="margin: 10px 15px">
            <a-row>
                <a-col :span="1">
                    <img :src="iconNoti" alt="" srcset="">
                </a-col>
                <a-col :span="23">
                    <marquee behavior="" direction="" style="color: #fff;">
                        <a-typography-text style="color: #fff; font-size: 14px;">{{ userRan.username }}
                            {{ userRan.award }} vào tài khoản</a-typography-text>
                    </marquee>
                </a-col>
            </a-row>
        </div>
        <div class="main">
            <div class="navigation">
                <a-space align="start" style="justify-content: space-between;display: flex;">
                    <a-space direction="vertical">
                        <a-typography-text>
                            Chào mừng, <b class="notranslate ">{{ user.username }}</b>
                        </a-typography-text>
                        <a-typography-text>
                            Số dư, <span style="color: #fff; font-size: 20px;" class="notranslate ">{{
                                formattedBalanceUser }}</span>
                        </a-typography-text>
                    </a-space>
                    <a-space align="center" size="large">
                        <a-space align="center" direction="vertical" @click="router.push('/deposit')">
                            <img :src="iconDeposit" alt="" style="width: 30px">
                            <a-typography-text style="display: block; text-align: center; font-size: 10px;">
                                Nạp tiền
                            </a-typography-text>
                        </a-space>
                        <a-space align="center" direction="vertical" @click="router.push('/withdraw')">
                            <img :src="iconWithdraw" alt="" style="width: 30px">
                            <a-typography-text style="display: block; text-align: center; font-size: 10px;">
                                Rút tiền
                            </a-typography-text>
                        </a-space>
                        <a-space align="center" direction="vertical" @click="router.push('/profile')">
                            <img :src="iconAccount" alt="" style="width: 30px">
                            <a-typography-text style="display: block; text-align: center; font-size: 10px;">
                                Tài khoản
                            </a-typography-text>
                        </a-space>
                        <!-- <a-space align="center" direction="vertical">
                            <router-link to="/admin" v-if="user.role === 'admin'">Admin</router-link>
                        </a-space> -->

                    </a-space>
                </a-space>
            </div>
            <div class="list_game" style="margin-top: 10px;">
                <a-space :size="[0, 0]" style="width: 100%;" class="list_game_item" wrap>
                    <div class="bg_game" v-for="game in listGame" :key="game.code"
                        @click="router.push(`/game/${game.code}`)">
                        <a-typography-text style="color: #fff; font-size: 12px; display: block; height: 30px;">
                            {{ game.type }}
                        </a-typography-text>
                        <a-typography-text style="color: #fff; font-size: 10px; display: block; height: 30px;">
                            {{ game.name }}
                        </a-typography-text>
                        <img :src="game.image" alt="" style="width: 50px; height: 50px;">
                    </div>

                </a-space>
            </div>

            <div class="slider-footer">
                <img :src="sliderFooter" alt="" style="max-width: 100%; border-radius: 15px;">
            </div>
        </div>

    </div>
</template>

<style>


.home {
    background-color: #0C192C;
    min-height: 100vh;
}

.slider-footer {
    margin: 20px 0;
}

.main {
    padding: 10px;
    margin-top: 15px;
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

.carousel__item {
    /* min-height: 200px; */
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    color: #ffff
}

.carousel__pagination-button::after {
    background-color: white;
}

.carousel__viewport {
    max-height: 240px;
}
</style>