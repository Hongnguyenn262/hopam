// đăng nhập - đăng ký - yêu thích
const firebaseConfig={apiKey:"AIzaSyD8wwbYCF1e2Yh--udDvOSPWx40Ga3qBKU",authDomain:"login-timhopam.firebaseapp.com",projectId:"login-timhopam",storageBucket:"login-timhopam.firebasestorage.app",messagingSenderId:"588448339429",appId:"1:588448339429:web:07514982e72c5726150b0c",measurementId:"G-LNFSSSMKEL"};
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth=firebase.auth(), db=firebase.firestore();

/* ---- NEW: CSS & chỗ gắn icon mobile ---- */
(function injectMobileUserSpot(){
  // CSS
  if(!document.getElementById("mobile-user-spot-style")){
    const st=document.createElement("style");
    st.id="mobile-user-spot-style";
    st.textContent = `
      @media (max-width:768px){
        #user-nav{display:none!important;}
        .mobile-user-spot{display:block;position:absolute;right:12px;top:12px;z-index:20}
        .mobile-user-spot .user-icon{
          display:inline-flex;align-items:center;justify-content:center;
          width:60px;height:36px;border-radius:8px;color:#38761d;
          text-decoration:none;font-size:18px;line-height:1;
        }
      }
      @media (min-width:769px){ .mobile-user-spot{display:none!important;} }
    `;
    document.head.appendChild(st);
  }
  // Container (đặt trong header-items nếu có, fallback flex-right)
  const host = document.querySelector(".header-items") || document.querySelector(".flex-right") || document.body;
  if(host && !document.getElementById("mobile-user-spot")){
    const spot=document.createElement("div");
    spot.id="mobile-user-spot"; spot.className="mobile-user-spot";
    host.appendChild(spot);
  }
})();

