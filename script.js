
function fade() {
  var section1 = document.getElementById("section1");
  var section2 = document.getElementById("section2");

  // Fade out section 1
  section1.classList.add("hidden");

  // Fade in section 2 after a short delay
  setTimeout(function () {
    section2.classList.remove("hidden");
  }, 2500);
}
export { fade };


