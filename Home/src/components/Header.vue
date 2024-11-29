<script setup>
import { ref } from 'vue';
import axios from '@/common/axios';
import GoogleTranslateSelect from '@google-translate-select/vue3';
import Logo from '@/assets/images/logo.png';
import { setStorage, getStorage } from '@/common';
const handleGoogleTranslateSelect = (language) => {
    console.log(language)
}
const logoFile = ref(window.localStorage.getItem('logo'));
const staticUrl = import.meta.env.VITE_API_URL;

const getStaticFile = (url) => {
    if (!url) return '';

    const urlRe = url.replace('public', '');
    console.log(urlRe);

    return staticUrl + urlRe;
}
if(!logoFile.value) {
    axios.get('/logo').then(res => {
        logoFile.value = getStaticFile(res.url);
        window.localStorage.setItem('logo', logoFile.value);
    });
}


</script>

<template>
    <a-row gutter="10" style="display: flex; justify-content: space-between; margin: 0 10px;">
        <a-col :span="12">
            <img :src="logoFile" alt="" style="width: 50%; height: auto;">

        </a-col>
        <a-col :span="12"
            style="display: flex; align-self: center;color: #fff; text-align: right; justify-content: end;">
            <GoogleTranslateSelect default-language-code="vi" default-page-language-code="vi"
                :fetch-browser-language="false" trigger="click" @select="handleGoogleTranslateSelect" />
        </a-col>
    </a-row>

</template>