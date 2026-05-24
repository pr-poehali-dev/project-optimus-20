import { useState } from 'react';

const CONTACT_URL = 'https://functions.poehali.dev/d6c9cb19-1280-43fc-8456-88f3c14c0857';

export default function Index() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold tracking-tighter">
            TAGANROG<span className="text-red-600">·</span>MIX
          </a>
          <div className="flex space-x-8">
            <a href="#routes" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              Маршруты
            </a>
            <a href="#about" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              О проекте
            </a>
            <a href="#contact" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 mb-8 md:mb-0">
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none mb-6">
              TRAVEL
              <br />
              <span className="text-red-600">MIX</span>
            </h1>
            <p className="text-xl max-w-xl">
              Первый цифровой медиагид по Таганрогу — маршруты, события, культура. Всё, что нужно туристу и горожанину, на одной платформе.
            </p>
            <div className="mt-10 flex gap-4">
              <a
                href="#routes"
                className="px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-red-600 transition-colors"
              >
                Маршруты
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-black text-black text-sm uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-colors"
              >
                Подписаться
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square bg-red-600 flex items-center justify-center">
              <span className="text-white text-6xl font-bold tracking-tighter text-center leading-tight px-6">
                ТАГАНРОГ
                <br />
                <span className="text-4xl font-normal">1698</span>
              </span>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes / Content Section */}
      <section id="routes" className="py-20 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">МАРШРУТЫ</h2>
          <p className="text-neutral-400 mb-12 text-lg max-w-2xl">Тематические прогулки по городу: архитектура, литература, гастрономия. Для неспешного и вдумчивого знакомства с Таганрогом.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Route 1 */}
            <div className="group">
              <div className="aspect-square bg-white mb-4 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 group-hover:bg-red-600 transition-colors duration-300 p-6 text-center">
                  <span className="text-black group-hover:text-white text-6xl font-bold transition-colors">01</span>
                  <span className="text-black group-hover:text-white text-sm uppercase tracking-widest mt-2 transition-colors">2,4 км</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Чеховский маршрут</h3>
              <p className="text-neutral-400">Дома, улицы и места, связанные с жизнью и творчеством Антона Павловича Чехова</p>
            </div>

            {/* Route 2 */}
            <div className="group">
              <div className="aspect-square bg-white mb-4 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 group-hover:bg-red-600 transition-colors duration-300 p-6 text-center">
                  <span className="text-black group-hover:text-white text-6xl font-bold transition-colors">02</span>
                  <span className="text-black group-hover:text-white text-sm uppercase tracking-widest mt-2 transition-colors">3,1 км</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Архитектурный модерн</h3>
              <p className="text-neutral-400">Купеческие особняки, доходные дома и памятники архитектуры XIX–начала XX века</p>
            </div>

            {/* Route 3 */}
            <div className="group">
              <div className="aspect-square bg-white mb-4 overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 group-hover:bg-red-600 transition-colors duration-300 p-6 text-center">
                  <span className="text-black group-hover:text-white text-6xl font-bold transition-colors">03</span>
                  <span className="text-black group-hover:text-white text-sm uppercase tracking-widest mt-2 transition-colors">Гастро</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Гастрономический гид</h3>
              <p className="text-neutral-400">Лучшие кафе, ресторанные открытия и локальные вкусы — проверенные редакцией</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <h2 className="text-6xl font-bold tracking-tighter mb-8">О ПРОЕКТЕ</h2>
              <div className="aspect-[4/5] bg-neutral-100 relative mb-8 md:mb-0">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-black flex items-center justify-center">
                  <span className="text-4xl font-bold tracking-tighter text-center leading-tight">ТАГАНРОГ<br/><span className="text-red-600 text-2xl">TRAVEL MIX</span></span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:pt-24">
              <p className="text-xl mb-6">
                «Таганрог Travel Mix» — первый конвергентный медиагид, объединяющий на единой платформе событийную журналистику, мультимедийные маршруты и городское комьюнити.
              </p>
              <p className="mb-6">
                Информация о достопримечательностях, афиша событий, интерактивные карты, видеообзоры, аудиоподкасты и рекомендации по ресторанам — всё это в одном месте. Мы создаём образ Таганрога как города для неспешных прогулок, культурных открытий и гастрономических путешествий.
              </p>
              <p className="mb-6">
                Наш фокус — позитивная, полезная и «вечнозелёная» информация, которая сохраняет актуальность и вдохновляет возвращаться в Таганрог снова.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div>
                  <h3 className="text-sm uppercase tracking-widest mb-2">Форматы</h3>
                  <ul className="space-y-2">
                    <li>Мультимедийные гиды</li>
                    <li>Интерактивные карты</li>
                    <li>Аудиоподкасты</li>
                    <li>Фотолонгриды</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest mb-2">Темы</h3>
                  <ul className="space-y-2">
                    <li>Культура и события</li>
                    <li>Архитектура и история</li>
                    <li>Гастрономия</li>
                    <li>Чеховский Таганрог</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-red-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-6xl font-bold tracking-tighter mb-8">КОНТАКТЫ</h2>
              <p className="text-xl mb-8">Хотите сотрудничать, разместить анонс события или предложить материал? Напишите нам.</p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="w-28 text-sm uppercase tracking-widest opacity-75">Почта</span>
                  <a href="mailto:hello@taganrog-mix.ru" className="hover:underline">
                    hello@taganrog-mix.ru
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="w-28 text-sm uppercase tracking-widest opacity-75">Город</span>
                  <span>Таганрог, Россия</span>
                </p>
                <p className="flex items-center">
                  <span className="w-28 text-sm uppercase tracking-widest opacity-75">Основан</span>
                  <span>2025</span>
                </p>
              </div>
            </div>
            <div>
              {status === 'success' ? (
                <div className="flex flex-col items-start justify-center h-full py-16">
                  <p className="text-3xl font-bold tracking-tighter mb-4">Сообщение отправлено!</p>
                  <p className="text-white/80 text-lg">Мы свяжемся с вами в ближайшее время.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    Написать ещё
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-2">
                      Почта
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="Ваш email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm uppercase tracking-widest mb-2">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white py-2 px-0 focus:outline-none focus:border-black placeholder-white/50"
                      placeholder="Расскажите о вашем предложении или вопросе"
                    ></textarea>
                  </div>
                  {status === 'error' && (
                    <p className="text-white/80 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-8 px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Отправка...' : 'Отправить'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">2025 Таганрог Travel Mix. Все права защищены.</p>
          <div className="flex space-x-8">
            <a href="#" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              ВКонтакте
            </a>
            <a href="#" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              Telegram
            </a>
            <a href="#" className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}