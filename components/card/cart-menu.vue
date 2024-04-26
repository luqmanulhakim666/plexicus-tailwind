<template>
  <div class="menu_card white shadow-md p-2 flex rounded-lg">
    <div class="flex-none w-1/3 md:w-1/4">
      <img :src="image" alt="menu" class="menu_card-img rounded-lg" />
    </div>
    <div class="flex-grow ml-2 flex flex-col justify-between">
      <h6 class="text-xs text-gray-500">
        {{ name }}
      </h6>

      <template v-if="!toppings.length">
        <span class="text-xs">No Topping</span>
      </template>

      <template v-if="toppings.length">
        <div class="flex flex-wrap mb-4">
          <span
            v-for="(topping, index) in toppings"
            :key="index"
            class="text-xs"
          >
            {{ topping.name }}
            <span v-if="!isLastIndex(index)" class="mr-1">,</span>
          </span>
        </div>
      </template>

      <div class="flex items-center justify-between">
        <div class="flex">
          <p
            v-if="discountPrice"
            class="text-xs line-through text-gray-300 mr-1"
          >
            $ {{ decimal(discountPrice) }}
          </p>
          <p class="text-xs text-yellow-500">$ {{ decimal(price) }}</p>
        </div>
        <button
          @click="onEmitRemoveItem()"
          class="btn btn-icon btn-round btn-sm text-red-500"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
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
    toppings: Array,
  },

  methods: {
    isLastIndex(index) {
      return this.toppings?.length === index + 1;
    },

    onEmitSelectItem() {
      this.$emit("on:selectItem");
    },

    onEmitRemoveItem() {
      this.$emit("on:removeItem");
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
.menu_card {
  width: 100%;
  &-img {
    width: 100%;
    max-height: 80px;
  }
}
</style> -->
