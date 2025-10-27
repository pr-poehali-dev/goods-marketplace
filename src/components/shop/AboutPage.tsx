import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl animate-fade-in">
      <h2 className="font-serif text-4xl mb-8">О бренде</h2>
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          <strong className="font-serif text-xl">ÉLITE</strong> — это философия роскоши, воплощенная в каждом изделии. 
          С 2010 года мы создаем эксклюзивные коллекции для людей, которые ценят безупречное качество и изысканный стиль.
        </p>
        <div className="bg-secondary/30 p-8 rounded-lg my-8">
          <h3 className="font-serif text-2xl mb-4">Наши ценности</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
              <span><strong>Мастерство</strong> — каждое изделие создается вручную опытными мастерами</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
              <span><strong>Эксклюзивность</strong> — ограниченные коллекции для избранных</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={24} className="text-accent flex-shrink-0 mt-1" />
              <span><strong>Наследие</strong> — традиции в сочетании с современным дизайном</span>
            </li>
          </ul>
        </div>
        <p className="text-lg leading-relaxed">
          Мы работаем только с проверенными поставщиками премиальных материалов: 
          швейцарские часовые механизмы, итальянская кожа, драгоценные камни с международными сертификатами.
        </p>
        <p className="text-lg leading-relaxed">
          Наша миссия — делать роскошь доступной для тех, кто действительно понимает её ценность.
        </p>
      </div>
    </div>
  );
}
