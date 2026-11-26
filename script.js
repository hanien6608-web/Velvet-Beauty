// Velvet Beauty storefront
const WA_NUMBER = '201128063913';

const PRODUCTS = [
  {
    name: 'بودي سبلاش — Vanilla Candy',
    cat: 'splash', catLabel: 'بودي سبلاش',
    desc: 'ريحة الفانيليا الحلوة اللي بتفضل معاكي طول اليوم. رشة واحدة وتبقي شاهي.',
    img: 'img/splash-vanilla.jpg', tag: 'الأكثر طلبًا'
  },
  {
    name: 'بودي سبلاش — Rose Essence',
    cat: 'splash', catLabel: 'بودي سبلاش',
    desc: 'خلاصة الورد الفخمة لإحساس ناعم وأنثوي… ريحة تليق بيكي.',
    img: 'img/splash-rose.jpg'
  },
  {
    name: 'بودي لوشن — Mango',
    cat: 'lotion', catLabel: 'لوشن وترطيب',
    desc: 'ترطيب غني بريحة المانجا المنعشة، بيمتص بسرعة من غير ملمس دهني.',
    img: 'img/splash-rose.jpg'
  },
  {
    name: 'بودي باتر — Powder Musk',
    cat: 'lotion', catLabel: 'لوشن وترطيب',
    desc: 'ريحة مسك البودر اللي حبيتوها بقت في بودي باتر! ترطيب غني في الشتاء.',
    img: 'img/gift-set.jpg', tag: 'جديد'
  },
  {
    name: 'عطر Velvet Rose',
    cat: 'perfume', catLabel: 'عطور ومسك',
    desc: 'مسك الفانيليا × مسك البودر — نعومة وفخامة في كل رشة. مش لازم تدفعي آلاف عشان ريحة فخمة.',
    img: 'img/perfume-velvet-rose.jpg', tag: 'مميز'
  },
  {
    name: 'تولة مسك خام ٣ مل',
    cat: 'perfume', catLabel: 'عطور ومسك',
    desc: 'مسك خام مركّز في تولة صغيرة شيك — بتتبعت هدية مع كل أوردر برفيوم.',
    img: 'img/musk-tola.jpg'
  },
  {
    name: 'هير ميست',
    cat: 'care', catLabel: 'عناية',
    desc: 'رشة انتعاش لشعرك بريحة فيلفت المميزة، خفيف ومش بيسيّب دهون.',
    img: 'img/offer-hairmist.jpg'
  },
  {
    name: 'شيمري بودي أويل',
    cat: 'care', catLabel: 'عناية',
    desc: 'لمعة ذهبية تخطف الأنظار مع ترطيب عميق — سر الإطلالة الشاهية.',
    img: 'img/bag-1.jpg'
  },
  {
    name: 'فوت بالم ستيك',
    cat: 'care', catLabel: 'عناية',
    desc: 'ترطيب عميق للكعبين، ينعّم ويحمي من التشققات — مش بس لكعبك، لكل الجسم الجاف.',
    img: 'img/foot-balm.jpg'
  },
  {
    name: 'هاند لوشن',
    cat: 'lotion', catLabel: 'لوشن وترطيب',
    desc: 'ترطيب سريع لإيديكي في أي مكان — ودلوقتي هدية مجانًا مع أي بودي سبلاش.',
    img: 'img/splash-vanilla.jpg', tag: 'هدية العرض'
  },
];

const grid = document.getElementById('grid');
const modal = document.getElementById('modal');

function waLink(product){
  const msg = `أهلًا Velvet Beauty\nحابة أطلب / أسأل عن: ${product}\nوصلني من الموقع.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function render(cat){
  grid.innerHTML = '';
  PRODUCTS.filter(p => cat === 'all' || p.cat === cat).forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-imgwrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
      </div>
      <div class="card-body">
        <span class="card-cat">${p.catLabel}</span>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-foot">
          <span class="card-price">السعر على واتساب</span>
          <a class="card-order" href="${waLink(p.name)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            اطلبي
            <svg viewBox="0 0 24 24" class="ic"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
          </a>
        </div>
      </div>`;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
    setTimeout(() => card.classList.add('show'), 60 * i);
  });
}

function openModal(p){
  document.getElementById('mImg').src = p.img;
  document.getElementById('mImg').alt = p.name;
  document.getElementById('mCat').textContent = p.catLabel;
  document.getElementById('mName').textContent = p.name;
  document.getElementById('mDesc').textContent = p.desc;
  document.getElementById('mOrder').href = waLink(p.name);
  modal.showModal();
}
document.getElementById('modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// فلاتر
document.getElementById('chips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  render(chip.dataset.cat);
});

// أزرار واتساب العامة
document.querySelectorAll('.wa-order').forEach(a => {
  a.href = waLink(a.dataset.product || 'استفسار');
});

// منيو الموبايل
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', () => nav.classList.remove('open'));

// ظهور العناصر
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.offer-card, .bundle, .step, .review-list blockquote, .masonry img, .sec-title, .sec-sub')
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });
// أمان: لو المراقبة ماشتغلتش لأي سبب، العناصر تظهر لوحدها
setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 2200);

render('all');
