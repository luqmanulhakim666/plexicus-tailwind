<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-4">
      <div class="flex justify-between p-4">
        <p>Toppings</p>

        <button small icon @click="onEmitClose()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <div class="p-4 border-t border-gray-300">
        <div class="md:grid grid-cols-3 gap-4">
          <div
            cols="12"
            sm="4"
            v-for="(topping, index) in toppings"
            :key="index"
          >
            <div class="flex items-center mb-4">
              <input
                v-model="selectedToppings"
                type="checkbox"
                :id="topping.id"
                :value="topping"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                :for="topping.id"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ topping.name }}</label
              >
              <label
                :for="topping.id"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >(${{ topping.price }})</label
              >
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            depressed
            class="mt-2 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="onEmitAddToCart()"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },

  data: () => ({
    selectedToppings: [],
  }),

  computed: {
    toppings() {
      return this.$store.getters["toppings"];
    },
  },

  methods: {
    onEmitAddToCart() {
      this.$emit("add:toCart", this.selectedToppings);
    },

    onEmitClose() {
      this.$emit("on:close");
    },
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.selectedToppings = [];
      }
    },
  },
};
</script>
