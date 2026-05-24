import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const EVENTS_URL = 'https://functions.poehali.dev/68d99b5c-5afa-4b25-b603-bee07ca986c2';

const CATEGORIES: Record<string, { label: string; icon: string }> = {
  theatre: { label: 'Театр', icon: 'Drama' },
  concert: { label: 'Концерты', icon: 'Music' },
  cinema: { label: 'Кинофильмы', icon: 'Film' },
  event: { label: 'Мероприятия', icon: 'Sparkles' },
};

interface EventItem {
  id: number;
  title: string;
  description: string;
  category: string;
  event_date: string;
  venue: string | null;
  price: string | null;
  image_url: string | null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch(EVENTS_URL)
      .then(r => r.json())
      .then(data => { setEvents(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return {
      day: d.getDate().toString().padStart(2, '0'),
      month: d.toLocaleDateString('ru-RU', { month: 'short' }).toUpperCase().replace('.', ''),
      time: d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      weekday: d.toLocaleDateString('ru-RU', { weekday: 'long' }),
    };
  };

  return (
    <main className="min-h-screen bg-white">
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
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-4">АФИША</h1>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Все культурные события Таганрога — театр, концерты, кинопремьеры и городские мероприятия.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-0 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-4 text-sm uppercase tracking-widest border-r border-black whitespace-nowrap transition-colors flex items-center gap-2 ${
                filter === 'all' ? 'bg-black text-white' : 'hover:bg-neutral-100'
              }`}
            >
              <Icon name="LayoutGrid" size={14} />
              Все
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-4 text-sm uppercase tracking-widest border-r border-black whitespace-nowrap transition-colors flex items-center gap-2 ${
                  filter === key ? 'bg-red-600 text-white' : 'hover:bg-neutral-100'
                }`}
              >
                <Icon name={cat.icon} size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          {loading && (
            <div className="text-center py-20 text-neutral-400 uppercase tracking-widest text-sm">Загрузка...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl font-bold tracking-tighter mb-4">Событий пока нет</p>
              <p className="text-neutral-500">Скоро здесь появятся анонсы культурных событий Таганрога</p>
            </div>
          )}
          <div className="space-y-px bg-neutral-200">
            {filtered.map(item => {
              const date = formatDate(item.event_date);
              const cat = CATEGORIES[item.category] || CATEGORIES.event;
              return (
                <div key={item.id} className="bg-white grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Date block */}
                  <div className="md:col-span-2 bg-black text-white p-6 flex md:flex-col items-center justify-center gap-4 md:gap-1">
                    <p className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">{date.day}</p>
                    <div className="md:text-center">
                      <p className="text-sm uppercase tracking-widest">{date.month}</p>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">{date.weekday}</p>
                    </div>
                  </div>

                  {/* Image */}
                  {item.image_url ? (
                    <div className="md:col-span-3 aspect-video md:aspect-auto overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="md:col-span-3 bg-neutral-100 flex items-center justify-center p-8">
                      <Icon name={cat.icon} size={48} fallback="Calendar" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="md:col-span-7 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs uppercase tracking-widest px-2 py-1 bg-red-600 text-white flex items-center gap-1">
                          <Icon name={cat.icon} size={12} />
                          {cat.label}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {date.time}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tighter mb-3 leading-tight">{item.title}</h2>
                      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-neutral-100">
                      {item.venue && (
                        <span className="text-sm text-neutral-700 flex items-center gap-2">
                          <Icon name="MapPin" size={14} />
                          {item.venue}
                        </span>
                      )}
                      {item.price && (
                        <span className="text-sm font-bold flex items-center gap-2">
                          <Icon name="Ticket" size={14} />
                          {item.price}
                        </span>
                      )}
                    </div>
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
