<template>
  <div v-if="currentUser">
    <div class="list row">
      <div class="col-8">
        <div class="input-group mb-3 mt-5">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="retrievePosts"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <VueTailwindPagination
        :current="currentPage"
        :total="total"
        :per-page="perPage"
        @page-changed="changedPage($event)"
      />

      <div class="d-flex align-items-center mb-3">
        <div class="position-relative">
          <select class="form-select-custom text-center" aria-label=".form-select" @change="handleSelectOption" :value="perPage">
            <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
          </select>
          <i class="fas fa-angle-down fs-7"></i>
        </div>
      </div
      >

      <div class="d-flex mt-5">
        <div class="col-6">
        <h4>Posts List ({{ total }})</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(post, index) in posts"
            :key="index"
            @click="setActivepost(post, index)"
          >
            {{ post.title }}
          </li>
        </ul>
      </div>

      <div class="col-6 ml-5">
        <div v-if="currentPost">
          <h4>Post</h4>
          <div>
            <label><strong>Id:</strong></label> {{ currentPost.id }}
          </div>
          <div>
            <label><strong>Title:</strong></label> {{ currentPost.title }}
          </div>
          <div>
            <label><strong>Content:</strong></label> {{ currentPost.content }}
          </div>
          <div>
            <label><strong>Privacy:</strong></label> {{ currentPost.privacy }}
          </div>
          <div>
            <label><strong>Group name:</strong></label> {{ currentPost.group_name }}
          </div>
        </div>
        <div v-else>
          <br />
          <p>Please click on a post...</p>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import UserService from "../services/user.service";
import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "posts-list",
  components: { VueTailwindPagination },
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: "",
      currentPage: 1,
      perPage: 20,
      total: 0,
      options: [5, 10, 20]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrievePosts() {
      UserService.getPosts(this.title, this.currentPage, this.perPage).then(
        (response) => {
          this.posts = response.data.data;
          this.total = response.data.total_pages;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    setActivepost(post, index) {
      this.currentPost = post;
      this.currentIndex = post ? index : -1;
      console.log(this.currentIndex)
    },
    clickCallback (pageNum) {
      console.log(pageNum)
    },
    isPageActive (page) {
      this.currentPage == page
    },
    changedPage(pageNumber) {
      this.currentPage = pageNumber
      console.log(this.currentPage)
    },
    handleSelectOption(e) {
      console.log(e.target.value)
      this.perPage = e.target.value;
      this.retrievePosts();
    },
  },
  watch: {
    currentPage(newPage, oldPage) {
      console.log(newPage);
      console.log(oldPage);
      this.retrievePosts();
      console.log(this.perPage)
    }
  },
  mounted() {
    this.retrievePosts();
  }
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.form-select-custom {
  border: 1px solid #dddddd;
  width: 57px;
  height: 38px;
  border-radius: 5px;
  font-size: 12px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 10px;
}
svg {
  color: #00b140;
  position: absolute;
  top: 12px;
  right: 8px;
}
</style>
