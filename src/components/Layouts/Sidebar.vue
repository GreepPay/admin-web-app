<template>
  <aside
    class="w-64 border-r border-gray-200 bg-white h-screen hidden md:block"
    :class="{ hidden: !isSidebarOpen && isMobile }"
  >
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="bg-primary rounded-full p-2 mr-2">
          <span class="text-white text-xl">⚡</span>
        </div>
        <h1 class="text-primary text-xl font-bold tracking-tight">GREEP</h1>
      </div>
    </div>

    <div class="p-4">
      <div
        v-for="(section, sectionIndex) in sidebarSections"
        :key="sectionIndex"
        class="mb-6"
      >
        <h2 class="text-xs text-gray-500 font-medium mb-2 uppercase">
          {{ section.title }}
        </h2>
        <ul>
          <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
            <a
              href="#"
              class="flex items-center py-2 px-2 rounded-lg text-sm"
              :class="
                item.active
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-700 hover:bg-gray-100'
              "
            >
              <!-- <span class="mr-2">
                <component :is="item.icon" />
              </span> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <button
          class="flex items-center text-red-500 mt-10 px-2 py-2 w-full text-sm hover:bg-gray-100 rounded-lg"
        >
          <LogoutIcon class="mr-2" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { inject, ref, computed } from "vue"
  // import { DashboardIcon, PieChartIcon, RepeatIcon, WalletIcon, StoreIcon, UserIcon, ShieldIcon, CheckSquareIcon, ArrowDownCircleIcon, LogoutIcon } from './icons';

  const isSidebarOpen = inject("isSidebarOpen", ref(true))
  const isMobile = ref(window.innerWidth < 768)

  // Handle resize events
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 768
  })

  const sidebarSections = ref([
    {
      title: "General",
      items: [
        { title: "Dashboard", /*icon: DashboardIcon,*/ active: true },
        { title: "Analytics", /*icon: PieChartIcon,*/ active: false },
        { title: "Transactions", /*icon: RepeatIcon,*/ active: false },
        { title: "Wallets", /*icon: WalletIcon,*/ active: false },
      ],
    },
    {
      title: "Accounts",
      items: [
        { title: "Merchant", /*icon: StoreIcon,*/ active: false },
        { title: "Customer", /*icon: UserIcon,*/ active: false },
        { title: "Admin", /*icon: ShieldIcon,*/ active: false },
      ],
    },
    {
      title: "Merchant",
      items: [
        { title: "Verification", /*icon: CheckSquareIcon,*/ active: false },
        { title: "Withdrawal", /*icon: ArrowDownCircleIcon,*/ active: false },
      ],
    },
  ])
</script>
