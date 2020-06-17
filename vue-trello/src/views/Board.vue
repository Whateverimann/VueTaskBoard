<template>
  <div class="board">
    <div class="flex">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
      >
        <div class="column_name">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
          >
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["board"]),
};
</script>

<style>
.board {
  height: 100%;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.column {
  display: flex;
  flex-direction: column;
}
.column_name {
  display: flex;
  justify-items: center;
  margin-bottom: 2px;
  font-weight: bold;
}
</style>
