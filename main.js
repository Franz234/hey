var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {
  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");

  // Load the data set from the assets folder:
  console.log(d3.csv("cars.csv", function (error, data) {
    if (error) {
      throw error;
    }
  }));
  
  
};
