<script>
  import { setAuth } from "../stores/auth";
  import axios from "axios";
  import Index from "./dealer/index.svelte";
  //  import Card from "./user/carsCatalouge.svelte";
  import { Card, Button } from "flowbite-svelte";
  //import Sidebar from "./user/Sidebar.svelte";
  let user_email = "";
  let password = "";
  let error = null;
  let loggedIn = false;
  let carsData = [];
  let carsdata = false;

  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";

  let spanClass = "flex-1 ms-3 whitespace-nowrap";

  function fetchCarsData(token) {
    // Use the stored token to make the API call
    console.log("inside fetchcars data");
    axios
      .get("http://localhost:8000/user/viewAllCars", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("taking response");
        // carsData = response.data; // Set the response data to the variable
        // console.log(carsData);
        const carsInformation = JSON.parse(response.data.carsInformation);
        carsData = Object.values(carsInformation);
      })
      .catch((error) => {
        console.error("Error fetching cars data", error);
      });
  }

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        user_email,
        password,
      });
      const { token } = response.data;

      setAuth(token);
      // Save token to sessionStorage
      sessionStorage.setItem("authToken", token);

      if (token) {
        loggedIn = true;
        fetchCarsData(token);
      }
    } catch (error) {
      console.error("Login failed", error);
      // Set the error message for display using reactive statement
      // $: error = "Login failed. Please check your credentials.";
    }
  }

  //testing for button click to open the user car collection
  let display = "none"; // Initial display property value

  function toggleDisplay() {
    // Toggle display property value between 'none' and 'block'
    display = display === "none" ? "block" : "none";

    // Update the style attribute of the element
    document.querySelector(".carCollection").style.display = display;
  }
</script>

{#if loggedIn}
  <div class="col-mg-12" style="display: flex;">
    <div class="col-mg-3 sidebar">
      <button on:click={toggleDisplay} id="mycars">My Cars</button>
    </div>
    <div class="col-mg-7 carCollection" style="margin: 40px; display: none">
      <!-- <h1>User Logged in</h1> -->
      <h2>User Car Collection</h2>
      {#if carsData.length > 0}
        {#each carsData as car (car.car_id)}
          <Card class="car-card">
            <h5 class="car-title">
              {car.name}
            </h5>
            <p class="car-details">
              Model: {car.model}, Color: {car.car_info.color}, Mileage: {car
                .car_info.mileage}
            </p>
            <!-- Include other card content if needed -->
            <!-- <Button class="buy-button">Buy Now!</Button> -->
          </Card>
        {/each}
      {:else}
        <p>No cars data available</p>
      {/if}
    </div>
  </div>
{:else}
  <main class="centered">
    <div class="head">
      <h1>User Login</h1>
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      <form on:submit|preventDefault={handleLogin}>
        <label for="user_email">Username:</label>
        <input type="text" id="user_email" bind:value={user_email} required />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />

        <button type="submit">Login</button>
      </form>
    </div>
  </main>
{/if}

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    text-align: center;
  }

  form {
    max-width: 300px;
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

  .car-title {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #333;
  }
  .carCollection {
    margin: 34px;
    margin-top: 34px;
    background-color: aliceblue;
    margin-top: 44px;
    height: 294px;
    width: 300px;
    padding: 8px;
    overflow: scroll;
  }
  .sidebar {
    background-color: gainsboro;
    height: 500px;
    margin-top: 46px;
    border: 2px solid;
    width: 179px;
  }
  #mycars {
    margin: 10px;
    width: 160px;
    color: white;
    background-color: #ff7139;
  }
</style>
