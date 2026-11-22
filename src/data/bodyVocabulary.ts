export type BodyPartId = 'head' | 'eyes' | 'ears' | 'nose' | 'mouth' | 'hands' | 'legs';
export type AnatomyCloseUpId = BodyPartId | 'eye';

export interface BodyPartItem {
  id: BodyPartId;
  word: string;
  lowercase: string;
  pronunciationGuide: string;
  indonesian: string;
  grammarType: string;
  grammarNote: string;
  hobbyName: string;
  hobbySentence: string;
  hobbyTranslation: string;
  funFact: string;
  // Special singular/plural mode for eyes
  singularOption?: {
    id: 'eye';
    word: string;
    lowercase: string;
    phrase: string;
    sentence: string;
    translation: string;
    pluralCompareSentence: string;
    pluralCompareTranslation: string;
    ruleExplanation: string;
  };
}

export const BODY_VOCABULARY: BodyPartItem[] = [
  {
    id: 'head',
    word: 'Head',
    lowercase: 'head',
    pronunciationGuide: '/hed/',
    indonesian: 'Kepala',
    grammarType: 'Tunggal (Singular)',
    grammarNote: '1 kepala · Gunakan "my head"',
    hobbyName: 'Bersepeda (Cycling)',
    hobbySentence: 'I wear a helmet on my head when I cycle.',
    hobbyTranslation: 'Saya memakai helm di kepala saya saat bersepeda.',
    funFact: 'Kepala melindungi otak yang kita pakai untuk berpikir, belajar, dan mengingat kosakata baru.',
  },
  {
    id: 'eyes',
    word: 'Eyes',
    lowercase: 'eyes',
    pronunciationGuide: '/aɪz/',
    indonesian: 'Mata',
    grammarType: 'Jamak (Plural)',
    grammarNote: '2 mata · Tambah huruf -s di akhir kata (eyes)',
    hobbyName: 'Membaca Buku (Reading)',
    hobbySentence: 'I read a book with my eyes.',
    hobbyTranslation: 'Saya membaca buku dengan kedua mata saya.',
    funFact: 'Kelopak mata dan bulu mata melindungi pupil serta iris mata kita dari debu saat membaca.',
    singularOption: {
      id: 'eye',
      word: 'Eye',
      lowercase: 'one eye',
      phrase: 'one eye',
      sentence: 'I close one eye. I wink with one eye.',
      translation: 'Saya menutup satu mata. Saya berkedip dengan satu mata.',
      pluralCompareSentence: 'I have two eyes. I read a book with my eyes.',
      pluralCompareTranslation: 'Saya punya dua mata. Saya membaca buku dengan mata saya.',
      ruleExplanation:
        'Jika jumlahnya dua (jamak), gunakan "eyes" dengan huruf -s. Jika hanya satu (tunggal), gunakan "eye" tanpa huruf -s, contohnya "one eye".',
    },
  },
  {
    id: 'ears',
    word: 'Ears',
    lowercase: 'ears',
    pronunciationGuide: '/ɪərz/',
    indonesian: 'Telinga',
    grammarType: 'Jamak (Plural)',
    grammarNote: '2 telinga · Tambah -s (ears) · 1 telinga: one ear',
    hobbyName: 'Mendengarkan Musik (Listening to Music)',
    hobbySentence: 'I listen to music with my ears.',
    hobbyTranslation: 'Saya mendengarkan musik dengan telinga saya.',
    funFact: 'Daun telinga yang melengkung membantu menangkap gelombang suara musik dengan sangat jelas.',
  },
  {
    id: 'nose',
    word: 'Nose',
    lowercase: 'nose',
    pronunciationGuide: '/noʊz/',
    indonesian: 'Hidung',
    grammarType: 'Tunggal (Singular)',
    grammarNote: '1 hidung · Gunakan "my nose"',
    hobbyName: 'Berkebun (Smelling Flowers)',
    hobbySentence: 'I smell flowers in the garden with my nose.',
    hobbyTranslation: 'Saya mencium harum bunga di taman dengan hidung saya.',
    funFact: 'Dua lubang hidung kita menghirup udara segar dan membantu kita mengenali ratusan aroma bunga.',
  },
  {
    id: 'mouth',
    word: 'Mouth',
    lowercase: 'mouth',
    pronunciationGuide: '/maʊθ/',
    indonesian: 'Mulut',
    grammarType: 'Tunggal (Singular)',
    grammarNote: '1 mulut · Gunakan "my mouth"',
    hobbyName: 'Bernyanyi (Singing)',
    hobbySentence: 'I sing a song with my mouth.',
    hobbyTranslation: 'Saya menyanyikan sebuah lagu dengan mulut saya.',
    funFact: 'Bibir, lidah, dan gigi bekerja sama di dalam mulut untuk mengucapkan kata dan bernyanyi merdu.',
  },
  {
    id: 'hands',
    word: 'Hands',
    lowercase: 'hands',
    pronunciationGuide: '/hændz/',
    indonesian: 'Tangan',
    grammarType: 'Jamak (Plural)',
    grammarNote: '2 tangan · Tambah -s (hands) · 1 tangan: one hand',
    hobbyName: 'Menggambar (Drawing)',
    hobbySentence: 'I draw a picture with my hands.',
    hobbyTranslation: 'Saya menggambar sebuah lukisan dengan tangan saya.',
    funFact: 'Sepuluh jari tangan dan ibu jari kita membuat kita bisa memegang pensil warna dengan rapi.',
  },
  {
    id: 'legs',
    word: 'Legs',
    lowercase: 'legs',
    pronunciationGuide: '/leɡz/',
    indonesian: 'Kaki',
    grammarType: 'Jamak (Plural)',
    grammarNote: '2 kaki · Tambah -s (legs) · 1 kaki: one leg',
    hobbyName: 'Sepak Bola (Playing Football)',
    hobbySentence: 'I play football with my legs.',
    hobbyTranslation: 'Saya bermain sepak bola dengan kaki saya.',
    funFact: 'Sendi lutut membantu kaki kita menekuk, berlari cepat, dan menendang bola ke gawang.',
  },
];

