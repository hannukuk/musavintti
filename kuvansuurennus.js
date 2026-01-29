// Kuvan suurennus-logiikka
document.addEventListener('click', function (e) {
    // Etsitään lähin .img-container klikatun kohdan ympäriltä
    const container = e.target.closest('.img-container');
    
    if (container) {
        const img = container.querySelector('img');
        if (img) {
            const src = img.getAttribute('src');
            const modalImg = document.getElementById('modalImage');
            modalImg.src = src;
        }
    }
});

document.querySelectorAll('.img-container').forEach(el => {
    el.addEventListener('touchstart', () => {}, {passive: true});
});