<script setup lang="ts">
import { Fade as KFade } from "@progress/kendo-vue-animation";
import { useAlerts } from "@/stores/Alerts";
import { storeToRefs } from "pinia";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";

const { store } = useAlerts();

const { items } = storeToRefs(store);
</script>

<template>
  <div class="z-10">
    <NotificationGroup
      :style="{
        right: 0,
        bottom: '10px',
        alignItems: 'flex-start',
        flexWrap: 'wrap-reverse',
      }"
    >
      <KFade v-for="alert in items" :key="alert.id" :appear="true">
        <Notification
          :type="{
            style: alert.style,
            icon: true,
          }"
          :closable="alert.closable"
          @close="store.remove(alert.id)"
        >
          <div v-if="alert.html" v-html="alert.message"></div>
          <template v-else>{{ alert.message }}</template>
        </Notification>
      </KFade>
    </NotificationGroup>
  </div>
</template>
