<template>
  <div class="board">
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

/* .task {
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
} */
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
