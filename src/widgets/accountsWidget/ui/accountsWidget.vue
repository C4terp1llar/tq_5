<script setup lang="ts">

import AccountsBar from "@/widgets/accountsWidget/ui/accountsBar.vue";
import AccountList from "@/features/accounts/ui/accountList.vue";

</script>

<template>
  <div class="accounts-widget__wrapper d-flex flex-column ga-7">
    <accounts-bar/>
    <account-list/>
  </div>
</template>

<style scoped>

</style>