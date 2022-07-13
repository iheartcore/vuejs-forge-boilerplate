<script setup lang="ts">
import { ref } from "vue";
import { useAlerts } from "@/stores/Alerts";
const alerts = useAlerts();

const boards = ref([
  {
    id: 1,
    title: "My First Board",
    order: [],
    image: {
      downloadUrl: "https://picsum.photos/480/270?board=1",
    },
  },
  {
    id: 2,
    title: "My Second Board",
    order: [],
    image: {
      downloadUrl: "https://picsum.photos/480/270?board=2",
    },
  },
  {
    id: 3,
    title: "My Third Board",
    order: [],
  },
]);

function createBoard() {
  alerts.success("Board created!");
}
</script>

<template>
  <AppPageHeader>Boards</AppPageHeader>
  <div class="flex">
    <BoardCard v-for="board in boards" :key="board.id" :board="board" />
    <button class="text-gray-500" @click="createBoard()">
      <span>New Board +</span>
    </button>
  </div>
</template>

<style scoped></style>
