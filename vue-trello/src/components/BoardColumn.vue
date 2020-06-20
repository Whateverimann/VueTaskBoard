<template>
  <div
    class="column"
    draggable
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="column_name">{{ column.name }}</div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />
      <input
        type="text"
        placeholder="+ Enter new task"
        class="input_add_element"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from '../components/ColumnTask'

export default {
  components: { ColumnTask },
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },

  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    // goToTask(task) {
    //   this.$router.push({ name: 'task', params: { id: task.id } })
    // },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    // pickupTask(e, taskIndex, fromColumnIndex) {
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'

    //   e.dataTransfer.setData('from-task-index', taskIndex)
    //   e.dataTransfer.setData('from-column-index', fromColumnIndex)
    //   e.dataTransfer.setData('type', 'task')
    // },
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

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  background-color: #f0eceb;
  margin: 10px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
  height: 100%;
  min-width: 440px;
}
.column_name {
  display: flex;
  justify-items: center;
  margin-bottom: 2px;
  font-weight: bold;
  padding: 5px;
}
</style>