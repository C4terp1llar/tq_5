import {defineStore} from "pinia";
import {ref} from "vue";
import type {Account} from "@/features/accounts/model/types.ts";

export const useAccountsStore = defineStore('accounts', () => {
    const addAccountFlag = ref<boolean>(false)

    const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') || '[]'))

    const saveAccounts = () => {
        localStorage.setItem('accounts', JSON.stringify(accounts.value))
    }

    const deleteAccount = (uuid: string) => {
        accounts.value = accounts.value.filter(account => account.uuid !== uuid)
        saveAccounts()
    }

    const updateAccount = (account: Account, uuid: string) => {
        const idx =    accounts.value.findIndex(account => account.uuid === uuid)
        // проверяем что данные в записи реально поменялись чтобы не плодить изменения
        if (JSON.stringify(account) === JSON.stringify(accounts.value[idx])) return
        if (idx > -1) {
            accounts.value[idx] = account
            saveAccounts()
            console.log('upd')
        }
    }

    const checkSimilar = (account: Account) => {
        return JSON.stringify(account) === JSON.stringify(accounts.value.find(a => a.uuid === account.uuid))
    }

    const createAccount = (account: Account) => {
        accounts.value.push(account)
        addAccountFlag.value = false
        saveAccounts()
    }

    return{
        addAccountFlag,
        accounts,
        saveAccounts,
        deleteAccount,
        checkSimilar,
        updateAccount,
        createAccount
    }
})