export type ListeningTargetId = BodyPartId | 'one-eye' | 'two-eyes';

export interface ListeningQuestion {
  id: string;
  promptAudio: string;
  promptText: string;
  promptIndonesian: string;
  targetId: ListeningTargetId;
  acceptIds: ListeningTargetId[];
  categoryLabel: string;
  successNote: string;
}

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  {
    id: 'lq-nose',
    promptAudio: 'Point to the nose!',
    promptText: 'Point to the nose!',
    promptIndonesian: 'Tunjuk bagian hidung!',
    targetId: 'nose',
    acceptIds: ['nose'],
    categoryLabel: 'Perintah Langsung',
    successNote: 'Benar! Itu adalah nose (hidung).',
  },
  {
    id: 'lq-music-ears',
    promptAudio: 'Which part do you use to listen to music?',
    promptText: 'Which part do you use to listen to music?',
    promptIndonesian: 'Bagian mana yang kamu pakai untuk mendengarkan musik?',
    targetId: 'ears',
    acceptIds: ['ears'],
    categoryLabel: 'Tebak Hobi',
    successNote: 'Tepat! I listen to music with my ears.',
  },
  {
    id: 'lq-one-eye',
    promptAudio: 'Click on one eye! I wink with one eye.',
    promptText: 'Click on one eye!',
    promptIndonesian: 'Pilih gambar satu mata (bentuk tunggal: eye)!',
    targetId: 'one-eye',
    acceptIds: ['one-eye'],
    categoryLabel: 'Tunggal vs Jamak',
    successNote: 'Hebat! "One eye" berarti satu mata (tanpa huruf -s).',
  },
  {
    id: 'lq-draw-hands',
    promptAudio: 'Which part do you use to draw a picture?',
    promptText: 'Which part do you use to draw a picture?',
    promptIndonesian: 'Bagian mana yang kamu pakai untuk menggambar?',
    targetId: 'hands',
    acceptIds: ['hands'],
    categoryLabel: 'Tebak Hobi',
    successNote: 'Pintar! I draw a picture with my hands.',
  },
  {
    id: 'lq-mouth',
    promptAudio: 'Click on the mouth! I sing a song with my mouth.',
    promptText: 'Click on the mouth!',
    promptIndonesian: 'Klik bagian mulut untuk bernyanyi!',
    targetId: 'mouth',
    acceptIds: ['mouth'],
    categoryLabel: 'Perintah Langsung',
    successNote: 'Bagus! I sing a song with my mouth.',
  },
  {
    id: 'lq-two-eyes',
    promptAudio: 'Click on two eyes! I read a book with my eyes.',
    promptText: 'Click on two eyes!',
    promptIndonesian: 'Pilih gambar dua mata (bentuk jamak: eyes)!',
    targetId: 'two-eyes',
    acceptIds: ['two-eyes', 'eyes'],
    categoryLabel: 'Tunggal vs Jamak',
    successNote: 'Benar! Dua mata memakai bentuk jamak "eyes".',
  },
  {
    id: 'lq-legs',
    promptAudio: 'Which part do you use to play football?',
    promptText: 'Which part do you use to play football?',
    promptIndonesian: 'Bagian mana yang kamu pakai untuk bermain sepak bola?',
    targetId: 'legs',
    acceptIds: ['legs'],
    categoryLabel: 'Tebak Hobi',
    successNote: 'Gol! I play football with my legs.',
  },
  {
    id: 'lq-head',
    promptAudio: 'Point to the head! Wear a helmet on your head.',
    promptText: 'Point to the head!',
    promptIndonesian: 'Tunjuk bagian kepala!',
    targetId: 'head',
    acceptIds: ['head'],
    categoryLabel: 'Perintah Langsung',
    successNote: 'Tepat sekali! Itu adalah head (kepala).',
  },
];

