<script setup>
import { useTodoStore } from "../stores/todo";
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

const todoStore = useTodoStore();
const todoId = ref(-1);
const isLoaded = ref(false);
const route = useRoute();

onMounted(async () => {
  await todoStore.loadTodo(route.params.id);
  isLoaded.value = true;
  todoId.value = parseInt(route.params.id);
});

const editTodo = async (selectedTodo) => {
  try {
    const bodyData = {
      name: selectedTodo.name,
      status: selectedTodo.status,
    };
    await todoStore.editTodo(bodyData, todoId.value);
    alert("Edit Complete !");
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div>
    Edit
    <RouterLink :to="{ name: 'todo-list' }">
      <button>Back</button>
    </RouterLink>
    <div v-if="isLoaded">
      id {{ todoId }}
      <div>
        Name: <input type="text" v-model="todoStore.selectedTodo.name" />
      </div>
      <div>
        Status:
        <select v-model="todoStore.selectedTodo.status">
          <option>Select status</option>
          <option v-for="status in todoStore.statuses" :value="status">
            {{ status }}
          </option>
        </select>
        <div>
          <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
        </div>
      </div>
    </div>
    <div v-else><h2>Loading...</h2></div>
  </div>
</template>
