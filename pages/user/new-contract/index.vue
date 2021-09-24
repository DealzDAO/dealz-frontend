<template>
  <div>
    <div class="container">
      <!-- search -->
      <div class="row py-3 px-4 line-border mild-back">
        <p class="subtitle-text mb-0">
          <a href="/user/dashboard">
            <b-icon icon="arrow-left" class="mr-2 icon-helper"></b-icon>
          </a>
          <span>New Contract</span>
        </p>
      </div>
      <div>
        <p class="subtitle-text4 mt-2">Search contract templates</p>
        <b-input-group class="p-0">
          <template #prepend>
            <b-input-group-text class="bg-white input-prepend p-0">
              <b-form-select
                v-model="bundle"
                :options="bundles"
                class="adjust-btn"
              ></b-form-select>
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="search"
            class="input-style"
            style="border-left:none;"
            :state="null"
            placeholder="Contract Templates"
          ></b-form-input>
        </b-input-group>

        <div v-if="searched == true">
          <p class="helper-text2 mt-3">Search Results</p>
          <div v-if="searching" class="mt-3">
            <b-spinner variant="primary mx-5"></b-spinner>
          </div>
          <ul v-if="results.length > 0">
            <li
              v-for="(item, i) in results"
              :key="i"
              class="mt-2"
              @click="selectContract(item)"
            >
              <a
                href="#"
                class=" list-group-item-action flex-column align-items-start"
              >
                <div class="d-flex w-100 justify-content-between">
                  <p class="mb-1 subtitle-text">{{ item.title }}</p>
                </div>
              </a>
            </li>
          </ul>
          <small
            v-if="results.length == 0 && noText != ''"
            class="text-muted ml-5"
            >{{ noText }}</small
          >
        </div>
      </div>

      <div
        class="row center-push justify-content-center"
        v-if="results.length > 0"
      >
        <b-pagination
          v-model="page"
          pills
          prev-text="Prev"
          next-text="Next"
          size="sm"
          @input="input"
          :total-rows="rows"
          hide-goto-end-buttons
          :per-page="limit"
        ></b-pagination>
      </div>
      <!-- end search section -->

      <!-- contract templates -->
      <div class="row px-3 mt-5">
        <p class="subtitle-text4 px-3 mb-1">New contract templates</p>
        <br />
      </div>
      <div class="row" v-if="newContract.length > 0">
        <div class="col-4" v-for="(item, i) in newContract" :key="i">
          <div
            v-if="i < 3"
            class="data-box my-2 link"
          >
            <p class="data2 text-left mb-0 clickable" @click="selectContract(item)">{{ item.title }}</p>
            <div v-if="item.bundles" class="admin-chip bg-light-light">
              <p class="helper-text">{{ item.bundles }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <!-- and contract templates -->

      <!-- contract bundles -->
      <div class="row px-3 mt-4">
        <p class="subtitle-text4 px-3 mb-1">New contract Bundles</p>
        <br />
        <div class="row">
          <div class="col-4" v-for="(item, i) in templates" :key="i">
            <div class="data-box my-2">
              <p class="menu-text text-left mb-0">{{ item.title }}</p>
              <div class="admin-chip bg-light-light">
                <p class="helper-text">{{ item.type }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end contract bundles -->

      <!-- recommended -->
      <div class="row px-3 mt-4">
        <div class="col">
          <p class="helper-text2 mt-3">Recommended for you</p>
          <p
            class="subtitle-text3 link"
            v-for="(item, i) in templates"
            :key="i"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
      <!-- end recommended -->
    </div>

    <!-- select contract dialog -->
    <DialogContractviewdialog />
    <!-- end select contract dialog -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout:'user',
  data() {
    return {
      search: "",
      searched: false,
      page: 1,
      limit: 5,
      results: [],
      rows: 0,
      searching: false,
      viewContractDialog: false,
      noText: "",
      bundle: null,
      bundles: [
        {
          value: null,
          text: "Select bundle",
          disabled: true
        },
        {
          value: "Startup",
          text: "Startup"
        },
        {
          value: "Designer",
          text: "Designer"
        },
        {
          value: "Founder",
          text: "Founder"
        },
        {
          value: "Art",
          text: "Art"
        },
        {
          value: "Music",
          text: "Music"
        }
      ],
      newContract: [],
      fullViewDialog: false,
      templates: [
        {
          title: "Brain Trust New Sound Exchange Procedures for LOD",
          type: "Startup"
        },
        {
          title: "Brain Trust New Sound Exchange Procedures for LOD",
          type: "Music"
        },
        {
          title: "Brain Trust New Sound Exchange Procedures for LOD",
          type: "Art"
        }
      ],
    };
  },
  watch: {
    search(newValue, oldValue) {
      this.results = [];
      this.noText = "";
      this.searched = true;
      this.searching = true;
      if (newValue.split(" ").length != oldValue.split(" ").length) {
        this.page = 1;
        this.searchContracts();
      } else {
        window.setTimeout(() => {
          this.page = 1;
          this.searchContracts();
        }, 2000);
      }
    }
  },
  mounted() {
    this.getNewContract();
  },
  methods: {
    searchContracts() {
      const params = {
        bundles: this.bundle,
        title: this.search
      };
      const config = {
        headers: {
          Authorization: this.$auth.strategy.token.get()
        }
      };
      axios
        .post(
          this.$axios.defaults.baseURL +
            "/user/search-by-bundles?" +
            "page=" +
            this.page +
            "&limit=" +
            this.limit,
          params,
          config
        )
        .then(res => {
          this.searching = false;
          this.results = res.data.contract;
          this.rows = res.data.docCount;
          if (res.data.docCount == 0) {
            this.noText = "No contracts found. Try something else.";
          }
        })
        .catch(err => console.log(err.response));
    },
    input(e) {
      this.page = e;
      this.searchContracts();
    },
    getbundles() {},
    getNewContract() {
      axios
        .get(this.$axios.defaults.baseURL + "/user/userdash-contract", {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        })
        .then(res => {
          this.newContract = res.data;
        })
        .catch(err => console.log(err.response));
    },
    viewContract(item) {
      this.$router.push({
        path: "new-contract/" + item._id,
        params: {
          id: item._id
        }
      });
    },
     selectContract(item){
            this.$store.commit('user/setSelectedContract',item)
            this.$store.dispatch('user/seeContractDetail')
        }
  }
};
</script>

<style lang="scss">
::placeholder {
  opacity: 0.2;
  margin-left: -10px;
}

.adjust-btn {
  border: 1px;
  margin: 0px 0px 1px 1px;
  border-right: 1px solid #dfe6ec;
  border-left: none;
  border-top: none;
  border-bottom: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

b-card {
  box-shadow: none;
}
</style>
