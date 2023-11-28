<script lang="ts" setup>
import useUpdateDetails from '~/composables/user/useUpdate';
import { updateUser } from '~/server/models/user';

definePageMeta({
  middleware: ['user-only']
});

const updateDetails = useUpdateDetails();
const user = useAuth();
const loading = ref(false);

onMounted(() => {
  updateDetails({name: 'test'})
    .then(updateData => {
      const {payload} = updateData!
      user.setUser(payload)
    })
    .catch(error => console.log(error))
    .finally(() => loading.value = false)
})

</script>

<template>
  Only Users
</template>