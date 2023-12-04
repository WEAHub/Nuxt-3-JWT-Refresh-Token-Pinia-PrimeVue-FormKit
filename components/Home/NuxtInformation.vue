<template>
    <div class="nuxt-info justify-content-center xl:justify-content-between" v-motion-pop-visible-once>
      <div class="nuxt-info__welcome">
        <span class="nuxt-info__title">Welcome to my</span>
        <span class="nuxt-info__subtitle">Nuxt 3 Learning Project</span>
        <span class="nuxt-info__message">Everything is learned by trying and failing.</span>
        <!-- 
        <span class="nuxt-info__message">The goal is to learn as much as possible with a simple project</span> 
        -->
      </div>
      <NuxtImg class="nuxt-info__logo" src="logo_big.svg" />
    </div>
</template>

<style lang="scss" scoped>
.nuxt-info {

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__welcome {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 600;
    font-size: 2.8rem;
    color: var(--text-primary);
  }

  &__subtitle {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-shadow: 6px 5px 7px #080808;
  }  
  
  &__message {
    max-width: 26rem;
    font-size: 1.25rem;
    color: var(--text-color);
  }


  &__logo {
    max-width: 23rem;
    width: 100%;
    animation-name: logoEffect;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

}

@keyframes logoEffect {
  0%   {
    -webkit-filter: grayscale(0%);
    -webkit-filter: drop-shadow(0px 0px 10px rgba(5, 255, 155, 60%));
    transform: perspective(400px) rotateY(0deg);
  }
  50%  {
    -webkit-filter: grayscale(100%);
    -webkit-filter: drop-shadow(0px 0px 10px rgba(5, 255, 155, 20%));
  }
  100% {
    -webkit-filter: grayscale(0%);
    -webkit-filter: drop-shadow(0px 0px 10px rgba(5, 255, 155, 60%));
    transform: perspective(400px) rotateY(360deg)
  }
}
</style>