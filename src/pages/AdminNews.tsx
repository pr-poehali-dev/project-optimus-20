import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const NEWS_URL = 'https://functions.poehali.dev/7003c081-df8b-4d98-b725-590ca28d1059';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  image_url: string | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, string> = {
  done: 'Сделано',
  inprogress: 'В процессе',
  planned: 'Запланировано',
};

export default function AdminNews() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'Городские улучшения', status: 'done', image_url: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const loadNews = async (pwd: string) => {
    setLoading(true);
    const r = await fetch(NEWS_URL);
    const data = await r.json();
    setNews(data);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Проверяем пароль через POST с заведомо невалидными данными
    const r = await fetch(NEWS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ title: '', content: '' }),
    });
    if (r.status !== 403) {
      setAuthed(true);
      setAuthError(false);
      loadNews(password);
    } else {
      setAuthError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const r = await fetch(NEWS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify(form),
    });
    if (r.ok) {
      setMsg('Новость добавлена!');
      setForm({ title: '', content: '', category: 'Городские улучшения', status: 'done', image_url: '' });
      loadNews(password);
    } else {
      setMsg('Ошибка при сохранении');
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту новость?')) return;
    await fetch(NEWS_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ id }),
    });
    loadNews(password);
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">АДМИН</h1>
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
          <a href="/">
            <Logo size={36} showText={true} />
          </a>
          <div className="flex gap-6">
            <a href="/news" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              <Icon name="Newspaper" size={16} />
              Новости
            </a>
            <a href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              <Icon name="Home" size={16} />
              Сайт
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Add form */}
        <div className="mb-16 border-2 border-black p-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">ДОБАВИТЬ НОВОСТЬ</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Заголовок *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="Название новости"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Категория</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="Городские улучшения"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Текст новости *</label>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required
                rows={5}
                className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600 resize-none"
                placeholder="Подробное описание..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Статус</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600 bg-white"
                >
                  <option value="done">Сделано</option>
                  <option value="inprogress">В процессе</option>
                  <option value="planned">Запланировано</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">Ссылка на фото (необязательно)</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                  className="w-full border-b-2 border-black py-2 focus:outline-none focus:border-red-600"
                  placeholder="https://..."
                />
              </div>
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

        {/* News list */}
        <h2 className="text-3xl font-bold tracking-tighter mb-8">ОПУБЛИКОВАННЫЕ НОВОСТИ</h2>
        {loading && <p className="text-neutral-400 uppercase tracking-widest text-sm">Загрузка...</p>}
        {!loading && news.length === 0 && (
          <p className="text-neutral-400 uppercase tracking-widest text-sm">Новостей пока нет</p>
        )}
        <div className="space-y-px">
          {news.map(item => (
            <div key={item.id} className="flex items-start justify-between gap-6 border border-black p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs uppercase tracking-widest px-2 py-0.5 ${
                    item.status === 'done' ? 'bg-black text-white' :
                    item.status === 'inprogress' ? 'bg-red-600 text-white' :
                    'bg-neutral-200 text-black'
                  }`}>
                    {STATUS_LABELS[item.status] || item.status}
                  </span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest">{item.category}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{item.content}</p>
                <p className="text-xs text-neutral-400 mt-2">
                  {new Date(item.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
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