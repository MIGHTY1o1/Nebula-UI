<!-- src/routes/__layout.svelte -->
<script>
  import { isAuthenticated } from "../stores/auth";
  import { goto } from "svelte-spa-router";
  import { component, props } from "svelte-spa-router";
  $isAuthenticated = isAuthenticated; // Reassuring Svelte that we're using the store

  // Redirect to login if not authenticated
  $: if (!$isAuthenticated) {
    goto("/login");
  }
</script>

<main>
  <svelte:component this={component} {...props} />
</main>
