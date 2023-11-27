<script lang="ts" setup>
import useUpdateDetails from '~/composables/user/useUpdate';

definePageMeta({
  middleware: ['user-only']
});

const updateDetails = useUpdateDetails();
const { user } = useAuth();
const loading = ref(false);

onMounted(() => {
  updateDetails({name: 'lolaso'})
    .catch(error => console.log(error))
    .finally(() => loading.value = false)
})

</script>

<template>
  Only Users
</template>