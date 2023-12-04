<script lang="ts" setup>
import { componentNames } from '#build/components';


interface Library {
  image: string
  title: string
  description: string
  link: string
}

const libraries: Library[] = [
  {
    title: 'Nuxt 3',
    description: 'Framework that makes web development intuitive and powerful.',
    link: 'https://nuxt.com',
    image: 'logo_big.svg'
  },
  {
    title: 'PrimeVue 3',
    description: 'Comprehensive suite of customizable, feature-rich UI components.',
    link: 'https://primevue.org',
    image: 'primevue.png'
  },
  {
    title: 'PrimeFlex',
    description: 'Lightweight responsive CSS utility library to accompany Prime UI libraries.',
    link: 'https://primeflex.org',
    image: 'primeflex.svg'
  },
  {
    title: 'PrimeIcons',
    description: 'Font Icon Library for Prime UI Libraries.',
    link: 'https://github.com/primefaces/primeicons',
    image: 'primeicons.svg'
  },
  {
    title: 'Pinia',
    description: 'Type Safe, Extensible, and Modular store library for Vue.',
    link: 'https://pinia.vuejs.org',
    image: 'pinia.svg'
  },
  {
    title: 'Pinia Persisted Date',
    description: 'Configurable persistence and rehydration of Pinia stores.',
    link: 'https://github.com/prazdevs/pinia-plugin-persistedstate',
    image: 'pinia_persist.png'
  },
  {
    title: 'FormKit ',
    description: 'Comprehensive form building framework for Vue.',
    link: 'https://formkit.com/',
    image: 'formkit.svg'
  },
  {
    title: 'Json Web Token',
    description: 'Open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties.',
    link: 'https://github.com/auth0/node-jsonwebtoken',
    image: 'jwt.svg'
  }
]

function openLink(url: string): void {
  window.open(url, '_blank')
}


</script>

<template>
  <div class="libraries justify-content-center xl:justify-content-between" v-motion-slide-visible-bottom  :delay="150">
    <div class="flex flex-column gap-5">
      <span class="text-blue-300 text-6xl font-semibold">
        Libraries  
      </span>
      <div class="libraries__items grid justify-content-center xl:justify-content-between">

        <div class="libraries__item col-12 xl:col-6" v-for="library in libraries">
          <div class="libraries__library-content" @click="openLink(library.link)">
            <div class="libraries__library-logo">
              <img :src="'/img/' + library.image"/>
            </div>
            <div class="libraries__library-info gap-1">
              <span class="libraries__library-title">{{ library.title }}</span>
              <span class="libraries__library-description">{{ library.description }}</span>
              <a :href="library.link">{{ library.link }}</a>
            </div>
          </div>
        </div> 

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .libraries {

    &__library-title {
      
      font-weight: 600;
      color: var(--nuxt-green);
      letter-spacing: .05rem;
    }

    &__library-description {
      color: var(--text-primary);
      font-size: 1rem;
    } 

    &__item {
      padding: .5rem;
      justify-content: center;
      display: flex;
    }

    &__library-content {
      display: flex;
      column-gap: 2rem;
      background: #0a0a0a;
      padding: 2rem;
      border-radius: 1rem;
      align-items: center;
      max-width: 32rem;
      width: 100%;
      cursor: pointer;
      transition: transform .1s linear, border-color .5s linear;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;

      &:hover {
        transform: scale(1.05);
        border-color: var(--nuxt-green);
      }
    }
    
    &__library-logo {
      height: 5rem;
      width: 5rem;
      display: flex;
      justify-content: center;


      img {
        height: 5rem;
        max-width: 5rem;
      }
    }
    
    &__library-info {
      display: grid;
      align-items: center;
      a {
        overflow-wrap: anywhere;
        text-decoration: none;
        color: var(--blue-400);
        font-size: .9rem;
      }
    }
  }

</style>