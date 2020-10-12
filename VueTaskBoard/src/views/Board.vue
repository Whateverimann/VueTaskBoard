<template>
  <div class="board">
    <h1 class="title"><AppIcon icon="list-alt" /> Simple Task Board</h1>
    <div class="flex">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column">
        <input
          type="text"
          class="input_add_element add-column"
          placeholder="+ Add new column"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="closeTask"
      @keyup.enter="closeTask"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'

export default {
  components: { BoardColumn },
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
    closeTask(task) {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
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
  width: 440px;
  height: 40px;
  font-weight: inherit;
  font: inherit;
  font-size: 15px;
}
.delete_button {
  color: red;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  transition: all 0.3s;
}
.delete_button:focus {
  outline: none;
}
.delete_button:hover {
  transform: scale(1.1);
}
.delete_button svg {
  font-size: 18px;
  cursor: pointer;
}
.title {
  color: #f8e6d5;
}
.add-column {
  margin-top: 10px;
  font-weight: 500;
}
</style>
