import React from 'react';
import { Admission, NewAdmission } from '../../types';

interface AdmissionsProps {
  admissions: Admission[];
  isAdminMode: boolean;
  newAdmission: NewAdmission;
  setNewAdmission: React.Dispatch<React.SetStateAction<NewAdmission>>;
  addAdmission: (e: React.FormEvent) => void;
  removeAdmission: (id: number) => void;
  setSelectedAdmission: React.Dispatch<React.SetStateAction<Admission | null>>;
}

const Admissions: React.FC<AdmissionsProps> = ({ 
  admissions, 
  isAdminMode, 
  newAdmission, 
  setNewAdmission, 
  addAdmission, 
  removeAdmission, 
  setSelectedAdmission 
}) => {
  return (
    <section id="admissions" className="py-24 px-4 sm:px-6 lg:px-12 bg-[#05070F]/50">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Эзэмшил</h2>
          <p className="text-[#9CA3AF] text-lg">Манай сүүлийн эзэмшлийн мэдээг хүлээн аваарай</p>
        </div>

        {isAdminMode && (
          <div className="mb-12 p-6 bg-[#0A0E17] rounded-2xl border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Шинэ Эзэмшил Нэмэх</h3>
            <form onSubmit={addAdmission} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Икон</label>
                  <input 
                    type="text" 
                    value={newAdmission.icon}
                    onChange={(e) => setNewAdmission({...newAdmission, icon: e.target.value})}
                    placeholder="📰"
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Огноо</label>
                  <input 
                    type="text" 
                    value={newAdmission.date}
                    onChange={(e) => setNewAdmission({...newAdmission, date: e.target.value})}
                    className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Гарчиг</label>
                <input 
                  type="text" 
                  value={newAdmission.title}
                  onChange={(e) => setNewAdmission({...newAdmission, title: e.target.value})}
                  placeholder="Эзэмшлийн гарчиг..."
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Богино Тайлбар</label>
                <input 
                  type="text" 
                  value={newAdmission.description}
                  onChange={(e) => setNewAdmission({...newAdmission, description: e.target.value})}
                  placeholder="Богино тайлбар..."
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Дэлгэрэнгүй Мэдээлэл</label>
                <textarea 
                  value={newAdmission.details}
                  onChange={(e) => setNewAdmission({...newAdmission, details: e.target.value})}
                  placeholder="Дэлгэрэнгүй мэдээлэл..."
                  rows={4}
                  className="w-full px-4 py-2 bg-[#05070F] border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-y"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-[#93C5FD] text-[#05070F] rounded-xl font-bold text-lg hover:shadow-blue-500/50 transition"
              >
                Эзэмшил Нэмэх
              </button>
            </form>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          {admissions.map((item) => (
            <div key={item.id} className="group bg-[#0A0E17] p-8 rounded-2xl border border-gray-800/60 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 relative">
              {isAdminMode && (
                <button 
                  onClick={() => removeAdmission(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition flex items-center justify-center font-bold"
                >
                  ×
                </button>
              )}
              <div className="text-4xl mb-4">{item.icon}</div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">{item.date}</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-3">{item.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.description}</p>
              <button 
                onClick={() => setSelectedAdmission(item)}
                className="mt-6 text-blue-400 text-sm font-semibold flex items-center gap-2 hover:text-blue-300 transition hover:scale-105"
              >
                Дэлгэрэнгүй →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admissions;