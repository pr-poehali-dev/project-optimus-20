import { useEffect, useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const NEWS_URL = 'https://functions.poehali.dev/7003c081-df8b-4d98-b725-590ca28d1059';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  done: { label: 'Сделано', color: 'bg-black text-white' },
  inprogress: { label: 'В процессе', color: 'bg-red-600 text-white' },
  planned: { label: 'Запланировано', color: 'bg-neutral-200 text-black' },
};

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  image_url: string | null;
  created_at: string;
}

function extractPhotos(content: string): { text: string; photos: string[] } {
  const photos: string[] = [];
  const text = content.replace(/\[photo\](.*?)\[\/photo\]/g, (_, url) => {
    photos.push(url.trim());
    return '';
  }).trim();
  return { text, photos };
}

function NewsCardSlideshow({ photos, title }: { photos: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (photos.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % photos.length);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [photos.length]);

  if (photos.length === 0) return null;

  return (
    <div className="aspect-video overflow-hidden relative">
      {photos.map((p, i) => (
        <img
          key={p}
          src={p}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
      {photos.length > 1 && (
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 uppercase tracking-widest flex items-center gap-1">
          <Icon name="Images" size={12} />
          {photos.length}
        </span>
      )}
    </div>
  );
}

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const { text, photos } = extractPhotos(item.content);
  const allPhotos = [item.image_url, ...photos].filter(Boolean) as string[];
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-red-600 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Фото */}
        {allPhotos.length > 0 && (
          <div>
            <div className="aspect-video overflow-hidden">
              <img
                src={allPhotos[activePhoto]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {allPhotos.length > 1 && (
              <div className="flex gap-px bg-neutral-200">
                {allPhotos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`flex-1 aspect-video overflow-hidden transition-opacity ${activePhoto === i ? 'opacity-100 ring-2 ring-red-600' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs uppercase tracking-widest px-2 py-1 ${STATUS_LABELS[item.status]?.color || 'bg-neutral-200 text-black'}`}>
              {STATUS_LABELS[item.status]?.label || item.status}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">{item.category}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6 leading-tight">{item.title}</h2>
          <div className="text-neutral-700 leading-relaxed whitespace-pre-line">{text}</div>
          <p className="text-xs text-neutral-400 uppercase tracking-widest mt-8 border-t border-neutral-100 pt-4">
            {new Date(item.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch(NEWS_URL)
      .then(r => r.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? news : news.filter(n => n.status === filter);

  return (
    <main className="min-h-screen bg-white">
      {selected && <NewsModal item={selected} onClose={() => setSelected(null)} />}

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-black">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/"><Logo size={36} showText={true} /></a>
          <a href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 md:px-8 border-b border-black">
        <div className="container mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-4 text-[#FFD600]">НОВОСТИ</h1>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Что делается в Таганроге — реальные улучшения города, реализованные проекты и планы на будущее.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {[
              { key: 'all', label: 'Все' },
              { key: 'done', label: 'Сделано' },
              { key: 'inprogress', label: 'В процессе' },
              { key: 'planned', label: 'Запланировано' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-6 py-4 text-sm uppercase tracking-widest border-r border-black whitespace-nowrap transition-colors ${
                  filter === f.key ? 'bg-black text-white' : 'hover:bg-neutral-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News list */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          {loading && (
            <div className="text-center py-20 text-neutral-400 uppercase tracking-widest text-sm">Загрузка...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl font-bold tracking-tighter mb-4">Новостей пока нет</p>
              <p className="text-neutral-500">Скоро здесь появятся материалы о жизни города</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {filtered.map(item => {
              const { photos } = extractPhotos(item.content);
              const allPhotos = [item.image_url, ...photos].filter(Boolean) as string[];
              return (
                <div
                  key={item.id}
                  className="bg-white flex flex-col cursor-pointer group"
                  onClick={() => setSelected(item)}
                >
                  {allPhotos.length > 0 && (
                    <NewsCardSlideshow photos={allPhotos} title={item.title} />
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs uppercase tracking-widest px-2 py-1 ${STATUS_LABELS[item.status]?.color || 'bg-neutral-200 text-black'}`}>
                        {STATUS_LABELS[item.status]?.label || item.status}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-neutral-400">{item.category}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors">{item.title}</h2>
                    <p className="text-neutral-600 text-sm leading-relaxed flex-1 line-clamp-3">
                      {extractPhotos(item.content).text}
                    </p>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mt-6">
                      {new Date(item.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}