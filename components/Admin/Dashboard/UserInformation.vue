<script lang="ts" setup>
const auth = useAuth()
const { user } = storeToRefs(auth)

</script>

<template>
  <Card class="user-details">
    <template #title>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-user text-xl"></i>
        User information
      </div>
    </template>
    <template #content>
      <div class="flex flex-column align-items-center text-center">
        <Image 
          :src="user?.avatarURL" 
          alt="Avatar" 
          width="100" 
          preview  
        />
        <div class="flex flex-column user-details__description">
          <span class="">Name</span>
          <span class="">{{ user?.name }}</span>
          <span class="">Email</span>
          <span class="">{{ user?.email }}</span>
          <span class="">Last login</span>
          <span class="">01/02/2023 14:55</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.user-details {

  max-width: 25rem;

  &__description {

    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-50);
    width: 100%;
    font-size: 1.125rem;
    color: var(--blue-50);


    & span:nth-child(odd) {
      font-size: 1rem;
      margin-top: .8rem;
      font-weight: 700;
      color: var(--surface-300)
    }
    

  }

}
</style>