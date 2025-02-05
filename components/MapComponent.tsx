import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./ui/AnimatedTitle";

const MapComponent = () => {
    const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25816.465835100567!2d-75.575806188199!3d6.251081631715492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428fecb4dff77%3A0x2e5a7e51ab929892!2sPlaza%20Botero!5e0!3m2!1ses!2sus!4v1726065241882!5m2!1ses!2sus";

    useGSAP(() => {
        const mapTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#map-section",
                start: "top center",
                end: "+=300",
                scrub: 0.5,
            },
        });

        mapTimeline.from(".map-content", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    return (
        <div id="map-section" className="w-screen py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <p className="font-general text-sm uppercase md:text-[10px] mb-6 text-gray-200">
                        Ubicación
                    </p>
                    <AnimatedTitle
                        title="Encuén<b>t</b>ranos <br/> A<b>q</b>uí"
                        containerClass="mt-5 !text-white text-center"
                    />
                </div>

                <div className="map-content relative w-full h-[500px] rounded-lg overflow-hidden">
                    <iframe
                        src={iframeSrc}
                        width="100%"
                        height="100%"
                        className="border-0 rounded-lg"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Arelo Software"
                    />

                    <Card className="absolute bottom-4 left-4 p-4 bg-gray-900/90 border-none text-white max-w-sm">
                        <h3 className="font-semibold mb-2">Arelo Software</h3>
                        <p className="text-sm text-gray-300">
                            Medellín, Antioquia, Colombia<br />
                            Horario: Lun-Vie 8:00-19:00
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;