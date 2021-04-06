<template>
  <div>
    <p class="font-bold uppercase tracking-wider text-3xl text-center">
      {{ author }}
    </p>
    <ArticleList :articles="articles" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const articles = await $content("articles")
      .where({ author: { $eq: params.author } })
      .sortBy("createdAt", "desc")
      .fetch()
    if (articles.length === 0) {
      error({ statusCode: 404, message: "Author not found" })
    }
    return {
      articles,
      author: params.author,
    }
  },
}
</script>
