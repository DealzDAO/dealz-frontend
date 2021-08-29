import axios from "axios";
export const state = () => ({
        selectedContract:'',
        detail:'',
        selectedLawyer:'',
        lawyerDetail:''
  })
  
export const mutations = {
    selectContract(state,payload){
        state.selectedContract=payload
    },
    setContractDetail(state,payload){
        state.detail=payload
    },
    selectLawyer(state,payload){
        state.selectedLawyer=payload
    },
    setLawyerDetail(state,payload){
        state.lawyerDetail=payload
    }
  }
  export const actions= {
      getDetail(context){
        axios.get('https://dealzlegal.herokuapp.com/api/admin/single-contract/' + context.state.selectedContract._id,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
            }
        })
        .then(res => {
            context.commit('setContractDetail',res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err.response))
      },
      getLawyerDetail(context){
        axios.get('https://dealzlegal.herokuapp.com/api/admin/lawyer/' + context.state.selectedLawyer._id,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
            }
        })
        .then(res => {
            console.log('lawyer detail:',res.data)
            context.commit('setLawyerDetail',res.data)
        })
        .catch(err => console.log(err.response))
      }
  }