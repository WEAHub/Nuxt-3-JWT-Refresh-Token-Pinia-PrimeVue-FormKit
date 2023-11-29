<script lang="ts" setup>
import { Component } from 'vue';

  const users = useUsers()
  const { users: userList } = storeToRefs(users);

  function composeField(field: string, value: string): string {
    const isAvatar = field === 'avatarURL'
    const isActions = field === 'actions'
    
    if(isAvatar) {
      return `<Image src="${value}" width="35"/>`
    }

    if(isActions) {
      return `<Button icon="pi pi-user-edit" severity="secondary" rounded outlined aria-label="Edit" />`
    }
    
    return `<span>${value}</span>`
  }

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
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>