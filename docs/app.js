// // app.js
// document.addEventListener("DOMContentLoaded", () => {
//   const webcamsContainer = document.getElementById("webcams");
//   const fetchWebcamsButton = document.getElementById("fetchWebcamsButton");
//   const randomDogButton = document.getElementById("randomDogButton");
//   const dogImageContainer = document.getElementById("dogImageContainer");

//   // START: Button movement logic
//   let buttonSpeedX = {
//     fetchWebcamsButton: 2,
//     randomDogButton: 3,
//   };

//   let buttonSpeedY = {
//     fetchWebcamsButton: 2,
//     randomDogButton: 3,
//   };

//   function moveButtons() {
//     [fetchWebcamsButton, randomDogButton].forEach((button) => {
//       let rect = button.getBoundingClientRect();

//       if (rect.left <= 0 || rect.right >= window.innerWidth) {
//         buttonSpeedX[button.id] = -buttonSpeedX[button.id];
//       }
//       if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
//         buttonSpeedY[button.id] = -buttonSpeedY[button.id];
//       }

//       let newXPosition = button.offsetLeft + buttonSpeedX[button.id];
//       let newYPosition = button.offsetTop + buttonSpeedY[button.id];

//       // Keep the buttons within the boundaries
//       newXPosition = Math.max(
//         0,
//         Math.min(newXPosition, window.innerWidth - rect.width)
//       );
//       newYPosition = Math.max(
//         0,
//         Math.min(newYPosition, window.innerHeight - rect.height)
//       );

//       button.style.left = newXPosition + "px";
//       button.style.top = newYPosition + "px";
//     });

//     requestAnimationFrame(moveButtons);
//   }

//   fetchWebcamsButton.addEventListener("mouseover", () => {
//     buttonSpeedX["fetchWebcamsButton"] = 0;
//     buttonSpeedY["fetchWebcamsButton"] = 0;
//   });

//   randomDogButton.addEventListener("mouseover", () => {
//     buttonSpeedX["randomDogButton"] = 0;
//     buttonSpeedY["randomDogButton"] = 0;
//   });

//   moveButtons();
//   // END: Button movement logic

//   async function fetchWebcams() {
//     try {
//       const response = await fetch(
//         "https://developer.nps.gov/api/v1/webcams?api_key=xBbZChwMOwiRzaLjWde5q4gIYFWnGAz8NG2Pvw1L&limit=500"
//       );
//       const data = await response.json();

//       if (response.ok) {
//         data.data.forEach((webcam) => {
//           const webcamElement = document.createElement("div");
//           webcamElement.classList.add("webcam", "resizeable", "fade-in");

//           const titleElement = document.createElement("h2");
//           titleElement.textContent = webcam.title;

//           const descriptionElement = document.createElement("p");
//           descriptionElement.textContent = webcam.description;

//           const videoElement = document.createElement("iframe");
//           videoElement.src = webcam.url;
//           videoElement.allowFullscreen = true;
//           videoElement.style.width = "100%";
//           videoElement.style.height = "100%";

//           const fullscreenButton = document.createElement("button");
//           fullscreenButton.textContent = "Escape Hatch, Dizzy Yet?  ";
//           fullscreenButton.addEventListener("click", () => {
//             if (videoElement.requestFullscreen) {
//               videoElement.requestFullscreen();
//             } else if (videoElement.mozRequestFullScreen) {
//               videoElement.mozRequestFullScreen();
//             } else if (videoElement.webkitRequestFullscreen) {
//               videoElement.webkitRequestFullscreen();
//             }
//           });

//           webcamElement.appendChild(titleElement);
//           webcamElement.appendChild(descriptionElement);
//           webcamElement.appendChild(videoElement);
//           webcamElement.appendChild(fullscreenButton);
//           webcamsContainer.appendChild(webcamElement);

//           setTimeout(() => {
//             webcamElement.classList.add("visible");
//           }, 50);
//         });
//       } else {
//         console.error("Error fetching webcams:", data.error);
//         webcamsContainer.innerHTML =
//           "<p>An error occurred while fetching webcams.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching webcams:", error);
//       webcamsContainer.innerHTML =
//         "<p>An error occurred while fetching webcams.</p>";
//     }
//   }

//   async function fetchRandomDogImage() {
//     try {
//       const response = await fetch("https://dog.ceo/api/breeds/image/random");
//       const data = await response.json();

//       if (response.ok && data.message) {
//         const dogImageElement = document.createElement("img");
//         dogImageElement.src = data.message;
//         dogImageElement.alt = "Random Doggo";
//         dogImageElement.classList.add("fade-in");
//         dogImageContainer.innerHTML = "";
//         dogImageContainer.appendChild(dogImageElement);

//         setTimeout(() => {
//           dogImageElement.classList.add("visible");
//         }, 50);
//       } else {
//         dogImageContainer.innerHTML = `
//             <div class="fade-in visible">
//                 <p>Oops, the dogs are taking a break from the spotlight!</p>
//                 <img src="/doggoicon.png" alt="Dogs resting">
//             </div>`;
//         console.error("Error fetching random dog image:", data.status);
//       }
//     } catch (error) {
//       console.error("Error fetching random dog image:", error);
//     }
//   }

//   fetchWebcamsButton.addEventListener("click", fetchWebcams);
//   randomDogButton.addEventListener("click", fetchRandomDogImage);
// });

