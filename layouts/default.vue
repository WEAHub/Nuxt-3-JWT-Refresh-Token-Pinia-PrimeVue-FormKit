<template>
  <div class="flex flex-column min-h-screen h-full justify-content-between ">
    <Header></Header>
    <div class="content flex align-self-center h-full w-full">
      <slot />
    </div>
    <Footer></Footer>
  </div>
</template>
