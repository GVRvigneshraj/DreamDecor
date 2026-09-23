/* ---------- AI Preview: Decor My Hall (Puter.js img2img) ---------- */
(function () {
  const fileInput = document.getElementById('aiFile');
  const uploadBox = document.getElementById('aiUpload');
  const uploadInner = document.getElementById('aiUploadInner');
  const originalImg = document.getElementById('aiOriginal');
  const camBtn = document.getElementById('aiCam');
  const themesBox = document.getElementById('aiThemes');
  const noteInput = document.getElementById('aiNote');
  const goBtn = document.getElementById('aiGo');
  const againBtn = document.getElementById('aiAgain');
  const statusEl = document.getElementById('aiStatus');
  const stage = document.getElementById('aiStage');
  const placeholder = document.getElementById('aiPlaceholder');
  const resultImg = document.getElementById('aiResult');
  const actions = document.getElementById('aiActions');
  const dlBtn = document.getElementById('aiDownload');
  const waBtn = document.getElementById('aiWa');
  const compare = document.getElementById('aiCompare');
  const thumbO = document.getElementById('aiThumb');
  const thumbR = document.getElementById('aiThumbR');
  if (!goBtn) return;

  const WA = '919876543210';
  const THEMES = {
    wedding: 'elegant Indian wedding decoration: floral mandap-style backdrop, stage with fresh white and red roses, warm fairy lights, draped fabric, premium event styling',
    birthday: 'fun birthday party decoration: colorful balloon arch, balloon columns, themed backdrop with streamers, photo-zone corner, festive lighting',
    corporate: 'professional corporate event decoration: sleek stage backdrop with clean branding panels, LED-style accent lighting, minimal modern floral arrangements',
    baby: 'soft pastel baby shower decoration: blue and green balloon garland, cute welcome signage board, cozy sofa styling, delicate florals, gentle warm lighting',
    engagement: 'romantic engagement ring-ceremony decoration: floral ring backdrop, rose-petal aisle accents, elegant candle-style lighting, white and blush flowers',
    custom: 'stylish custom event decoration matching the room, premium backdrop, tasteful florals and ambient lighting designed by a professional decor studio'
  };

  let photoDataUrl = null;
  let theme = 'wedding';
  let busy = false;

  function setStatus(msg, isErr) {
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('err', !!isErr);
  }

  function setTheme(t) {
    theme = t;
    themesBox.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.t === t));
  }

  themesBox.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (b) setTheme(b.dataset.t);
  });

  function showOriginal(dataUrl) {
    photoDataUrl = dataUrl;
    originalImg.src = dataUrl;
    originalImg.hidden = false;
    uploadInner.style.display = 'none';
    uploadBox.classList.add('has-img');
    thumbO.src = dataUrl;
    setStatus('Photo ready — pick a theme and hit Generate.');
  }

  function fileToDataUrl(file, maxDim) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) return reject(new Error('Please choose an image file.'));
      if (file.size > 10 * 1024 * 1024) return reject(new Error('Image too large — max 10 MB.'));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL('image/jpeg', 0.88));
        } catch (err) { reject(err); }
        finally { URL.revokeObjectURL(url); }
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image.')); };
      img.src = url;
    });
  }

  async function handleFile(file) {
    try {
      setStatus('Loading photo…');
      const dataUrl = await fileToDataUrl(file, 1024);
      showOriginal(dataUrl);
    } catch (err) {
      setStatus(err.message || 'Upload failed.', true);
    }
  }

  uploadBox.addEventListener('click', () => fileInput.click());
  uploadBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });
  uploadBox.addEventListener('dragover', e => { e.preventDefault(); uploadBox.style.borderColor = 'var(--green)'; });
  uploadBox.addEventListener('dragleave', () => { uploadBox.style.borderColor = ''; });
  uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.style.borderColor = '';
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  const camInput = document.createElement('input');
  camInput.type = 'file';
  camInput.accept = 'image/*';
  camInput.setAttribute('capture', 'environment');
  camInput.hidden = true;
  document.body.appendChild(camInput);
  camBtn.addEventListener('click', () => camInput.click());
  camInput.addEventListener('change', () => {
    if (camInput.files && camInput.files[0]) handleFile(camInput.files[0]);
  });

  function buildPrompt() {
    const extra = (noteInput.value || '').trim();
    let p = 'Transform this exact room/hall photograph into a professional event decoration setup by Magic Decor: ' +
      THEMES[theme] + '. ';
    if (extra) p += 'Additional customer request: ' + extra + '. ';
    p += 'CRITICAL: keep the original room layout, walls, floor, windows, furniture positions and camera angle unchanged — only ADD decoration. Realistic interior event photography, natural lighting, high quality.';
    return p;
  }

  function imgToDataUrl(img) {
    if (typeof img === 'string') return img;
    if (img.src) return img.src;
    const c = document.createElement('canvas');
    c.width = img.naturalWidth || img.width;
    c.height = img.naturalHeight || img.height;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/jpeg', 0.92);
  }

  function busyUI(on) {
    busy = on;
    goBtn.disabled = on;
    againBtn.disabled = on;
    stage.classList.toggle('loading', on);
    if (on) setStatus('Generating — usually 5–20 seconds…');
  }

  async function generate() {
    if (busy) return;
    if (!photoDataUrl) {
      setStatus('First upload a photo of your hall or room.', true);
      uploadBox.focus();
      return;
    }
    if (typeof puter === 'undefined' || !puter.ai || !puter.ai.txt2img) {
      setStatus('AI service failed to load. Check your internet and refresh.', true);
      return;
    }

    busyUI(true);
    setStatus('Generating — usually 5–20 seconds…');
    const prompt = buildPrompt();
    const attempts = [
      { provider: 'gemini', model: 'gemini-2.5-flash-image-preview' },
      { provider: 'openai-image-generation', model: 'gpt-image-1-mini', quality: 'medium' }
    ];
    let lastErr = null;

    try {
      for (const opt of attempts) {
        try {
          const out = await puter.ai.txt2img(prompt, {
            provider: opt.provider,
            model: opt.model,
            quality: opt.quality,
            input_image: photoDataUrl,
            input_image_mime_type: 'image/jpeg'
          });
          const dataUrl = imgToDataUrl(out);
          if (!dataUrl) throw new Error('empty result');
          resultImg.src = dataUrl;
          resultImg.hidden = false;
          placeholder.style.display = 'none';
          actions.hidden = false;
          compare.hidden = false;
          thumbR.src = dataUrl;
          dlBtn.href = dataUrl;
          dlBtn.download = 'magic-decor-' + theme + '-preview.jpg';
          const msg = encodeURIComponent(
            'Hi Magic Decor! I tried the AI preview on your website (theme: ' + theme +
            '). I would like a real quote for this decoration.'
          );
          waBtn.href = 'https://wa.me/' + WA + '?text=' + msg;
          setStatus('✓ Preview ready! Download it or book the real setup.');
          return;
        } catch (err) {
          lastErr = err;
        }
      }
      throw lastErr || new Error('Generation failed.');
    } catch (err) {
      const raw = (err && (err.message || err.error && err.error.message || err.code || err.error)) || '';
      const s = String(raw);
      if (/auth|login|sign|401|403|unauthor/i.test(s)) {
        setStatus('Please sign in to the free Puter popup (one time), then try again.', true);
      } else if (/rate|429|limit|quota/i.test(s)) {
        setStatus('Too many requests right now — wait ~30 seconds and try again.', true);
      } else if (/quota|credit|billing|payment|insufficient/i.test(s)) {
        setStatus('Free AI usage limit reached on this network — try again later or contact us for a manual preview.', true);
      } else {
        setStatus('Could not generate: ' + (s || 'unknown error') + ' — please try again.', true);
      }
    } finally {
      busyUI(false);
    }
  }

  goBtn.addEventListener('click', generate);
  againBtn.addEventListener('click', generate);

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (typeof puter === 'undefined') {
        setStatus('AI library blocked or offline — refresh to enable the preview.', true);
      }
    }, 2500);
  });
})();
