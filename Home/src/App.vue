<script setup>
import axios from '@/common/axios';
import { useStore } from 'vuex';
import { LiveChatWidget, useWidgetState } from '@livechat/widget-vue';
import { computed, watch, ref } from 'vue';
import Footer from '@/components/Footer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();

const widgetState = useWidgetState()

watch(widgetState, (newVal) => {
  if (newVal.visibility === 'minimized') {
    store.commit('setStateOpenChat', 'hidden');
  }
})
const cskh = ref('');

axios.get('/cskh').then(res => {
  // store.commit('setCskh', res.url);
  cskh.value = res.url;
  console.log(cskh.value);
});



const staticUrl = import.meta.env.VITE_API_URL;

const getStaticFile = (url) => {
  if (!url) return '';

  const urlRe = url.replace('public', '');
  console.log(urlRe);

  return staticUrl + urlRe;
}

axios.get('/logo').then(res => {
  // thay đổi meta icon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = getStaticFile(res.url);
  console.log(link);

});
const stateOpenChat = computed(() => {
  return store.state.stateOpenChat;
});

const fullPath = computed(() => {
  return router.currentRoute.value.fullPath;
});
const isHideFooter = computed(() => {
  return fullPath.value === '/login' || fullPath.value === '/register' || fullPath.value.includes('game');
});
const style = computed(() => {
  return !isHideFooter.value ? {
    marginBottom: '70px'
  } : {};
});

</script>

<template>
  <router-view :style="style"/>
  <Footer v-if="!isHideFooter"></Footer>
  <LiveChatWidget :license="cskh" :visibility="stateOpenChat" v-if="cskh" />
</template>
