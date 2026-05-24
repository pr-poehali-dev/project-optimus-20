import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const CONTACT_URL = 'https://functions.poehali.dev/d6c9cb19-1280-43fc-8456-88f3c14c0857';

export default function Index() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/routes', label: 'Маршруты' },
    { href: '/news', label: 'Новости' },
    { href: '#about', label: 'О проекте' },
    { href: '#content', label: 'Контент' },
    { href: '#platforms', label: 'Платформы' },
    { href: '#team', label: 'Команда' },
    { href: '#partners', label: 'Партнёры' },
    { href: '#contact', label: 'Контакты' },
  ];

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
          <a href="/">
            <Logo size={36} showText={true} />
          </a>
          {/* Desktop nav */}
          <div className="hidden lg:flex space-x-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-xs uppercase tracking-widest hover:text-red-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          {/* Mobile burger */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-black">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm uppercase tracking-widest border-b border-neutral-100 hover:bg-red-600 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
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
                href="/routes"
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
              <div className="aspect-[4/5] bg-[#f0ece4] mb-8 md:mb-0 flex flex-col items-center justify-center gap-4">
                <Logo size={160} showText={false} />
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-widest text-[#2a2a2a]">ТАГАНРОГ</p>
                  <p className="text-base font-bold tracking-widest text-red-600">TRAVEL MIX</p>
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

      {/* Content Directions Section */}
      <section id="content" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">КОНТЕНТ</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mb-12">
            Каждая тема «распаковывается» на разноформатные материалы под конкретные платформы и аудиторные запросы.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-black">
            {/* Direction 1 */}
            <div className="border-b md:border-b-0 md:border-r border-black p-8">
              <div className="text-red-600 text-5xl font-bold tracking-tighter mb-6">01</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Вдохновляющий</h3>
              <p className="text-neutral-600 mb-6">Формируем привлекательный образ Таганрога — города, в который хочется приехать и возвращаться.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Видеообзоры Reels, Shorts, VK Клипы</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Длинные версии для YouTube и RuTube</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Фоторепортажи с городских фестивалей</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Аудиопрогулки и подкасты</li>
              </ul>
            </div>
            {/* Direction 2 */}
            <div className="border-b md:border-b-0 md:border-r border-black p-8">
              <div className="text-red-600 text-5xl font-bold tracking-tighter mb-6">02</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Практический</h3>
              <p className="text-neutral-600 mb-6">Исчерпывающая информация для планирования визита и навигации по городу.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Интерактивная карта с GPS-метками</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Маршруты выходного дня с таймингом</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> PDF-гиды для скачивания</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Афиша с фильтрами по дате и типу</li>
              </ul>
            </div>
            {/* Direction 3 */}
            <div className="p-8">
              <div className="text-red-600 text-5xl font-bold tracking-tighter mb-6">03</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Новостной</h3>
              <p className="text-neutral-600 mb-6">Оперативная информация о культурной и туристической жизни города.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Новости в Telegram и ВКонтакте</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Репортажи с городских событий</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> «Оборона Таганрога», джаз-фестивали</li>
                <li className="flex gap-2"><span className="text-red-600 font-bold">—</span> Театральные премьеры, День города</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">ПЛАТФОРМЫ</h2>
          <p className="text-neutral-400 mb-12 text-lg max-w-2xl">
            Единая медиаэкосистема: все платформы связаны перекрёстным промо и ведут на главный сайт.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-800">
            {[
              { name: 'Сайт', desc: 'Ядро экосистемы. Лента, афиша, карта, каталог заведений. Mobile-first.', tag: 'taganrogtravel.ru' },
              { name: 'Telegram', desc: 'Оперативные анонсы, новости, опросы. В перспективе — чат-бот для туристов.', tag: 'Канал' },
              { name: 'ВКонтакте', desc: 'Фото, видеоальбомы, «Фото дня от подписчика», конкурсы и обсуждения.', tag: 'Сообщество' },
              { name: 'YouTube / RuTube', desc: 'Видеообзоры, документальные экскурсии, подкасты. Монетизация через рекламу.', tag: 'Видео' },
              { name: 'Дзен', desc: 'Дистрибуция текстового контента через алгоритмическую рекомендательную систему.', tag: 'Медиа' },
              { name: 'Одноклассники', desc: 'Визуальный контент и афиша для возрастной и семейной аудитории региона.', tag: 'Соцсеть' },
            ].map((p) => (
              <div key={p.name} className="bg-black p-8 group hover:bg-red-600 transition-colors duration-300">
                <p className="text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white/70 mb-3">{p.tag}</p>
                <h3 className="text-xl font-bold mb-3">{p.name}</h3>
                <p className="text-neutral-400 group-hover:text-white/80 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">КОМАНДА</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mb-12">
            Редакция «Таганрог Travel Mix» — журналисты, фотографы и краеведы, влюблённые в свой город.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', photo: 'https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/8e191a5c-9f7c-4a06-8ef6-fc6473007b3a.jpg', role: 'Директор, главный редактор, журналист', name: 'Белеванцева Анастасия', desc: 'Стратегическое руководство, редакционная политика, авторские материалы' },
              { num: '02', photo: 'https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/5457308c-6e67-46cc-872b-87a5e929a5f9.jpg', role: 'Ответственный секретарь', name: 'Сахненко Анастасия', desc: 'Реализация редакционной политики, планирование и координация деятельности' },
              { num: '03', photo: 'https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/81d5d7ae-6172-40bc-a195-b9a8384785bb.jpg', role: 'SMM-специалист, мобильный журналист', name: 'Бржезицкая Юлия', desc: 'Продвижение в соцсетях, адаптация материалов под платформы, привлечение подписчиков' },
              { num: '04', photo: 'https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/44a6c2e6-e0ef-48eb-97fe-14a04edd1bf9.jpg', role: 'Digital-специалист', name: 'Ручкин Владислав', desc: 'Техническая поддержка и работа с современными технологиями' },
            ].map((m) => (
              <div key={m.num} className="group border-t-2 border-black pt-6">
                <div className="aspect-square mb-4 overflow-hidden">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-red-600 mb-1">{m.role}</p>
                <h3 className="text-lg font-bold">{m.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 px-4 md:px-8 bg-neutral-100">
        <div className="container mx-auto">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">ПАРТНЁРЫ</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mb-12">
            Сотрудничаем с музеями, отелями, ресторанами и туристическими организациями Таганрога.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300">
            {[
              { tag: 'Туризм', name: 'Туристский информационный центр', short: 'ТИЦ', desc: 'Официальный центр туристической информации Таганрога' },
              { tag: 'Гастрономия', name: 'Ресторан «Чехов сад»', short: 'ЧЕХОВ САД', desc: 'Гастрономический партнёр проекта — авторская кухня в историческом центре' },
              { tag: 'Культура', name: 'Музей А.П. Чехова', short: 'МУЗЕЙ ЧЕХОВА', desc: 'Дом-музей великого русского писателя — сердце чеховского маршрута' },
              { tag: 'Наследие', name: 'Комитет по охране объектов культурного наследия', short: 'КОКН РО', desc: 'Комитет Ростовской области по охране объектов культурного наследия' },
            ].map((p) => (
              <div key={p.name} className="bg-white flex flex-col justify-between py-10 px-8 group hover:bg-red-600 transition-colors duration-300 min-h-48">
                <p className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white/70 mb-4 transition-colors">{p.tag}</p>
                <div>
                  <p className="text-2xl font-bold tracking-tighter group-hover:text-white transition-colors mb-2">{p.short}</p>
                  <p className="text-sm text-neutral-500 group-hover:text-white/80 transition-colors leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-neutral-300 pt-8">
            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">Бизнес-модель</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Нативная реклама', desc: 'Гастрообзоры, интервью с шеф-поварами, видеоэкскурсии по отелям' },
                { title: 'Партнёрские программы', desc: 'Комиссии от бронирований через Ostrovok, Яндекс.Путешествия, гиды' },
                { title: 'Гранты', desc: 'Росмолодёжь, Фонд президентских грантов, региональные программы туризма' },
                { title: 'Цифровые продукты', desc: 'PDF-гиды, аудиогиды, премиум-доступ к архиву маршрутов' },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-red-600 pl-4">
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">2025 Таганрог Travel Mix. Все права защищены.</p>
          <div className="flex space-x-6 flex-wrap justify-center gap-y-2">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm uppercase tracking-widest hover:text-red-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}