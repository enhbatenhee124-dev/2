import React from 'react';
import { NewsArticle, NewNewsArticle } from '../../types';

interface NewsProps {
  news: NewsArticle[];
  isAdminMode: boolean;
  newNewsItem: NewNewsArticle;
  setNewNewsItem: React.Dispatch<React.SetStateAction<NewNewsArticle>>;
  addNews: (e: React.FormEvent) => void;
  removeNews: (id: number) => void;
  setSelectedNews: React.Dispatch<React.SetStateAction<NewsArticle | null>>;
}

const News: React.FC<NewsProps> = ({ 
  news, 
  isAdminMode, 
  newNewsItem, 
  setNewNewsItem, 
  addNews, 
  removeNews, 
  setSelectedNews 
}) => {
  return (
    <section id="news" className="py-24 px-4 sm:px-6 lg:px-12 bg-[#05070F]/50">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Сүүлийн Мэдээ</h2>
          <p className="text-[#9CA3AF] text-lg">Манай сүүлийн амжилтыг хүлээн аваарай</p>
        </div>

        {isAdminMode && (
          <div className="mb-12 p-6 bg-[#0A0E17] rounded-2xl border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Шинэ Мэдээ Нэмэх</h3>
            <form onSubmit={addNews} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Зургийн URL</label>
                  <input 
                    type="text" 
                    value={newNewsItem.image}
                    onChange={(e) => setNewNewsItem({...newNewsItem, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Огноо</label>
                  <input 
                    type="text" 
                    value={newNewsItem.date}
                    onChange={(e) => setNewNewsItem({...newNewsItem, date: e.target.value})}
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Гарчиг</label>
                <input 
                  type="text" 
                  value={newNewsItem.title}
                  onChange={(e) => setNewNewsItem({...newNewsItem, title: e.target.value})}
                  placeholder="Мэдээний гарчиг..."
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Товч Тайлбар</label>
                <textarea 
                  value={newNewsItem.excerpt}
                  onChange={(e) => setNewNewsItem({...newNewsItem, excerpt: e.target.value})}
                  placeholder="Товч тайлбар..."
                  rows={2}
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-y"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Бүтэн Мэдээ</label>
                <textarea 
                  value={newNewsItem.content}
                  onChange={(e) => setNewNewsItem({...newNewsItem, content: e.target.value})}
                  placeholder="Бүтэн мэдээ..."
                  rows={6}
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-y"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-[#93C5FD] text-[#05070F] rounded-xl font-bold text-lg hover:shadow-blue-500/50 transition"
              >
                Мэдээ Нэмэх
              </button>
            </form>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="group bg-[#0A0E17] rounded-2xl overflow-hidden border border-gray-800/60 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 relative">
              {isAdminMode && (
                <button 
                  onClick={() => removeNews(item.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition flex items-center justify-center font-bold"
                >
                  ×
                </button>
              )}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent"></div>
              </div>
              <div className="p-8">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">{item.date}</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-3">{item.title}</h3>
                <p className="text-[#9CA3AF] text-sm mb-6 leading-relaxed">{item.excerpt}</p>
                <button 
                  onClick={() => setSelectedNews(item)}
                  className="text-blue-400 text-sm font-semibold flex items-center gap-2 group-hover:text-blue-300 transition hover:scale-105"
                >
                  Бүтэн Мэдээг Унших →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;