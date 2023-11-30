<script lang="ts" setup>
import useDeleteUser from '~/composables/user/useDelete';
import { FilterMatchMode } from 'primevue/api';
import { Nullable } from 'primevue/ts-helpers';
import { UserModel } from '~/types/User';

const deleteUser = useDeleteUser();

const users = useUsers()
const { users: userList } = storeToRefs(users);

const loading: Ref<boolean> = ref(false);

const filters = ref({
  global: { 
    value: null, 
    matchMode: FilterMatchMode.CONTAINS 
  }
})

const editUser: Ref<Nullable<UserModel>> = ref(null)
const editUserVisible: Ref<boolean> = ref(false);

function showEdituserDialog(user: UserModel): void {
  editUser.value = user
  editUserVisible.value = true
}

function onEditVisibleChange(visible: boolean): void {
  editUserVisible.value = visible
}

function getUsers(): void {
  loading.value = true;
  users
    .getUsers()
    .finally(() => loading.value = false)
}

onMounted(() => getUsers())
</script>

<template>
  <Card class="w-full">
    <template #content>
      <DataTable 
      tableSt
        :value="userList ?? []"
        paginator 
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :rows="5"
        :loading="loading"
        v-model:filters="filters"
      >
        <template #empty> No users found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold">Users</span>
            <div>
              <span class="p-input-icon-left mr-3">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </span>
              <Button @click="users.getUsers()" icon="pi pi-refresh" rounded raised />
            </div>
          </div>
        </template>

        <Column field="avatarURL" header="Avatar">
          <template #body="props">
            <Image :src="props.data.avatarURL" width="35"/>
          </template>
        </Column>

        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>

        <Column header="Actions">
          <template #body="props">
            <Button 
              text
              rounded
              icon="pi pi-user-edit"
              severity="secondary"
              aria-label="Edit"
              @click="showEdituserDialog(props.data)"
            />
            <Button 
              text 
              rounded 
              icon="pi pi-trash" 
              severity="danger" 
              aria-label="Edit" 
              @click="deleteUser({id: props.data.id})"
            />
          </template>
        </Column>

      </DataTable>
    </template>
  </Card>

  <AdminDialogsUserEdit
    :user="editUser!" 
    :visible="editUserVisible"
    v-on:on-closed="onEditVisibleChange"
  />

</template>