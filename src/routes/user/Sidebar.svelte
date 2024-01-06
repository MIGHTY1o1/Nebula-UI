<script>
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";

  let spanClass = "flex-1 ms-3 whitespace-nowrap";

  function getIconComponent(icon) {
    if (icon) {
      return {
        $$props: {
          class:
            "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
        },
        $$slots: { default: () => [icon] },
      };
    }
    return null;
  }
</script>

<div class="sidebar col-mg-3">
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard" vertical>
          <!-- You can add custom content or styling for the Dashboard item here -->
        </SidebarItem>
        <SidebarItem label="Kanban" {spanClass} vertical>
          <!-- Custom content for Kanban item -->
          <svelte:fragment slot="subtext">
            <span
              class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >
              Pro
            </span>
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Inbox" {spanClass} vertical>
          <!-- Custom content for Inbox item -->
          <svelte:fragment slot="subtext">
            <span
              class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"
            >
              3
            </span>
          </svelte:fragment>
        </SidebarItem>
        <!-- Add other SidebarItems with custom content similarly -->
      </SidebarGroup>
      <SidebarGroup border>
        <!-- Add more SidebarItems with custom content here -->
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>

<style>
  .sidebar {
    background-color: gainsboro;
    height: 500px;
    margin-top: 46px;
    border: 2px solid;
    width: 179px;
  }
</style>
