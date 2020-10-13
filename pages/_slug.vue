<template>
  <div>
    <header class="pt-6 xl:pb-10">
      <div class="space-y-1 text-center">
        <dl class="space-y-10">
          <div>
            <dt class="sr-only">Published on</dt>
            <dd class="text-base leading-6 font-medium text-gray-500">
              <p>{{ formatDate(article.createdAt) }}</p>
            </dd>
          </div>
        </dl>
        <div>
          <h1
            class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            {{ article.title }}
          </h1>
        </div>
      </div>
    </header>
    <div class="prose prose-lg mx-auto">
      <nuxt-content :document="article" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    try {
      const article = await $content("articles", params.slug).fetch()
      const [prev, next] = await $content("articles")
        .only(["title", "slug"])
        .sortBy("createdAt", "asc")
        .surround(params.slug)
        .fetch()
      return {
        article,
        prev,
        next,
      }
    } catch {
      error({ statusCode: 404, message: "Article not found" })
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(date).toLocaleDateString("en", options)
    },
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        // Open Graph
        { hid: "og:title", property: "og:title", content: this.article.title },
        { hid: "og:image", property: "og:image", content: this.article.img },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.article.title,
        },
      ],
    }
  },
}
</script>
