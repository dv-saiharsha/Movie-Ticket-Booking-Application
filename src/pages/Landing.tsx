import React, { useState, useRef, useEffect } from 'react';
import { movies } from '../data/movies';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Landing() {
  const [activeTab, setActiveTab] = useState<'TODAY' | 'SOON'>('TODAY');
  const [selectedHeroMovieId, setSelectedHeroMovieId] = useState(movies[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter movies for sections
  const heroMovies = movies.slice(0, 8); // Top movies for slider

  // Scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
        const index = heroMovies.findIndex(m => m.id === selectedHeroMovieId);
        if (index !== -1) {
            const cardWidth = window.innerWidth >= 768 ? 140 : 100; // Match CSS width
            const gap = 16; // gap-4 = 16px
            const mdOffset = window.innerWidth >= 768 ? 0.35 * window.innerWidth : 0.5 * window.innerWidth;
            
            // Calculate position to center the card roughly at the 'pl-[40%]' mark
            // Actually, we want the card to be at the "Hero" spot.
            // Based on padding: pl-[50%] -> center.
            // If we want it to be "centered" in the padding area:
            
            const itemLeft = index * (cardWidth + gap);
            // We want itemLeft to be at the scroll start (0) effectively relative to the padding
            // But with pl-[50%], scrollLeft=0 shows the first item at 50% width.
            
            // Let's try centering behavior:
            const container = scrollContainerRef.current;
            const targetScroll = itemLeft; 
            
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    }
  }, [selectedHeroMovieId, heroMovies]);
  const nowPlaying = movies.slice(0, 6);
  const comingSoon = movies.slice(6, 12);

  const selectedHeroMovie = movies.find(m => m.id === selectedHeroMovieId) || movies[0];

  return (
    <div className="md:min-h-screen bg-figma-bg text-white font-sans overflow-x-hidden selection:bg-figma-accent selection:text-white">
      
      {/* ---------------- HERO SECTION (Full Height) ---------------- */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col">
        
        {/* Animated Background */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={selectedHeroMovie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
            >
                {/* Gradients for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-figma-bg via-figma-bg/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-figma-bg via-figma-bg/60 to-transparent z-10" />
                
                <img 
                    src={selectedHeroMovie.poster} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-60 blur-sm scale-105"
                />
            </motion.div>
        </AnimatePresence>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-figma-accent to-purple-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(247,37,133,0.5)]">
                        <div className="w-1/2 h-full bg-black/20 rounded-l-full"></div>
                    </div>
                    <div className="flex flex-col leading-none drop-shadow-lg">
                        <h1 className="font-bold text-2xl tracking-[0.1em] text-white">CINESPHERE</h1>
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">CINEMAS</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Toggle Switch (Visual Only) */}
                    <div className="hidden md:flex w-14 h-7 bg-white/10 backdrop-blur-md rounded-full items-center px-1 cursor-pointer border border-white/20">
                        <div className="w-5 h-5 bg-figma-accent rounded-full shadow-md translate-x-7"></div>
                    </div>
                    <User className="w-6 h-6 text-gray-300 cursor-pointer hover:text-figma-accent transition-colors" />
                </div>
        </header>


        {/* Hero Content Grid */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-10 pl-4 md:pl-28 pr-4">
            
            {/* Left Sidebar Tabs (Hidden on mobile) */}
            <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-16">
                {/* Decorative Line */}
                <div className="absolute left-[30px] top-1/2 -translate-y-1/2 h-32 w-px bg-white/20"></div>

                    <button 
                        onClick={() => setActiveTab('TODAY')}
                        className={`relative text-xs font-bold tracking-[0.3em] transition-all duration-300 flex items-center gap-4 uppercase -rotate-90 origin-center w-20 py-4 ${activeTab === 'TODAY' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        TODAY
                        {activeTab === 'TODAY' && <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-figma-accent rounded-full shadow-[0_0_10px_#F72585]"></span>}
                    </button>
                    
                    <button 
                        onClick={() => setActiveTab('SOON')}
                        className={`relative text-xs font-bold tracking-[0.3em] transition-all duration-300 flex items-center gap-4 uppercase -rotate-90 origin-center w-20 py-4 ${activeTab === 'SOON' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        SOON
                        {activeTab === 'SOON' && <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-figma-accent rounded-full shadow-[0_0_10px_#F72585]"></span>}
                    </button>
            </div>


            {/* Horizontal Movie Slider */}
            <div className="w-full relative pl-4 md:pl-10">
                
                {/* Active Movie Info (Mobile/Tablet) */}
                <div className="md:absolute md:bottom-12 md:left-12 lg:left-0 mb-6 md:mb-0 max-w-lg z-50 pointer-events-none">
                     <motion.h1 
                        key={selectedHeroMovie.id + selectedHeroMovie.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-2 leading-tight drop-shadow-sm text-white"
                     >
                        {selectedHeroMovie.title}
                     </motion.h1>
                     <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.1 }}
                         className="flex items-center gap-3 text-sm font-medium mb-6"
                     >
                         <span className="bg-figma-accent text-white px-2 py-0.5 rounded text-xs shadow-[0_0_10px_rgba(247,37,133,0.4)]">IMAX</span>
                         <span className="text-gray-300">{selectedHeroMovie.languages.join(', ')}</span>
                         <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                         <span className="text-gray-300">{new Date(selectedHeroMovie.releaseDate).getFullYear()}</span>
                     </motion.div>
                     
                     <div className="pointer-events-auto">
                        <Link to={`/movie/${selectedHeroMovie.id}`}>
                            <Button className="bg-gradient-to-r from-figma-accent to-purple-600 hover:from-purple-600 hover:to-figma-accent text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(247,37,133,0.4)] text-sm uppercase tracking-wider flex items-center gap-2 border border-white/10">
                                Book Now <ArrowRight size={16} />
                            </Button>
                        </Link>
                     </div>
                </div>


                {/* Cards Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex items-end gap-4 overflow-x-auto pb-12 pt-12 no-scrollbar pl-[50%] md:pl-[35%] pr-8 mask-linear-fade" 
                    style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
                >
                    
                    {heroMovies.map((movie) => {
                        const isSelected = selectedHeroMovieId === movie.id;
                        return (
                            <motion.div 
                                key={movie.id}
                                onClick={() => setSelectedHeroMovieId(movie.id)}
                                layoutId={`hero-card-${movie.id}`}
                                className={`relative flex-shrink-0 transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-figma-card shadow-lg ${isSelected ? 'w-[200px] h-[300px] md:w-[260px] md:h-[380px] shadow-[0_0_30px_rgba(120,0,255,0.4)] ring-2 ring-white/50 z-10' : 'w-[100px] h-[150px] md:w-[140px] md:h-[200px] opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}`}
                                style={{ scrollSnapAlign: 'center', flexShrink: 0 }}
                                whileHover={!isSelected ? { y: -10, scale: 1.05 } : {}}
                            >
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title} 
                                    className="w-full h-full object-cover"
                                />
                                {isSelected && (
                                     <div className="absolute inset-0 bg-gradient-to-t from-figma-bg/90 via-transparent to-transparent"></div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>

        </div>
      </div>



      {/* ---------------- SECTIONS BELOW FOLD ---------------- */}
      <div className="relative z-20 bg-figma-bg pb-24 space-y-16 pt-12 md:pt-0">
         
         {/* Gradient transition from Hero */}
         <div className="absolute top-[-100px] left-0 right-0 h-24 bg-gradient-to-t from-figma-bg to-transparent pointer-events-none"></div>

         {/* Section: Currently Playing */}
         <section className="container mx-auto px-6">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Currently playing</h2>
                 <Link to="/events" className="text-xs font-bold text-gray-400 hover:text-figma-accent uppercase tracking-widest flex items-center gap-1">
                    See All <ArrowRight size={12} />
                 </Link>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {nowPlaying.map(movie => (
                     <Link to={`/movie/${movie.id}`} key={movie.id} className="group block">
                         <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-figma-card mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(247,37,133,0.3)] group-hover:scale-105 border border-white/5">
                             <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                             
                             {/* Hover Overlay */}
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <div className="bg-figma-accent text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                     <ArrowRight size={20} />
                                 </div>
                             </div>
                             
                             <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase text-white border border-white/10">
                                {movie.language}
                             </div>
                         </div>
                         <h3 className="text-sm font-bold text-gray-200 mb-1 truncate group-hover:text-figma-accent transition-colors">{movie.title}</h3>
                         <div className="flex gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                            <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">{movie.rating}</span>
                            <span>2h 15m</span>
                         </div>
                     </Link>
                 ))}
             </div>
         </section>

         {/* Section: Coming Soon */}
         <section className="container mx-auto px-6">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Coming soon</h2>
                 <Link to="/events" className="text-xs font-bold text-gray-400 hover:text-figma-accent uppercase tracking-widest flex items-center gap-1">
                    See All <ArrowRight size={12} />
                 </Link>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {comingSoon.map(movie => (
                     <div key={movie.id} className="group block cursor-pointer">
                         <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-figma-card mb-3 grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/5">
                             <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-figma-bg/90 to-transparent opacity-0 group-hover:opacity-0"></div>
                             
                             <div className="absolute bottom-3 left-3 right-3">
                                 <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-2 text-center shadow-lg">
                                     <span className="block text-xs text-gray-400 uppercase tracking-wider mb-0.5">Release</span>
                                     <span className="block text-sm font-bold text-white">20 April</span>
                                 </div>
                             </div>
                         </div>
                         <h3 className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors mb-1 truncate">{movie.title}</h3>
                         <p className="text-[10px] text-gray-600 uppercase tracking-widest">{movie.genres[0]}</p>
                     </div>
                 ))}
             </div>
         </section>
        
        {/* Footer Minimal */}
         <footer className="pt-20 pb-8 text-center border-t border-white/5 mt-12 bg-black/20">
             <div className="mb-4">
                <span className="font-bold text-xl text-white tracking-tighter">CINESPHERE</span>
             </div>
             <p className="text-xs text-gray-600 font-medium tracking-widest uppercase">
                 Cinesphere Cinemas © 2026. All rights reserved.
             </p>
         </footer>

      </div>
    </div>
  );
}
