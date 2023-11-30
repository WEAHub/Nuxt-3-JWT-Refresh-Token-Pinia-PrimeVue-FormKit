<script lang="ts" setup>
import { Nullable } from 'primevue/ts-helpers';
import { JWToken, UserModel } from '~/types/User';

const auth = useAuth()
const { user } = storeToRefs(auth)
const { id } = getUserFromToken()!

const userWithId: UserModel = {
  id,
  ...user.value,
}

const editUser: Ref<Nullable<UserModel>> = ref(null)
const editUserVisible: Ref<boolean> = ref(false);

function showEdituserDialog(user: UserModel): void {
  editUser.value = user
  editUserVisible.value = true
}

function onEditVisibleChange(visible: boolean): void {
  editUserVisible.value = visible
}
</script>

<template>
  <Card class="user-details">
    <template #title>
      <div class="flex align-items-center justify-content-center gap-2">
        <i class="pi pi-user text-xl"></i>
        User information
      </div>
    </template>
    <template #content>
      <div class="flex flex-column align-items-center text-center gap-5">
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
        
        <Button 
          icon="pi pi-user-edit"
          class="p-button-outlined"
          severity="secondary"
          aria-label="Edit"
          label="Edit"
          @click="showEdituserDialog(userWithId)"
        />
      </div>
    </template>
  </Card>
  
  <AdminDialogsUserEdit
    :user="editUser!" 
    :visible="editUserVisible"
    v-on:on-closed="onEditVisibleChange"
  />

</template>

<style lang="scss" scoped>
.user-details {

  max-width: 25rem;

  &__description {

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