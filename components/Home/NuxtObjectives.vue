
<script lang="ts" setup>
  const objectives: string[] = [
    "Use Nuxt 3 for frontend and backend.",
    "Use the PrimeVue UI.",
    "Use FormKit with PrimeVue components.",
    "Form validation with FormKit.",
    "Error management using Toast.",
    "Use of Pinia for the management of states and persistent data.",
    "Login/Logout ability.",
    "Using Refresh token & Access Token",
    "Route control using middleware",
  ]
</script>

<template>

  <div class="objectives flex-column xl:flex-row justify-content-center xl:justify-content-between">
    <NuxtImg class="objectives__image" src="goals.svg"></NuxtImg>
    <div class="flex flex-column gap-5">
      <span class="text-blue-300 text-6xl font-semibold">
        Objectives    
      </span>
      <ul class="objectives__list">
        <template v-for="objective in objectives">
          <li 
            data-icon="✔"
            class="objectives__item"
          >{{ objective }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.objectives {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 5rem;

  &__image {
    max-width: 20rem;
    filter: 
    invert(75%) 
    sepia(71%) 
    saturate(2924%) 
    hue-rotate(103deg) 
    brightness(92%) 
    contrast(102%)
    drop-shadow(0px 0px 10px rgba(5, 255, 155, 30%));
  }

  &__title {
    font-weight: 600;
    font-size: 3.2rem;
    color: var(--primary-color); 

  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: .8rem;
  }

  &__item {
    display: grid;
    grid-template-columns: 0 1fr;
    gap: 1.5em;
    align-items: start;
    font-size: 1.5rem;
    line-height: 1.25;
    align-items: center;
    color: var(--text-color);
    max-width: 32rem;

    &::before {
      color: rgba(5, 255, 155);
      content: attr(data-icon);
      font-size: 1.5rem;
    }
  }

}
</style>