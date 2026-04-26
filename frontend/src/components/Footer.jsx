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
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-2">
                Stay in the loop
              </h3>
              <p className="text-white/60 text-sm">
                Subscribe for exclusive updates, new collections, and style tips.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-3 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#A5978B]"
              />
              <Button className="px-6 bg-[#66333A] hover:bg-[#66333A]/90 text-white text-sm">
                Subscribe
              </Button>
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
