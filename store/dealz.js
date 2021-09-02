import axios from "axios";
export const state = () => ({
   dealzUser:null,
   dealzToken:null
});

export const mutations = {
  setDealzAuth(state,payload){
      state.dealzUser=payload
  },
  setToken(state,payload){
    state.dealzToken=payload
},
  resetUser(state){
    state.dealzUser=null
    state.dealzToken=null
}
  
};
export const actions = {
 
};
