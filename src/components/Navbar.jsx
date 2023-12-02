import React from 'react';

export default function Navbar({ nama, id, visibleNav }) {
    const scrollTo = () => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    return (
        <li>
            <a onClick={() => scrollTo} className={`scroll-smooth hover:underline hover:underline-offset-8 flex`} href={nama.link}>
                {nama.name}
            </a>
        </li>
    )
}
