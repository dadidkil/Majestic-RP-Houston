import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Input, TextArea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ComplaintFormState } from '../types';
import { generateComplaintText } from '../services/geminiService';

const initialFormState: ComplaintFormState = {
  number: '',
  name: '',
  id: '',
  org: '',
  violator: '',
  description: '',
  date: '',
  materials: '',
  passport: '',
  discord: ''
};

export const ComplaintGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ComplaintFormState>(initialFormState);
  const [generatedData, setGeneratedData] = useState<{ title: string; body: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<'title' | 'body' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (Object.values(formData).some(val => val.trim() === '')) {
      setError("Пожалуйста, заполните все поля формы.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedData(null);

    try {
      const result = await generateComplaintText(formData);
      setGeneratedData(result);
    } catch (err: any) {
      setError(err.message || "Ошибка при генерации.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, field: 'title' | 'body') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <Section 
      id="complaint" 
      title="Помощник Прокурора (AI)" 
      subtitle="Заполните простую форму, и искусственный интеллект Gemini составит для вас юридически грамотное обращение согласно регламенту."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Column */}
        <div className="bg-justice-card border border-justice-border p-6 sm:p-8 rounded-xl shadow-2xl animate-[fadeInUp_0.6s_ease-out_forwards]">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-justice-border">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <FileText className="h-6 w-6 text-justice-gold" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Вводные данные</h3>
          </div>

          <div className="space-y-2">
            <Input name="number" label="№ обращения (на форуме)" placeholder="123" value={formData.number} onChange={handleInputChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Input name="name" label="Ваше Имя Фамилия" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
               <Input name="id" label="Ваш ID-card" placeholder="12345" type="number" value={formData.id} onChange={handleInputChange} />
            </div>
            <Input name="org" label="Орг. нарушителя" placeholder="LSPD / FIB / GOV" value={formData.org} onChange={handleInputChange} />
            <Input name="violator" label="Жетон / Имя нарушителя" placeholder="[LSPD-123] / Jane Smith" value={formData.violator} onChange={handleInputChange} />
            <TextArea name="description" label="Суть ситуации (своими словами)" placeholder="Опишите что случилось, ИИ исправит ошибки и стиль..." rows={5} value={formData.description} onChange={handleInputChange} />
            <Input name="date" label="Дата и время" placeholder="28.11.2025 14:30" value={formData.date} onChange={handleInputChange} />
            <Input name="materials" label="Ссылка на доказательства" placeholder="YouTube / Imgur links..." value={formData.materials} onChange={handleInputChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="passport" label="Ссылка на паспорт" placeholder="Imgur link..." value={formData.passport} onChange={handleInputChange} />
                <Input name="discord" label="Ваш Discord (без @sa.gov)" placeholder="username#0000" value={formData.discord} onChange={handleInputChange} />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-800 text-red-200 rounded-lg text-sm animate-pulse">
              {error}
            </div>
          )}

          <Button 
            className="w-full mt-8" 
            onClick={handleSubmit} 
            isLoading={isLoading}
          >
            {!isLoading && <Sparkles className="mr-2 h-4 w-4" />}
            Сгенерировать обращение
          </Button>
        </div>

        {/* Output Column */}
        <div className="bg-justice-card border border-justice-border p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col h-full animate-[fadeInUp_0.6s_ease-out_0.2s_forwards] opacity-0">
           <div className="flex items-center gap-3 mb-8 pb-4 border-b border-justice-border">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <Sparkles className="h-6 w-6 text-justice-gold" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Результат генерации</h3>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {/* Title Output */}
            <div className="transition-all duration-300">
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Заголовок темы</label>
                {generatedData && (
                  <button 
                    onClick={() => copyToClipboard(generatedData.title, 'title')}
                    className="text-xs text-justice-gold hover:text-white transition-colors flex items-center gap-1"
                  >
                    {copiedField === 'title' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedField === 'title' ? 'Скопировано' : 'Копировать'}
                  </button>
                )}
              </div>
              <div className={`w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm transition-all duration-500 ${!generatedData ? 'text-gray-600 italic' : 'text-gray-200 bg-zinc-900/50 border-justice-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]'}`}>
                {generatedData ? generatedData.title : 'Здесь появится заголовок...'}
              </div>
            </div>

             {/* Body Output */}
             <div className="flex-1 flex flex-col transition-all duration-300">
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Текст обращения</label>
                {generatedData && (
                  <button 
                    onClick={() => copyToClipboard(generatedData.body, 'body')}
                    className="text-xs text-justice-gold hover:text-white transition-colors flex items-center gap-1"
                  >
                     {copiedField === 'body' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                     {copiedField === 'body' ? 'Скопировано' : 'Копировать'}
                  </button>
                )}
              </div>
              <textarea 
                readOnly
                className={`w-full flex-1 min-h-[400px] bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm resize-none focus:outline-none custom-scrollbar transition-all duration-500 ${!generatedData ? 'text-gray-600 italic' : 'text-gray-200 font-mono leading-relaxed bg-zinc-900/50 border-justice-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]'}`}
                value={generatedData ? generatedData.body : 'Заполните форму слева, чтобы ИИ сгенерировал текст жалобы...'}
              />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-justice-border text-center">
            <a href="https://forum.majestic-rp.ru/forums/zhaloby-v-prokuraturu.1145/" target="_blank" rel="noreferrer" className="text-justice-gold hover:text-white text-sm font-semibold transition-colors uppercase tracking-wider flex items-center justify-center gap-2 group">
              Перейти на форум для публикации 
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};