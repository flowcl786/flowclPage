/* blog.js — category filter + card click */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.post-card');
  const empty = document.getElementById('posts-empty');

  // Make each card clickable via data-href
  cards.forEach(card => {
    const href = card.dataset.href;
    if (href) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => { window.location.href = href; });
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
});
