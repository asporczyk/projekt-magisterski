<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import router from '@/router'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const { t } = useI18n()

const activeMenuItem = computed({
  get() {
    return router.currentRoute.value.name?.toString() ?? null
  },
  set(newValue) {
    return newValue
  },
})

const mainMenuItems = [
  {
    icon: 'mdi-home',
    title: t('home'),
    value: 'home',
  },
  {
    icon: 'mdi-account-multiple',
    title: t('friends'),
    value: 'friends',
  },
  {
    icon: 'mdi-account-group',
    title: t('teams'),
    value: 'teams',
  },
  {
    icon: 'mdi-heart',
    title: t('followed'),
    value: 'followed',
  },
]

const secondaryMenuItems = [
  {
    icon: 'mdi-trending-up',
    title: t('trending'),
    value: 'trending',
  },
  {
    icon: 'mdi-tag-heart-outline',
    title: t('followed-tags'),
    value: 'followed tags',
  },
  {
    icon: 'mdi-bookmark-multiple',
    title: t('saved'),
    value: 'saved',
  },
]

const handleChangeMenuItem = (value: string) => {
  router.push({ name: value })
}

const handleLogout = () => {
  // TODO handle logout
}
</script>
<template>
  <v-navigation-drawer :expand-on-hover="!mobile" :rail="!mobile">
    <v-sheet class="d-flex flex-column justify-space-between" height="100%">
      <v-sheet>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/86.jpg"
            title="Adam Sporczyk"
            subtitle="adamspo00@gmailcom"
            rounded="lg"
            @click="handleChangeMenuItem('profile')"
          />
        </v-list>
        <v-divider />
        <v-list density="compact" nav="true">
          <v-list-item
            v-for="menuItem in mainMenuItems"
            :key="menuItem.value"
            :prepend-icon="menuItem.icon"
            :title="menuItem.title"
            :value="menuItem.value"
            :active="activeMenuItem === menuItem.value"
            rounded="lg"
            @click="handleChangeMenuItem(menuItem.value)"
          />
          <v-divider />
          <v-list-item
            v-for="menuItem in secondaryMenuItems"
            :key="menuItem.value"
            :prepend-icon="menuItem.icon"
            :title="menuItem.title"
            :value="menuItem.value"
            :active="activeMenuItem === menuItem.value"
            rounded="lg"
            @click="handleChangeMenuItem(menuItem.value)"
          />
        </v-list>
      </v-sheet>
      <v-sheet>
        <v-list>
          <v-list-item
            prepend-icon="mdi-logout-variant"
            :title="t('logout')"
            value="logout"
            class="text-red"
            :active="false"
            rounded="lg"
            @click-once="handleLogout"
          />
        </v-list>
      </v-sheet>
    </v-sheet>
  </v-navigation-drawer>
</template>
<i18n>{
  "en": {
    "followed": "Followed",
    "followed-tags": "Followed tags",
    "friends": "Friends",
    "home": "Home page",
    "logout": "Logout",
    "saved": "Saved",
    "teams": "Teams",
    "trending": "Trending"
  },
  "pl": {
    "followed": "Obserwowani",
    "followed-tags": "Obserwowane tagi",
    "friends": "Znajomi",
    "home": "Strona główna",
    "logout": "Wyloguj",
    "saved": "Zapisane",
    "teams": "Zespoły",
    "trending": "Zyskujące popularność"
  }
}
</i18n>