export interface SpellingTask {
  id: string;
  targetWord: string;
  anatomyId: AnatomyCloseUpId;
  indonesian: string;
  grammarHint: string;
  audioHint: string;
  exampleSentence: string;
}

export const SPELLING_TASKS: SpellingTask[] = [
  {
    id: 'sp-head',
    targetWord: 'HEAD',
    anatomyId: 'head',
    indonesian: 'Kepala',
    grammarHint: '4 huruf · 1 kepala',
    audioHint: 'Head. I wear a helmet on my head.',
    exampleSentence: 'I wear a helmet on my head.',
  },
  {
    id: 'sp-eye',
    targetWord: 'EYE',
    anatomyId: 'eye',
    indonesian: 'Satu Mata (Tunggal)',
    grammarHint: '3 huruf · Perhatikan gambar: hanya 1 mata terbuka!',
    audioHint: 'One eye. I wink with one eye.',
    exampleSentence: 'I wink with one eye.',
  },
  {
    id: 'sp-eyes',
    targetWord: 'EYES',
    anatomyId: 'eyes',
    indonesian: 'Dua Mata (Jamak)',
    grammarHint: '4 huruf · Perhatikan gambar: 2 mata terbuka (+ huruf S)',
    audioHint: 'Two eyes. I read a book with my eyes.',
    exampleSentence: 'I read a book with my eyes.',
  },
  {
    id: 'sp-ears',
    targetWord: 'EARS',
    anatomyId: 'ears',
    indonesian: 'Telinga (Jamak)',
    grammarHint: '4 huruf · Sepasang telinga (+ huruf S)',
    audioHint: 'Ears. I listen to music with my ears.',
    exampleSentence: 'I listen to music with my ears.',
  },
  {
    id: 'sp-nose',
    targetWord: 'NOSE',
    anatomyId: 'nose',
    indonesian: 'Hidung',
    grammarHint: '4 huruf · 1 hidung di tengah wajah',
    audioHint: 'Nose. I smell flowers with my nose.',
    exampleSentence: 'I smell flowers with my nose.',
  },
  {
    id: 'sp-mouth',
    targetWord: 'MOUTH',
    anatomyId: 'mouth',
    indonesian: 'Mulut',
    grammarHint: '5 huruf · Dipakai untuk bernyanyi',
    audioHint: 'Mouth. I sing a song with my mouth.',
    exampleSentence: 'I sing a song with my mouth.',
  },
  {
    id: 'sp-hands',
    targetWord: 'HANDS',
    anatomyId: 'hands',
    indonesian: 'Tangan (Jamak)',
    grammarHint: '5 huruf · Sepasang tangan (+ huruf S)',
    audioHint: 'Hands. I draw a picture with my hands.',
    exampleSentence: 'I draw a picture with my hands.',
  },
  {
    id: 'sp-legs',
    targetWord: 'LEGS',
    anatomyId: 'legs',
    indonesian: 'Kaki (Jamak)',
    grammarHint: '4 huruf · Sepasang kaki (+ huruf S)',
    audioHint: 'Legs. I play football with my legs.',
    exampleSentence: 'I play football with my legs.',
  },
];

