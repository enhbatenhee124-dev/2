import React from 'react';
import { Lesson } from '../../types';

interface ProgramsProps {
  lessons: Lesson[];
  setSelectedLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
}

const Programs: React.FC<ProgramsProps> = ({ lessons, setSelectedLesson }) => {
  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80", // Fullstack Developer
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Digital Marketing
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", // English Language
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80", // Chinese Language
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Skillcraft / Game Dev
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80" // LITE Program / Startup
  ];

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Эрчимтэй Хөтөлбөрүүд</h2>
          <p className="text-[#9CA3AF] text-lg">Ирээдүйн цахим дайчид зориулсан цэргийн түвшний хичээлийн төлөвлөгөө</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lessons.map((lesson, i) => (
            <div key={i} className="group bg-[#0A0E17]/80 rounded-2xl overflow-hidden border border-gray-800/40 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={images[i % images.length]} 
                  alt={lesson.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    lesson.tag === "Advanced" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                    lesson.tag === "Foundational" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                    "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  }`}>
                    {lesson.tag === "Advanced" ? "Дэвшилтэт" : lesson.tag === "Foundational" ? "Суурь" : "Тусгай"}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-white">{lesson.title}</h3>
                <p className="text-[#9CA3AF] text-sm mb-6 leading-relaxed">{lesson.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-800/50">
                  <span className="text-blue-400 text-sm font-mono">{lesson.duration}</span>
                  <button 
                    onClick={() => setSelectedLesson(lesson)}
                    className="text-white text-sm font-semibold flex items-center gap-2 group-hover:text-blue-300 transition hover:scale-105"
                  >
                    Дэлгэрэнгүй Үзэх 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
