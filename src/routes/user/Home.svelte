<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";

  import Login from "../login2.svelte";
  import DealerLogin from "../DealerLogin.svelte";
  import AdminLogin from "../AdminLogin.svelte";

  let selectedUserType = "user"; // Default to "user"

  function selectUserType(userType) {
    selectedUserType = userType;
  }
</script>

<div class="navbar">
  <h1>Login Page</h1>
  <div class="login-dropdown">
    <Navbar>
      <NavHamburger />
      <NavUl>
        <NavLi on:click={() => selectUserType("admin")}>Admin</NavLi>
        <NavLi on:click={() => selectUserType("user")}>User</NavLi>
        <NavLi on:click={() => selectUserType("dealer")}>Dealer</NavLi>
      </NavUl>
    </Navbar>
  </div>
</div>

<main>
  {#if selectedUserType === "user"}
    <Login />
  {/if}
  {#if selectedUserType === "admin"}
    <AdminLogin />
  {/if}
  {#if selectedUserType === "dealer"}
    <DealerLogin />
  {/if}
</main>

<style>
  /* Update your styles to match Flowbite styles */
  .navbar {
    background-color: #333;
    padding: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
  }

  .login-dropdown {
    position: relative;
    display: inline-block;
  }
</style>
