<script setup lang="ts">
  import { FormKitSchemaDefinition } from '@formkit/core';
  import { User } from 'types/User';

  const auth = useAuth();

  const testUser = {
    email: 'test@test.com',
    password: 'test'
  }

  const schema: FormKitSchemaDefinition = [
    {
      $formkit: 'primeInputText',
      name: 'email',
      label: 'Email',
      type: 'email',
      help: 'Please enter your student email address.',
      validation: 'required|email',
      placeholder: 'test@test.com',
    },
    {
      $formkit: 'primePassword',
      name: 'password',
      label: 'Password',
      type: 'password',
      help: 'Please enter your password',
      validation: 'required',
      toggleMask: true,
      showIcon: true
    },
  ];
  
  async function submitHandler(credentials: User) {
    const loginResult = await auth.login(credentials);
/*     if(loginSuccess) {
      toast.add({ 
        severity: 'success',
        summary: 'Valid credentials',
        detail: 'Login success.',
        life: 3000 
      });
    }
    else {
      toast.add({ 
        severity: 'error',
        summary: 'Invalid credentials',
        detail: 'Email or password incorrect.',
        life: 3000 
      });
    } */
  }

</script>

<template>
  <FormKit
    id="form"
    type="form"
    v-model="testUser"
    :actions="false"
    @submit="submitHandler"
  > 
    <FormKitSchema :schema="schema" />
      <FormKit
        :config="{
          classes: {
            input: 'mt-4 p-button p-button-outlined p-component w-full block',
          },

        }"
        icon="pi pi-external-link"
        type="submit"
        label="Login"
      />
  </FormKit>
</template>