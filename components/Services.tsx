'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiCode, TiUserAdd, TiZoom } from "react-icons/ti";
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const serviceItems = [
  {
    icon: <TiCode className="h-12 w-12 text-blue-600" />,
    title: "Desarrollo de Software a la Medida",
    description: "Creamos soluciones de software adaptadas a las necesidades específicas de tu negocio, asegurando un rendimiento óptimo y escalabilidad."
  },
  {
    icon: <TiZoom className="h-12 w-12 text-blue-600" />,
    title: "QA Testing",
    description: "Ofrecemos nuestros servicios en Testing de Software, Velando siempre por el aseguramiento de la calidad del Software implementado en tu empresa."
  },
  {
    icon: <TiUserAdd className="h-12 w-12 text-blue-600" />,
    title: "Solicitud de Recursos",
    description: "Solicitud de Analistas de QA y Desarrolladores FRONT especializados para fortalecer tu equipo de desarrollo."
  }
];

const Services = () => {
  useGSAP(() => {
    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#services",
        start: "top center",
        end: "+=400",
        scrub: 0.5,
      },
    });

    servicesTimeline
      .from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
  });

  return (
    <div id="servicios" className="min-h-screen w-screen bg-zinc-50 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="font-general text-sm uppercase md:text-[10px] mb-6">
            Nuestros Servicios
          </p>
          <AnimatedTitle
            title="Sol<b>u</b>ciones que <br/> Ofre<b>c</b>emos"
            containerClass="mt-5 !text-black text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {serviceItems.map((service, index) => (
            <Card 
              key={index}
              className="service-card group bg-white hover:bg-blue-50 transition-all duration-300 ease-in-out border-none shadow-lg hover:shadow-xl"
            >
              <CardHeader className="flex items-center justify-center pt-8">
                <div className="rounded-full p-4 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 text-xl font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 group-hover:text-gray-700">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;