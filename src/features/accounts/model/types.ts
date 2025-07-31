
export interface Tag {
    text: string
}

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
    uuid: string // добавил для удобства работы с массивом аккаунтов
    tags: Tag[]
    type: AccountType
    login: string
    password: string | null
}
// для uuid использовал библиотеку (просто ради интереса) вместо iso времени / math random и тп