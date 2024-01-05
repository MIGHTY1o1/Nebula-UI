<!-- src/routes/index.svelte -->
<script>
  import { isAuthenticated } from "../../stores/auth";

  // $: if (!$isAuthenticated) {
  //   // Redirect to login if not authenticated
  //   import("svelte-spa-router").then(({ goto }) => {
  //     goto("/login");
  //   });
  // }
</script>

<main>
  <h1>Welcome to the Car Dealership</h1>
</main>
