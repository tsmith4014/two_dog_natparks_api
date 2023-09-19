document.addEventListener("DOMContentLoaded", () => {
  const webcamsContainer = document.getElementById("webcams");
  const fetchWebcamsButton = document.getElementById("fetchWebcamsButton");
  const randomDogButton = document.getElementById("randomDogButton");
  const dogImageContainer = document.getElementById("dogImageContainer");

  // Function to fetch webcam data from the National Park Service API
  async function fetchWebcams() {
    try {
      const response = await fetch(
        "https://developer.nps.gov/api/v1/webcams?api_key=xBbZChwMOwiRzaLjWde5q4gIYFWnGAz8NG2Pvw1L&limit=500"
      );
      const data = await response.json();

      if (response.ok) {
        if (data.data.length === 0) {
          webcamsContainer.innerHTML = "<p>No webcams found.</p>";
          return;
        }

        // Filter and display streaming webcams with video
        const streamingWebcams = data.data.filter(
          (webcam) => webcam.isStreaming
        );

        if (streamingWebcams.length === 0) {
          webcamsContainer.innerHTML = "<p>No streaming webcams found.</p>";
          return;
        }

        // Display streaming webcam data with embedded video
        streamingWebcams.forEach((webcam) => {
          const webcamElement = document.createElement("div");
          webcamElement.classList.add("webcam", "resizeable");

          const titleElement = document.createElement("h2");
          titleElement.textContent = webcam.title;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = webcam.description;

          const videoElement = document.createElement("iframe");
          videoElement.src = webcam.url; // Assuming 'url' contains the video stream URL
          videoElement.allow = "autoplay"; // Autoplay video

          // Set an initial larger size for the webcam displays
          videoElement.width = "800";
          videoElement.height = "600";

          // Add an event listener for resizing the webcam displays
          webcamElement.addEventListener("mousedown", (e) => {
            const initialWidth = webcamElement.clientWidth;
            const initialHeight = webcamElement.clientHeight;
            const initialX = e.clientX;
            const initialY = e.clientY;

            const onMouseMove = (e) => {
              const deltaX = e.clientX - initialX;
              const deltaY = e.clientY - initialY;

              webcamElement.style.width = initialWidth + deltaX + "px";
              webcamElement.style.height = initialHeight + deltaY + "px";
            };

            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          });

          webcamElement.appendChild(titleElement);
          webcamElement.appendChild(descriptionElement);
          webcamElement.appendChild(videoElement);

          webcamsContainer.appendChild(webcamElement);
        });
      } else {
        console.error("Error fetching webcams:", data.error);
        webcamsContainer.innerHTML =
          "<p>An error occurred while fetching webcams.</p>";
      }
    } catch (error) {
      console.error("Error fetching webcams:", error);
      webcamsContainer.innerHTML =
        "<p>An error occurred while fetching webcams.</p>";
    }
  }

  // Function to fetch a random dog image
  async function fetchRandomDogImage() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      if (response.ok) {
        // Display the dog image
        const dogImageElement = document.createElement("img");
        dogImageElement.src = data.message;
        dogImageElement.alt = "Random Doggo";
        dogImageContainer.innerHTML = ""; // Clear previous image (if any)
        dogImageContainer.appendChild(dogImageElement);
      } else {
        console.error("Error fetching random dog image:", data.status);
      }
    } catch (error) {
      console.error("Error fetching random dog image:", error);
    }
  }

  // Add a click event listener to the "Fetch Webcams" button
  fetchWebcamsButton.addEventListener("click", fetchWebcams);

  // Add a click event listener to the "Random Doggo" button
  randomDogButton.addEventListener("click", fetchRandomDogImage);
});
