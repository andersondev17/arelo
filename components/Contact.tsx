import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { TiLocation, TiMail, TiPhone, TiTime } from "react-icons/ti";
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => (
    <div className="space-y-6">
        <div className="flex items-center gap-3">
            <TiLocation className="h-6 w-6 text-orange-500" />
            <p>Medellín, Antioquia, Colombia</p>
        </div>
        <div className="flex items-center gap-3">
            <TiPhone className="h-6 w-6 text-orange-500" />
            <p>+57-304241520</p>
        </div>
        <div className="flex items-center gap-3">
            <TiMail className="h-6 w-6 text-orange-500" />
            <p>johnmaxi1722@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
            <TiTime className="h-6 w-6 text-orange-500" />
            <p>Mon-Fri - 08:00-19:00</p>
        </div>
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useGSAP(() => {
        const contactTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#contacto",
                start: "top center",
                end: "+=300",
                scrub: 0.5,
            },
        });

        contactTimeline
            .from(".contact-content", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const subject = "Nuevo contacto desde Website";
            const body = `
        Nombre: ${formData.name}
        Teléfono: ${formData.phone}
        Email: ${formData.email}
        Mensaje: ${formData.message}
      `.trim();

            const mailtoLink = `mailto:johnmaxi1722@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            toast({
                title: "Mensaje enviado",
                description: "Nos pondremos en contacto contigo pronto.",
                variant: "default",
            });

            setFormData({
                name: "",
                phone: "",
                email: "",
                message: ""
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contacto" className="min-h-screen w-screen  py-20 bg-gray-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">  
                    <p className="font-general text-sm uppercase md:text-[10px] mb-6">
                        Contáctanos
                    </p>
                    <AnimatedTitle
                        title="Pon<b>t</b>e en <br/> Con<b>t</b>acto"
                        containerClass="mt-5 !text-black text-center"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                    <Card className="contact-content p-8 border-none shadow-lg bg-zinc-50">
                        <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                        <ContactInfo />
                    </Card>

                    <Card className="contact-content p-8 border-none shadow-lg bg-zinc-50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Nombre
                                    </label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="border-gray-200 focus:border-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">
                                        Teléfono
                                    </label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="border-gray-200 focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Correo electrónico
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="border-gray-200 focus:border-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Mensaje
                                </label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    className="min-h-[150px] border-gray-200 focus:border-orange-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                title="Enviar mensaje"
                            >
                                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;