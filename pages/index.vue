<template>
  <div>
    <ul class="flex flex-wrap mb-4 text-center pt-5">
      <li
        v-for="category of categories"
        :key="category.name"
        class="xs:w-full md:w-1/6 px-2 text-center"
      >
        <NuxtLink
          :to="`category/${category.name}`"
          class=""
        >
          <p class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss">
            {{ category.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
    <ArticleList :articles="articles" />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'img', 'slug', 'author', 'category'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const categories = await $content('categories', params.slug)
      .only(['name'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      categories
    }
  },
  computed: {
    isDarkMode () {
      if (process.browser) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return false
    }
  },
  head () {
    return {
      title: 'BitcartCC Blog',
      titleTemplate: '%s - BitcartCC Official Blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'BitcartCC Official Blog'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: this.isDarkMode ? '/favicon_dark.ico' : '/favicon.ico' }]
    }
  }
}
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
