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
    maxPrice:''
  })
  
  export const mutations = {
    setFirstStepData(state,payload){
        state.title=payload.title,
        state.detail=payload.detail
        console.log('yes:',state.title)
    },
    setUseCase(state,payload){
        state.useCase=payload
    },
    setInfo(state,payload){
        state.info=payload
    },
    setMinPrice(state,payload){
        state.minPrice=payload
    },
    setMaxPrice(state,payload){
        state.maxPrice=payload
    },
    setDetail(state,payload){
        state.detail=payload
    },
    resetForm(state){
        state.step=1
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
            contract_details: context.state.detail,
            min_price:context.state.minPrice,
            maxPrice:context.state.maxPrice,
            questions:['question1','question2']
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
            }
        }
        // axios.post('https://dealzlegal.herokuapp.com/api/contracts/upload',params,config)
        // .then(res=>{
        //     console.log(res.data)
        //     this.$router.push('lawyer/contracts')
        // }).catch(err=>console.log(err.response))
        console.log(params)
    }

  }