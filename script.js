/* =====================================================
   FOR MY FAVORITE PERSON ♡
   SCRIPT.JS — INTERAKSI WEBSITE ULANG TAHUN
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));

  if (!slides.length) return;

  const progress = document.getElementById("progress");
  const counter = document.getElementById("slideCounter");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlide = Math.max(
    0,
    slides.findIndex(slide => slide.classList.contains("active"))
  );

  let countdownTimer = null;
  let countdownRun = 0;
  let giftOpened = false;

  // GANTI PASSWORD RAHASIA DI SINI
  const SECRET_PASSWORD = "120304";

  /* =========================================
     1. SISTEM NAVIGASI SLIDE
     ========================================= */

  function showSlide(index) {
    const boundedIndex = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === boundedIndex);
      slide.setAttribute(
        "aria-hidden",
        i === boundedIndex ? "false" : "true"
      );
    });

    currentSlide = boundedIndex;

    if (counter) {
      counter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");
    }

    if (progress) {
      progress.style.width =
        ((currentSlide + 1) / slides.length * 100) + "%";
    }

    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = currentSlide === slides.length - 1;
    }

    // Hentikan video ketika meninggalkan slide video.
    const video = document.getElementById("memoryVideo");

    if (
      video &&
      currentSlide !== slides.indexOf(video.closest(".slide"))
    ) {
      video.pause();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function goNext() {
    showSlide(currentSlide + 1);
  }

  function goPrev() {
    showSlide(currentSlide - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", goPrev);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", goNext);
  }

  // Semua tombol dengan class next-btn menuju slide selanjutnya.
  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", goNext);
  });

  /* =========================================
     2. PASSWORD — OPEN MY HEART
     ========================================= */

  const passwordForm = document.getElementById("passwordForm");
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passwordError");
  const lockIcon = document.getElementById("lockIcon");

  if (passwordForm) {
    passwordForm.addEventListener("submit", event => {
      // Mencegah halaman reload saat tombol ditekan.
      event.preventDefault();

      const enteredPassword = passwordInput
        ? passwordInput.value.trim()
        : "";

      if (enteredPassword === SECRET_PASSWORD) {
        if (passwordError) {
          passwordError.textContent = "";
        }

        if (lockIcon) {
          lockIcon.textContent = "🔓";
        }

        // Password benar: buka slide kedua.
        if (slides[0] && slides[1]) {
          slides[0].classList.remove("active");
          showSlide(1);
        }
      } else {
        if (passwordError) {
          passwordError.textContent =
            "Belum tepat, sayang. Coba lagi yaa ♡";
        }

        if (lockIcon) {
          lockIcon.textContent = "🔒";

          lockIcon.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-5px)" },
              { transform: "translateX(5px)" },
              { transform: "translateX(0)" }
            ],
            { duration: 280 }
          );
        }

        if (passwordInput) {
          passwordInput.focus();
          passwordInput.select();
        }
      }
    });
  }

  /* =========================================
     3. TOMBOL IYAAA DAN NGGAK
     ========================================= */

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const retryBtn = document.getElementById("retryBtn");

  const bombText = document.getElementById("bombText");
  const countdown = document.getElementById("countdown");
  const explosion = document.getElementById("explosion");
  const bomb = document.getElementById("bomb");

  // IYAAA menuju slide hadiah.
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      showSlide(3);
    });
  }

  // NGGAK memunculkan hitung mundur bom kartun.
  if (noBtn) {
    noBtn.addEventListener("click", () => {
      showSlide(2);

      if (countdownTimer) {
        clearInterval(countdownTimer);
      }

      countdownRun++;
      const thisRun = countdownRun;
      let number = 3;

      if (countdown) {
        countdown.textContent = String(number);
      }

      if (explosion) {
        explosion.classList.add("hidden");
      }

      if (bomb) {
        bomb.classList.remove("hidden");
      }

      if (bombText) {
        bombText.textContent =
          "Kesempatan terakhir untuk berubah pikiran...";
      }

      if (retryBtn) {
        retryBtn.classList.remove("hidden");
      }

      countdownTimer = setInterval(() => {
        if (thisRun !== countdownRun) {
          clearInterval(countdownTimer);
          return;
        }

        number--;

        if (countdown) {
          countdown.textContent = String(Math.max(number, 0));
        }

        if (number <= 0) {
          clearInterval(countdownTimer);

          if (bomb) {
            bomb.classList.add("hidden");
          }

          if (explosion) {
            explosion.classList.remove("hidden");
          }

          if (bombText) {
            bombText.textContent =
              "BOOM! Hehe, coba pilih jawaban yang benar 😈💗";
          }
        }
      }, 1000);
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }

      countdownRun++;
      showSlide(1);
    });
  }

  /* =========================================
     4. HADIAH INTERAKTIF
     ========================================= */

  const giftBtn = document.getElementById("giftBtn");
  const giftEmoji = document.getElementById("giftEmoji");
  const giftHint = document.getElementById("giftHint");
  const giftContinue = document.getElementById("giftContinue");

  if (giftBtn) {
    giftBtn.addEventListener("click", () => {
      if (giftOpened) return;

      giftOpened = true;

      if (giftEmoji) {
        giftEmoji.textContent = "💝";
      }

      if (giftHint) {
        giftHint.textContent =
          "Hadiah kecil, tapi dibuat sepenuh hati ♡";
      }

      if (giftContinue) {
        giftContinue.classList.remove("hidden");
      }

      giftBtn.setAttribute(
        "aria-label",
        "Hadiah sudah dibuka"
      );
    });
  }

  if (giftContinue) {
    giftContinue.addEventListener("click", goNext);
  }

  /* =========================================
     5. FOTO COVER DAN PLACEHOLDER
     ========================================= */

  document.querySelectorAll(".cover-photo img").forEach(img => {
    const placeholder = img.nextElementSibling;

    function showPlaceholder() {
      img.style.display = "none";

      if (
        placeholder &&
        placeholder.classList.contains("photo-placeholder")
      ) {
        placeholder.style.display = "grid";
      }
    }

    img.addEventListener("error", showPlaceholder);

    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    }
  });

  /* =========================================
     6. GALERI FOTO
     GANTI NAMA FILE SESUAI FOTO MILIKMU
     ========================================= */

  const gallery = document.getElementById("gallery");

  const galleryPhotos = [
    {
      src: "assets/foto-1.jpg",
      caption: "A little memory ♡"
    },
    {
      src: "assets/foto-2.jpg",
      caption: "Your lovely smile"
    },
    {
      src: "assets/foto-3.jpg",
      caption: "One of my favorites"
    },
    {
      src: "assets/foto-4.jpg",
      caption: "A moment to remember"
    },
    {
      src: "assets/foto-5.jpg",
      caption: "Always cheering for you"
    },
    {
      src: "assets/foto-6.jpg",
      caption: "My favorite person ♡"
    }
  ];

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;
    lightboxImage.alt = caption || "Foto kenangan";

    if (lightboxCaption) {
      lightboxCaption.textContent = caption || "";
    }

    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.add("hidden");
    document.body.style.overflow = "";

    if (lightboxImage) {
      lightboxImage.src = "";
    }
  }

  if (gallery) {
    galleryPhotos.forEach((photo, index) => {
      const item = document.createElement("button");

      item.type = "button";
      item.className = "gallery-item";

      item.style.setProperty(
        "--tilt",
        (index % 2 === 0 ? "-1.5" : "1.5") + "deg"
      );

      item.setAttribute(
        "aria-label",
        "Lihat foto: " + photo.caption
      );

      const img = document.createElement("img");

      img.src = photo.src;
      img.alt = photo.caption;
      img.loading = "lazy";

      img.addEventListener("error", () => {
        item.classList.add("photo-missing");
        img.style.display = "none";

        const placeholder = document.createElement("span");

        placeholder.textContent =
          "Tambahkan " + photo.src.split("/").pop();

        placeholder.style.position = "static";
        placeholder.style.display = "grid";
        placeholder.style.placeItems = "center";
        placeholder.style.whiteSpace = "normal";
        placeholder.style.minHeight = "100px";

        item.prepend(placeholder);
      }, { once: true });

      const caption = document.createElement("span");
      caption.textContent = photo.caption;

      item.append(img, caption);

      item.addEventListener("click", () => {
        if (img.style.display !== "none") {
          openLightbox(photo.src, photo.caption);
        }
      });

      gallery.appendChild(item);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }

    if (
      event.key === "ArrowRight" &&
      (!lightbox || lightbox.classList.contains("hidden"))
    ) {
      goNext();
    }

    if (
      event.key === "ArrowLeft" &&
      (!lightbox || lightbox.classList.contains("hidden"))
    ) {
      goPrev();
    }
  });

  /* =========================================
     7. PESAN RAHASIA
     ========================================= */

  const secretBtn = document.getElementById("secretBtn");
  const secretMessage = document.getElementById("secretMessage");

  if (secretBtn && secretMessage) {
    secretBtn.addEventListener("click", () => {
      const isHidden =
        secretMessage.classList.toggle("hidden");

      secretBtn.textContent = isHidden
        ? "Buka pesan rahasia 💌"
        : "Tutup pesan rahasia ♡";
    });
  }

  /* =========================================
     8. TOMBOL ULANGI DARI AWAL
     ========================================= */

  const restartBtn = document.getElementById("restartBtn");

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }

      countdownRun++;
      giftOpened = false;

      if (giftEmoji) {
        giftEmoji.textContent = "🎁";
      }

      if (giftHint) {
        giftHint.textContent =
          "Buka donggg, jangan malu-malu ♡";
      }

      if (giftContinue) {
        giftContinue.classList.add("hidden");
      }

      if (passwordInput) {
        passwordInput.value = "";
      }

      if (passwordError) {
        passwordError.textContent = "";
      }

      if (lockIcon) {
        lockIcon.textContent = "🔐";
      }

      if (secretMessage) {
        secretMessage.classList.add("hidden");
      }

      if (secretBtn) {
        secretBtn.textContent = "Buka pesan rahasia 💌";
      }

      if (bomb) {
        bomb.classList.remove("hidden");
      }

      if (explosion) {
        explosion.classList.add("hidden");
      }

      if (countdown) {
        countdown.textContent = "3";
      }

      if (bombText) {
        bombText.textContent =
          "Kesempatan terakhir untuk berubah pikiran...";
      }

      closeLightbox();
      showSlide(0);
    });
  }

  /* =========================================
     9. MUSIK LATAR
     ========================================= */

  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");

  async function toggleMusic() {
    if (!music) return;

    try {
      if (music.paused) {
        await music.play();

        if (musicBtn) {
          musicBtn.classList.add("playing");
          musicBtn.textContent = "♫";
          musicBtn.setAttribute("aria-label", "Jeda musik");
        }
      } else {
        music.pause();

        if (musicBtn) {
          musicBtn.classList.remove("playing");
          musicBtn.textContent = "♫";
          musicBtn.setAttribute("aria-label", "Putar musik");
        }
      }
    } catch (error) {
      if (musicBtn) {
        musicBtn.title =
          "Periksa file assets/music.mp3 lalu coba lagi.";
      }

      console.warn("Musik belum bisa diputar:", error);
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
  }

  /* =========================================
     10. DEKORASI BINTANG
     ========================================= */

  const starsContainer = document.getElementById("stars");
  const particlesContainer = document.getElementById("particles");

  if (
    starsContainer &&
    !starsContainer.childElementCount
  ) {
    for (let i = 0; i < 42; i++) {
      const star = document.createElement("span");

      star.className = "star";
      star.textContent = i % 3 === 0 ? "✦" : "·";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.fontSize =
        (8 + Math.random() * 12) + "px";

      star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
      );

      star.style.animationDelay =
        (Math.random() * 4) + "s";

      starsContainer.appendChild(star);
    }
  }

  /* =========================================
     11. PARTIKEL HATI MELAYANG
     ========================================= */

  if (
    particlesContainer &&
    !particlesContainer.childElementCount
  ) {
    const symbols = ["♡", "✧", "·", "✦"];

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.left = Math.random() * 100 + "%";

      particle.style.animationDelay =
        (Math.random() * -15) + "s";

      particle.style.setProperty(
        "--duration",
        (12 + Math.random() * 12) + "s"
      );

      particle.style.fontSize =
        (12 + Math.random() * 13) + "px";

      particlesContainer.appendChild(particle);
    }
  }

  /* =========================================
     12. TAMPILKAN SLIDE AWAL
     ========================================= */

  showSlide(currentSlide);
});

