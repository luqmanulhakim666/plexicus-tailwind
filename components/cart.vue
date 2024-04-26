<template>
  <div class="cart p-4">
    <div>
      <h2 class="text-3xl mb-6">Cart</h2>
      <div class="pb-4">
        <template v-if="cartItems.length">
          <div class="cart-items overflow-auto">
            <div v-for="(item, index) in cartItems" :key="index" class="mb-4">
              <card-cart-menu
                :id="item.id"
                :name="item.name"
                :price="item.price"
                :discountPrice="item.discountPrice"
                :image="item.image"
                :toppings="item.toppings"
                @on:removeItem="onRemoveItem(index)"
              />
            </div>
          </div>
        </template>

        <div
          v-if="!cartItems.length"
          class="text-center flex items-center justify-center flex-col mt-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <h5 class="text-sm text-gray-300 mb-4">Your Cart Is Empty</h5>
          <img width="200" src="/images/sending.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 p-4 w-full">
      <button
        type="submit"
        :disabled="!cartItems.length"
        :class="{ 'opacity-50 cursor-not-allowed': !cartItems.length }"
        @click="onPlaceOrder()"
        class="block w-full py-3 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md transition-colors duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div class="flex justify-center" v-if="state.isLoading">
          <svg
            aria-hidden="true"
            class="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div v-if="!state.isLoading">
          Place Order (${{ this.decimal(grandTotal) }})
        </div>
      </button>
    </div>

    <dialog-alert v-if="state.showAlert" @on:close="onClose()" />
  </div>
</template>

<script>
import pipe from "@/mixins/pipe";
export default {
  mixins: [pipe],
  data: () => ({
    state: {
      isLoading: false,
      showAlert: false,
    },
  }),
  computed: {
    grandTotal() {
      const mapPrice = this.cartItems?.map((x) => {
        return x.discountPrice ? x.discountPrice : x.price;
      });

      const mapToppingsPrice = this.cartItems?.map((x) => {
        return x.toppings?.map((y) => {
          return y.price;
        });
      });

      const mergeToppingPrice = [].concat.apply([], mapToppingsPrice);

      const price = mapPrice?.reduce((prev, curr) => prev + curr, 0);
      const toppingPrice = mergeToppingPrice?.reduce(
        (prev, curr) => prev + curr,
        0
      );

      return price + toppingPrice;
    },

    cartItems() {
      return this.$store.getters["cart"];
    },
  },

  methods: {
    onRemoveItem(index) {
      this.$store.dispatch("onREMOVE_ITEM", index);
    },

    onPlaceOrder() {
      this.state.isLoading = true;
      setTimeout(() => {
        this.state.showAlert = true;
        this.state.isLoading = false;
        this.$store.dispatch("onReset");
      }, 500);
    },

    onClose() {
      this.state.showAlert = false;
    },
  },
};
</script>

<style scoped>
.cart {
  @media (min-width: 600px) {
    height: calc(100vh - 72px);
  }
  position: relative;
}

.cart-items {
  height: 80vh;
}
</style>
