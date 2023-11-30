<script lang="ts" setup>
import type { PropType } from 'vue'
import { User } from '~/types/User';
import { FormKitNode, FormKitSchemaDefinition } from '@formkit/core';
import useUpdateDetails from '~/composables/user/useUpdate';

const props = defineProps({
  user: {
    type: Object as PropType<any>,
    default: {}
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'primeInputText',
    name: 'email',
    label: 'Email',
    type: 'email',
    help: 'Please enter a valid email.',
    validation: 'required|email',
    placeholder: 'Email',
  },
  {
    $formkit: 'primeInputText',
    name: 'name',
    label: 'Name',
    type: 'text',
    help: 'Please enter a valid name.',
    validation: 'required',
    placeholder: 'Name',
  },
  {
    $formkit: 'primeInputText',
    name: 'avatarURL',
    label: 'Avatar',
    type: 'text',
    help: 'Please enter a valid URL.',
    validation: 'required',
    placeholder: 'Avatar URL',
  },
  {
    $el: 'div',
    attrs: {
      class: "flex justify-content-center"
    },
    children: [
      {
        $el: 'img',
        attrs: {
          src: '$avatarURL',
          width: '50',
          style: {

          },
        }
      }
    ]
  },
];

const emit = defineEmits(['onClosed'])
const updateDetails = useUpdateDetails();
const visibleRef = ref(false)
let formData = ref({})


async function submitHandler(user: User, node: FormKitNode) {
  updateDetails(user)
    .then(data => {
      if(!!data) {
        visibleRef.value = false
        onUpdateVisible(false)
      }
    })
    .catch(error => {
      console.log(error);
    })

  node.clearErrors()
}

function onUpdateVisible(visible: boolean): void {
  emit('onClosed', visible)
}

watch([props], ([{user, visible}]) => {
  formData.value = Object.assign({}, user)
  visibleRef.value = visible
})

</script>

<template>
  <Dialog 
    modal 
    v-model:visible="visibleRef"
    @update:visible="onUpdateVisible"
    :header="'Edit user - ' + props?.user?.name" 
    :close-on-escape="true"
    :style="{ 
      width: '30rem',
      maxWidth: '80vw'
    }" 
    >
    <FormKit
      id="editUserForm"
      type="form"
      :actions="false"
      v-model="formData"
      @submit="submitHandler"
    > 
      <FormKitSchema
        :data="formData"
        :schema="schema" 
      />
        <FormKit
          :config="{
            classes: {
              input: 'mt-4 p-button p-button-outlined p-component w-full block',
            },
          }"
          type="submit"
          label="Save"
        />
    </FormKit>
  </Dialog>
  
</template>