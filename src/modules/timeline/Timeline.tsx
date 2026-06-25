import React from 'react';

const Timeline: React.FC = () => {
  const timelineData = [
    {
      year: '2018',
      title: 'Boot_Sequence_Initialized',
      description: 'Шижир Индра Кибер Институтыг Улаанбаатарт үүсгэн байгуулав. Энэтхэгийн технологийн компанитай хамтарсан сургалтын загварыг Монголд анх нутагшуулав. Программ хангамж, График дизайн, Дижитал Маркетинг — 3 гол чиглэлээр элсэлт авч эхэлсэн.',
    },
    {
      year: '2020',
      title: 'Scaling_Up',
      description: 'Дижитал мэргэжилтний эрэлт огцом нэмэгдэж, элсэлт жил бүр өсч, нийт оюутны тоо 300 давав. Google, Meta олон улсын сертификатын хөтөлбөрийг сургалтдаа нэгтгэв.',
    },
    {
      year: '2022',
      title: 'Global_Expansion',
      description: 'Harvard Leadership Certificate, IELTS бэлтгэлийг бүх ангиудад нэмэв. Нийт 700 гаруй оюутныг амжилттай төгсгөсөн. Skillcraft — 15–18 насны залуучуудад зориулсан шинэ анги нэмэгдэв.',
    },
    {
      year: '2023',
      title: 'AI_Era_Activated',
      description: 'Бүх хөтөлбөрт AI хэрэгслийг (ChatGPT, Claude, Midjourney г.м) идэвхтэй нэгтгэж эхлэв. ITPEC шалгалтад оюутнууд амжилттай тэнцэв.',
    },
    {
      year: '2025',
      title: 'Ecosystem_Mode',
      description: '2025–2026 хичээлийн жилд 251 оюутан элсэв. Шижир ерөнхий захирлаар буцан томилогдож, стратеги болон хөтөлбөрийн шинэчлэлийг шууд удирдаж байна. AI-г бүрэн нэгтгэсэн шинэ хөтөлбөр бэлтгэгдэж байна.',
    },
  ];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">05</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">TIMELINE</h2>
          <p className="text-[#9CA3AF] text-lg">2018 → Өнөөдөр<br />Монголын дижитал боловсролын тэргүүлэх байгууллагын өсөлтийн түүх.</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 h-full"></div>

          {timelineData.map((item, index) => (
            <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-2">{item.title}</div>
                <div className="text-white text-xl font-bold mb-2">{item.year}</div>
                <div className="text-[#9CA3AF] text-sm">{item.description}</div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-[#05070F] z-10"></div>

              {/* Empty Space for layout */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
