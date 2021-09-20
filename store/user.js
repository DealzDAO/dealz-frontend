export const state = () => ({
   fillable:'',
   selectContractDialog:false
})

export const mutations = {
   setFillable(state,payload){
       state.fillable=payload
   },
   setSelectContractDialog(state){
      state.selectContractDialog=true
   },
   unsetSelectContractDialog(state){
      state.selectContractDialog=false
   }
   

}