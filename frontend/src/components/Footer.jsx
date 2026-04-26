"use client"

import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  tailoring: {
    title: "Tailoring",
    links: [
      { label: "Women's Wear", href: "#" },
      { label: "Men's Wear", href: "#" },
      { label: "Customizations", href: "#" },
      { label: "Alterations", href: "#" }
    ]
  },
  collections: {
    title: "Collections",
    links: [
      { label: "Wedding Edit", href: "#" },
      { label: "Festive Wear", href: "#" },
      { label: "Formal Business", href: "#" },
      { label: "New Arrivals", href: "#" }
    ]
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Process", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" }
    ]
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" }
    ]
  }
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" }
]

export default function Footer() {
  return (
    <footer className="bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="font-italiana text-3xl tracking-[0.3em]">KAARIQ</div>
            <p className="font-serif-display text-3xl lg:text-4xl mt-6 leading-tight max-w-md">Your fabric, your fit, your story.</p>
            <p className="text-sm opacity-75 mt-4 max-w-md">Bespoke tailoring & boutique. Doorstep measurement, virtual fitting, and master craftsmanship — all in one atelier.</p>
            <div className="flex gap-3 mt-8">
              <a href="#" aria-label="Instagram" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Instagram className="w-4 h-4"/></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Facebook className="w-4 h-4"/></a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Youtube className="w-4 h-4"/></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="font-serif text-2xl font-semibold">Kaariq</span>
            </Link>
            <p className="text-white/60 text-sm mb-5 max-w-sm leading-relaxed">
              Crafting elegance since 2015. Bespoke tailoring and boutique services
              that celebrate your unique style.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#A5978B] hover:text-[#A5978B] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-sm font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex flex-wrap gap-5 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>hello@kaariq.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Mumbai, India</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-xs text-white/60">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Kaariq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
