<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="column">
        <div class="column_name">
          {{ column.name }}
          <button @click="deleteColumn(columnIndex)" class="delete_button">
            <AppIcon icon="times" />
          </button>
        </div>
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
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from '../components/ColumnTask'
import AppDrag from '../components/AppDrag'
import AppDrop from '../components/AppDrop'
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin'

export default {
  components: { ColumnTask, AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    deleteColumn(columnIndex) {
      this.$store.commit('DELETE_COLUMN', {
        columnIndex
      })
    }
  }
}
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  margin: 10px;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
  height: 100%;
  min-width: 440px;
}
.column_name {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  font-weight: bold;
  padding: 5px;
  color: #f8a861;
  text-transform: uppercase;
}
</style>
