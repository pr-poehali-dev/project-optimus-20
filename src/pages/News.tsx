import { useEffect, useState } from 'react';
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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch(NEWS_URL)
      .then(r => r.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? news : news.filter(n => n.status === filter);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/">
            <Logo size={36} showText={true} />
          </a>
          <a href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 md:px-8 border-b border-black">
        <div className="container mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
            НОВОСТИ
          </h1>
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
            {filtered.map(item => (
              <div key={item.id} className="bg-white p-8 flex flex-col">
                {item.image_url && (
                  <div className="aspect-video mb-6 overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs uppercase tracking-widest px-2 py-1 ${STATUS_LABELS[item.status]?.color || 'bg-neutral-200 text-black'}`}>
                    {STATUS_LABELS[item.status]?.label || item.status}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">{item.category}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 leading-tight">{item.title}</h2>
                <p className="text-neutral-600 text-sm leading-relaxed flex-1">{item.content}</p>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-6">
                  {new Date(item.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}