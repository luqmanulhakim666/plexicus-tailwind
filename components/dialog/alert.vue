<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-4 w-3/12">
      <div class="p-4">
        <lottie-success />
        <h6 class="h6--xsmall ml-2 text-center">Order Successfully Placed!</h6>
        <div class="mt-6">
          <button
            depressed
            class="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="onEmitClose()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onEmitClose() {
      this.$emit("on:close");
    },
  },
};
</script>
