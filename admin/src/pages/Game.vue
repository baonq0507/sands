<script setup>
import { ref, onMounted, reactive } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import axios from '@/common/axios.js';
import { cloneDeep } from 'lodash-es';
import { formatDateTime } from '@/common';
import { listGame } from '../common/constants';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {

});

</script>
<template>
    <a-layout>
        <Header :selectedKeys="['2']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Danh sách game</h3>

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