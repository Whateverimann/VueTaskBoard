<template>
  <div class="board">
    <div class="flex">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >
        <div class="column_name">{{ column.name }}</div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
          >
            <span>{{ task.name }}</span>
            <p v-if="task.description" class="description">{{ task.description }}</p>
          </div>
          <input
            type="text"
            placeholder="+ Enter new task"
            class="input_add_element"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
      <div class="column">
        <input
          type="text"
          class="input_add_element"
          placeholder="+ Add new column"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
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
  data() {
    return {
      newColumnName: ''
    }
  },
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
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask(e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      //  const columnIndex = e.dataTransfer.getData('column-index')
      this.$store.commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
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
  height: 100%;
  width: 500px;
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
.input_add_element {
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
