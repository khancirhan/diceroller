/*
    Toggle the instruction modal when someone clicks the button
*/

document.querySelector(".menu-dots").addEventListener("click", function() {
  document.querySelector(".inst-modal").classList.toggle("visible");
  document.querySelector(".menu-dots").classList.toggle("visible");
});

document.querySelector(".modal-close").addEventListener("click", function() {
  document.querySelector(".inst-modal").classList.remove("visible");
  document.querySelector(".menu-dots").classList.remove("visible");
});
