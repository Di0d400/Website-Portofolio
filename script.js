document.addEventListener('DOMContentLoaded', function() {
  const sections = ['home', 'about', 'work', 'contact'];
  function showSection(hash) {
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = 'none';
    });
    const cleanHash = hash.replace('#', '');
    const target = document.getElementById(cleanHash);
    if (target) target.style.display = '';
  }
  // Tampilkan home saat pertama kali
  if (!location.hash || !sections.includes(location.hash.replace('#', ''))) {
    location.hash = '#home';
  }
  showSection(location.hash);
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const hash = this.getAttribute('href');
      location.hash = hash;
      showSection(hash);
    });
  });
  window.addEventListener('hashchange', function() {
    showSection(location.hash);
  });
  const header = document.querySelector('.sticky-nav');
function toggleHeaderBg() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', toggleHeaderBg);
toggleHeaderBg();
});

document.addEventListener('DOMContentLoaded', function () {
  const skillsList = document.getElementById('skillsList');
  if (skillsList) {
    skillsList.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', function (e) {
        // Toggle: jika sudah aktif, tutup
        const progress = li.querySelector('.skill-progress');
        const isActive = li.classList.contains('active');
        // Tutup semua
        skillsList.querySelectorAll('li').forEach(item => {
          item.classList.remove('active');
          const prog = item.querySelector('.skill-progress');
          if (prog) prog.style.display = 'none';
        });
        if (!isActive) {
          li.classList.add('active');
          if (progress) {
            // Set nama dan persen
            progress.querySelector('.skill-progress-name').textContent = li.getAttribute('data-skill');
            progress.querySelector('.skill-progress-percent').textContent = li.getAttribute('data-percent') + '%';
            const bar = progress.querySelector('.progress-bar-fill');
            bar.style.width = '0';
            progress.style.display = 'block';
            setTimeout(() => {
              bar.style.width = li.getAttribute('data-percent') + '%';
            }, 50);
          }
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const chatWindow = document.getElementById('chatWindow');
  const chatbotContainer = document.getElementById('chatbotContainer');
  const contactNav = document.querySelector('nav a[href="#contact"], .nav-link[href="#contact"]');

  // Pop-up animasi seluruh chatbot (opsional, bisa dihapus jika tidak perlu)
  if (contactNav && chatbotContainer) {
    contactNav.addEventListener('click', function () {
      setTimeout(() => {
        chatbotContainer.classList.add('active');
      }, 350);
    });
    window.addEventListener('hashchange', function () {
      if (location.hash !== "#contact") {
        chatbotContainer.classList.remove('active');
      }
    });
  }

  function showOptions(options) {
    const oldOptions = chatWindow.querySelector('.chat-options');
    if (oldOptions) oldOptions.remove();

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'chat-options';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chat-option-btn';
      if (opt.icon) {
        const icon = document.createElement('img');
        icon.src = opt.icon;
        icon.className = 'chat-option-icon';
        icon.alt = '';
        btn.appendChild(icon);
      }
      const span = document.createElement('span');
      span.textContent = opt.label;
      btn.appendChild(span);
      btn.onclick = (e) => {
        e.preventDefault();
        addUserMessage(opt.label);
        optionsDiv.remove();
        setTimeout(() => opt.action(), 400);
      };
      optionsDiv.appendChild(btn);
    });
    chatWindow.appendChild(optionsDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function addBotMessage(msg, html = false, delay = 0) {
    setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      if (html) {
        botBubble.innerHTML = msg;
      } else {
        botBubble.textContent = msg;
      }
      chatWindow.appendChild(botBubble);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, delay);
  }

  function addUserMessage(msg) {
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = msg;
    chatWindow.appendChild(userBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function showCV() {
    addBotMessage('Bentar aku ambilin CV Bang Dio...');
    addBotMessage(
      'Ini CV Bang Dio: <a href="LINK_CV_MU" target="_blank" style="color:#232946;font-weight:bold;text-decoration:underline;">Download CV</a>',
      true,
      1200
    );
    setTimeout(() => showAskAgain(), 2200);
  }

  function showContact() {
    addBotMessage('Wah keren tuh! Nanti aku kabarin Bang Dio atau kamu bisa langsung hubungi Bang Dio.');
    addBotMessage(
      'Tinggal kontak di sini: <a href="mailto:sendiomalaikosa30@gmail.com" style="color:#232946;font-weight:bold;text-decoration:underline;">sendiomalaikosa30@gmail.com</a>',
      true,
      900
    );
    addBotMessage(
      'Atau bisa juga langsung <a href="https://www.instagram.com/diobrgmn._/" target="_blank" style="color:#232946;font-weight:bold;text-decoration:underline;">DM IG Bang Dio</a>',
      true,
      1800
    );
    setTimeout(() => showAskAgain(), 2700);
  }

  function showAskAgain() {
    addBotMessage('Ada yang bisa dibantu lagi?', false, 400);
    setTimeout(() => showOptions(mainOptions), 1000);
  }

  // Opsi utama (termasuk Halo Bang!)
  const mainOptions = [
    {
      label: 'Halo Bang!',
      icon: 'https://img.icons8.com/color/24/speech-bubble.png',
      action: () => {
        addBotMessage('halo juga');
        addBotMessage('makasih udah nyapa', false, 700);
        addBotMessage('semoga kamu enjoy ya!', false, 1400);
        setTimeout(() => showAskAgain(), 2200);
      }
    },
    {
      label: 'Mau liat CV Bang Dio',
      icon: 'https://img.icons8.com/color/24/resume.png',
      action: showCV
    },
    {
      label: 'Tertarik buat kerja sama',
      icon: 'https://img.icons8.com/color/24/handshake.png',
      action: showContact
    },
    {
      label: 'Gak ada sih bang',
      icon: 'https://img.icons8.com/fluency/24/ok.png',
      action: () => {
        addBotMessage('Baiklah, semoga harimu menyenangkan!');
      }
    }
  ];

  // Mulai percakapan
  addBotMessage('Halo! Aku Bimox, asisten virtual Bang Dio 👋');
  setTimeout(() => {
    addBotMessage('Apa yang bisa aku bantu hari ini?');
    setTimeout(() => showOptions(mainOptions), 700);
  }, 700);
});