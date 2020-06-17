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
            @click="goToTask(task)"
          >
            <span>{{ task.name }}</span>
            <p v-if="task.description" class="description">
              {{ task.description }}
            </p>
          </div>
          <input
            type="text"
            placeholder="+ Enter new task"
            class="input_task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    closeTask(task) {
      this.$router.push({ name: 'board' })
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    }
  }
}
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
  background-color: #f0eceb;
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
}
.column_name {
  display: flex;
  justify-items: center;
  margin-bottom: 2px;
  font-weight: bold;
  padding: 5px;
}
.task {
  display: flex;
  flex-direction: column;
  text-align: start;
  flex-wrap: wrap;
  margin: 5px 0;
  border-radius: 5px;
  background-color: #cccaca;
  padding: 10px;
  width: 400px;
  font-weight: bold;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
}
.description {
  font-size: 12px;
  font-weight: normal;
  margin: 5px 0;
}
.task-bg {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
}
.input_task {
  background-color: transparent;
  border: none;
  display: block;
  width: 100%;
  height: 40px;
  font-weight: inherit;
  font: inherit;
  font-size: 15px;
}
</style>
