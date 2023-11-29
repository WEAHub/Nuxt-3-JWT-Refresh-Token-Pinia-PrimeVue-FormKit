<script lang="ts" setup>
import useDeleteUser from '~/composables/user/useDelete';

const users = useUsers()
const { users: userList } = storeToRefs(users);
const deleteUser = useDeleteUser();
onMounted(() => users.getUsers())

</script>

<template>
  <Card>
    <template #content>
      <DataTable 
        :value="userList ?? []"
        paginator 
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :rows="5" 
      >
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold">Users</span>
            <Button @click="users.getUsers()" icon="pi pi-refresh" rounded raised />
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
            <Button icon="pi pi-user-edit" severity="secondary" text rounded aria-label="Edit" />
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
  <ConfirmPopup></ConfirmPopup>
</template>