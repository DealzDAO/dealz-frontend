<template>
  <div>
    <div class="container" v-if="contract != ''">
      <div class="row px-4 pt-3">
        <p class="subtitle-text2 link">
          <b-icon
            icon="arrow-left"
            class="link mr-lg-3"
            @click="goBack"
          ></b-icon>
          {{ contract.contract.title }}
        </p>
      </div>
      <div class="row px-5">
        <div class="col">
          <!-- status -->
          <div class="admin-chip bg-secondary-light">
            <p class="text-secondary">
              <b-icon icon="clock-history"></b-icon>
              {{ contract.contract.status }}
            </p>
          </div>
          <!-- end status -->

          <!-- status -->
          <div class="admin-chip bg-secondary-light">
            <p class="text-secondary">
              <b-icon icon="clock-history"></b-icon>
              {{ contract.userContract.status }}
            </p>
          </div>
          <!-- end status -->

          <!-- accepted -->
          <div class="chip bg-white">
            <span
              >Approved
              {{ moment.utc(contract.contract.createdAt).fromNow() }}</span
            >
          </div>
          <!-- end accepted -->

          <!-- contract -->
          <div class="contract-box mt-2">
            <div v-html="contract.contract.contract_details"></div>
          </div>
          <div class="mt-2">
            <b-button class="my-btn bg-primary-light px-3" @click="fillUp">
              <p>
                <b-icon icon="pencil"></b-icon>
                Fill Contract
              </p>
            </b-button>
            <b-button
              v-if="contract.userContract.status == 'Ready to send'"
              class="my-btn bg-primary-light px-3 float-right"
              @click="approvalDialog = true"
            >
              <p>
                <b-icon icon="pencil"></b-icon>
                Send for Approval
              </p>
            </b-button>
          </div>
          <!-- end contract -->
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <!-- approval dialog -->
    <b-modal v-model="approvalDialog" centered hide-footer>
      <div class="bg-white viewBox">
        <div class="row justify-content-center">
          <div class="col-10">
            <p class="text-center title-text2 mb-0">Send for approval</p>
            <p class="text-center helper-text3">
              Please enter the email address of the recipient.
            </p>
            <ValidationObserver ref="approveForm">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
                ref="email"
              >
                <b-form-input
                  placeholder="Email Address"
                  v-model="email"
                  type="email"
                  :state="errors.length > 0 ? false : null"
                  class="mt-md-4 mb-0 radius10"
                />
                <span class="helper-text3 text-danger">{{ errors[0] }}</span>
                <span class="helper-text3 text-danger">{{ emailError }}</span>
              </ValidationProvider>
            </ValidationObserver>
            <b-button
              class="my-btn bg-primary-light mb-10 mt-3"
              block
              @click="sendForApproval"
            >
              <p>{{ sendText }}</p>
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- end approval -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      contract: "",
      moment: moment,
      approvalDialog: false,
      email: "",
      sendText: "Send Contract",
      emailError: ""
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getContractDetails();
  },
  methods: {
    getContractDetails() {
      axios
        .get(this.$axios.defaults.baseURL + "/user/user-contract/" + this.id, {
          headers: {
            Authorization: "Bearer " + this.$auth.$state.user.data.token
          }
        })
        .then(res => {
          console.log("edit:", res.data);
          this.contract = res.data;
          this.$store.commit("user/setFillable", res.data);
        })
        .catch(err => console.log(err));
    },
    goBack() {
      this.$router.push("/user/negotiation/all-contracts");
    },
    fillUp() {
      this.$router.push({
        name: "user-negotiation-all-contracts-id-fill",
        params: {
          id: this.contract.userContract._id
        }
      });
    },
    sendForApproval() {
      const params = {
        id: this.contract.userContract._id,
        email: this.email
      };
      const config = {
        headers: {
          Authorization: "Bearer " + this.$auth.$state.user.data.token
        }
      };

      this.$refs.approveForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.sendText = "Sending...";
        axios
          .post(
            this.$axios.defaults.baseURL + "/user/send-for-approval/",
            params,
            config
          )
          .then(res => {
            if (res.data.Success == "True") {
              this.approvalDialog = false;
              this.sendText = "Contract sent";
              this.successToast("Contract sent for approval.");
              this.$router.push("/user/negotiation/all-contracts");
            } else {
              this.emailError = res.data.message;
              this.sendText = "Send Contract";
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
};
</script>
