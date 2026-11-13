const cells = Array.from(document.querySelectorAll('.cells section'));
const container = document.querySelector('.cells');
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const counter = document.getElementById('counter');
const navLinks = document.querySelectorAll('header nav a');

let currentIndex = 0;
let lockScroll = false;
let lastWheelTime = 0;

const totalCells = cells.length;
const delay = 1000;
const edgePause = 600;

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

function isScrollableY(element) {
    if (!(element instanceof HTMLElement) || element.scrollHeight <= element.clientHeight + 1) {
        return false;
    }
    const overflowY = window.getComputedStyle(element).overflowY;
    return overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
}

function getScrollableChain(section, target) {
    const chain = [];
    let element = target instanceof Element ? target : null;
    while (element && element !== section) {
        if (section.contains(element) && isScrollableY(element)) {
            chain.push(element);
        }
        element = element.parentElement;
    }
    if (!chain.length) {
        const content = section.querySelector('[data-scrollable]');
        if (content && isScrollableY(content)) {
            chain.push(content);
        }
    }
    return chain;
}
function normalizeWheelDelta(event, section) {
    let delta = event.deltaY;
    if (event.deltaMode === 1) {
        delta *= 16;
    } else if (event.deltaMode === 2) {
        delta *= section.clientHeight || window.innerHeight;
    }
    return delta;
}

function scrollChainBy(chain, delta) {
    let remaining = delta;
    chain.forEach(element => {
        if (!remaining) return;
        const maxScroll = element.scrollHeight - element.clientHeight;
        if (remaining > 0) {
            const available = maxScroll - element.scrollTop;
            if (available <= 0) return;
            const step = Math.min(available, remaining);
            element.scrollTop += step;
            remaining -= step;
        } else {
            const available = element.scrollTop;
            if (available <= 0) return;
            const step = Math.max(-available, remaining);
            element.scrollTop += step;
            remaining -= step;
        }
    });
    return Math.abs(remaining) < 1 ? 0 : remaining;
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
    if (event.ctrlKey || !event.deltaY) return;

    const section = cells[currentIndex];
    if (!section) return;

    const now = performance.now();
    const idleTime = now - lastWheelTime;
    lastWheelTime = now;
    
    event.preventDefault();
    const chain = getScrollableChain(section, event.target);
    if (!chain.length) {
        goToCell(currentIndex + (event.deltaY > 0 ? 1 : -1));
        return;
    }
    const delta = normalizeWheelDelta(event, section);
    if (!delta) return;
    const remaining = scrollChainBy(chain, delta);
    if (!remaining) return;
    const moved = remaining !== delta;
    if (!moved && idleTime > edgePause) {
        goToCell(currentIndex + (delta > 0 ? 1 : -1));
    }
}, { passive: false });

window.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, button')) return;

    let direction = 0;
    let pageStep = false;
    if (event.key === 'ArrowDown') {
        direction = 1;
    } else if (event.key === 'ArrowUp') {
        direction = -1;
    } else if (event.key === 'PageDown') {
        direction = 1;
        pageStep = true;
    } else if (event.key === 'PageUp') {
        direction = -1;
        pageStep = true;
    }
    if (!direction) return;
    event.preventDefault();
    const section = cells[currentIndex];
    if (!section) return;
    const chain = getScrollableChain(section, event.target);
    if (chain.length) {
        const amount = (pageStep ? section.clientHeight * 0.8 : 100) * direction;
        const remaining = scrollChainBy(chain, amount);
        if (!remaining) return;
        if (remaining !== amount) return;
    }
    goToCell(currentIndex + direction);
});

container.addEventListener('scroll', syncCurrentIndexFromScroll, { passive: true });
updateCounter();
