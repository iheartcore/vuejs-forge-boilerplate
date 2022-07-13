<script setup lang="ts">
import type { Board } from "@/types";
import { computed } from "vue";
import { useAlerts } from "@/stores/Alerts";
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  BOARDS_LIST_QUERY,
  BOARD_CREATE_MUTATION,
} from "@/graphql/queries/boards";
import { useRouter } from "vue-router";

const router = useRouter();
const alerts = useAlerts();

// const boards = ref([
//   {
//     id: 1,
//     title: "My First Board",
//     order: [],
//     image: {
//       downloadUrl: "https://picsum.photos/480/270?board=1",
//     },
//   },
//   {
//     id: 2,
//     title: "My Second Board",
//     order: [],
//     image: {
//       downloadUrl: "https://picsum.photos/480/270?board=2",
//     },
//   },
//   {
//     id: 3,
//     title: "My Third Board",
//     order: [],
//   },
// ]);

const loading = computed(() => loadingBoards.value || creatingBoard.value);

// Boards List
const {
  result,
  loading: loadingBoards,
  onError,
} = useQuery(BOARDS_LIST_QUERY, null, {
  fetchPolicy: "cache-and-network",
});
onError(() => alerts.error("Error loading boards"));
const boards = computed((): Board[] => result.value?.boardsList?.items || []);

// function createBoard() {
//   alerts.success("Board created!");
// }

// Board Create
const {
  mutate: createBoard,
  onDone: onBoardCreated,
  onError: onBoardError,
  loading: creatingBoard,
} = useMutation(BOARD_CREATE_MUTATION);

onBoardCreated((res) => {
  alerts.success("New board created!");
  router.push(`/boards/${res.data.boardCreate.id}?new=1`);
});
onBoardError(() => alerts.error("Error creating board"));

const newBoardTemplate = {
  title: "My New Board",
  order: JSON.stringify([
    {
      uid: "1",
      title: "Backlog",
      taskUids: [],
    },
  ]),
};
</script>

<template>
  <AppPageHeader>Boards</AppPageHeader>
  <div class="flex" v-if="boards">
    <BoardCard v-for="board in boards" :key="board.id" :board="board" />
    <button class="text-gray-500" @click="createBoard(newBoardTemplate)">
      <span>New Board +</span>
    </button>
  </div>
  <AppLoader v-if="loading" :overlay="true" />
</template>
