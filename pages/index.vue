<template>
  
  <div class="home flex flex-column">

    <div class="home__section home__section--info mt-5 sm:mt-0">
      <div class="home__section-content">  
        <HomeNuxtInformation/>
      </div>
    </div>

    <div class="home__section">
      <div class="home__section-content">  
        <HomeNuxtObjectives/>
      </div>
    </div>
    
    <div class="home__section">
      <div class="home__section-content">  
        <HomeLibrariesUsed/>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
  .home {
    &__section {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      width: 100%;
      margin-bottom: 5rem;
      min-height: calc(100vh - 5rem);

      &--info {
        background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(18,18,18,1) 100%);
        border-bottom: 1px solid #171717;
      }

    }

    &__section-content {
      padding: 0 2rem;
      max-width: 70rem;
      width: 100%;
      align-self: center;
    }
  }
</style>