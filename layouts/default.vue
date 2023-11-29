<template>
  <div class="flex flex-column h-screen justify-content-between ">
    <Header></Header>
    <div class="content flex align-self-center h-full">
      <slot />
    </div>
    <Footer></Footer>
  </div>
</template>
