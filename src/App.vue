<script setup lang="ts">
import {ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue';
const modal = ref();

function showModal() {
  modal.value.showModal();
}
</script>

<template>
  <HelloWorld ref="modal" />
  <button @click="showModal">打开弹窗</button>
</template>
