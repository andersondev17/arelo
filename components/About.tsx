// components/About.tsx
import { ArrowRight, Code, Rocket, Users } from 'lucide-react';
import AnimatedTitle from './ui/AnimatedTitle';
import FeatureCard from './ui/FeatureCard';

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-orange-500" />,
    title: 'Innovación Constante',
    description: 'Transformamos ideas en soluciones digitales de vanguardia que impulsan el crecimiento de tu negocio.'
  },
  {
    icon: <Code className="w-6 h-6 text-orange-500" />,
    title: 'Excelencia Técnica',
    description: 'Desarrollamos software robusto y escalable utilizando las últimas tecnologías y mejores prácticas.'
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: 'Enfoque Colaborativo',
    description: 'Trabajamos en estrecha colaboración con nuestros clientes para crear soluciones que excedan expectativas.'
  }
];

const About = () => {
  return (
    <section id="about" className="min-h-screen w-full bg-gradient-to-b from-zinc-950 to-zinc-900 py-20">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-general text-orange-500 font-medium tracking-wide uppercase mb-4">
            Bienvenidos a Arelo
          </p>

          <div className='items center relative'>
          <AnimatedTitle
            title="Trans<b>fo</b>rma <br/> tu Visi<b>o</b>n Digital"
            containerClass="mt-4 mb-8 text-white text-center"
          />
          </div>

          

          <p className="text-xl text-gray-300 leading-relaxed">
            Somos más que una empresa de software - somos tu socio estratégico en la transformación digital. 
            Combinamos creatividad técnica con experiencia empresarial para desarrollar soluciones que marcan la diferencia.
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Botón de llamada a la acción */}
        <div className="text-center mt-12">
          <a 
            href="#contacto" 
            className="font-zentry text-2xl inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
          >
            Comencemos tu proyecto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;