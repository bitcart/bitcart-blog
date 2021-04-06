<template>
  <div>
    <p class="font-bold uppercase tracking-wider text-3xl text-center">
      {{ category.name }}
    </p>
    <ArticleList :articles="articles" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    try {
      const category = await $content("categories", params.category).fetch()
      const articles = await $content("articles")
        .where({ category: { $eq: category.name } })
        .sortBy("createdAt", "desc")
        .fetch()
      return {
        articles,
        category,
      }
    } catch {
      error({ statusCode: 404, message: "Category not found" })
    }
  },
}
</script>
