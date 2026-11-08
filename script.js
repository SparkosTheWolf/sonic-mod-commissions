const cells = Array.from(document.querySelectorAll('.cells section'));
const container = document.querySelector('.cells');
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const counter = document.getElementById('counter');
const navLinks = document.querySelectorAll('header nav a');

let currentIndex = 0;
let lockScroll = false;

const totalCells = cells.length;
const delay = 1000;

function updateCounter() {
    counter.textContent = `${currentIndex + 1}/${totalCells}`;
}

function goToCell(index) {
    if (lockScroll) return;

    index = Math.max(0, Math.min(index, totalCells - 1));
    if (index === currentIndex) return;

    lockScroll = true;
    currentIndex = index;
    cells[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateCounter();

    window.setTimeout(() => {
        lockScroll = false;
        syncCurrentIndexFromScroll();
    }, delay);
}

function syncCurrentIndexFromScroll() {
    const scrollPosition = container.scrollTop;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cells.forEach((cell, index) => {
        const distance = Math.abs(cell.offsetTop - scrollPosition);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
    });

    if (nearestIndex !== currentIndex) {
        currentIndex = nearestIndex;
        updateCounter();
    }
}

upButton.addEventListener('click', () => goToCell(currentIndex - 1));
downButton.addEventListener('click', () => goToCell(currentIndex + 1));

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href')?.slice(1);
        const targetIndex = cells.findIndex(cell => cell.id === targetId);
        if (targetIndex < 0) return;
        event.preventDefault();
        goToCell(targetIndex);
    });
});

window.addEventListener('wheel', event => {
    const activeSection = cells[currentIndex];
    const scrollable = event.target instanceof Element
        ? event.target.closest('[data-scrollable]')
        : null;

    if (scrollable && activeSection.contains(scrollable)) {
        const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 1;
        const canScrollUp = scrollable.scrollTop > 0;
        if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) return;
    }

    event.preventDefault();
    goToCell(currentIndex + (event.deltaY > 0 ? 1 : -1));
}, { passive: false });

window.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, button')) return;

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        goToCell(currentIndex + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToCell(currentIndex - 1);
    }
});

container.addEventListener('scroll', syncCurrentIndexFromScroll, { passive: true });
updateCounter();