export interface SpeakingTask {
  id: string;
  anatomyId: AnatomyCloseUpId;
  targetSentence: string;
  indonesianMeaning: string;
  focusWord: string;
  pronunciationTip: string;
}

export const SPEAKING_TASKS: SpeakingTask[] = [
  {
    id: 'spk-hands',
    anatomyId: 'hands',
    targetSentence: 'I use my hands to draw',
    indonesianMeaning: 'Saya menggunakan tangan saya untuk menggambar.',
    focusWord: 'hands',
    pronunciationTip: 'Ucapkan "hands" dengan bunyi /z/ halus di akhir.',
  },
  {
    id: 'spk-eyes',
    anatomyId: 'eyes',
    targetSentence: 'I read a book with my eyes',
    indonesianMeaning: 'Saya membaca buku dengan kedua mata saya.',
    focusWord: 'eyes',
    pronunciationTip: 'Ucapkan "eyes" seperti "aiz" karena ada dua mata.',
  },
  {
    id: 'spk-one-eye',
    anatomyId: 'eye',
    targetSentence: 'I wink with one eye',
    indonesianMeaning: 'Saya berkedip dengan satu mata.',
    focusWord: 'one eye',
    pronunciationTip: 'Ucapkan "eye" seperti "ai" tanpa huruf s.',
  },
  {
    id: 'spk-ears',
    anatomyId: 'ears',
    targetSentence: 'I listen to music with my ears',
    indonesianMeaning: 'Saya mendengarkan musik dengan telinga saya.',
    focusWord: 'ears',
    pronunciationTip: 'Kata "listen" dibaca "lisen" (huruf t tidak dibunyikan).',
  },
  {
    id: 'spk-mouth',
    anatomyId: 'mouth',
    targetSentence: 'I sing a song with my mouth',
    indonesianMeaning: 'Saya menyanyikan lagu dengan mulut saya.',
    focusWord: 'mouth',
    pronunciationTip: 'Ujung lidah menyentuh lembut gigi saat mengucap "-th" di "mouth".',
  },
  {
    id: 'spk-nose',
    anatomyId: 'nose',
    targetSentence: 'I smell flowers with my nose',
    indonesianMeaning: 'Saya mencium bunga dengan hidung saya.',
    focusWord: 'nose',
    pronunciationTip: 'Ucapkan "nose" dengan bunyi "nouz".',
  },
  {
    id: 'spk-legs',
    anatomyId: 'legs',
    targetSentence: 'I play football with my legs',
    indonesianMeaning: 'Saya bermain sepak bola dengan kaki saya.',
    focusWord: 'legs',
    pronunciationTip: 'Ucapkan "legs" dengan jelas untuk kedua kaki.',
  },
  {
    id: 'spk-head',
    anatomyId: 'head',
    targetSentence: 'I wear a helmet on my head',
    indonesianMeaning: 'Saya memakai helm di kepala saya.',
    focusWord: 'head',
    pronunciationTip: 'Ucapkan "head" dengan bunyi "hed" pendek.',
  },
];
