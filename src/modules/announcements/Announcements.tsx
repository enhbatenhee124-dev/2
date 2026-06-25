import React from 'react';
import { Announcement, NewAnnouncement as NewAnnouncementType } from '../../types';

interface AnnouncementsProps {
  announcements: Announcement[];
  isAdminMode: boolean;
  newAnnouncement: NewAnnouncementType;
  setNewAnnouncement: React.Dispatch<React.SetStateAction<NewAnnouncementType>>;
  addAnnouncement: (e: React.FormEvent) => void;
  removeAnnouncement: (id: number) => void;
}

const Announcements: React.FC<AnnouncementsProps> = ({ 
  announcements, 
  isAdminMode, 
  newAnnouncement, 
  setNewAnnouncement, 
  addAnnouncement, 
  removeAnnouncement 
}) => {
  return (
    <section id="announcements" className="py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Мэдээлэл</h2>
          <p className="text-[#9CA3AF] text-lg">Чухал мэдээ болон мэдэгдэл</p>
        </div>

        {isAdminMode && (
          <div className="mb-12 p-6 bg-[#0A0E17] rounded-2xl border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Шинэ Мэдээлэл Нэмэх</h3>
            <form onSubmit={addAnnouncement} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Чухал Төвшөө</label>
                  <select 
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Өндөр">Өндөр</option>
                    <option value="Дунд">Дунд</option>
                    <option value="Бага">Бага</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Огноо</label>
                  <input 
                    type="text" 
                    value={newAnnouncement.date}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, date: e.target.value})}
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Гарчиг</label>
                <input 
                  type="text" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Мэдээллийн гарчиг..."
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Агуулга</label>
                <textarea 
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder="Мэдээллийн агуулга..."
                  rows={3}
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-y"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-[#93C5FD] text-[#05070F] rounded-xl font-bold text-lg hover:shadow-blue-500/50 transition"
              >
                Мэдээлэл Нэмэх
              </button>
            </form>
          </div>
        )}
        
        <div className="space-y-6">
          {announcements.map((item) => (
            <div key={item.id} className="bg-[#0A0E17]/80 p-8 rounded-2xl border-l-4 border-gray-800 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm relative">
              {isAdminMode && (
                <button 
                  onClick={() => removeAnnouncement(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition flex items-center justify-center font-bold"
                >
                  ×
                </button>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                      item.priority === "High" || item.priority === "Өндөр" ? "bg-red-500/20 text-red-400" :
                      item.priority === "Medium" || item.priority === "Дунд" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-mono text-[#6B7280]">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#9CA3AF]">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;