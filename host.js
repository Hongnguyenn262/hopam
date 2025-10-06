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
document.addEventListener(&quot;DOMContentLoaded&quot;, function() {
  // Giới hạn chỉ quét trong phần nội dung bài viết
  const postBody = document.querySelector(&quot;.post-body&quot;);
  if (!postBody) return; // nếu không có thì thoát

  postBody.querySelectorAll(&quot;p, div, span&quot;).forEach(function(el) {
    if (el.childNodes.length) {
      el.childNodes.forEach(function(node) {
        if (node.nodeType === 3 &amp;&amp; node.textContent.includes(&quot;HỢP ÂM SỬ DỤNG TRONG BÀI&quot;)) {
          const newHTML = node.textContent.replace(
            &quot;HỢP ÂM SỬ DỤNG TRONG BÀI&quot;,
            &quot;<span class='highlight-chord-title'>HỢP ÂM SỬ DỤNG TRONG BÀI</span>&quot;
          );
          const wrapper = document.createElement(&quot;span&quot;);
          wrapper.innerHTML = newHTML;
          node.replaceWith(wrapper);
        }
      });
    }
  });
});

