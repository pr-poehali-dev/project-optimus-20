import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const routes = [
  {
    num: '01',
    title: 'Чеховский маршрут',
    distance: '2,4 км',
    duration: '3–4 часа',
    desc: 'Дома, улицы и места, связанные с жизнью и творчеством Антона Павловича Чехова. Домик Чехова, гимназия, лавка отца.',
    points: ['Домик Чехова', 'Гимназия Чехова', 'Лавка отца', 'Театр Чехова', 'Памятник Чехову'],
  },
  {
    num: '02',
    title: 'Архитектурный модерн',
    distance: '3,1 км',
    duration: '2–3 часа',
    desc: 'Купеческие особняки, доходные дома и памятники архитектуры XIX — начала XX века. Дворец Алфераки, Каменная лестница.',
    points: ['Дворец Алфераки', 'Каменная лестница', 'Таганрогский музей-заповедник', 'Набережная', 'Монумент Петру I'],
  },
  {
    num: '03',
    title: 'Гастрономический гид',
    distance: 'Свой темп',
    duration: 'Весь день',
    desc: 'Лучшие кафе, ресторанные открытия и локальные вкусы. Свежая азовская рыба, блюда из бычков и кильки, уютные заведения.',
    points: ['Ресторан «Чехов сад»', 'Рыбный рынок', 'Район Богудония', 'Местные кафе', 'Гастрономические лавки'],
  },
];

export default function RoutesPage() {
  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/">
            <Logo size={36} showText={true} />
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 md:px-8 border-b border-black">
        <div className="container mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
            МАРШРУТЫ
          </h1>
          <p className="text-xl max-w-2xl text-neutral-600">
            Тематические прогулки по Таганрогу — для неспешного и вдумчивого знакомства с городом.
          </p>
        </div>
      </section>

      {/* Why Taganrog infographic */}
      <section className="py-16 px-4 md:px-8 bg-neutral-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">ЗАЧЕМ ПРИЕЗЖАТЬ В ТАГАНРОГ?</h2>
          <img
            src="https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/711ed95f-e885-46b8-80c5-957b8725e2d2.png"
            alt="Зачем приезжать в Таганрог — инфографика"
            className="w-full rounded-none border border-neutral-300"
          />
        </div>
      </section>

      {/* Interactive map */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">КАРТА ДОСТОПРИМЕЧАТЕЛЬНОСТЕЙ</h2>
          <div className="relative border-2 border-black overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/9f1f4cbd-bec2-42e2-a0ff-63159f683471/bucket/500b5e02-2b36-4a8f-8bda-6e42245fd179.png"
              alt="Интерактивная туристическая карта Таганрога"
              className="w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white px-6 py-3 text-sm uppercase tracking-widest flex items-center gap-2">
              <Icon name="MapPin" size={14} />
              Таганрог — туристическая карта города
            </div>
          </div>
        </div>
      </section>

      {/* Routes detail */}
      <section className="py-16 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-12">ВЫБЕРИТЕ МАРШРУТ</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-800">
            {routes.map((r, i) => (
              <button
                key={r.num}
                onClick={() => setActiveRoute(i)}
                className={`text-left p-8 transition-colors duration-300 ${activeRoute === i ? 'bg-red-600' : 'bg-black hover:bg-neutral-900'}`}
              >
                <p className="text-6xl font-bold tracking-tighter mb-4 opacity-30">{r.num}</p>
                <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                <div className="flex gap-4 text-xs uppercase tracking-widest opacity-70 mb-4">
                  <span>{r.distance}</span>
                  <span>·</span>
                  <span>{r.duration}</span>
                </div>
                <p className="text-sm opacity-80">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* Active route detail */}
          <div className="mt-px bg-white text-black p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-red-600 mb-2">Точки маршрута</p>
                <h3 className="text-3xl font-bold tracking-tighter mb-6">{routes[activeRoute].title}</h3>
                <div className="flex flex-col gap-3">
                  {routes[activeRoute].points.map((point, i) => (
                    <div key={point} className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 md:text-right">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">Расстояние</p>
                  <p className="text-2xl font-bold">{routes[activeRoute].distance}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">Время</p>
                  <p className="text-2xl font-bold">{routes[activeRoute].duration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 md:px-8 bg-red-600 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter mb-2">ГОТОВЫ К ПРОГУЛКЕ?</h2>
            <p className="text-white/80">Свяжитесь с нами — поможем спланировать визит в Таганрог.</p>
          </div>
          <a
            href="/#contact"
            className="px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex-shrink-0"
          >
            Написать нам
          </a>
        </div>
      </section>
    </main>
  );
}