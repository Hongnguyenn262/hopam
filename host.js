(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbxqQ3csvAMq_8JiFbDtQfLIvxrDDG3Wz3LaWollYGBb8yaVIbrBSEE-_5ZjXjzlqfX8/exec";

  async function updateViews() {
    const el = document.querySelector("#luot-xem");
    if (!el) return;

    const span = document.createElement("span");
    span.style.fontSize = "11px";
    span.style.color = "#666";
    span.style.marginLeft = "10px";
    span.textContent = "👁 ...";
    el.appendChild(span);

    try {
      const href = location.href.split("?")[0]; // tránh trùng URL khi có query
      const res = await fetch(`${API_URL}?url=${encodeURIComponent(href)}`);
      const data = await res.json();
      span.textContent = `👁 ${data.views}`;
    } catch (err) {
      span.textContent = "👁 N/A";
    }
  }

  document.addEventListener("DOMContentLoaded", updateViews);
})();
// hợp âm sử dụng trong bài:
// ==============================================
//  🔸 Tô màu tiêu đề "HỢP ÂM SỬ DỤNG TRONG BÀI"
// ==============================================

document.addEventListener("DOMContentLoaded", function() {
  const postBody = document.querySelector(".post-body");
  if (!postBody) return; // chỉ chạy trong trang bài viết

  postBody.querySelectorAll("p, div, span").forEach(function(el) {
    el.childNodes.forEach(function(node) {
      if (node.nodeType === 3 && node.textContent.includes("HỢP ÂM SỬ DỤNG TRONG BÀI")) {
        const newHTML = node.textContent.replace(
          "HỢP ÂM SỬ DỤNG TRONG BÀI",
          "<span class='highlight-chord-title'>HỢP ÂM SỬ DỤNG TRONG BÀI</span>"
        );
        const wrapper = document.createElement("span");
        wrapper.innerHTML = newHTML;
        node.replaceWith(wrapper);
      }
    });
  });
});

// CSS highlight chèn tự động nếu chưa có
(function() {
  if (document.getElementById("highlight-style")) return;
  const style = document.createElement("style");
  style.id = "highlight-style";
  style.textContent = `
    .highlight-chord-title {
      font-weight: bold;
      color: #38761d;
      font-size: 16px;
    }
  `;
  document.head.appendChild(style);
})();
