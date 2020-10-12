<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
    >
      <div class="task" @click="goToTask(task)">
        <span>
          {{ task.name }}
          <button
            @click.stop="deleteTask(columnIndex, taskIndex)"
            class="delete_button"
          >
            <AppIcon icon="times" />
          </button>
        </span>

        <p v-if="task.description" class="description">
          {{ task.description }}
        </p>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin'
import AppDrag from '../components/AppDrag'
import AppDrop from '../components/AppDrop'

export default {
  components: { AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    deleteTask(fromColumnIndex, taskIndex) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('DELETE_TASK', {
        fromTasks,
        taskIndex
      })
    }
  }
}
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
  margin: 5px 0;
  border-radius: 10px;
  background-color: #f8e6d7;
  padding: 10px;
  font-weight: bold;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
}
.task span {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.description {
  font-size: 12px;
  font-weight: normal;
  margin: 5px 0;
}
</style>
