<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-no-shrink mr-6">
      <NuxtLink to="/">
        <Logo class="mr-2" />
      </NuxtLink>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="lg:flex-grow">
        <a
          href="https://bitcartcc.com"
          class="block mt-4 lg:inline-block lg:mt-0 mr-4"
          target="_blank"
        >
          Home
        </a>
        <NuxtLink
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 mr-4 text-blue-500 font-medium"
        >
          Blog
        </NuxtLink>
        <a
          href="https://docs.bitcartcc.com"
          class="block mt-4 lg:inline-block lg:mt-0 mr-4"
          target="_blank"
        >
          Docs
        </a>
        <a
          href="https://github.com/orgs/bitcartcc/projects/1"
          class="block mt-4 lg:inline-block lg:mt-0"
          target="_blank"
        >
          Roadmap
        </a>
      </div>
      <div>
        <AppSearchInput class="" />
      </div>
    </div>
  </nav>
</template>
