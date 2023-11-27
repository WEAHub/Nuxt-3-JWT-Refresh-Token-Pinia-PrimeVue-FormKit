<template>
  <div class="flex flex-column h-screen justify-content-between ">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content flex align-self-center">
      <slot />
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
