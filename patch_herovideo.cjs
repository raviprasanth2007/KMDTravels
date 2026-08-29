const fs = require('fs');

let content = fs.readFileSync('src/components/features/HeroSection.tsx', 'utf8');

// Add useState to imports
if (!content.includes('useState')) {
  content = content.replace('import { motion, useReducedMotion } from "framer-motion";', 'import { useState } from "react";\nimport { motion, useReducedMotion } from "framer-motion";');
}

// Add state to component
if (!content.includes('const [isVideoLoaded')) {
  content = content.replace('const shouldReduceMotion = useReducedMotion();', 'const shouldReduceMotion = useReducedMotion();\n  const [isVideoLoaded, setIsVideoLoaded] = useState(false);');
}

const oldBg = `      {/* Video Background */}
      <div className="absolute inset-0 bg-navy overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroBg}
          className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"
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

const newBg = `      {/* Cinematic Video Background */}
      <div className="absolute inset-0 bg-navy overflow-hidden pointer-events-none">
        {/* Fallback Static Image (Always immediately visible) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
          style={{ 
            backgroundImage: \`url(\${heroBg})\`,
            opacity: !shouldReduceMotion && isVideoLoaded ? 0 : 1
          }}
        />
        
        {/* Dynamic Motion Video */}
        {!shouldReduceMotion && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.9 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-mountain-highway-in-the-forest-42862-large.mp4" 
              type="video/mp4" 
            />
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-through-the-forest-27088-large.mp4" 
              type="video/mp4" 
            />
          </motion.video>
        )}
      </div>`;

content = content.replace(oldBg, newBg);
fs.writeFileSync('src/components/features/HeroSection.tsx', content);
console.log('done');
