import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "По каким причинам мое обращение могут отклонить?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-gray-400">
        <li>Истечение 48 часов с момента нарушения (если иное не указано в законе).</li>
        <li>Обращение составлено не по форме.</li>
        <li>Редактирование обращения без соответствующей пометки или до принятия.</li>
        <li>Наличие оскорблений, мата или угроз в тексте или доказательствах.</li>
        <li>Отсутствие тайм-кодов для видео длиннее 2 минут.</li>
        <li>Доказательства подверглись монтажу.</li>
      </ul>
    )
  },
  {
    question: "Каковы основные принципы работы прокуратуры?",
    answer: "Мы руководствуемся принципами законности, объективности и неотвратимости наказания. Каждое обращение рассматривается индивидуально, без предвзятости к какой-либо стороне конфликта."
  },
  {
    question: "Требования к доказательствам",
    answer: (
      <div className="space-y-2 text-gray-400">
        <p>Скриншоты должны быть загружены на <span className="text-white">Imgur/Yapx</span>.</p>
        <p>Видеодоказательства — на <span className="text-white">YouTube/Twitch/RuTube</span>.</p>
        <p>Качество видео должно быть не менее 720p, чтобы можно было четко разобрать детали (ID, чат).</p>
      </div>
    )
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" title="Часто задаваемые вопросы" subtitle="Ответы на популярные вопросы о работе прокуратуры" darker>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`border border-justice-border rounded-lg overflow-hidden transition-all duration-300 animate-[fadeInUp_0.5s_ease-out_forwards] ${openIndex === index ? 'bg-zinc-900 shadow-lg shadow-justice-gold/5' : 'bg-justice-card hover:bg-zinc-900'}`}
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 flex items-center justify-between focus:outline-none group"
            >
              <div className="flex items-center gap-3">
                 <HelpCircle className={`h-5 w-5 transition-colors duration-300 ${openIndex === index ? 'text-justice-gold' : 'text-gray-500 group-hover:text-justice-gold/70'}`} />
                 <span className={`text-left font-medium text-lg transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                   {item.question}
                 </span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-justice-gold" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-300" />
              )}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-6 pb-6 pt-0 pl-14 text-base leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};