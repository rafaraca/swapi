<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <v-container>
        <router-link to="/"
        ><v-img src="@/assets/star-wars.svg" max-width="488" /></router-link>
        <h1 v-if="person" class="text-center font-weight-bold my-8 fon">{{ person.name }}</h1>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="3" v-for="(film, index) in filteredFilmes" :key="index">
              <v-card>
                <v-card-title shaped v-text="film.title" class="text-center"></v-card-title>
                <v-card-text>
                  <div class="mb-3"><h3>Director: </h3> {{ film.director }}</div>
                  <div><h4>Opening Crawl:</h4> {{ film.opening_crawl }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      drawer: null,
      person: null,
      films: null,
      filteredFilmes: null
    };
  },
  computed: {
    getRouteId() {
      return this.$route.params.id
    }
  },
  methods: {
    getPeople() {
      axios.get("https://swapi.dev/api/people/" + this.getRouteId)
          .then((response) => {
            this.person = response.data;
          });
    },
    getFilms() {
      axios.get("https://swapi.dev/api/films/").then((response) => {
        this.films = response.data;
        this.doneFilms();
      });
    },
    async getFilmsOfPerson(moviesUrls) {
      try {
        return await Promise.all(
            moviesUrls.map(async (urlFilm) => (await axios.get(urlFilm)).data)
        );
      } catch (e) {
        console.log(e);
      }
    },
    async doneFilms() {
      this.filteredFilmes = await this.getFilmsOfPerson(this.person.films);
      //console.log("filmsOfPerson", filmsOfPerson);
    },
  },
  mounted() {
    this.getPeople();
    this.getFilms();
  },
};
</script>
