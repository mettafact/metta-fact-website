import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ChevronLeft, ChevronRight, Paperclip, Loader } from 'lucide-react';

export default function MetaFactSubmission() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');

  const fullText = '"In the pulp with my tinky winkies!"';

  // Typewriter effect for tagline
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;
    let resetTimeout;

    const typeText = () => {
      currentIndex = 0;
      setTypewriterText('');
      
      typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypewriterText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          resetTimeout = setTimeout(() => {
            typeText();
          }, 10000);
        }
      }, 150);
    };

    typeText();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetTimeout);
    };
  }, []);

  const screenshots = [
    {
      url: 'https://i.imgur.com/73g65AJ.jpeg',
      caption: 'Classic Metta wisdom'
    },
    {
      url: 'https://i.imgur.com/3sY6rkJ.jpeg',
      caption: 'Another gem from the archives'
    },
    {
      url: 'https://i.imgur.com/sfFY7jE.jpeg',
      caption: 'Peak Metta energy'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [screenshots.length]);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400" style={{fontFamily: "'Courier New', monospace"}}>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .blink {
          animation: blink 1s infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinning-head {
          display: inline-block;
          width: 50px;
          height: 50px;
          animation: spin 5s steps(12) infinite;
          border-radius: 50%;
          filter: brightness(1.3) contrast(1.1) drop-shadow(0 0 3px rgba(74, 222, 128, 0.4));
        }
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 255, 0, 0.03) 51%
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
        .crt {
          text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
        }
        .retro-border {
          border: 3px solid #00ff00;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.2);
        }
        .retro-button {
          background: black;
          border: 2px solid #00ff00;
          color: #00ff00;
          text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
          transition: all 0.1s;
        }
        .retro-button:hover {
          background: #00ff00;
          color: black;
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
        }
        .retro-input {
          background: black;
          border: 2px solid #00ff00;
          color: #00ff00;
          text-shadow: 0 0 3px rgba(0, 255, 0, 0.5);
        }
        .retro-input::placeholder {
          color: #006600;
        }
        .retro-input:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .tally-container iframe {
          background: transparent !important;
        }
      `}</style>

      <div className="fixed inset-0 scanlines pointer-events-none z-50"></div>

      <div className="container mx-auto px-4 py-16 max-w-4xl relative">
        <div className="text-center mb-12">
          <div className="retro-border rounded-lg p-6 mb-6 bg-black">
            <div className="flex items-center justify-center gap-6 mb-2">
              <img src="/metta-head-green.png" alt="Metta" className="spinning-head" />
              <h1 className="text-4xl md:text-6xl font-bold tracking-wider crt">
                METTA-FACT.ORG
              </h1>
              <img src="/metta-head-green.png" alt="Metta" className="spinning-head" />
            </div>
            <div className="h-px bg-green-400 my-4 opacity-50"></div>
            <p className="text-lg md:text-xl crt italic min-h-[32px]">
              {typewriterText}
              {typewriterText.length < fullText.length && <span className="blink">█</span>}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-6">
            <div className="inline-block retro-border rounded px-6 py-2 mb-4">
              <h2 className="text-2xl font-bold crt">&gt;&gt; GREATEST HITS &lt;&lt;</h2>
            </div>
          </div>

          <div className="relative">
            <div className="retro-border rounded-lg p-6 overflow-hidden bg-black">
              <div className="flex justify-center items-center min-h-[400px]">
                <img 
                  src={screenshots[currentScreenshot].url}
                  alt={screenshots[currentScreenshot].caption}
                  className="max-w-full max-h-[500px] object-contain rounded"
                  style={{filter: 'contrast(1.1) brightness(0.9)'}}
                />
              </div>

              <div className="text-center mt-4">
                <p className="text-sm italic opacity-70">
                  &gt; {screenshots[currentScreenshot].caption}
                </p>
              </div>
            </div>

            <button
              onClick={prevScreenshot}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 retro-button rounded-full p-3 font-bold text-2xl"
              aria-label="Previous screenshot"
            >
              &lt;
            </button>
            
            <button
              onClick={nextScreenshot}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 retro-button rounded-full p-3 font-bold text-2xl"
              aria-label="Next screenshot"
            >
              &gt;
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreenshot(index)}
                  className={`w-3 h-3 transition-all ${
                    index === currentScreenshot 
                      ? 'bg-green-400 w-8' 
                      : 'bg-green-900'
                  }`}
                  style={{boxShadow: index === currentScreenshot ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none'}}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block retro-border rounded px-6 py-3 mb-4">
            <p className="text-xl font-bold crt">
              [ CONTENT COLLECTION ]
            </p>
          </div>
          <p className="text-sm opacity-70">
            &gt; Please submit your favorite Metta facts, bets, pictures, or videos
          </p>
        </div>

        <div className="retro-border rounded-lg p-8 mb-12 bg-black">
          <div className="tally-container">
            <iframe 
              data-tally-src="https://tally.so/embed/RGWX64?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="800" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0" 
              title="Mettafact Submissions"
            ></iframe>
          </div>
        </div>

        <div className="mt-16 text-center opacity-60 text-sm">
          <div className="mb-2 crt">
            ═══════════════════════════════════
          </div>
          <p className="mb-1">METTA-FACT.ORG • ARCHIVE v1.0</p>
          <p className="text-xs">© GUNCH ENTERPRISES LLC</p>
          <div className="mt-2 crt">
            ═══════════════════════════════════
          </div>
        </div>
      </div>
    </div>
  );
}