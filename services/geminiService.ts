import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ComplaintFormState, GeneratedComplaint } from "../types";

// Helper for lazy initialization to prevent "process is not defined" crashes on static hosts
const getAIClient = () => {
  // Access process.env safely
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : '';
  if (!apiKey) {
    console.warn("API Key is missing!");
  }
  return new GoogleGenAI({ apiKey });
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The formatted title of the complaint",
    },
    body: {
      type: Type.STRING,
      description: "The fully formatted body text of the complaint",
    },
  },
  required: ["title", "body"],
};

const SYSTEM_INSTRUCTION = `
Ты - элитный юрист-помощник в Прокуратуре штата Houston (Majestic RP).
Твоя задача - взять "сырые" данные от гражданина и ПРЕОБРАЗОВАТЬ их в ИДЕАЛЬНО отформатированный текст жалобы по строгому регламенту.

ПРАВИЛА ДЛЯ "title":
1. Используй "Порядковый номер" для создания заголовка.
   Пример: "Порядковый номер: 123" -> "ОБРАЩЕНИЕ В ОФИС ГЕНЕРАЛЬНОГО ПРОКУРОРА №123"

ПРАВИЛА ДЛЯ "body" (многострочная строка):
1. Первая строка: "От гражданина штата Сан-Андреас {Имя Фамилия}"
2. Вторая строка: "В Офис Генерального прокурора"
3. Третья строка: пустая
4. Пункт 1: "1. Ваше Имя и Фамилия, номер ID-card : {Имя Фамилия}, {ID-card}"
5. Пункт 2: "2. Организация в которой состоит нарушитель, а также Имя и Фамилия нарушителя/его идентификационный знак : {Организация}, {Жетон/Имя}"
6. Пункт 3: "3. Подробное описание ситуации : {обработанное описание}"
   - ПРАВИЛА ОБРАБОТКИ ОПИСАНИЯ: ИСПРАВЬ все орфографические и грамматические ошибки. УБЕРИ сленг, мат и эмоции. СДЕЛАЙ текст формальным и юридически грамотным. НЕ МЕНЯЙ суть.
7. Пункт 4: "4. Дата и время произошедшего : {Дата и время}"
8. Пункт 5: "5. Материалы дела : *{ссылка/ссылки}*"
   - Извлеки URL. Оберни каждую ссылку в звездочки (*).
9. Пункт 6: "6. Ваш контактный адрес электронной почты, ксерокопия паспорта : {EMAIL}, {PASSPORT_LINK}"
   - СТРОГОЕ ПРАВИЛО ДЛЯ EMAIL: Возьми логин Discord пользователя (все что до знака #, или полный ник если нет тега), удали пробелы и ПРИНУДИТЕЛЬНО добавь "@sa.gov". 
     Пример: ввод "igr0m" -> вывод "igr0m@sa.gov".
     Пример: ввод "test user" -> вывод "testuser@sa.gov".
     Пример: ввод "kot#1234" -> вывод "kot@sa.gov".
     НИКОГДА не оставляй просто ник. Всегда добавляй @sa.gov.
   - СТРОГОЕ ПРАВИЛО ДЛЯ ПАСПОРТА: Создай Markdown ссылку. Текст ссылки ДОЛЖЕН БЫТЬ СТРОГО "ксерокопия паспорта".
     Пример: ввод "https://imgur.com/123" -> вывод "[ксерокопия паспорта](https://imgur.com/123)".
   - ИТОГОВЫЙ ПРИМЕР СТРОКИ: "6. Ваш контактный адрес электронной почты, ксерокопия паспорта : igr0m@sa.gov, [ксерокопия паспорта](https://imgur.com/123)"
10. Пункт 7: "7. Ваша подпись и ее расшифровка : {Инициалы} / {Имя Фамилия}"
`;

export const generateComplaintText = async (data: ComplaintFormState): Promise<GeneratedComplaint> => {
  const userPrompt = `
    Пожалуйста, обработай мою жалобу:
    - Порядковый номер: ${data.number}
    - Имя Фамилия: ${data.name}
    - ID-card: ${data.id}
    - Организация нарушителя: ${data.org}
    - Жетон/Имя нарушителя: ${data.violator}
    - Описание: ${data.description}
    - Дата и время: ${data.date}
    - Материалы: ${data.materials}
    - Паспорт: ${data.passport}
    - Discord: ${data.discord}
  `;

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedComplaint;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate complaint. Please try again.");
  }
};