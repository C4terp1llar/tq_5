<script setup lang="ts">
import {useAccountsStore} from "@/features/accounts/model/store.ts";

const accountsStore = useAccountsStore()

const handleClick = () => {
  if (accountsStore.addAccountFlag) return
  accountsStore.addAccountFlag = !accountsStore.addAccountFlag
}
</script>

<template>
  <v-btn color="primary" rounded @click="handleClick" :disabled="accountsStore.addAccountFlag">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<style scoped>

</style>