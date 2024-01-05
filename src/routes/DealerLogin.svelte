<script>
  import { setAuth } from "../stores/auth";
  import axios from "axios";
  import Index from "./dealer/index.svelte";

  let dealer_email = "";
  let password = "";
  let error = null;
  let loggedIn = false;

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:8000/dealer/login", {
        dealer_email,
        password,
      });
      const { token } = response.data;

      setAuth(token);
      loggedIn = true;
    } catch (error) {
      console.error("Login failed", error);
      // Set the error message for display using reactive statement
      // $: error = "Login failed. Please check your credentials.";
    }
  }
</script>

{#if loggedIn}
  <div>
    <h1>Dealer Loged in</h1>
    ?<Index />
  </div>
{:else}
  <main class="centered">
    <div class="head">
      <h1>Dealer Login</h1>
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      <form on:submit|preventDefault={handleLogin}>
        <label for="user_email">Username:</label>
        <input type="text" id="user_email" bind:value={dealer_email} required />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />

        <button type="submit">Login</button>
      </form>
    </div>
  </main>
{/if}

<style>
  /* Center the form horizontally and vertically */
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 100% of the viewport height */
  }

  h1 {
    text-align: center;
  }

  form {
    max-width: 300px; /* Adjust the maximum width as needed */
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .head {
    position: relative;
    top: -190px;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