/* =====================================
   BIRTHDAY INTRO INTERACTION
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("birthdayIntro");
    const enterButton = document.getElementById("introEnterBtn");

    if (!intro || !enterButton) return;

    enterButton.addEventListener("click", () => {
        intro.classList.add("intro-hidden");

        // Hilangkan intro setelah animasi selesai
        window.setTimeout(() => {
            intro.remove();
        }, 1100);
    });
});

/* COUNTDOWN DAYS, HOURS, MINUTES, SECONDS */

const targetDate = new Date("2026-10-11T00:00:00").getTime();

function updateBirthdayCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    const daysEl = document.getElementById("countDays");
    const hoursEl = document.getElementById("countHours");
    const minutesEl = document.getElementById("countMinutes");
    const secondsEl = document.getElementById("countSeconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);
// MUSIK OTOMATIS
document.addEventListener("DOMContentLoaded", () => {
    const song = document.getElementById("song");

    if (!song) return;

    song.volume = 0.5;

    // Coba putar musik otomatis
    const playMusic = () => {
        song.play().catch(() => {
            console.log(
                "Autoplay diblokir browser. Musik akan dicoba lagi setelah interaksi."
            );
        });
    };

    playMusic();

    // Jika autoplay diblokir, coba lagi setelah interaksi pertama
    const startMusicAfterInteraction = () => {
        if (song.paused) {
            playMusic();
        }

        document.removeEventListener("click", startMusicAfterInteraction);
        document.removeEventListener("keydown", startMusicAfterInteraction);
        document.removeEventListener("touchstart", startMusicAfterInteraction);
    };

    document.addEventListener("click", startMusicAfterInteraction);
    document.addEventListener("keydown", startMusicAfterInteraction);
    document.addEventListener("touchstart", startMusicAfterInteraction);
});