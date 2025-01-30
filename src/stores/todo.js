import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://679aef0a747b09cdcccffd23.mockapi.io";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ["Pending", "Doing", "Done"],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`);
        this.list = response.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`);
        this.selectedTodo = response.data;
      } catch {
        console.log("error", error);
      }
    },
    async addTodo(todoText) {
      //ชื่อของ Todo สร้าง body data มาก่อน
      const bodyData = {
        name: todoText,
        status: "Pending",
      };
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData);
        this.list.push(response.data);
        console.log(response.data);

        console.log("add todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },
    async editTodo(todoData, id) {
      /*
      {
        name: 'test',
        status: 'Doing'     
        }
      */
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData);
        console.log("edit todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`);
        console.log("delete todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
