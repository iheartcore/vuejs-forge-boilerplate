<script setup lang="ts">
import { ref } from "vue";
import { useBase64, useDropZone } from "@vueuse/core";

const file = ref();
const dropzoneEl = ref();
const { base64: url } = useBase64(file);
const { isOverDropZone } = useDropZone(dropzoneEl, (files) => {
  if (!files) return;
  file.value = files[0];
  console.log(file.value);
});

function onFileChange(e: any) {
  file.value = e.target.files[0];
}

function onReset() {
  file.value = null;
}
</script>

<template>
  <div>AppImageDropzone</div>

  {{ url }}

  <div
    ref="dropzoneEl"
    class="flex m-4"
    :class="{
      'border-3': isOverDropzone,
    }"
    style="width: 300px; height: 200px; background: #3332; position: relative"
  >
    <div class="m-auto opacity-50">Drop image here!</div>
    <img v-if="url" :src="url" />
    <input
      class="absolute z-1 left-0 top-0 bottom-0 right-0"
      type="file"
      accept="image/*"
      @change="onFileChange"
    />
  </div>
  <button @click="onReset">Reset</button>
</template>
