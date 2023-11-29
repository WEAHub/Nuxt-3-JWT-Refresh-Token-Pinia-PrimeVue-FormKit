<script lang="ts" setup>
  const users = useUsers()
  const { users: userList } = storeToRefs(users);

  onMounted(() => users.getUsers())

</script>

<template>


</template>