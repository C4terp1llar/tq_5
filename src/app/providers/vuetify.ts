// src/app/providers/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#5C6BC0',
                    secondary: '#F48FB1',
                    accent: '#FFD54F',
                    error: '#E53935',
                    info: '#29B6F6',
                    success: '#66BB6A',
                    warning: '#FFA726',
                    background: '#F5F5F5',
                    surface: '#FFFFFF',
                },
            },
        },
    },
})
