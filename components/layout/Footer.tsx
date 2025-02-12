// components/Footer.tsx
import { Separator } from "@/components/ui/separator";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, LucideIcon, Mail, MapPin, Phone } from 'lucide-react';

// Configuración inicial de GSAP
gsap.registerPlugin(ScrollTrigger);

// Tipos y constantes
type SocialLink = {
    icon: LucideIcon;
    href: string;
    label: string;
};

type ContactInfo = {
    icon: LucideIcon;
    text: string;
};

const CURRENT_YEAR = new Date().getFullYear();
const COMPANY_NAME = "Arelo";
const SOCIAL_LINKS: SocialLink[] = [{ icon: Instagram, href: "#", label: "Instagram" }];
const QUICK_LINKS = ["Inicio", "Servicios", "Proyectos", "Contacto"];
const CONTACT_INFO: ContactInfo[] = [
    { icon: MapPin, text: "Medellín, Antioquia, Colombia" },
    { icon: Phone, text: "+57 3042415204" },
    { icon: Mail, text: "contacto@arelo.com" }
];

// Componente principal
const Footer = () => {
    useGSAP(() => {
        gsap.from(".footer-content", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#footer",
                start: "top bottom",
                end: "+=100",
                scrub: 0.5,
            }
        });
    });

    return (
        <footer id="footer" className="bg-zinc-950 text-gray-300 p-4">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <ContactColumn />
                    <QuickLinksColumn />
                    <SocialColumn />
                </div>

                <Separator className="my-8 bg-zinc-800" />

                <CopyrightSection />
            </div>
        </footer>
    );
};

// Subcomponentes
const SectionHeading = ({ title }: { title: string }) => (
    <h3 className="text-white text-lg font-semibold relative inline-block mb-4">
        {title}
        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-orange-500" />
    </h3>
);

const ContactColumn = () => (
    <div className="footer-content space-y-4">
        <SectionHeading title={`${COMPANY_NAME} Software`} />
        <p className="text-sm">
            Desarrollando soluciones tecnológicas innovadoras para impulsar tu negocio hacia el futuro.
        </p>
        <div className="space-y-3">
            {CONTACT_INFO.map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-center gap-2 group">
                    <Icon size={16} className="text-orange-500" />
                    <span className="text-sm group-hover:text-white transition-colors duration-300">
                        {text}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const QuickLinksColumn = () => (
    <div className="footer-content">
        <SectionHeading title="Enlaces Rápidos" />
        <ul className="space-y-2">
            {QUICK_LINKS.map((label, index) => (
                <li key={index}>
                    <a
                        href={`#${label.toLowerCase()}`}
                        className="text-sm hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group"
                    >
                        <span className="w-0 h-0.5 bg-orange-500 group-hover:w-2 transition-all duration-300" />
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const SocialColumn = () => (
    <div className="footer-content">
        <SectionHeading title="Síguenos" />
        <div className="flex gap-2">
            {SOCIAL_LINKS.map((social, index) => (
                <SocialButton key={index} {...social} />
            ))}
        </div>
    </div>
);

const SocialButton = ({ icon: Icon, href, label }: SocialLink) => (
    <a
        href={href}
        aria-label={label}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-800 hover:text-orange-500 transition-colors duration-300"
    >
        <Icon className="h-5 w-5" />
    </a>
);

const CopyrightSection = () => (
    <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-400">
            Copyright © {CURRENT_YEAR} {COMPANY_NAME}. Todos los derechos reservados.
        </div>
        <div className="flex gap-6 text-sm">
            {["Política de Privacidad", "Términos de Servicio"].map((text, index) => (
                <a
                    key={index}
                    href="#"
                    className="hover:text-orange-500 transition-colors duration-300"
                >
                    {text}
                </a>
            ))}
        </div>
    </div>
);

export default Footer;