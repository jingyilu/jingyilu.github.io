(() => {
  const viewer = document.getElementById("research-lightbox");
  const enlargedImage = viewer.querySelector(".research-lightbox__image");
  const caption = viewer.querySelector(".research-lightbox__caption");

  let previousOverflow;

  document.querySelectorAll(".research-image-button").forEach(button => {
    button.addEventListener("click", () => {
      const thumbnail = button.querySelector("img");

      enlargedImage.src = button.dataset.full || thumbnail.src;
      enlargedImage.alt = thumbnail.alt;
      caption.textContent = button.dataset.caption || "";

      previousOverflow = document.body.style.overflow;
      viewer.showModal();
      document.body.style.overflow = "hidden";
    });
  });

  viewer.addEventListener("close", () => {
    document.body.style.overflow = previousOverflow;
    enlargedImage.removeAttribute("src");
  });

  // Dismiss when clicking outside the viewer.
  viewer.addEventListener("click", event => {
    if (event.target !== viewer) return;

    const bounds = viewer.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) viewer.close();
  });
})();
