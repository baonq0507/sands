<script setup>
import { ref } from 'vue';
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
</script>

<template>
    <a-layout>
        <Header></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Session</h3>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>
</template>