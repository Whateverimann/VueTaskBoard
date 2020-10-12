<template>
  <button type="button" class="button" :class="typeClasses">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case "danger":
          return "bg-red";
        default:
          return "bg-teal";
      }
    }
  }
};
</script>

<style scoped>
.button {
  /* @apply inline-flex text-white font-bold rounded items-center; */
  display: inline;
  padding: 4px 2px;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  align-items: center;
}
</style>