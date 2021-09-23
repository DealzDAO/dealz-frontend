import axios from "axios";
export const state = () => ({
   dealzUser:null,
   dealzToken:null,
   email:''
});

export const mutations = {
  setEmail(state,payload){
     state.email=payload
  },
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
