<template>
  <div>
    <div class="container">
      <div class="row p-3">
        <div class="col">
          <ValidationObserver ref="form4">
            <p class="data-head">General contact information</p>
            <ValidationProvider
              name="description"
              rules="max10k"
              v-slot="{ errors }"
            >
              <b-form-textarea
                v-model="description"
                rows="3"
                size="sm"
                class="mb-3 radius10"
                placeholder="Description of the content"
              ></b-form-textarea>
              <span class="helper-text4 text-danger">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              name="useCase"
              rules="max10k"
              v-slot="{ errors }"
            >
              <b-form-textarea
                v-model="useCase"
                rows="3"
                size="sm"
                class="mb-3 radius10"
                placeholder="Use cases"
              ></b-form-textarea>
              <span class="helper-text4 text-danger">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider name="info" rules="max10k" v-slot="{ errors }">
              <b-form-textarea
                v-model="info"
                rows="3"
                size="sm"
                class="mb-3 radius10"
                placeholder="Additional info"
              ></b-form-textarea>
              <span class="helper-text4 text-danger">{{ errors[0] }}</span>
            </ValidationProvider>

            <p class="data-head">
              Send an estimated price range for the contract
            </p>
            <div class="row px-3">
              <div class="col-1 p-0">
                <p class="data3 visible2">Min price</p>
              </div>
              <div class="col-2">
                <ValidationProvider
                  name="minPrice"
                  rules="positive"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    v-model="minPrice"
                    placeholder="$"
                    class="text-box ml-n4"
                    style="border-radius:10px"
                  />
                  <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-1 p-0">
                <p class="data3 visible2">Max price</p>
              </div>
              <div class="col-2">
                <ValidationProvider
                  name="maxPrice"
                  rules="positive"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    v-model="maxPrice"
                    placeholder="$"
                    class="text-box ml-n4"
                    style="border-radius:10px"
                  />
                  <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <p class="helper-text4 visible2">
              <b-icon icon="info-circle"></b-icon>
              Best price will be decided by collective votes of lawyers and
              admin panel
            </p>
            <p class="visible2" style="font-size:12px">
              Once you continue, our admins and lawyers will be able to preview
              the contract.<br />
              To reply to their comments, simply find this contract in your
              dasboard.
            </p>
            <div class="row justify-content-between px-3">
              <b-button
                class="my-btn px-5 bg-primary-light"
                @click="create"
                :disabled="btnDisabled"
              >
                <p>{{ btnText }}</p>
              </b-button>
              <div>
                <b-button
                  class="btn-outlined"
                  :disabled="draftDisabled"
                  @click="saveForth"
                >
                  <p class="text-primary-light">{{ draftText }}</p>
                </b-button>
                <b-button class="my-btn bg-white">
                  <p class="text-danger-light">Continue</p>
                </b-button>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <!-- contract dialog -->
    <b-modal centered size="lg" v-model="contractFinishDialog" hide-footer>
      <div>
        <div class="bg-white viewBox">
          <div class="row justify-content-center">
            <div class="col-8">
              <p class="text-center h1">
                <b-icon icon="check" variant="success"></b-icon>
              </p>
              <p class="title-text2 text-center">
                Contract created successfully
              </p>
              <p class="helper-text3 text-center">
                Our Admins have received the contract. We will notify you as we
                review it. Thank you.
              </p>
              <p class="text-center">
                <b-button
                  class="my-btn bg-primary-light px-5"
                  @click="dashboard"
                >
                  <p>Go to Dashboard</p>
                </b-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- end contract dialog -->
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required"
});
extend("max10k", {
  validate: value => {
    return value.length <= 10000;
  },
  message: "Less than 10000 characters"
});
extend("positive", {
  validate: value => {
    return value > 0;
  },
  message: "Price is negative"
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    extend
  },
  data() {
    return {
      description: "",
      useCase: "",
      info: "",
      minPrice: "",
      maxPrice: "",
      contractDialog: false,
      btnText: "Finish Creating Contract",
      btnDisabled: false,
      draftText: "Save Draft",
      draftDisabled: false
    };
  },
  computed: {
    contractFinishDialog: {
      get() {
        return this.$store.state.lawyer.contractFinishDialog;
      },
      set(value) {
        this.$store.commit("lawyer/setContractFinishDialog", value);
      }
    }
  },

  methods: {
    create() {
      this.$refs.form4.validate().then(success => {
        if (!success) {
          return;
        }
        this.btnText = "Creating contract...";
        this.btnDisabled = true;
        this.$store.commit("lawyer/setFormDetails", {
          description: this.description,
          useCase: this.useCase,
          info: this.info,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        });
        this.$store.dispatch("lawyer/createContract");
      });
    },
    dashboard() {
      this.$store.commit("lawyer/resetStep");
      this.$store.commit("lawyer/resetForm");
      this.$router.push("/lawyer/dashboard");
    },
    saveForth() {
      this.draftText = "Saving...";
      this.draftDisabled = true;
      this.$store.commit("lawyer/setFormDetails", {
        description: this.description,
        useCase: this.useCase,
        info: this.info,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      });
      this.$store.dispatch("lawyer/saveForthDraft");
    }
  }
};
</script>

<style lang="scss">
.radius10 {
  border-radius: 10px;
}
</style>
