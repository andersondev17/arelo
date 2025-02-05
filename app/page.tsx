'use client';
import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Hero from "@/components/layout/Hero";
import NavBar from "@/components/layout/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div >
      <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-600">
        <NavBar />
        <div id ="inicio"  className='min-h-screen'>
        <Hero /> 
        </div>

        <div id ="quienes somos"  className='min-h-screen'>
        <About />
        </div>

        <div id="servicios" className='min-h-screen'>
          <Services />
        </div>

        <div id ="portafolio"  className='min-h-screen'>
        <Portfolio />
        </div>

        <div id ="clientes"  className='min-h-screen'>
        <Clients />
        </div>

        <div id ="contacto"  className='min-h-screen'>
        <Contact />
        </div>



        

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-zinc-950">
        
<div className="flex gap-6 flex-wrap items-center justify-center font-robert-regular p-3 text-white ">
Copyright © 2025 Arelo. All rights reserved.

  </div>         
      </footer>
    </div>
  );
}
