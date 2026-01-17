
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-[#0a0a0a] pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-1 group mb-4">
                            <span className="font-bold tracking-tight text-lg">
                                <span className="text-teal-400">whois</span><span className="text-purple-500">alfaz</span> <span className="text-teal-400">.me</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Empowering SaaS founders and agencies with intelligent automation and technical SEO.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Menu</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
                            <li><Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Privacy Policy</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Socials (Optional placeholder) */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="https://www.facebook.com/" target="_blank" className="hover:text-blue-400 transition-colors">Facebook</a></li>
                            <li><a href="https://www.linkedin.com/in/alfaz-mahmud-rizve/" target="_blank" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/whois.alfaz/" target="_blank" className="hover:text-blue-400 transition-colors">Instagram</a></li>
                            <li><a href="mailto:contact@whoisalfaz.me" className="hover:text-blue-400 transition-colors">Email Me</a></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800/50 pt-8 text-center text-slate-600 text-xs">
                    <p>&copy; {currentYear} WhoIsAlfaz. Built with Next.js & WordPress.</p>
                </div>
            </div>
        </footer>
    );
}
