<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <div class="mt-4 text-center">Click to see</div>
      <v-btn
          v-model="$vuetify.theme.dark"
          @click="changeTheme"
      >
        <v-avatar>
          <v-img src="@/assets/darth-vader.jpg" max-width="60" />
        </v-avatar>
        <span class="caption">The dark side of the Force</span>
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      drawer: null,
      themeColor: false
    }
  },
  mounted() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.$vuetify.theme.dark = theme === "true";
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem('theme', this.$vuetify.theme.dark.toString()
      );
    }
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme', this.$vuetify.theme.dark.toString())
    }
  },
}

</script>