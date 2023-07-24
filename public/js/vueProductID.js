const app = Vue.createApp({
  data() {
    return {
      manufacturers: [
        { name: "Danfoss" },
        { name: "Moog" },
        { name: "Bosch" },
        { name: "McGowan Controls" },
      ],
    };
  },
});

app.mount("#app");
