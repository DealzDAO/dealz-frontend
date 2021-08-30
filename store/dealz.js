import axios from "axios";
export const state = () => ({
   dealzUser:''
});

export const mutations = {
  setDealzAuth(state,payload){
      state.dealzUser=payload
  }
  
};
export const actions = {
 
};
