import axios from 'axios'
export const state = () => ({
   fillable:'',
   selectContractDialog:false,
   selectedContract:{id:"",title:""}
})

export const mutations = {
   setFillable(state,payload){
       state.fillable=payload
   },
   setSelectContractDialog(state,payload){
      state.selectContractDialog=payload
   },
   unsetSelectContractDialog(state){
      state.selectContractDialog=false
   },
   setSelectedContract(state,payload){
      state.selectedContract=payload
      state.selectContractDialog=true
   }
}

export const actions={
   seeContractDetail(context) {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$auth.$state.user.data.token
        }
      };
      axios
        .get(
          this.$axios.defaults.baseURL +
            "/user/get-single-contract/" +
            context.state.selectedContract._id,
          config
        )
        .then(res => {
           context.commit('setSelectedContract',res.data)
        })
        .catch(err => console.log(err.response));
    },
}