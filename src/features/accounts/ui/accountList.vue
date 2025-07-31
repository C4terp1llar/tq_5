<script setup lang="ts">

import type {Account} from "@/features/accounts/model/types.ts";
import NoticeTextTemplate from "@/shared/ui/noticeTextTemplate.vue";
import {useAccountsStore} from "@/features/accounts/model/store.ts";
import AccountsHint from "@/features/accounts/ui/accountsHint.vue";
import AccountItem from "@/features/accounts/ui/accountItem.vue";
import AccountsFieldsHeading from "@/features/accounts/ui/accountsFieldsHeading.vue";

const accountsStore = useAccountsStore()

// сделал через пропсы и эмиты, тк просто хотел показать знание подобной концепции, когда есть некая оболочка которая откуда-то берет данные (дергает ручку для получения массива для отображения)
// и внутри себя управляет итерацией, изменением данные (обрабатывает емиты от итерируемых айтемов и меняет пропсы там где они декларируются), отображением (лоадер, нет айтемов и тп)
// в данном случае можно было просто из каждого айтема менять аккаунты через стор
</script>

<template>
  <div class="accounts-list__wrapper d-flex flex-column ga-5">
    <template v-if="accountsStore.accounts.length || accountsStore.addAccountFlag">
      <accounts-hint/>

      <div class="accounts-list__items d-flex flex-column ga-2" v-if="accountsStore.accounts.length || accountsStore.addAccountFlag">
        <accounts-fields-heading/>

        <account-item
            v-if="accountsStore.accounts.length"
            v-for="a in accountsStore.accounts"
            :key="a.uuid"
            :account="a"
            @delete="uuid => accountsStore.deleteAccount(uuid)"
            @update="updatedAccount => accountsStore.updateAccount(updatedAccount, updatedAccount.uuid)"
        />

        <account-item
            v-if="accountsStore.addAccountFlag"
            :is-new="true"
            @cancel-create="accountsStore.addAccountFlag = !accountsStore.addAccountFlag"
            @create="account => accountsStore.createAccount(account)"
        />
      </div>
    </template>

    <notice-text-template v-else heading="Записей пока нет" text="Добавьте запись, нажав на + в верхней части экрана"/>
  </div>
</template>

<style scoped>

</style>