import fs from 'fs';

let content = fs.readFileSync('src/components/features/HeroSection.tsx', 'utf8');

const oldBg = `      {/* Background with continuous slow scale for subtle motion */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: \`url(\${heroBg})\` }}
        animate={shouldReduceMotion ? {} : { 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity 
        }}
      />
      
      {/* Overlay to simulate movement / road speed (subtle) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.div 
            className="w-[200%] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAwJSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-[length:60px_100%] opacity-10 transform -skew-x-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
          />
        </div>
      )}`;

const newBg = `      {/* Video Background */}
      <div className="absolute inset-0 bg-navy overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroBg}
          className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-mountain-highway-in-the-forest-42862-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-through-the-forest-27088-large.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>`;

content = content.replace(oldBg, newBg);
fs.writeFileSync('src/components/features/HeroSection.tsx', content);
