<template>
  <div
    class="menu_card shadow-lg rounded-lg cursor-pointer h-full"
    @click="onEmitSelectItem()"
  >
    <img class="menu_card-img rounded-lg full-width" :src="image" alt="menu" />
    <h6 class="text-center h6--xsmall">
      {{ name }}
    </h6>
    <div class="menu_card-price flex justify-center">
      <p
        v-if="discountPrice"
        class="h7--xxsmall line-through mr-1 text-gray-500"
      >
        ${{ this.decimal(discountPrice) }}
      </p>
      <p class="h7--xxsmall text-yellow-500">${{ this.decimal(price) }}</p>
    </div>
  </div>
</template>

<script>
import pipe from "@/mixins/pipe";
export default {
  mixins: [pipe],
  props: {
    id: String,
    name: String,
    price: Number,
    discountPrice: Number,
    image: String,
  },

  methods: {
    onEmitSelectItem() {
      this.$emit("on:selectItem");
    },
  },
};
</script>

<style>
.menu_card {
  width: 100%;
}

.menu_card-img {
  max-height: 300px;
}
</style>
