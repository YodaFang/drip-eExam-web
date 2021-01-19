<template>
  <v-app id="inspire">
    <v-system-bar app dark color="blue lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <h3 class="white--text">任务 - 测试  已完成 12/30</h3>
      <v-spacer></v-spacer>
      <h3 class="purple--text">剩余 30 分钟</h3>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-4"
    >
    <v-list>
        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>判断题</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title], i) in admins"
            :key="i"
            link
          >
            <v-badge
              color="primary"
              icon="mdi-check"
            >
            <v-list-item-title v-text="title"></v-list-item-title>
            </v-badge>
            <v-list-item-icon>
              <v-icon color="primary">mdi-check</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>选择题</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6 mx-auto"
        fluid
      >
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card color="lighten-2"
        >
        <v-breadcrumbs :items="items" />
        <v-card-title class="headline gray lighten-3">
         Search for Public APIs
        </v-card-title>
         <v-radio-group
         class="px-6"
      v-model="radios"
    >
      <v-radio
        label="Radio 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
        </v-card>
        <v-card height="100">
        </v-card>
      </v-container>
    </v-main>
  <v-footer
    color="transparent"
    max-width="190"
    class="mx-auto"
    padless
    fixed
  >
    <v-row
      justify="center"
      color="rgba(0, 0, 0, .3)"
      no-gutters
    >
      <v-progress-circular
      :rotate="360"
      :size="85"
      :width="10"
      :value="value"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>
    <v-spacer></v-spacer>
    <v-progress-circular
      :rotate="360"
      :size="85"
      :width="10"
      :value="value"
      color="purple"
    >
      {{ value }} / 100
    </v-progress-circular>
    </v-row>
  </v-footer>
  
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: null,
      admins: [
        ['1', 'mdi-check-circle'],
        ['2', 'mdi-cog-outline'],
        ['1', 'mdi-check-circle'],
        ['2', 'mdi-cog-outline'],
        ['1', 'mdi-check-circle'],
        ['2', 'mdi-cog-outline'],
        ['1', 'mdi-check-circle'],
        ['2', 'mdi-cog-outline'],
        ['1', 'mdi-check-circle'],
        ['2', 'mdi-cog-outline'],
      ],
      cruds: [
        ['1', 'mdi-plus-outline'],
        ['2', 'mdi-file-outline'],
        ['3', 'mdi-update'],
        ['4', 'mdi-delete'],
        ['1', 'mdi-plus-outline'],
        ['2', 'mdi-file-outline'],
        ['3', 'mdi-update'],
        ['4', 'mdi-delete'],
      ],
      items: [
        {
          text: '单选',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
      interval: {},
      value: 0,
    }),
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
  }
</script>