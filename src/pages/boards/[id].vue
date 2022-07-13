<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { Board, Task } from "@/types";
import { useAlerts } from "@/stores/Alerts";
import { v4 as uuidv4 } from "uuid";
const alerts = useAlerts();
// Define Props
const props = defineProps<{
  id: string;
}>();
const { id: boardId } = toRefs(props);
const board = ref<Partial<Board>>({
  id: boardId.value,
  title: "My First Board",
  order: JSON.stringify([{ id: "1", title: "backlog", taskIds: ["1", "2"] }]),
});

const tasks = ref<Partial<Task>[]>([
  { id: "1", title: "Make toast" },
  { id: "2", title: "Clean room" },
  { id: "3", title: "Plan trip", dueAt: new Date("2022/8/12") },
]);
function addTask(task: Task) {
  return new Promise((resolve, reject) => {
    const taskWithId = {
      ...task,
      id: uuidv4(),
    };
    tasks.value.push(taskWithId);
    resolve(taskWithId);
  });
}

// Board CRUD
function updateBoard(b: Board) {
  board.value = b;
  alerts.success("Board updated!");
}
function deleteBoardIfConfirmed() {
  const yes = confirm("Are you sure you want to delete this board?");
  if (yes) {
    alerts.success(`Board successfully deleted`);
  }
}
</script>
<template>
  <div v-if="board">
    <div class="flex justify-between">
      <AppPageHeader>
        <input
          @keydown.enter="($event.target as HTMLInputElement).blur()"
          @blur="updateBoardTitle(($event.target as HTMLInputElement).value)"
          type="text"
          :value="board.title"
        />
      </AppPageHeader>
      <BoardMenu
        :board="board"
        @deleteBoard="deleteBoardIfConfirmed"
        @imageUpload="refetchBoard()"
      />
    </div>

    <BoardDragAndDrop
      :board="board"
      :tasks="tasks"
      @update="updateBoard"
      :addTask="addTask"
    />
  </div>
  <AppLoader v-if="loadingBoard" :overlay="true" />
  <RouterView />
</template>
