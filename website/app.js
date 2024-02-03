const buttonGenerate = document.getElementById("generate");

// Main function
const getDataFromWeather = async (zipcode, feeling) => {
  try {
    const response = await fetch(
      `http://localhost:8000/?zipcode=${zipcode}&feeling=${feeling}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Adjust the content type if needed
        },
        credentials: "include",
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Event
buttonGenerate.addEventListener("click", async (e) => {
  const zipcode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;

  const data = await getDataFromWeather(zipcode, feeling);

  //console.log(data.date, data.temperature, data.userResponse);

  //passing data
  document.getElementById("date").innerText = `Date: ${data.date}`;
  document.getElementById(
    "temp"
  ).innerText = `Temperature: ${data.temperature}`;
  document.getElementById(
    "content"
  ).innerText = `Feeling: ${data.userResponse}`;
});
