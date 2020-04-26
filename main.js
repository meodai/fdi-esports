const parseEntries = entries => {
  const entriesArr = [];
  let currentRow = 1;

  let currentRowArr = [];

  entries.forEach(e => {
    const localRow = parseInt(e.gs$cell.row);
    
    if (currentRow != localRow) {
      currentRow = localRow;
      entriesArr.push([...currentRowArr]);
      currentRowArr = [];
    };

    currentRowArr.push(e.content.$t);
  });

  return entriesArr;
};

const $container = document.querySelector('[data-entries]');
const gSheetJSONsrc = 'https://spreadsheets.google.com/feeds/cells/1O36xe8y9oOeYBOr0mvS7NZLDm83hilO0WB9f75CRnJA/1/public/full?alt=json&rnd=' + 1000 * Math.random() 

fetch(gSheetJSONsrc).then((resp) => (resp.json())).then((body) => {
  const entries = [...body.feed.entry];
  const entriesArr = parseEntries(entries);
  entriesArr.shift();
  const entriesHTML = entriesArr.reduce((r, d) => (
    r + `<details><summary><strong>[FDI]</strong> ${d[0]}</summary><p>${d[1]}</p></details>`
  ),'')

  $container.innerHTML = entriesHTML;
});

const $cur = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    $cur.style.transform = `translate(${e.pageX}px,${e.pageY}px)`;
  });
})