import axios from "axios";
export const state = () => ({
  contracts: [],
  selectedContract: "",
  detail: "",
  comments:[],

  lawyers:[],
  selectedLawyer: "",
  lawyerDetail: ""
});

export const mutations = {
  setContracts(state, payload) {
    state.contracts = payload;
  },
  insertIntoContract(state,payload){
     state.contracts.push(payload)
  },
  selectContract(state, payload) {
    state.selectedContract = payload;
  },
  setContractDetail(state, payload) {
    state.detail = payload;
  },
  updateComment(state, payload) {
    state.comments.push(payload);
  },
  setComment(state, payload) {
    state.comments=payload;
  },
  updateContractStatus(state) {
    state.selectedContract.status = "Available";
  },
  contractRejected(state){
    state.selectedContract.status = "Rejected";

  },
  setLawyers(state,payload){
    state.lawyers=payload
  },
  selectLawyer(state, payload) {
    state.selectedLawyer = payload;
  },
  setLawyerDetail(state, payload) {
    state.lawyerDetail = payload;
  },
};
export const actions = {
  getDetail(context) {
    axios
      .get(
        "https://dealzlegal.herokuapp.com/api/admin/single-contract/" +
        context.state.selectedContract._id, {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        }
      )
      .then(res => {
        console.log(res.data)
        context.commit("setContractDetail", res.data);
      })
      .catch(err => console.log(err.response));

      axios
          .get(
            "https://dealzlegal.herokuapp.com/api/contracts/get-comment/" +
            context.state.selectedContract._id, {
              headers: {
                Authorization: this.$auth.strategy.token.get()
              }
            }
          )
          .then(response => {
            context.commit("setComment", response.data);
          })
          .catch(err => console.log(err.response));
  },
  getLawyerDetail(context) {
    axios
      .get(
        "https://dealzlegal.herokuapp.com/api/admin/single-lawyer/" +
        context.state.selectedLawyer._id, {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        }
      )
      .then(res => {
        context.commit("setLawyerDetail", res.data[0]);
      })
      .catch(err => console.log(err.response));
  }
};
