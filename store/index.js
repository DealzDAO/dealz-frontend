
export const state = () => ({
  userType: null,
  contractDialog:false
})

export const mutations = {
  setContractDialog(state){
      state.contractDialog=true
  },
  unsetContractDialog(state){
      state.contractDialog=false
  },
  setUserType(state,payload){
    state.userType=payload
  },
  redirect(){
      if(browser.process){
        let user=localStorage.getItem('dealz-user-type')
        if(user=='User'){
          this.$router.push('/user')
        }
        else if(user=='Lawyer'){
          this.$router.push('/lawyer')
        }
        else if(user=='Admin'){
          this.$router.push('/admin')
        }
      }
  }

}