/* ---- Lưu bài yêu thích (giữ nguyên) ---- */
function saveFavorite(uid,title,url){
  return db.collection("favorites").doc(uid).collection("songs").add({
    title, url, createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/* ---- Render nav (desktop) + icon (mobile) ---- */
function renderUserNav(user){
  // Desktop giữ nguyên như cũ
  const desktopHtml = user
    ? `<span class="greeting">👋 Xin chào, <b>${user.email}</b></span><div style="margin-left:50px;"><a href="/p/user.html">Trang cá nhân</a> | <a href="#" id="logout-link">Đăng xuất</a></div>`
    : `<span class="greeting"><a href="/p/dang-nhap.html">Đăng nhập</a> | <a href="/p/dang-ky.html">Đăng ký</a></span>`;

  ["#user-nav","#main-mobile-nav #user-nav"].forEach(sel=>{
    const el=document.querySelector(sel);
    if(el) el.innerHTML=desktopHtml;
  });

  // Mobile icon: bên phải logo
  const mobileSpot=document.getElementById("mobile-user-spot");
  if(mobileSpot){
    mobileSpot.innerHTML = user
      ? `<a href="/p/user.html" class="user-icon" aria-label="Trang cá nhân"><i style="  font-size: 12px;  MARGIN: 7px;   margin-top: 13px;  font-weight: BOLD;">Hi !</i> 💁</a>`
      : `<a href="/p/dang-nhap.html" class="user-icon" aria-label="Đăng nhập"> 👤</a>`;
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  auth.onAuthStateChanged(renderUserNav);
  document.addEventListener("click",e=>{
    const t=e.target;

    // Lưu yêu thích (giữ nguyên)
    if(t.classList.contains("btn-favorite")){
      const title=t.dataset.title, url=t.dataset.url, user=auth.currentUser;
      if(!user){
        alert("⚠️ Bạn cần đăng nhập để lưu bài hát!");
        location.href="/p/dang-nhap.html";
        return;
      }
      saveFavorite(user.uid,title,url)
        .then(()=>alert(`✅ Đã thêm '${title}' vào danh sách yêu thích!`))
        .catch(err=>alert("❌ Lỗi: "+err.message));
    }

    // Logout (giữ nguyên)
    if(t.id==="logout-link"){
      e.preventDefault();
      auth.signOut().then(()=>location.href="/");
    }
  });
});

//  Label Việt hóa + Gom nhóm cho Blogspot (hoạt động qua CDN)
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
   const labelMap = {
    "chachacha": "Cha Cha Cha", "hong-ngoc": "Hồng Ngọc", "le-quyen": "Lệ Quyên", "my-tam": "Mỹ Tâm", "tuan-hung": "Tuấn Hưng", "nhac-tre": "Nhạc Trẻ", "quan-anh-vuong": "Quân Anh Vương", 
"chau-gia-kiet": "Châu Gia Kiệt", "thai-minh": "Thái Minh", "nhac-hoa": "Nhạc Hoa", "ballade": "Ballade", "dat-g": "Đạt G", "pham-anh-quan": "Phạm Anh Quân", "bich-phuong": "Bích Phương", "pham-thanh-ha": "Phạm Thanh Hà",
"hoa-vinh": "Hoa Vinh", "quoc-thien": "Quốc Thiên", "anh-viet-thanh": "Anh Việt Thanh", "bolero": "Bolero", "nhu-quynh": "Như Quỳnh", "nhac-vang": "Nhạc Vàng", "ha-hai-dang":"Hà Hải Đăng", "lam-chan-huy": "Lâm Chấn Huy", "slow-rock": "Slow Rock",
"nhac-tru-tinh": "Nhạc Trữ Tình", "pham-anh-khoa": "Phạm Anh Khoa", "tan-minh": "Tấn Minh", "tran-tien": "Trần Tiến", "bang-kieu": "Bằng Kiều", "tran-tam": "Trần Tâm", "blues": "Blues", "hoai-an": "Hoài An", "ly-hai": "Lý Hải", "dung-hoang-pham": "Dung Hoàng Phạm",
"khac-viet": "Khắc Việt", "tien-cookie": "Tiên Cookie", "tung-duong": "Tùng Dương", "tang-duy-tan": "Tăng Duy Tân", "cao-thai-son": "Cao Thái Sơn", "nguyen-van-chung": "Nguyễn Văn Chung", "nhac-que-huong": "Nhạc Quê Hương", "nhac-cach-mang": "Nhạc Cách Mạng",
"nhac-thieu-nhi": "Nhạc Thiếu Nhi", "nhac-dan-ca": "Nhạc Dân Ca", "slow": "Slow", "bossa nova": "Bossa Nova", "boston": "Boston", "habanera": "Habanera", "anh-bang": "Anh Bằng", "anh-kiet": "Anh Kiệt",
 "minh-khang":" Minh Khang", "quang-huy": "Quang Huy", "lam-phuong": "Lam Phương", "nguyen-hong-thuan": "Nguyễn Hồng Thuận", "tran-thien-thanh": "Trần Thiện Thanh", "trinh-cong-son": "Trịnh Công Sơn", "nguyen-hoai-anh": "Nguyễn Hoài Anh", "dong-thien-duc": "Đông Thiên Đức",
  "duc-tri": "Đức Trí", "hong-xuong-long": "Hồng Xương Long", "ngo-thuy-mien": "Ngô Thuỵ Miên",
"nguyen-hai-phong": "Nguyễn Hải Phong", "chau-ky": "Châu Kỳ", "phu-quang": "Phú Quang",
"xuan-hong": "Xuân Hồng", "duong-khac-linh": "Dương Khắc Linh", "nguyen-ngoc-thien": "Nguyễn Ngọc Thiện",
"pham-duy": "Phạm Duy", "quoc-dung": "Quốc Dũng", "tuan-khanh": "Tuấn Khanh", "pham-minh-tuan": "Phạm Minh Tuấn",
"phi-bang": "Phi Bằng", "thai-thinh": "Thái Thịnh", "tu-huy": "Từ Huy", "an-thuyen": "An Thuyên", "khac-hung": "Khắc Hưng", "le-cuong": "Lê Cương", "nguyen-anh-9": "Nguyễn Ánh 9", "nguyen-vinh-tien": "Nguyễn Vĩnh Tiến", "thai-hoc": "Thái Học", "phan-dinh-chuong": "Phan Đình Chương",
"cam-ly": "Cẩm Ly", "dan-truong": "Đan Trường", "dan-nguyen": "Đan Nguyên", "dam-vinh-hung": "Đàm Vĩnh Hưng", "ung-hoang-phuc": "Ưng Hoàng Phúc",
"phi-nhung": "Phi Nhung", "ngoc-son": "Ngọc Sơn", "phuong-thanh": "Phương Thanh", "quang-dung": "Quang Dũng", "quang-linh": "Quang Linh", "lam-truong": "Lam Trường",
"phuong-my-chi": "Phương Mỹ Chi", "luu-chi-vy": "Lưu Chí Vỹ", "minh-tuyet": "Minh Tuyết", "phan-dinh-tung": "Phan Đình Tùng",
"quang-vinh": "Quang Vinh", "thanh-lam": "Thanh Lam", "hong-nhung": "Hồng Nhung", "tuan-vu": "Tuấn Vũ", "den-vau": "Đen Vâu",
"duy-manh": "Duy Mạnh", "khanh-phuong": "Khánh Phương", "lala-tran": "Lala Trần", "ho-ngoc-ha": "Hồ Ngọc Hà", "hoai-lam": "Hoài Lâm",
"bao-thy": "Bảo Thy", "minh-hang":"Minh Hằng", "ha-anh-tuan":"Hà Anh Tuấn", "hoang-chau":"Hoàng Châu", "jimmii-nguyen":"Jimmii Nguyễn",
"lam-hung":"Lâm Hùng", "thanh-thao":"Thanh Thảo", "ho-quynh-huong":"Hồ Quỳnh Hương", "le-bao-binh":"Lê Bảo Bình", "pham-quynh-anh":"Phạm Quỳnh Anh", "my-linh":"Mỹ Linh",
"thuong-vo": "Thương Võ", "tran-lap": "Trần Lập", "tuan-ngoc": "Tuấn Ngọc", "vang-quang-long": "Vâng Quang Long", "bich-phuong": "Bích Phương", "dinh-dung": "Đình Dũng", "duong-ngoc-thai": "Dương Ngọc Thái",
"the-men": "The Men", "truong-vu": "Trường Vũ", "dieu-kien": "Diệu Kiên", "ho-quang-hieu": "Hồ Quang Hiếu", "khai-dang": "Khải Đăng",  "pham-khanh-hung": "Phạm Khánh Hưng",
  "phan-manh-quynh": "Phan Mạnh Quỳnh", "son-tung-mtp": "Sơn Tùng MTP", "bao-anh": "Bảo Anh", "pham-anh-khoa": "Phạm Anh Khoa", "quach-thanh-danh": "Quách Thành Danh", "tang-duy-tan": "Tăng Duy Tân",
  "ta-minh-tam": "Tạ Minh Tâm", "akira-phan": "Akira Phan", "huong-lan": "Hương Lan", "nhat-tinh-anh": "Nhật Tinh Anh", "tien-cookie": "Tiên Cookie","vinh-thuyen-kim": "Vĩnh Thuyên Kim","dung-hoang-pham": "Dung Hoàng Phạm", "hkt": "HKT",
  "luong-bang-quang": "Lương Bằng Quang","thanh-thuy": "Thanh Thuy", "thu-minh": "Thu Minh", "nal": "Hồ Phi Nal","vicky-nhung": "Vicky Nhung", "giang-hong-ngoc": "Giang Hồng Ngọc", "ho-viet-trung": "Hồ Việt Trung",
  "luong-bich-huu": "Lương Bích Hữu", "quach-beam": "Quach Beam", "quang-ha": "Quang Hà", "axn": "Axn", "hien-thuc": "Hiền Thục",  "hong-ngoc": "Hồng Ngọc", "jack": "Jack (J97)", "khanh-ngoc": "Khánh Ngọc", "lan-nha": "Lân Nhã",
  "nguyen-hung": "Nguyễn Hưng", "vu-quoc-viet": "Vũ Quốc Việt", "anh-kiet": "Anh Kiệt", "dong-nhi": "Đông Nhi", "elvis-phuong": "Elvis Phương", "huong-luzz": "Hương Luzz",

"la-phong-lam": "Lã Phong Lâm", "thuy-chi": "Thuỳ Chi", "van-mai-huong": "Văn Mai Hương", "hoa-minzy": "Hoà Minzy", "kasim-hoang-vu": "Kasim Hoàng Vũ", "khoi-my": "Khởi My", "thu-thuy": "Thu Thuỷ", "trinh-thang-binh": "Trịnh Thăng Bình", "chu-bin": "Chu Bin", 
"karick": "Karick", "mtv": "MTV", "pham-thanh-thao": "Phạm Thanh Thảo", "truc-nhan": "Trúc Nhân", "vo-ha-tram": "Võ Hạ Trâm", "anh-tu": "Anh Tú", "chi-dan": "Chi Dân", "hai-bang": "Hải Băng", "miu-le": "Miu Lê", "vi-oanh": "Vi Oanh", "vu-ha": "Vũ Hà",
 "h2k": "H2K", "hana-cam-tien": "Hana Cẩm Tiên", "khanh-ly": "Khánh Ly", "thanh-dat": "Thành Đạt", "tran-thu-ha": "Trần Thu Hà", "van-mai-huong": "Văn Mai Hương", "huynh-jame": "Huỳnh Jame", "khanh-don": "Khánh Đơn", "nguyen-phi-hung": "Nguyễn Phi Hùng", 
"thuy-tien": "Thuỷ Tiên", "bui-anh-tuan": "Bùi Anh Tuấn", "hoang-anh": "Hoàng Anh", "lam-chan-khang": "Lâm Chấn Khang", "ngo-quoc-linh": "Ngô Quốc Linh", "thien-truong": "Thiên Trường", "tung-duong": "Tùng Dương", "vu-hoang": "Vũ Hoàng",
 "chau-khai-phong": "Châu Khải Phong", "chu-thuy-quynh": "Chu Thuý Quỳnh", "justatee": "Justatee", "pham-hong-phuoc": "Phạm Hồng Phước", "viet-quang": "Việt Quang", "dickson-nguyen": "Dickson Nguyễn", "han-thai-tu": "Hàn Thái Tú",
 "khac-hung": "Khắc Hưng", "long-nhat": "Long Nhật",
"luong-gia-huy": "Lương Gia Huy", "may-trang": "Mây Trắng", "nguyen-hung": "Nguyễn Hưng", "noo-phuoc-thinh": "Noo Phước Thịnh", "onlyc": "OnlyC", "phuong-linh": "Phương Linh", "quach-tuan-du": "Quách Tuấn Du", "quan-anh-vuong": "Quân Anh Vương",
 "sy-luan": "Sỹ Luân", "trung-ngon": "Trung Ngon", "truong-dan-huy": "Trương Đan Huy", "vu-quoc-viet": "Vũ Quốc Việt", "weboys": "Weboys", "yanbi": "Yanbi", "bang-cuong": "Bằng Cường", "ha-nhi": "Hà Nhi", "hien-ho": "Hiền Hồ", "hoang-thuy-linh": "Hoàng Thuỳ Linh",
 "huong-tram": "Hương Tràm", "huynh-ai-vy": "Huỳnh Ái Vy", "nam-cuong": "Nam Cường", "ngo-quoc-linh": "Ngô Quốc Linh", "nguyen-thac-bao-ngoc": "Nguyễn Thạc Bảo Ngọc", "nhat-kim-anh": "Nhật Kim Anh", "thanh-ngoc": "Thanh Ngọc", "tien-tien": "Tiên Tiên",
 "truong-the-vinh": "Trương Thế Vinh", "uyen-trang": "Uyên Trang", "vu-cat-tuong": "Vũ Cát Tường", "acmn": "ACMN", "binz": "Binz", "bui-lan-huong": "Bùi Lan Hương", "dang-khoi": "Đăng Khôi", "hat": "HAT", "hoa-vinh": "Hoa Vinh", "huyr": "HuyR", "jusky-san": "Jusky San", 
"kicm": "KICM", "lam-vu": "Lâm Vũ", "luu-gia-bao": "Lưu Gia Bảo", "mbk": "MBK", "min": "Min", "minh-vuong-m4u": "Minh Vương M4U", "mr-t": "Mr T", "myra-tran": "Myra Trần", "ngoc-khue": "Ngọc Khuê", "nguyen-phi-hung": "Nguyễn Phi Hùng", "nguyen-dinh-vu": "Nguyễn Đình Vũ", "phuong-vy": "Phương Vy", "phao": "Pháo", "quan-ap": "Quân AP", "quang-hung-masterd": "Quang Hùng MasterD", "suboi": "Suboi", "thai-trinh": "Thái Trinh", "thanh-bui": "Thanh Bùi", "thai-tuyet-tram": "Thái Tuyết Trâm", "tina-ho": "Tina Ho", 
"truong-quynh-anh": "Trương Quỳnh Anh", "uyen-linh": "Uyên Linh", "viet-khang": "Việt Khang", "wanbi-tuan-anh": "Wanbi Tuấn Anh", "y-moan": "Y Moan", "chau-viet-cuong": "Châu Việt Cường", "danhka": "Danhka", "dat-long-vinh": "Đạt Long Vinh", 

"hamlet-truong": "Hamlet Trương", "hoang-hai": "Hoàng Hải", "kay-tran": "Kay Trần", "mat-ngoc": "Mắt Ngọc", "mono": "Mono", "nguyen-dinh-vu": "Nguyễn Đình Vũ", "phuong-thao": "Phương Thảo", "son-ca": "Sơn Ca", "tri-hai": "Trí Hải", "trieu-hoang": "Triệu Hoàng",
 "trong-hieu": "Trọng Hiếu", "uyen-trang": "Uyên Trang", "dinh-manh-ninh": "Đinh Mạnh Ninh", "dien-thai-toan": "Điền Thái Toàn", "doan-lam": "Đoàn Lâm","quang-le": "Quang Lê","kim-tu-long":"Kim Tử Long", "ku-vang":"Ku Vàng", "nhac-cuoi":"Nhạc Đám Cưới",
"nhac-che":"Nhạc Chế", "nhac-xuan":"Nhạc Xuân", "hoai-an-2":"Hoài An (Trẻ)", "ngoc-chau":"Ngọc Châu", "y-phon-ksor":"Y Phôn Ksor","huy-tuan":"Huy Tuấn", "duc-huy":"Đức Huy", "le-quang":"Lê Quang","mrsiro":"Mr Siro", "tim":" Tim (Cát Vũ)", 
"thai-khang":"Thái Khang", "thanh-son":"Thanh Sơn", "dinh-van":"Đình Văn", "vo-thien-thanh":"Võ Thiện Thanh", "tran-minh-phi":"Trần Minh Phi", "lu-nhat-vu":"Lư Nhất Vũ", "hoang-hiep":"Hoàng Hiệp", "ngan-giang":"Ngân Giang", "nguyen-cuong":"Nguyễn Cường",
"son-ha":"Sơn Hạ", "trinh-dinh-quang":"Trịnh Đình Quang","truong-le":"Trường Lê", "huy-thuc":"Huy Thục", "le-chi-trung":"Lê Chí Trung", "truong-le-son":"Trương Lê Sơn", "pho-duc-phuong":"Phó Đức Phương", "thai-hung":"Thái Hùng",
"vo-dong-dien":"Võ Đông Điền", "bao-thach":"Bảo Thạch", "chau-dang-khoa":"Châu Đăng Khoa", "hua-kim-tuyen":"Hứa Kim Tuyền", "pham-dinh-chuong":"Phạm Đình Chương", "manh-quynh":"Mạnh Quỳnh", "thanh-tung":"Thanh Tùng", "truc-phuong":"Trúc Phương",
"tu-nhi":"Tú Nhi","bossa-nova":"Bossa Nova", "luu-hong":"Lưu Hồng", "vu-thanh-an":"Vũ Thành An","nhat-sinh":"Nhất Sinh","giao-linh":"Giao Linh", "le-thu":"Lệ Thu", "nhat-trung":"Nhật Trung","nhat-truong":"Nhật Trường","slow-ballad": "Slow Ballade",
"tuan-dung": "Tuấn Dũng","rumba": "Rumba", "disco": "Disco", "nhac-ngoai":"Nhạc Ngoại", "pasodope":"Pasodope", "thien-nhan":"Thiện Nhân","giao-tien":"Giao Tiên","lan-song-xanh":"Làn Sóng Xanh","nguyen-minh-cuong":"Nguyễn Minh Cường",

"duc-tuan":"Đức Tuấn", "duy-quang":"Duy Quang", "don-ho":"Don Hồ", "thai-thanh":"Thái Thanh", "thanh-lan":"Thanh Lan", "thu-phuong":"Thu Phương","trong-tan":"Trọng Tấn","phan-lac-hoa":"Phan Lạc Hoa","tran-chung":"Trần Chung", "march":"March","pham-truong":"Phạm Trưởng", 
"slow-surf":"Slow Surf","nguyen-duc-toan":"Nguyễn Đức Toàn","thai-chau":"Thái Châu", "pop":"Pop","le-dung":"Lê Dũng","trong-dai":"Trọng Đài","vinh-su":"Vinh Sử","pham-manh-cuong":"Phạm Mạnh Cương","thuc-dang":"Thúc Đăng","ha-phuong":"Hà Phương",
"hong-dang":"Hồng Đăng","hoan-van-hiep":"Hoàng Văn Hiệp","trung-ngon":"Trung Ngon","luong-duy-thang":"Lương Duy Thắng","minh-vuong":"Minh Vương","pham-chi-trung":"Phạm Chí Trung","nhac-dan-toc":"Nhạc Dân Tộc","thy-linh":"Thy Linh","nguyen-huu-tri":"Nguyễn Hữu Trí",
"long-ho-huynh":"Long Họ Huỳnh","tram-tu-thien":"Trầm Tử Thiên","tango":"Tango", "y-van":"Y Vân","Twist":"Twist", "nhac-hoc-tro":"Nhạc Học Trof",
 // ...thêm các slug khác
  };

  const normalize = txt => txt.trim().toLowerCase();
  const allLabels = Array.from(document.querySelectorAll(
    ".entry-labels .label-link, .widget-content.list-label a.label-name, .queryMessage .query-label, .widget-content.cloud-label a.label-name"
  ));

  let i = 0;
  const ric = window.requestIdleCallback || (fn => setTimeout(() => fn({didTimeout:true,timeRemaining:()=>0}), 50));

  function process(deadline) {
    while (i < allLabels.length && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
      const node = allLabels[i++];
      if (!node) continue;

      if (node.tagName.toLowerCase() === 'a') {
        const slug = node.href.split("/label/")[1]?.split("?")[0]?.toLowerCase();
        if (slug && labelMap[slug]) {
          const count = node.querySelector(".label-count");
          node.textContent = labelMap[slug] + (count ? " " : "");
          if (count) node.appendChild(count);
        }
      } else if (node.tagName.toLowerCase() === 'span') {
        const slug = normalize(node.textContent);
        if (labelMap[slug]) node.textContent = labelMap[slug];
      }
    }
    if (i < allLabels.length) ric(process);
  }
  ric(process);

  // ===============================
  // Nhóm label trong bài viết
  // ===============================
  const entryLabels = document.querySelector(".entry-labels");
  if (!entryLabels) return;


  const groups = {
    nhacsi: {
      title: "✍️ <strong>Sáng tác:</strong>",
      list: ["trinh-cong-son","lam-phuong","nguyen-hong-thuan","nguyen-van-chung","pham-duy","anh-bang","minh-khang","chau-ky","vu-thanh-an","phi-bang","nhat-trung","tran-tien","ngoc-son","hoai-an-2","son-tung-mtp","tran-thien-thanh","quang-huy","huy-tuan","nal","nguyen-hoai-anh","dong-thien-duc","ngo-thuy-mien","khac-viet","thanh-son","den-vau","duy-manh","thai-khang","duc-tri","truc-phuong", "dinh-van","hong-xuong-long","jimmii-nguyen","tran-lap", "dat-g","le-bao-binh","le-quang","minh-vy","nguyen-hai-phong","quoc-dung","dinh-dung","minh-ky","pham-truong","phu-quang", "to-thanh-tung","vo-thien-thanh","ngoc-chau", "dai-phuong-trang","dieu-kien","duc-huy","hoai-an","hoai-linh","hoang-thi-tho","khai-dang","pham-khanh-hung","phan-manh-quynh","thanh-tung","thuan-yen","xuan-hong","chi-tai","le-minh-son","bao-chan","duong-khac-linh","tang-duy-tan","tien-cookie","vu-duy-khanh","vu-quoc-viet","khanh-bang","luong-bang-quang","nguyen-ngoc-thien","phan-huynh-dieu","quoc-bao","the-hien","tuan-khanh","bao-thach","the-son","ha-phuong","lu-nhat-vu","quach-beam","song-ngoc","tran-minh-phi","trinh-nam-son","truong-quang-tuan","hoang-hiep","tu-nhi","anh-viet-thu","bang-giang","dinh-tung-huy", "la-phong-lam","ngan-giang","nguyen-cuong","nguyen-ha","nguyen-kim-tuan", "pham-minh-tuan","quoc-khanh","son-ha","thai-thinh","thanh-dat","thanh-hung","trinh-dinh-quang","trung-duc","truong-le","viet-hoang","bang-tam","huynh-jame","khanh-don","nguyen-duc-cuong","pham-hong-phuoc", "anh-khang","dc-tam","do-trung-quan","hoang-viet","huy-thuc","karick", "le-chi-trung","le-cuong","le-dinh","leeeee","long-ho-huynh", "nguyen-minh-cuong","nguyen-nhat-huy","nhat-sinh", "pham-the-my","pham-toan-thang","phan-lac-hoa","thai-hoc","thai-hung", "tran-le-quynh","trinh-lam-ngan", "truong-le-son","truong-sa","tu-huy","tuong-van","van-cao","vinh-su","vinh-tam","vu-hoang","vo-hoai-phuc","danhka","datkaa","justatee","le-huu-ha","nguyen-dinh-vu","an-clock","an-thuyen","bac-son","bao-phuc","bin","dac-chung","dickson-nguyen","dong-giao","duy-khiem","khac-hung", "le-ba-vinh","le-minh-bang","mai-chau","manh-phat","minh-chau","minh-nhien","nguyen-anh-9","nguyen-minh-anh","nguyen-van-ti","nguyen-vi","nguyen-vinh-tien","onlyc","pham-tuyen","phan-duy-anh", "phat-ho","pho-duc-phuong","quan-anh-vuong","quoc-hung","song-tra","sy-luan","tvk","tam-anh","thong-dat","tran-chung","tran-long-an", "tran-trinh","tran-vu-an-binh","trinh-hung","trung-ngon","viet-anh","vo-dong-dien","xuan-tien", "chau-viet-cuong","do-bao","ha-thanh","ho-duy-minh","nguyen-trung-cang","pham-bao-nam","tang-nhat-tue","tien-tien", "tran-que-son","vu-cat-tuong","a-tuan","ahuy","an-thi","anh-duong","anh-rong","anh-viet-thanh","bao-chung","bao-quan","binh-nguyen", "binz","can-vinh","cao-minh-thu","cao-van-lau","cao-viet-bach","chau-dang-khoa", "chinh-huu","chu-minh-k","dtap","da-cam","da-ly-vu","danh-zoram","dien-an", "dieu-van","dieu-tuyet","dinh-tram-ca","do-le","do-nhuan","do-kim-bang", "doan-hieu","doan-nho","duc-nha","duy-thai","duy-vo","dzung-chinh","finn-t","gia-quan", "gold-mk","ha-hai-dang","ho-bac","hoan-van-hiep","hoang-ha", "hoang-phuong","hoang-van","holy-thang","hong-dang","hong-quan","hoai-lan","hung-quan","huy-phuong","huyr","huynh-gia-quy","huynh-huyen-nang","huynh-van","jokes-bii","kicm", "kha-hiep","khanh-cuong","kim-minh-huy","kim-tuan","lac-an","lam-chu-min","lam-hoang",
  "le-giang","le-huy","le-minh-kha","le-minh-trung","le-quoc-dung","le-thanh-trung","le-vinh","le-xuan-truong","le-cong-nguyen-khai","luu-ha-an", "luu-huu-phuoc","ly-hao-nam","mbk","mac-the-nhan","minh-phuong","minh-quoc","minh-tam","mr-t","ngo-sy-ngoc","ngoc-han","nguyen-an-de","nguyen-ba-nghiem","nguyen-binh", "nguyen-duc-toan","nguyen-duc-trung","nguyen-duy-an","nguyen-hien","nguyen-huu-sang","nguyen-huu-tri", "nguyen-ngoc-thach","nguyen-the-minh","nguyen-xuan-tan","nguyen-ngoc-tai","pham-anh-quan","pham-chi-trung","pham-dinh-chuong", "pham-hoa-khanh","pham-ky","pham-thanh-ha","phan-nhan","phan-tran-cong-hieu","phao","pho-thu","phuong-kim","phuong-nam","phuc-chinh","quoc-an", "quy-phi","ricky-star","sa-huynh","thanh-bui", "the-song","thien-ha","thuc-dang","thuong-linh","thuong-ngan","tika-tung-anh","to-tai-nang","tong-hao-nhien","tran-kiet-tuong","tran-phuc-thang","tran-quang-loc","tran-quang-nam","tran-uyen-khanh","trieu-dang","trinh-quy","truc-giang","truc-sinh","trung-di", "truong-huy","truong-phi-hung","truong-quang-luc","truong-quy-hai","truong-tuyet-mai","tu-cong-phung", "tu-na","tuan-anh-cello","tuan-le","tung-van","van-phung","van-tung", "vo-minh-tri","vu-khac-anh","vu-quoc-binh","vu-trong-hoi","vu-tuan-khang","van-cang","vu-thanh", "vu-trung","xuan-giao","xuan-hoa","xuan-ky","xuan-long","xuan-nhi","xuan-quynh","y-moan",
"y-vu","yuniboo","anh-tuan","bach-van","chau-minh-tuan", "dat-long-vinh","diep-thanh-thanh","dieu-huong","do-phuong","duong-truong-giang", "duong-yen-phi","hamlet-truong", "hua-kim-tuyen","kai-dinh", "le-anh-dung","le-cat-trong-ly", "le-tran-hoan","long-pham","manh-tuan","minh-duc", "minh-tuan","phan-lac-hoa","nguyen-dinh-dung", "nguyen-huu-kha","nguyen-jenda","nguyen-khanh-sang","nguyen-tuong-van","nguyen-van-dong", "phuc-truong","ta-lam","tien-nguyen","to-giang","tran-huy-duc", "tri-hai","truong-quang-loc","tuan-quang","giao-tien","nguyen-minh-cuong","tran-chung","pham-truong","nguyen-duc-toan","trong-dai","vinh-su","pham-manh-cuong","thuc-dang","ha-phuong","mrsiro","hong-dang","hoan-van-hiep","trung-ngon","luong-duy-thang","pham-chi-trung","thy-linh","nguyen-huu-tri","long-ho-huynh","tram-tu-thien","y-van"]
    },
    theloai: {
      title: "📂 <strong>Thể loại:</strong>",
      list: ["nhac-que-huong","nhac-tre","nhac-tru-tinh","nhac-vang","rap","nhac-thieu-nhi","nhac-cach-mang","nhac-ngoai","nhac-hoa","nhac-dan-toc","nhac-hoc-tro"]
    },
    giaidieu: {
      title: "🎶 <strong>Điệu:</strong>",
      list: ["slow-rock","ballade","chachacha","blues","slow-ballad","bossa-nova","habanera","boston","slow","bolero","rap","valse","disco", "rumba","pasodope", "march","slow-surf","pop","tango","Twist"]
    },
    casi: {
      title: "🎤 <strong>Ca sĩ:</strong>",
      list: [""]
    }
  };
  const results = { nhacsi: [], theloai: [], giaidieu: [], casi: [] };
  const links = [...entryLabels.querySelectorAll("a.label-link")];

  links.forEach(link => {
    const slug = link.href.split("/label/")[1]?.split("?")[0].toLowerCase();
    let text = labelMap[slug] || link.textContent.trim();
    const newLink = `<a class="label-link" href="${link.href}">${text}</a>`;
    for (let key in groups) {
      if (groups[key].list.includes(slug)) results[key].push(newLink);
    }
  });

  const parts = [];
  if (results.nhacsi.length) parts.push(groups.nhacsi.title + " " + results.nhacsi.join(" "));
  if (results.theloai.length) parts.push(groups.theloai.title + " " + results.theloai.join(" "));
  if (results.giaidieu.length) parts.push(groups.giaidieu.title + " " + results.giaidieu.join(" "));
  if (results.casi.length) parts.push(groups.casi.title + " " + results.casi.join(" "));

  if (parts.length) entryLabels.innerHTML = `<div class='custom-tags'><div class='tag-row'>${parts.join(" | ")}</div></div>`;
});
