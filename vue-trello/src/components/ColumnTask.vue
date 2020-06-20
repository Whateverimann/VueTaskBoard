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
        <span>{{ task.name }}</span>
        <p v-if="task.description" class="description">{{ task.description }}</p>
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
    }
    // pickupTask(e, taskIndex, fromColumnIndex) {
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'

    //   e.dataTransfer.setData('from-task-index', taskIndex)
    //   e.dataTransfer.setData('from-column-index', fromColumnIndex)
    //   e.dataTransfer.setData('type', 'task')
    // }
  }
}
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  text-align: start;
  flex-wrap: wrap;
  margin: 5px 0;
  border-radius: 5px;
  background-color: #cccaca;
  padding: 10px;
  font-weight: bold;
  box-shadow: 0px 0px 40px -33px rgba(0, 0, 0, 0.75);
}
.description {
  font-size: 12px;
  font-weight: normal;
  margin: 5px 0;
}
</style>
