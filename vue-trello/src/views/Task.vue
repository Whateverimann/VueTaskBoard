<template>
  <div class="task-view">
    <div class="task_modal">
      <input
        type="text"
        :value="task.name"
        class="task_name"
        @change="updateTaskProperty($event, 'name')"
      />
      <textarea
        placeholder="Add task description"
        class="description textarea"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        @keyup.enter="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  }
}
</script>

<style>
.task-view {
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: left;
  background-color: #f0e4dd;
  border-radius: 10px;
}
.task_modal {
  width: 700px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  font-weight: bold;
}
.task_name {
  background-color: transparent;
  border: none;
  font: inherit;
  color: inherit;
  padding: 10px;
}
.textarea {
  background-color: transparent;
  border-radius: 10px;
  border: none;
  margin: 10px;
  font: inherit;
  font-size: 14px;
  padding: 10px;
}
</style>
