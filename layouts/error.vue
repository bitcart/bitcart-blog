<template>
  <div>
    <div class="bg-gray-100 flex items-center justify-center mb-2">
      <div
        class="
          container
          flex flex-col
          md:flex-row
          items-center
          justify-center
          text-gray-700
        "
      >
        <div class="max-w-md">
          <div class="text-5xl font-dark font-bold">
            {{ error.statusCode }}
          </div>
          <div v-if="error.statusCode === 404">
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
          </div>
          <NuxtLink to="/">
            <button
              class="
                px-4
                inline
                py-2
                text-sm
                font-medium
                leading-5
                shadow
                text-white
                transition-colors
                duration-150
                border border-transparent
                rounded-lg
                focus:outline-none focus:shadow-outline-blue
                bg-blue-600
                active:bg-blue-600
                hover:bg-blue-700
              "
            >
              Back to homepage
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
