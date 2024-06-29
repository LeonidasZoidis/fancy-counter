// ripple.ts
import React, { MouseEvent } from 'react';
import './ripple.css';

export const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;

    ripple.classList.add('ripple');

    const rippleContainer = button.getElementsByClassName('ripple')[0];
    if (rippleContainer) {
        rippleContainer.remove();
    }

    button.appendChild(ripple);

    // Remove the ripple element after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
};
