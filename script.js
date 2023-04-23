const element = document.querySelector('.animateMe');

const mouseHoverAnimation = () => {
    anime({
        targets: '.line-drawing-demo .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });
}

const mouseOutAnimation = () => {
    anime({
        targets: element,
        width: '50%',
        scale: {
            delay: 800,
            value: 1
        },
        duration: 1500
    })
}

element.addEventListener('mouseover', mouseHoverAnimation)
element.addEventListener('mouseout', mouseOutAnimation)