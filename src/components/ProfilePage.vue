<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <!-- <p>
      <strong>Family name:</strong>
      {{ currentUser.family_name }}
    </p>
        <p>
      <strong>Lats name:</strong>
      {{ currentUser.last_name }}
    </p> -->
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user)
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    console.log("oki22")
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>