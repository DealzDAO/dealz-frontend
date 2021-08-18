
export const state = () => ({
    earnDealz:false,
    buyDealz:false,
    step:1
  })
  
  export const mutations = {
    resetForm(state){
        state.step=1
        console.log('reset')
    },
    setEarnDealzDialog(state){
        state.earnDealz=true
    },
    unsetEarnDealzDialog(state,payload){
        state.earnDealz=payload
    },
    setBuyDealzDialog(state){
        state.buyDealz=true
    },
    unsetBuyDealzDialog(state,payload){
        state.buyDealz=payload
    },
    nextStep(state){
        state.step++
    }

  }