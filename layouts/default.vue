<template>
  <div class="flex flex-column min-h-screen h-full justify-content-between">
    <Header></Header>
    <div class="content flex justify-content-center h-full w-full flex-grow-1">
      <slot />
    </div>
    <Footer></Footer>
  </div>
</template>

