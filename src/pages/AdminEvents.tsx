import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const EVENTS_URL = 'https://functions.poehali.dev/68d99b5c-5afa-4b25-b603-bee07ca986c2';

const CATEGORIES: Record<string, string> = {
  theatre: 'Театр',
  concert: 'Концерты',
  cinema: 'Кинофильмы',
  event: 'Мероприятия',
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

export default function AdminEvents() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'theatre',
    event_date: '',
    venue: '',
    price: '',
    image_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const loadEvents = async () => {
    const r = await fetch(EVENTS_URL);
    const data = await r.json();
    setEvents(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch(EVENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ title: '', description: '', category: '', event_date: '' }),
    });
    if (r.status !== 403) {
      setAuthed(true);
      setAuthError(false);
      loadEvents();
    } else {
      setAuthError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const r = await fetch(EVENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({
        ...form,
        event_date: new Date(form.event_date).toISOString(),
      }),
    });
    if (r.ok) {
      setMsg('Событие добавлено!');
      setForm({ title: '', description: '', category: 'theatre', event_date: '', venue: '', price: '', image_url: '' });
      loadEvents();
    } else {
      setMsg('Ошибка при сохранении');
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это событие?')) return;
    await fetch(EVENTS_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ id }),
    });
    loadEvents();
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">АФИША АДМИН</h1>
          <p className="text-neutral-400 text-sm uppercase tracking-widest mb-8">Таганрог Travel Mix</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest text-neutral-400 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white text-white py-2 focus:outline-none focus:border-red-600 placeholder-neutral-600"
                placeholder="Введите пароль"
                autoFocus
              />
              {authError && <p className="text-red-500 text-sm mt-2">Неверный пароль</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-red-600 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Войти
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-black text-white border-b border-neutral-800">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/"><Logo size={36} showText={true} /></a>
          <div className="flex gap-6">
            <a href="/admin/news" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              <Icon name="Newspaper" size={16} />
              Новости
            </a>
            <a href="/events" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              <Icon name="Calendar" size={16} />
              Афиша
            </a>
            <a href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              <Icon name="Home" size={16} />
              Сайт
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="mb-16 border-2 border-black p-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">ДОБАВИТЬ СОБЫТИЕ</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Название *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="Название события"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Рубрика *</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600 bg-white"
                >
                  {Object.entries(CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Описание *</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
                rows={4}
                className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600 resize-none"
                placeholder="Подробное описание события..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Дата и время *</label>
                <input
                  type="datetime-local"
                  value={form.event_date}
                  onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))}
                  required
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Место</label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={e => setForm(f => ({ ...f, venue: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="Театр Чехова"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Цена</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="от 500 ₽"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Ссылка на фото</label>
              <input
                type="url"
                value={form.image_url}
                onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                placeholder="https://..."
              />
            </div>
            {msg && <p className={`text-sm uppercase tracking-widest ${msg.includes('Ошибка') ? 'text-red-600' : 'text-black'}`}>{msg}</p>}
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {saving ? 'Сохранение...' : 'Опубликовать'}
            </button>
          </form>
        </div>

        <h2 className="text-3xl font-bold tracking-tighter mb-8">СОБЫТИЯ АФИШИ</h2>
        {events.length === 0 && <p className="text-neutral-400 uppercase tracking-widest text-sm">Событий пока нет</p>}
        <div className="space-y-px">
          {events.map(item => (
            <div key={item.id} className="flex items-start justify-between gap-6 border border-black p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-widest px-2 py-0.5 bg-red-600 text-white">
                    {CATEGORIES[item.category] || item.category}
                  </span>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest">
                    {new Date(item.event_date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{item.description}</p>
                {(item.venue || item.price) && (
                  <p className="text-xs text-neutral-400 mt-2">
                    {item.venue && <span>{item.venue}</span>}
                    {item.venue && item.price && <span> · </span>}
                    {item.price && <span>{item.price}</span>}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-shrink-0 p-2 hover:text-red-600 transition-colors"
                title="Удалить"
              >
                <Icon name="Trash2" size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
