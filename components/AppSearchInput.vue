<template>
  <div>
    <div class="relative text-gray-600 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          ><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </span>
      <input
        v-model="searchQuery"
        type="search"
        class="py-2 text-sm rounded-md pl-8 focus:outline-none bg-white text-gray-900"
        placeholder="Search..."
        autocomplete="off"
      >
    </div>
    <ul
      v-if="articles.length"
      class="z-10 absolute w-auto flex-1 top-40 bg-white dark:bg-gray-900 rounded-md border border-gray-300 overflow-hidden"
    >
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink
          :to="{ name: 'slug', params: { slug: article.slug } }"
          class="flex px-4 py-2 items-center leading-5 transition ease-in-out duration-150 text-blue-500 font-medium hover:text-black"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchQuery: '',
      articles: []
    }
  },
  watch: {
    async searchQuery (searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>
