// --- Scroll animasyonu için kartlar ve istatistikler seçiliyor ---
const cards = document.querySelectorAll(".card");
const stats = document.querySelectorAll(".stat-number");


// Sayfa scroll edildiğinde çalışan fonksiyon
function checkScroll() {
  // --- Kart animasyonları ---
  cards.forEach(card => {
    const rect = card.getBoundingClientRect(); // Kartın ekrandaki konumunu al

    // Kart ekrana girdiğinde görünür hale getir
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show"); // .show CSS animasyonunu tetikler
    }
  });


  // --- İstatistik animasyonları ---
  const statsSection = document.querySelector(".stats");

  if (statsSection) {
    const rect = statsSection.getBoundingClientRect();

    // İstatistikler ekrana geldiğinde sadece 1 defa animasyonu çalıştır
    if (rect.top < window.innerHeight - 200 && !statsSection.classList.contains("animated")) {
      statsSection.classList.add("animated");
      animateNumbers(); // Sayı animasyonunu başlat
    }
  }


  // --- Yukarı çık butonu kontrolü ---
  const backToTop = document.querySelector(".back-to-top");

  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible"); // 300px aşağı kayınca buton görünür
  } else {
    backToTop.classList.remove("visible"); // Yukarı çıkınca kaybolur
  }

}  // checkScroll SONU..


//---------------------



// --- Scroll ve sayfa yükleme olaylarına checkScroll bağlanıyor ---
window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);


// --- İstatistik sayı animasyonu ---
function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const targets = [175, 63, 18000, 4500]; // Hedef sayılar
  const durations = [2000, 1500, 2500, 2200]; // Animasyon süreleri (ms)

  statNumbers.forEach((num, index) => {
    let start = 0;
    const end = targets[index];
    const duration = durations[index];
    const increment = end / (duration / 16); // FPS ~60 için 16ms hesap

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer); // Animasyon bitince durdur
        num.textContent = end.toLocaleString(); // Sayıyı formatla
      } 
      
      else {
        num.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  });

} // animateNumbers SONU






// --- Tema değiştirme ---
const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme"); // Tema değiştir
  toggleBtn.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
  
  // Kullanıcı seçimini localStorage'da sakla
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
});



// --- Sayfa yüklendiğinde önceki tema kontrolü ---
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "☀️";
}





// --- Mobil menü ---
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");


menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show"); // Menü aç/kapat
});





// --- Smooth scroll (yumuşak kaydırma) ---
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Boş linkleri atla
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth" // Yumuşak geçiş
      });

      // Mobil menü açıksa kapat
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
      }
    }
  });

});







// --- Yukarı çık butonu tıklama olayı ---
document.querySelector(".back-to-top").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" }); // Yukarı kaydır
});




// --- Newsletter formu ---
document.querySelector(".newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks for subscribing to NASA updates!"); // Kullanıcıya mesaj
  e.target.reset(); // Formu sıfırla
});
