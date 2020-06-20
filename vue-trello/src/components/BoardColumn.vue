<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }">
      <div class="column">
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
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
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
