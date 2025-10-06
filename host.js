const perPage = 39;const firstText = 'Đầu';const lastText = 'Cuối';const prevText = '« Về';const nextText = 'Tiếp »';const url = location.href;const homePage = '/';
let currentPageNo = 1;let postLabel = '';let currentPage = 'page';let noPage = 1;
if (url.includes('/search/label/')) {
  currentPage = 'label';const labelStart = url.indexOf('/search/label/') + 14;const labelEnd = url.indexOf('?') !== -1 ? url.indexOf('?') : url.length;
  postLabel = url.substring(labelStart, labelEnd);
}
if (url.includes('#PageNo=')) {currentPageNo = parseInt(url.split('#PageNo=')[1]) || 1;noPage = currentPageNo;}
const feedUrl = currentPage === 'label'
  ? `${homePage}feeds/posts/summary/-/${postLabel}?alt=json&max-results=0`
  : `${homePage}feeds/posts/summary?alt=json&max-results=0`;
fetch(feedUrl)
  .then(res => res.json())
  .then(data => {
    const totalPosts = data.feed.openSearch$totalResults.$t;
    renderPagination(totalPosts);
  });
function renderPagination(totalPosts) {
  const lastPage = Math.ceil(totalPosts / perPage);
  const pageArea = document.getElementById('blog-pager');
  let html = `<span class='showpageOf'>Trang ${currentPageNo} / ${lastPage}</span>`;
if (currentPageNo > 1) {
    html += `<a href="#" onclick="noPage=1;redirectToPage(1);return false;">${firstText}</a>`;
  }
 if (currentPageNo < 4) {
    // Hiển thị 1–4
    for (let i = 1; i <= 4 && i <= lastPage; i++) {
      html += i === currentPageNo
        ? `<span class="pagecurrent">${i}</span>`
        : `<a href="#" onclick="noPage=${i};redirectToPage(${i});return false;">${i}</a>`;
    }
    if (lastPage > 6) html += `<span>...</span>`;
  } else {
    // Hiển thị ... | trang-1 | trang | trang+1 | ...
    if (currentPageNo > 4) html += `<span>...</span>`;
    for (let i = currentPageNo - 1; i <= currentPageNo + 1; i++) {
      if (i > 0 && i <= lastPage - 2) {
        html += i === currentPageNo
          ? `<span class="pagecurrent">${i}</span>`
          : `<a href="#" onclick="noPage=${i};redirectToPage(${i});return false;">${i}</a>`;
      }
    }
    if (currentPageNo + 1 < lastPage - 2) html += `<span>...</span>`;
  }

  // Hiển thị 2 trang cuối
  for (let i = lastPage - 1; i <= lastPage; i++) {
    if (i > 4) {
      html += i === currentPageNo
        ? `<span class="pagecurrent">${i}</span>`
        : `<a href="#" onclick="noPage=${i};redirectToPage(${i});return false;">${i}</a>`;
    }
  }

  pageArea.innerHTML = html;
}

function redirectToPage(pageNo) {
  if (pageNo === 1) {
    const newUrl = currentPage === 'label'
      ? `/search/label/${postLabel}?max-results=${perPage}#PageNo=1`
      : `/search?max-results=${perPage}#PageNo=1`;
    location.href = newUrl;
    return;
  }

  const jsonStart = (pageNo - 1) * perPage;
  const callback = 'handleRedirectDate';
  const url = currentPage === 'label'
    ? `${homePage}feeds/posts/summary/-/${postLabel}?start-index=${jsonStart}&max-results=1&alt=json-in-script&callback=${callback}`
    : `${homePage}feeds/posts/summary?start-index=${jsonStart}&max-results=1&alt=json-in-script&callback=${callback}`;

  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

function handleRedirectDate(root) {
  const entry = root.feed.entry[0];
  const timestamp = encodeURIComponent(entry.published.$t.substring(0, 19) + entry.published.$t.substring(23));
  const newUrl = currentPage === 'label'
    ? `/search/label/${postLabel}?updated-max=${timestamp}&max-results=${perPage}#PageNo=${noPage}`
    : `/search?updated-max=${timestamp}&max-results=${perPage}#PageNo=${noPage}`;

  location.href = newUrl;
}
