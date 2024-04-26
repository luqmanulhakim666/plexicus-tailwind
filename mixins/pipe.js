export default {
  methods: {
    decimal(val) {
      if (val) {
        return String(val)
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      return "0";
    },
  },
};
