const $cur = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    $cur.style.transform = `translate(${e.pageX}px,${e.pageY}px)`;
  });
})