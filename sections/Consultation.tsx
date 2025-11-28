import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Input, TextArea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Send, AlertTriangle } from 'lucide-react';
import { ConsultationFormState } from '../types';

export const Consultation: React.FC = () => {
  const [form, setForm] = useState<ConsultationFormState>({
    webhookUrl: '',
    name: '',
    id: '',
    contact: '',
    topic: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Validation
    if (!form.webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
      setStatus('error');
      setStatusMessage("Некорректный URL вебхука. Ссылка должна начинаться с https://discord.com/api/webhooks/");
      return;
    }

    const payload = {
      username: "Прокуратура Houston (Bot)",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/924/924915.png",
      embeds: [
        {
          title: "⚖️ Новая заявка на консультацию",
          color: 13938615, // Gold decimal
          fields: [
            { name: "Имя Фамилия", value: form.name, inline: true },
            { name: "ID-card", value: form.id, inline: true },
            { name: "Discord", value: form.contact, inline: false },
            { name: "Суть вопроса", value: form.topic, inline: false }
          ],
          footer: { text: "Majestic RP | Houston State" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      const response = await fetch(form.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage("Заявка успешно отправлена! Ожидайте связи в Discord.");
        setForm(prev => ({ ...prev, topic: '', name: '', id: '', contact: '' }));
      } else {
        throw new Error(`Discord returned status ${response.status}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setStatusMessage("Ошибка при отправке. Проверьте URL вебхука или попробуйте позже.");
    }
  };

  return (
    <Section id="consultation" title="Запись на консультацию" subtitle="Отправьте заявку напрямую в Discord канал прокуратуры">
      <div className="max-w-2xl mx-auto bg-justice-card border border-justice-border rounded-xl p-8 shadow-2xl relative overflow-hidden animate-[fadeInUp_0.8s_ease-out_forwards]">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-justice-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="bg-zinc-900/50 p-4 rounded-lg border border-yellow-900/30 mb-6 flex items-start gap-3">
             <AlertTriangle className="text-yellow-500 h-5 w-5 shrink-0 mt-0.5" />
             <p className="text-xs text-yellow-500/80 leading-relaxed">
               Для работы этой формы требуется <strong>Discord Webhook URL</strong>. В реальной работе этот URL обычно скрыт на сервере. Для демонстрации введите ваш тестовый URL вебхука.
             </p>
          </div>

          <Input 
            name="webhookUrl" 
            label="Webhook URL (Скрыто)" 
            type="password" 
            placeholder="https://discord.com/api/webhooks/..." 
            value={form.webhookUrl} 
            onChange={handleChange}
            required
          />

          <div className="h-px bg-justice-border my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Имя Фамилия" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            <Input name="id" label="ID-card" placeholder="12345" type="number" value={form.id} onChange={handleChange} required />
          </div>
          <Input name="contact" label="Ваш Discord Tag" placeholder="username#0000" value={form.contact} onChange={handleChange} required />
          <TextArea name="topic" label="Суть вопроса" rows={3} placeholder="Кратко опишите причину обращения..." value={form.topic} onChange={handleChange} required />

          {status === 'error' && (
            <div className="mb-4 text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900">
              {statusMessage}
            </div>
          )}
          
          {status === 'success' && (
            <div className="mb-4 text-green-400 text-sm bg-green-900/20 p-3 rounded border border-green-900">
              {statusMessage}
            </div>
          )}

          <Button type="submit" className="w-full transition-transform hover:scale-[1.02]" isLoading={status === 'loading'}>
            Отправить в Discord
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </Section>
  );
};