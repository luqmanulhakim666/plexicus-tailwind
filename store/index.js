import { MENUS, TOPPINGS } from "@/data/menus";

export const state = () => ({
  menus: MENUS,
  toppings: TOPPINGS,
  cart: [],
});

export const mutations = {
  ADD_TO_CART(state, payload) {
    state.cart.push(payload);
  },
  RESET_ITEM(state) {
    state.cart = [];
  },

  REMOVE_ITEM(state, index) {
    state.cart.splice(index, 1);
  },
};

export const actions = {
  onADD_TO_CART({ commit }, payload) {
    commit("ADD_TO_CART", payload);
  },

  onREMOVE_ITEM({ commit }, index) {
    commit("REMOVE_ITEM", index);
  },

  onReset({ commit }) {
    commit("RESET_ITEM");
  },
};

export const getters = {
  menus(state) {
    return state.menus;
  },
  toppings(state) {
    return state.toppings;
  },
  cart(state) {
    return state.cart;
  },
};
