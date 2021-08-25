import axios from "axios";
export const state = () => ({
    earnDealz:false,
    buyDealz:false,
    step:1,
    //creating contract
    title:'',
    detail:'',
    questions:[],
    description:'',
    useCase:'',
    info:'',
    minPrice:'',
    maxPrice:'',
    contractFinishDialog:false
  })
  
  export const mutations = {
    setFirstStepData(state,payload){
        state.title=payload.title,
        state.detail=payload.detail
    },
    setQuestions(state,payload){
        state.questions=payload
    },
    setFormDetails(state,payload){
        state.description=payload.description
        state.useCase=payload.useCase
        state.info=payload.info
        state.minPrice=payload.minPrice
        state.maxPrice=payload.maxPrice
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
    },
    setUploadedDoc(state,payload){
        state.detail=payload
    },
    setContractFinishDialog(state){
        state.contractFinishDialog=true
    },
    resetForm(state){
        // state.step=1
        state.title=''
        state.detail=''
        state.questions=[]
        state.description=''
        state.useCase=''
        state.info=''
        state.minPrice=''
        state.maxPrice=''
    },
    resetStep(state){
        state.step=1
        state.contractFinishDialog=false
    }
  }
  export const actions= {
    saveSecondDraft(context,payload){
        const params = {
            title: context.state.title,
            contract_details: context.state.detail,
            questions:payload
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
            }
        }
        axios.post('https://dealzlegal.herokuapp.com/api/contracts/saveasdraft',params,config).then(res => {
            this.$router.push('/lawyer/contracts/my-drafts')
        }).catch(err => console.log(err.response))
    },
    createContract(context){
        const params = {
            title: context.state.title,
            contract_details:context.state.detail,
            questions:context.state.questions,
            description:context.state.description,
            useCase:context.state.useCase,
            info:context.state.info,
            min_price:context.state.minPrice,
            max_price:context.state.maxPrice,
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
            }
        }
        axios.post('https://dealzlegal.herokuapp.com/api/contracts/upload',params,config)
        .then(res=>{
            context.commit('setContractFinishDialog')
            context.commit('resetForm')
        }).catch(err=>console.log(err.response))
    }

  }