<script setup lang="ts">
import { FormKitNode, FormKitSchemaDefinition } from '@formkit/core';
import { FetchError } from 'ofetch';
import { User } from 'types/User';
import { setErrors } from '@formkit/core'
import { NuxtError } from '#app';

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

async function submitHandler(credentials: User, node: FormKitNode) {
  node.clearErrors()
  auth.login(credentials).catch(handleLoginError);
}

function handleLoginError(error: FetchError): void {
  const errorDetails: NuxtError = error.response?._data
console.log(error);
  setErrors(
    'loginForm',
    [errorDetails.message!]
  )
}

</script>

<template>
  <FormKit
    id="loginForm"
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
        type="submit"
        label="Login"
      />
  </FormKit>
</template>