function LoaderDisapears(e) {
  let loader = document.getElementById("loader-wrapper");
  const main_screen = document.getElementById("main-screen");
  loader.style.display = "none";
  main_screen.style.display = "block";
}

window.addEventListener("load", LoaderDisapears);
