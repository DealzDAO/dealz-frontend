
export const state = () => ({
    earnDealz:false,
    buyDealz:false,
  })
  
  export const mutations = {
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
    }

  }