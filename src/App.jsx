import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "./assets/car.png";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page-load animation
      const intro = gsap.timeline();

      intro
        .from(".hero-letter", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        })
        .from(
          carRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".stat-card",
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.5"
        );
        // Make the car straight
        gsap.set(carRef.current, {
        rotation: 0,
        x: window.innerWidth < 640 ? 0 : -200,
      });
        // Scroll-based animation
        gsap.to(carRef.current, {
          x: () =>
  Math.max(
    20,
    window.innerWidth - carRef.current.offsetWidth - 20
  ),
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
      // Headline moves slightly while scrolling
      gsap.to(".hero-title", {
        y: -120,
        opacity: 0.2,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Statistics move and fade while scrolling
      gsap.to(".stats-container", {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#0e1a17] text-[#eef3ee]">
      
      {/* Scrollable Hero Area */}
      <section
        ref={heroRef}
        className="relative min-h-[400vh]"
      >
        
        {/* Sticky Hero */}
        <div className="sticky top-0 h-screen overflow-hidden">
          
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#18342d_0%,_#0e1a17_60%)]" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-20">
            
            {/* Heading */}
             <h1 className="hero-title absolute top-[20%] w-full px-4 text-center text-2xl font-bold tracking-[0.05em] sm:top-[24%] sm:text-4xl sm:tracking-[0.12em] md:top-[27%] md:text-6xl md:tracking-[0.15em] lg:text-8xl lg:tracking-[0.18em]">
              <span className="hero-letter inline-block">W</span>
              <span className="hero-letter inline-block">E</span>
              <span className="hero-letter inline-block">L</span>
              <span className="hero-letter inline-block">C</span>
              <span className="hero-letter inline-block">O</span>
              <span className="hero-letter inline-block">M</span>
              <span className="hero-letter inline-block">E</span>

              <span className="inline-block w-6 md:w-12" />

              <span className="hero-letter inline-block text-[#d4ff3a]">I</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">T</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">Z</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">F</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">I</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">Z</span>
              <span className="hero-letter inline-block text-[#d4ff3a]">Z</span>
            </h1>

            {/* Car */}

            <img
            ref={carRef}
            src={car}
            alt="Sports car"
            className="absolute left-0 top-[83%] w-[75vw] max-w-[700px] sm:top-[60%] md:top-[57%]"
            />

            {/* Statistics */}
            <div className="stats-container absolute left-1/2 top-[32%] grid w-[calc(100%-32px)] max-w-6xl -translate-x-1/2 grid-cols-2 gap-4 sm:top-[43%] sm:w-[calc(100%-64px)] sm:gap-8 md:grid-cols-4">
              
              <div className="stat-card text-center">
                <h2 className="text-4xl font-bold text-[#d4ff3a] md:text-5xl">
                  58%
                </h2>
                <p className="mt-2 text-base text-gray-300 md:text-lg">
                  Increase in pickup point use
                </p>
              </div>

              <div className="stat-card text-center">
                <h2 className="text-4xl font-bold text-[#d4ff3a] md:text-5xl">
                  23%
                </h2>
                <p className="mt-2 text-base text-gray-300 md:text-lg">
                  Decrease in customer phone calls
                </p>
              </div>

              <div className="stat-card text-center">
                <h2 className="text-4xl font-bold text-[#d4ff3a] md:text-5xl">
                  27%
                </h2>
                <p className="mt-2 text-base text-gray-300 md:text-lg">
                  Increase in pickup point use
                </p>
              </div>

              <div className="stat-card text-center">
                <h2 className="text-4xl font-bold text-[#d4ff3a] md:text-5xl">
                  40%
                </h2>
                <p className="mt-2 text-base text-gray-300 md:text-lg">
                  Decrease in customer phone calls
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default App;