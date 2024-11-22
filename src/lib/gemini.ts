import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBfq8s10S3RvksCVhIQCCNGgFTuZt4z820');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function getMovieRecommendations(prompt: string) {
  try {
    const result = await model.generateContent(
      `Sen bir film uzmanısın. Şu istek doğrultusunda film önerileri yap: ${prompt}. 
       Lütfen cevabı şu formatta ver:
       
       🎬 [Film Adı] (Yıl)
       ⭐ IMDB: [Puan]
       📝 Açıklama: [Kısa açıklama]
       
       Her film için bu formatı kullan ve aralarında boşluk bırak.`
    );
    return result.response.text();
  } catch (error) {
    console.error('Film önerileri alınamadı:', error);
    throw error;
  }
}
