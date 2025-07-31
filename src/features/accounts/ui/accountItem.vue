<script setup lang="ts">
import { ref } from 'vue'
import type {Account, Tag} from "@/features/accounts/model/types.ts";
import {rules} from "@/shared/lib/textValidation.ts";
import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
  account?: Account
  isNew?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', updatedAccount: Account): void
  (e: 'create', updatedAccount: Account): void
  (e: 'delete', id: string): void
  (e: 'cancelCreate'): void
}>()

const formRef = ref<HTMLElement | null>(null)

const tags = ref(props.account ? props.account.tags.map(t => t.text).join('; ') : '')
const type = ref(props.account?.type || 'LDAP')
const login = ref(props.account?.login || '')
const password = ref(props.account?.password || '')

const isPasswordVisible = ref<boolean>(false);

// при каждом блюре/изменении поля будем эмитить событие на изменение / создание
// при обновлении в сторе чекается что поля изменились иначе не обновляем
function save() {
  if (!login.value) return

  if (type.value === 'Локальная' && !password.value.trim()) return
  if (type.value === 'LDAP') password.value = ''

  const trimmedTags = tags.value.split(';').map(tag => tag.trim()).filter(tag => tag.length > 0).map(text => ({text}))

  if (trimmedTags.length ) tags.value = trimmedTags.map(t => t.text).join('; ')

  const updatedAccount: Account = {
    uuid: props.account?.uuid || uuidv4(),
    tags: trimmedTags,
    type: type.value,
    login: login.value.trim(),
    password: type.value === 'LDAP' ? null : password.value.trim(),
  }

  props.isNew ? emit('create', updatedAccount) : emit('update', updatedAccount)
}


// ф-ия нужна для того чтобы при смене фокуса от текущий формы. т е нажатие во вне
// события focusout или blur нормально по дефолту в этом случае не работает (если сделать @focusout => чекать запись, то он при переходе с селекта на поле внутри формы срабаттывает
// а надо чтобы он работал при клике во вне). таймаут нужен чтобы активный элемент обновился, если использовать без него то будет поведение описаное выше
// можно было и не делать этого просто тогда в строке висели бы пустые пароли (если запись локальная) и их можно было бы наплодить для каждого айтема аккаунта и
// я подумал что в интерфейсе это бы смотрелось не очень. Можно было бы сделать такое же поведение для добавления (кенселить добавление), но просто он только 1 нельзя сразу несколько полей насоздавать
// из-за флага + для него есть кнопка для отмены
function handleFocusOut() {
  setTimeout(() => {
    if (type.value === 'Локальная' && !password.value.trim() && formRef.value && !formRef.value.contains(document.activeElement)) {
      type.value = 'LDAP'
      save()
    }
  }, 0)
}

</script>

<template>
  <v-form ref="formRef" @focusout="!isNew && handleFocusOut()" class="grid-item__wrapper align-start ga-2">

    <v-text-field
        v-model.trim="tags"
        @blur="save"
        maxlength="50"
        variant="outlined"
        density="compact"
        hide-details="auto"
    />

    <v-select
        v-model="type"
        :items="['LDAP', 'Локальная']"
        @update:modelValue="save"
        @blur="save"
        dense
        variant="outlined"
        density="compact"
        hide-details="auto"
    />

    <v-text-field
        v-model.trim="login"
        @blur="save"
        maxlength="100"
        required
        :class="{'span2' : type === 'LDAP'}"
        variant="outlined"
        density="compact"
        hide-details="auto"
        :rules="[rules.required(login)]"
    />

    <v-text-field
        v-if="type === 'Локальная'"
        v-model.trim="password"
        @blur="save"
        maxlength="100"
        required
        variant="outlined"
        density="compact"
        hide-details="auto"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        :rules="[rules.required(password)]"
        validate-on="input"
    />

    <v-btn
        @click="!props.isNew && account ? emit('delete', account.uuid) : emit('cancelCreate')"
        variant="text"
        :color="!props.isNew ? 'error' : 'warning'"
        class="mt2"
        icon
        density="comfortable"
    >
      <v-icon>{{!props.isNew ? 'mdi-trash-can-outline' : 'mdi-close'}}</v-icon>
    </v-btn>

  </v-form>
</template>

<style scoped>
.span2{
  grid-column: span 2;
}
.mt2{
  margin-top: 2px;
}
</style>
