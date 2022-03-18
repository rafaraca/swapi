<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <v-container>
        <router-link to="/"><v-img src="@/assets/star-wars.svg" max-width="488" class="mt-4"/></router-link>
        <div class="mt-8">
          <v-text-field label="Who has the Force?" placeholder="tell me..." v-model="busca"></v-text-field>
        </div>
      </v-container>

      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(personagem, index) in personagens" :key="index">
            <router-link  class="personagens" :to="{name: 'personagem', params: {id: counter(personagem.url) } }">
              <v-card class="pa-2" outlined tile>
                <v-card-title v-text="personagem.name" class="text-center personagens"></v-card-title>
                <v-img src="@/assets/warp-speed.jpg" max-width="360" />
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-container>

      <div class="text-center" v-if="paginacao">
        <v-pagination
            v-model="page"
            :length="9"
            circle
            @input="onPageChange"
        ></v-pagination>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";
import { debounce } from "lodash";
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      drawer: null,
      busca: "",
      personagens: [],
      page: 1,
      numberOfPages: null,
      paginacao: true,
      personId: null
    }
  },
  mounted() {
    this.listPerson();
  },
  created() {
    this.debounceName = debounce(this.buscarNome, 300);
  },
  watch:{
    busca() {
      if (!this.busca) return;
      this.debounceName();
    },
  },
  methods: {
    onPageChange() {
      this.listPerson();
    },
    listPerson() {
      axios
        .get('https://swapi.dev/api/people/?page='+this.page)
          .then(response => {
            this.personagens = response.data.results;
          })
          .catch(error => {
            console.log(error)
          })
    },
    buscarNome() {
      axios
          .get('https://swapi.dev/api/people/', {
            params: {
              search: this.busca
            }
          })
          .then(response => {
            this.personagens = response.data.results;
            //this.setPages();
          })
          .catch(error => {
            console.log(error)
          })
    },
    counter(url) {
      return this.personId = Number(url.substr(url.length - 3, 2)) >= 10
          ? url.substr(url.length - 3, 2)
          : url.substr(url.length - 2, 1);
      //return this.personId = url.substr(url.length - 2, 1);
      //console.log(this.personId);
    }
  },
}

</script>

<style scoped>
.personagens {
  text-decoration: none;
}
</style>


