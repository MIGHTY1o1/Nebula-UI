<!-- ======================script begin===================================== -->
<script>
  //===================imports========================//
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
  let DealershipsData = [];
  let DealerCars = [];
  let carsdata = false;
  let Deals = true;

  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  //========================================================//

  let spanClass = "flex-1 ms-3 whitespace-nowrap";

  //get all cars of user
  function fetchCarsData(token) {
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
        const carsInformation = JSON.parse(response.data.carsInformation);
        carsData = Object.values(carsInformation);
      })
      .catch((error) => {
        console.error("Error fetching cars data", error);
      });
  }

  //fetch deals on cars by deals
  async function fetchDealsOnCars(CarId) {
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:8000/user/viewdealonCars/${CarId}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.message == "No deals found.") {
        console.log("no deals found");
        return null;
      } else {
        console.log("Deals fetched successfully:", response.data);
        return response;
      }

      // You can handle the response data as needed, e.g., updating a variable or triggering other actions
      // return response.data;
      //  return response.data && response.data.length > 0;
    } catch (error) {
      console.error("Error fetching deals on cars", error);
      return null;
    }
  }

  //get all dealerships
  function fetchDealerships(token) {
    console.log("inside fetchcars data");
    axios
      .get("http://localhost:8000/user/dealerships", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("taking response");
        DealershipsData = JSON.parse(response.data.dealershipInformation);

        console.log(DealershipsData);
      })
      .catch((error) => {
        console.error("Error fetching cars data", error);
      });
  }

  //getcars of dealers
  async function fetchCarNames(carIds) {
    console.log(carIds);
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.get(
        "http://localhost:8000/user/getcarsbyid",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            ids: carIds,
          },
        }
      );
      console.log(response.data);
      DealerCars = JSON.parse(response.data.carsData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //handle login
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
        fetchDealerships(token);
      }
    } catch (error) {
      console.error("Login failed", error);
      // Set the error message for display using reactive statement
      // $: error = "Login failed. Please check your credentials.";
    }
  }

  // Initial display property value
  let display = "none";

  //toggle display div
  function toggleDisplay() {
    display = display === "none" ? "block" : "none";
    document.querySelector(".carCollection").style.display = display;
  }
  let selectedDealerData;
  //toggle dealerships div
  function toggleDealerships() {
    display = display === "none" ? "block" : "none";
    document.querySelector(".dealerships").style.display = display;
  }

  //toogle dealerinfo
  function toggleDealershipsinfo() {
    display = display === "none" ? "block" : "none";
    document.querySelector(".dealershipqinfo").style.display = display;
  }

  //select dealer display
  function selectDealer(dealerId) {
    console.log("Selected Dealer ID:", dealerId);
    selectedDealerData = DealershipsData.find(
      (dealership) => dealership.dealership_id === dealerId
    );
    console.log("Selected Dealer Data:", selectedDealerData);
    // //   Add any additional logic you want to perform when a dealer is selected
    // toggleDealershipsinfo();
    display = display === "none" ? "block" : "none";
    document.querySelector(".dealershipinfo").style.display = display;
  }

  //handel buy if user cliclk buy button
  function handleBuy(car) {
    // Add your logic to handle the buy button click for the specific car
    console.log("Buy button clicked for", car.name);
  }
</script>

<!-- ======================script end=============================== -->

<!-- =============================================================== -->
<!-- ========================main body start ============================= -->
<!-- =============================================================== -->

{#if loggedIn}
  userLogedin
  <div class="col-mg-12" style="display: flex;">
    <div class="col-mg-3 sidebar">
      <button on:click={toggleDisplay} id="mycars">My Cars</button>
      <button on:click={toggleDealerships} id="mycars">Dealerships</button>
    </div>
    <!-- my cars -->
    <div class="col-mg-7 carCollection" style="margin: 40px; display: none">
      <!-- <h1>User Logged in</h1> -->
      <h2>Car Collection</h2>
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
          </Card>
        {/each}
      {:else}
        <p>No cars data available</p>
      {/if}
    </div>

    <!-- dealerships -->
    <div class="col-mg-7 dealerships" style="margin: 40px; display: none">
      <h2>Dealerships</h2>
      {#if DealershipsData.length > 0}
        {#each DealershipsData as dealership (dealership.dealership_id)}
          <Card class="car-card" key={dealership.dealership_id}>
            <h5 class="car-title">{dealership.dealership_name}</h5>
            {#if dealership.dealership_info}
              <p class="car-details">
                Location: {dealership.dealership_location}, Established Year: {dealership
                  .dealership_info.establishedYear}
              </p>
            {/if}
            <!-- Include other card content if needed -->
            <!-- <Button class="buy-button">Select Dealer</Button> -->
            <!-- <button on:click={toggleDisplay} id="mycars">Select Dealer</button> -->
            <button
              on:click={() => selectDealer(dealership.dealership_id)}
              id="mycars"
            >
              Select Dealer
            </button>
          </Card>
        {/each}
      {:else}
        <p>No dealerships data available</p>
      {/if}
    </div>

    <!-- dealership info -->
    <div
      class="col-mg-5 dealershipinfo"
      style="margin: 40px; display: none; width: 50%"
    >
      {#if selectedDealerData}
        <h3>Selected Dealer Details</h3>
        <p>Location: {selectedDealerData.dealership_location}</p>
        <p>
          Established Year: {selectedDealerData.dealership_info.establishedYear}
        </p>
        <!-- Add more details as needed -->
        <ul>
          <li>Email: {selectedDealerData.dealership_email}</li>
          <!-- <li>Deals: {selectedDealerData.deals.join(", ")}</li> -->
          <li>
            Cars:
            {#await fetchCarNames(selectedDealerData.cars) then _}
              {#if DealerCars.length > 0}
                <ul style="display: flex;">
                  {#each DealerCars as car (car._id)}
                    <div class="car-card">
                      <p>{car.name} ({car.type})</p>
                      <button class="buy-button" on:click={() => handleBuy(car)}
                        >Buy now!</button
                      >
                      {#await fetchDealsOnCars(car._id) then response}
                        {#if response}
                          <button
                            class="buy-button"
                            on:click={() => handleBuy(car)}>View Deals!</button
                          >
                        {/if}
                      {/await}
                    </div>
                  {/each}
                </ul>
              {:else}
                <p>Loading car names...</p>
              {/if}
            {/await}
          </li>

          <!-- Add more details as needed -->
        </ul>
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

<!-- make id accesable on select dealer 
then open div show dealerhsip details 
then let user select the car to buy
then after this 
 -->

<!-- =============================================================== -->
<!-- ========================main body end============================= -->
<!-- =============================================================== -->

<!-- =============================================================== -->
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
  .dealerships {
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
  #mycars:hover {
    background-color: #007bff;
  }

  /* dealer cars */
  /* Add your styling for the cards here */
  .car-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 200px;
    text-align: center;
  }

  .buy-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
