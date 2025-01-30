<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useTodoStore } from "../stores/todo";

const todoStore = useTodoStore();
const todoText = ref("");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await todoStore.loadTodos();
  isLoading.value = false;
});

const addTodo = async (todoText) => {
  try {
    isLoading.value = true;
    await todoStore.addTodo(todoText);
    isLoading.value = false;
  } catch (error) {
    console.log("error", error);
  }
};

const editStatus = async (todoData, todoId) => {
  try {
    isLoading.value = true;
    const updateData = {
      name: todoData.name,
      status: todoData.status,
    };
    await todoStore.editTodo(updateData, todoId);
    isLoading.value = false;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    isLoading.value = true;
    await todoStore.removeTodo(todoId);
    await todoStore.loadTodos();
    isLoading.value = false;
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div>
    <div>
      <input type="text" v-model="todoText" />
      <button @click="addTodo(todoText)">Add</button>
    </div>
    <div v-if="isLoading">
      <h2>Loading</h2>
    </div>
    <ul>
      <li v-for="todo in todoStore.list">
        {{ todo.name }}
        <select v-model="todo.status" @change="editStatus(todo, todo.id)">
          <option>Select status</option>
          <option v-for="status in todoStore.statuses" :value="status">
            {{ status }}
          </option>
        </select>
        <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }">
          <button>Edit</button>
        </RouterLink>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
