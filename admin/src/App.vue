<script setup>
import { ref, onMounted } from 'vue';
import { socket } from '@/socket.js';
import canhbaomp3 from '@/assets/sounds/canhbao.mp3';
import { layer } from '@layui/layer-vue';
const voices = ref([]);

onMounted(() => {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
  console.log('Hello World!');
  socket.on('depositVoice', (data) => {
    console.log(data);
    speak(data.message);
    layer.msg('Có khách hàng muốn nạp tiền, vui lòng kiểm tra!', {
      icon: 1,
      time: 1000,
    });
  });

  socket.on('withdrawVoice', (data) => {
    console.log(data);
    speak(data.message);
    layer.msg('Có khách hàng muốn rút tiền, vui lòng kiểm tra!', {
      icon: 1,
      time: 1000,
    });
  });

  socket.on('deposit', (data) => {
    console.log(data);
    turnOnSound()
    layer.msg('Có khách hàng muốn nạp tiền, vui lòng kiểm tra!', {
      icon: 1,
      time: 1000,
    });
  });

  socket.on('withdraw', (data) => {
    console.log(data);
    turnOnSound()
    layer.msg('Có khách hàng muốn rút tiền, vui lòng kiểm tra!', {
      icon: 1,
      time: 1000,
    });
  });
});
const turnOnSound = () => {
  const canhbao = new Audio(canhbaomp3);
  canhbao.volume = 1;
  canhbao.play();
}

const speak = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = 'vi-VN';
  speech.volume = 1; // Set volume (0 to 1)
  speech.rate = 1; // Set rate (0.1 to 10)
  speech.pitch = 1; // Set pitch (0 to 2
  // window.speechSynthesis.speak(speech);
  // Lấy danh sách các giọng nói có sẵn
  // const voices = window.speechSynthesis.getVoices();
  const vietnameseVoice = voices.value.find(voice => voice.lang === 'vi-VN');

  // Kiểm tra và thiết lập giọng nói tiếng Việt
  if (vietnameseVoice) {
    speech.voice = vietnameseVoice;
  } else {
    console.warn('Giọng nói tiếng Việt không được hỗ trợ trên trình duyệt này.');
  }
  window.speechSynthesis.speak(speech);

  // const url = 'https://api.fpt.ai/hmi/tts/v5';
  // const token = import.meta.env.VITE_API_KEY_SOUND;
  // // endcode text
  // const payload = 'Có khách hàng muốn nạp tiền, vui lòng kiểm tra!';
  // axios.post(url, payload, {
  //   headers: {
  //     'api-key': token,
  //     'voice': 'banmai',
  //     'speed': '',
  //     'Content-Type': 'text/plain; charset=utf-8'
  //   }
  // }).then(res => {
  //   console.log(res.data);
  //   const url = URL.createObjectURL(res.data);
  //   const audio = new Audio(url);
  //   audio.volume = 1;
  //   audio.play();
  // });
};
const loadVoices = () => {
  voices.value = window.speechSynthesis.getVoices();
  console.log(voices);
};
</script>

<template>
  <router-view />
</template>