document.addEventListener("DOMContentLoaded", () => {
  const webcamsContainer = document.getElementById("webcams");
  const fetchWebcamsButton = document.getElementById("fetchWebcamsButton");
  const randomDogButton = document.getElementById("randomDogButton");
  const dogImageContainer = document.getElementById("dogImageContainer");

  // Ensure buttons always stay on top
  fetchWebcamsButton.style.zIndex = "1000";
  randomDogButton.style.zIndex = "1000";

  // Button movement logic
  let buttonSpeedX = {
    fetchWebcamsButton: 2,
    randomDogButton: 3,
  };

  let buttonSpeedY = {
    fetchWebcamsButton: 2,
    randomDogButton: 3,
  };

  function startButtonMovement(buttonId) {
    buttonSpeedX[buttonId] = Math.random() * 4 - 2; // random value between -2 and 2
    buttonSpeedY[buttonId] = Math.random() * 4 - 2;
  }

  function moveButtons() {
    [fetchWebcamsButton, randomDogButton].forEach((button) => {
      let rect = button.getBoundingClientRect();

      if (rect.left <= 0 || rect.right >= window.innerWidth) {
        buttonSpeedX[button.id] = -buttonSpeedX[button.id];
      }
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        buttonSpeedY[button.id] = -buttonSpeedY[button.id];
      }

      let newXPosition = button.offsetLeft + buttonSpeedX[button.id];
      let newYPosition = button.offsetTop + buttonSpeedY[button.id];

      newXPosition = Math.max(
        0,
        Math.min(newXPosition, window.innerWidth - rect.width)
      );
      newYPosition = Math.max(
        0,
        Math.min(newYPosition, window.innerHeight - rect.height)
      );

      button.style.left = newXPosition + "px";
      button.style.top = newYPosition + "px";
    });

    requestAnimationFrame(moveButtons);
  }

  fetchWebcamsButton.addEventListener("mouseover", () => {
    buttonSpeedX["fetchWebcamsButton"] = 0;
    buttonSpeedY["fetchWebcamsButton"] = 0;
  });

  randomDogButton.addEventListener("mouseover", () => {
    buttonSpeedX["randomDogButton"] = 0;
    buttonSpeedY["randomDogButton"] = 0;
  });

  fetchWebcamsButton.addEventListener("click", () => {
    fetchWebcams();
    buttonSpeedX["fetchWebcamsButton"] = 0;
    buttonSpeedY["fetchWebcamsButton"] = 0;
    setTimeout(() => {
      startButtonMovement("fetchWebcamsButton");
    }, 5000);
  });

  randomDogButton.addEventListener("click", () => {
    fetchRandomDogImage();
    buttonSpeedX["randomDogButton"] = 0;
    buttonSpeedY["randomDogButton"] = 0;
    setTimeout(() => {
      startButtonMovement("randomDogButton");
    }, 5000);
  });

  moveButtons();

  async function fetchWebcams() {
    try {
      const response = await fetch(
        "https://developer.nps.gov/api/v1/webcams?api_key=xBbZChwMOwiRzaLjWde5q4gIYFWnGAz8NG2Pvw1L&limit=500"
      );
      const data = await response.json();

      if (response.ok) {
        data.data.forEach((webcam) => {
          const webcamElement = document.createElement("div");
          webcamElement.classList.add("webcam", "resizeable", "fade-in");

          const titleElement = document.createElement("h2");
          titleElement.textContent = webcam.title;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = webcam.description;

          const videoElement = document.createElement("iframe");
          videoElement.src = webcam.url;
          videoElement.allowFullscreen = true;
          videoElement.style.width = "100%";
          videoElement.style.height = "100%";

          const fullscreenButton = document.createElement("button");
          fullscreenButton.textContent = "Escape Hatch, Dizzy Yet?  ";
          fullscreenButton.addEventListener("click", () => {
            if (videoElement.requestFullscreen) {
              videoElement.requestFullscreen();
            } else if (videoElement.mozRequestFullScreen) {
              videoElement.mozRequestFullScreen();
            } else if (videoElement.webkitRequestFullscreen) {
              videoElement.webkitRequestFullscreen();
            }
          });

          webcamElement.appendChild(titleElement);
          webcamElement.appendChild(descriptionElement);
          webcamElement.appendChild(videoElement);
          webcamElement.appendChild(fullscreenButton);
          webcamsContainer.appendChild(webcamElement);

          setTimeout(() => {
            webcamElement.classList.add("visible");
          }, 50);
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

  async function fetchRandomDogImage() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      if (response.ok && data.message) {
        const dogImageElement = document.createElement("img");
        dogImageElement.src = data.message;
        dogImageElement.alt = "Random Doggo";
        dogImageElement.classList.add("fade-in");
        dogImageContainer.innerHTML = "";
        dogImageContainer.appendChild(dogImageElement);

        setTimeout(() => {
          dogImageElement.classList.add("visible");
        }, 50);
      } else {
        dogImageContainer.innerHTML = `
            <div class="fade-in visible">
                <p>Oops, the dogs are taking a break from the spotlight!</p>
                <img src="/doggoicon.png" alt="Dogs resting">
            </div>`;
        console.error("Error fetching random dog image:", data.status);
      }
    } catch (error) {
      console.error("Error fetching random dog image:", error);
    }
  }
});
