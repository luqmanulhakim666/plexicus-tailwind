<template>
  <div class="menu_page">
    <div class="flex flex-wrap">
      <div class="w-full md:w-9/12 overflow-y-auto">
        <div class="px-6 py-6 md:flex md:flex-wrap">
          <div
            v-for="(menu, index) in menus"
            :key="index"
            class="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4"
          >
            <card-menu
              :id="menu.id"
              :name="menu.name"
              :price="menu.price"
              :discountPrice="menu.discountPrice"
              :image="menu.image"
              @on:selectItem="onSelectItem(menu)"
            />
          </div>
        </div>
      </div>
      <div class="w-full md:w-3/12 pl-0">
        <cart class="bg-gray-100 h-full" />
      </div>
    </div>

    <dialog-toppings
      v-if="state.dialogToppings"
      @add:toCart="onAddToCart"
      @on:close="handleDialogToppings"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    state: {
      dialogToppings: false,
      selectedItem: {},
    },
  }),

  computed: {
    menus() {
      return this.$store.getters["menus"];
    },
  },

  methods: {
    onAddToCart(selectedToppings) {
      const payload = {
        ...this.state.selectedItem,
        toppings: selectedToppings,
      };

      this.$store.dispatch("onADD_TO_CART", payload);
      this.state.dialogToppings = false;
    },
    onSelectItem(val) {
      this.state.selectedItem = val;
      this.state.dialogToppings = true;
    },
    handleDialogToppings() {
      this.state.dialogToppings = !this.state.dialogToppings;
      this.state.selectedItem = {};
    },
  },
};
</script>

<style lang="postcss" scoped>
.menu_page-left {
  overflow-y: auto;
  height: 100vh;
}

@media (max-width: 900px) {
  .menu_page-left {
    height: auto;
  }
}
</style>
