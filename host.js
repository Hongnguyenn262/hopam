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
