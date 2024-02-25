import React from 'react'
import logo from "../assets/logo.png"
const Footer = () => {
    return (

        <footer className="footer p-10 bg-red-200/30 text-base ">
            <aside>
                <img src={logo} alt="" className='w-[300px]' />
            </aside>
            <nav>
                <header className="footer-title text-[#f54748] text-xl">Services</header>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <header className="footer-title text-[#f54748] text-xl">Company</header>
                <a class="link link-hover">About us</a>
                <a class="link link-hover">Contact</a>
                <a class="link link-hover">Jobs</a>
                <a class="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header class="footer-title text-[#f54748] text-xl">Legal</header>
                <a class="link link-hover">Terms of use</a>
                <a class="link link-hover">Privacy policy</a>
                <a class="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}

export default Footer