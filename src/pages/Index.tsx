import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const donationPackages = [
  { name: 'Барон', price: '99₽', color: 'from-gray-500 to-gray-700', perks: ['Префикс [Барон]', '+5% к опыту', 'Доступ к /home'] },
  { name: 'Страж', price: '199₽', color: 'from-green-500 to-green-700', perks: ['Префикс [Страж]', '+10% к опыту', '/home x2', 'Приват 5000 блоков'] },
  { name: 'Герой', price: '299₽', color: 'from-blue-500 to-blue-700', perks: ['Префикс [Герой]', '+15% к опыту', '/home x3', '/fly на 30 мин'] },
  { name: 'Аспид', price: '399₽', color: 'from-purple-500 to-purple-700', perks: ['Префикс [Аспид]', '+20% к опыту', '/home x4', '/fly 1 час', 'Цветной ник'] },
  { name: 'Сквид', price: '499₽', color: 'from-cyan-500 to-cyan-700', perks: ['Префикс [Сквид]', '+25% к опыту', '/home x5', '/fly 2 часа', 'Кит Сквид'] },
  { name: 'Глава', price: '699₽', color: 'from-pink-500 to-pink-700', perks: ['Префикс [Глава]', '+30% к опыту', '/home x6', '/fly 4 часа', '/hat'] },
  { name: 'Элита', price: '899₽', color: 'from-yellow-500 to-yellow-700', perks: ['Префикс [Элита]', '+40% к опыту', '/home x8', '/fly безлимит', 'Кит Элита'] },
  { name: 'Титан', price: '1199₽', color: 'from-red-500 to-red-700', perks: ['Префикс [Титан]', '+50% к опыту', '/home x10', 'Креатив на час', '/god'] },
  { name: 'Принц', price: '1499₽', color: 'from-indigo-500 to-indigo-700', perks: ['Префикс [Принц]', '+60% к опыту', '/home x12', 'WorldEdit лимит 5000', '/heal'] },
  { name: 'Князь', price: '1999₽', color: 'from-orange-500 to-orange-700', perks: ['Префикс [Князь]', '+75% к опыту', '/home x15', 'WorldEdit лимит 10000', 'Приоритет в очереди'] },
  { name: 'Герцог', price: '2999₽', color: 'from-violet-500 to-violet-700', perks: ['Префикс [Герцог]', '+90% к опыту', '/home x20', 'WorldEdit лимит 20000', 'Личный мир'] },
  { name: 'Спонсор', price: '4999₽', color: 'from-amber-500 to-amber-700', perks: ['Префикс [Спонсор]', '+100% к опыту', '/home безлимит', 'WorldEdit безлимит', 'Все привилегии'] },
];

const rules = [
  { category: 'Общие правила', items: ['Уважайте других игроков', 'Запрещен читерский софт', 'Запрещен спам в чате', 'Запрещена реклама других серверов'] },
  { category: 'Игровой процесс', items: ['Гриферство запрещено', 'Убийство в спавне запрещено', 'Запрещено создание лаговых механизмов', 'Дюпы предметов караются баном'] },
  { category: 'Донат', items: ['Возврат средств не предусмотрен', 'Привилегии выдаются автоматически', 'При бане донат не возвращается', 'Передача доната запрещена'] },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [rgbColor1, setRgbColor1] = useState('#9b87f5');
  const [rgbColor2, setRgbColor2] = useState('#D946EF');
  const [onlinePlayers] = useState(247);
  const [maxPlayers] = useState(500);

  const generateRGBFormats = (color1: string, color2: string) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const formats = {
      hex: `&#${hex1} - &#${hex2}`,
      minecraft: `&x&${hex1[0]}&${hex1[1]}&${hex1[2]}&${hex1[3]}&${hex1[4]}&${hex1[5]} - &x&${hex2[0]}&${hex2[1]}&${hex2[2]}&${hex2[3]}&${hex2[4]}&${hex2[5]}`,
      rgb: `rgb(${parseInt(hex1.substr(0,2),16)},${parseInt(hex1.substr(2,2),16)},${parseInt(hex1.substr(4,2),16)}) - rgb(${parseInt(hex2.substr(0,2),16)},${parseInt(hex2.substr(2,2),16)},${parseInt(hex2.substr(4,2),16)})`,
    };
    
    return formats;
  };

  const formats = generateRGBFormats(rgbColor1, rgbColor2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">Night-Times</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Донаты', 'Правила', 'Онлайн', 'Генератор', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Zap" size={16} className="mr-2" />
              Токены
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        {activeSection === 'главная' && (
          <section className="container mx-auto px-4">
            <div className="text-center py-20 space-y-6">
              <Badge className="glass-effect text-lg px-6 py-2 mb-4">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Онлайн: {onlinePlayers}/{maxPlayers}
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-black gradient-text animate-fade-in">
                Night-Times
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Лучший Minecraft сервер с уникальными возможностями и дружным комьюнити
              </p>

              <div className="flex items-center justify-center gap-4 pt-8">
                <Card className="glass-effect p-6 hover-scale cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Icon name="Server" size={24} className="text-primary" />
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">IP Сервера</p>
                      <p className="text-xl font-bold group-hover:text-primary transition-colors">mc.Night-Times.su</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                <Card className="glass-effect p-8 hover-scale">
                  <Icon name="Users" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Активное комьюнити</h3>
                  <p className="text-muted-foreground">Более 10,000 игроков со всего мира</p>
                </Card>
                
                <Card className="glass-effect p-8 hover-scale">
                  <Icon name="Sparkles" size={48} className="text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Уникальный контент</h3>
                  <p className="text-muted-foreground">Эксклюзивные моды и плагины</p>
                </Card>
                
                <Card className="glass-effect p-8 hover-scale">
                  <Icon name="Shield" size={48} className="text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Защита 24/7</h3>
                  <p className="text-muted-foreground">Anti-DDoS и защита от читеров</p>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'донаты' && (
          <section className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold gradient-text mb-4">Донат-привилегии</h2>
              <p className="text-xl text-muted-foreground">Выберите подходящий для вас пакет привилегий</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {donationPackages.map((pkg, idx) => (
                <Card key={idx} className="glass-effect p-6 hover-scale group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${pkg.color} mb-4`}>
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    </div>
                    
                    <p className="text-4xl font-black mb-6">{pkg.price}</p>
                    
                    <div className="space-y-3 mb-6">
                      {pkg.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{perk}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90`}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="glass-effect p-8 mt-12 text-center">
              <Icon name="Coins" size={48} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Токены - внутренняя валюта</h3>
              <p className="text-muted-foreground mb-4">Покупайте токены для обмена на привилегии и предметы</p>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90">
                Купить токены
              </Button>
            </Card>
          </section>
        )}

        {activeSection === 'правила' && (
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold gradient-text mb-4">Правила сервера</h2>
              <p className="text-xl text-muted-foreground">Ознакомьтесь с правилами перед игрой</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {rules.map((section, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="glass-effect border-0 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 hover:no-underline hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <Icon name="BookOpen" size={24} className="text-primary" />
                      <span className="text-xl font-bold">{section.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-3 mt-4">
                      {section.items.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {activeSection === 'онлайн' && (
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold gradient-text mb-4">Мониторинг онлайна</h2>
              <p className="text-xl text-muted-foreground">Статистика сервера в реальном времени</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="glass-effect p-8 text-center hover-scale">
                <Icon name="Users" size={64} className="text-primary mx-auto mb-4" />
                <p className="text-6xl font-black mb-2">{onlinePlayers}</p>
                <p className="text-xl text-muted-foreground">Игроков онлайн</p>
              </Card>
              
              <Card className="glass-effect p-8 text-center hover-scale">
                <Icon name="TrendingUp" size={64} className="text-secondary mx-auto mb-4" />
                <p className="text-6xl font-black mb-2">{maxPlayers}</p>
                <p className="text-xl text-muted-foreground">Максимум слотов</p>
              </Card>
            </div>

            <Card className="glass-effect p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Загрузка сервера</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  {Math.round((onlinePlayers / maxPlayers) * 100)}% загружен
                </Badge>
              </div>
              
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                  style={{ width: `${(onlinePlayers / maxPlayers) * 100}%` }}
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <Icon name="Clock" size={32} className="text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Аптайм</p>
                  <p className="text-lg font-bold">99.9%</p>
                </div>
                <div className="text-center">
                  <Icon name="Zap" size={32} className="text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">TPS</p>
                  <p className="text-lg font-bold">19.8</p>
                </div>
                <div className="text-center">
                  <Icon name="Activity" size={32} className="text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Ping</p>
                  <p className="text-lg font-bold">12ms</p>
                </div>
                <div className="text-center">
                  <Icon name="HardDrive" size={32} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Версия</p>
                  <p className="text-lg font-bold">1.20.4</p>
                </div>
              </div>
            </Card>
          </section>
        )}

        {activeSection === 'генератор' && (
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold gradient-text mb-4">Генератор RGB-градиентов</h2>
              <p className="text-xl text-muted-foreground">Создавайте красивые градиенты для ников и текстов</p>
            </div>

            <Card className="glass-effect p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-3">Цвет 1</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={rgbColor1}
                      onChange={(e) => setRgbColor1(e.target.value)}
                      className="w-20 h-20 rounded-lg cursor-pointer border-2 border-white/20"
                    />
                    <input
                      type="text"
                      value={rgbColor1}
                      onChange={(e) => setRgbColor1(e.target.value)}
                      className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Цвет 2</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={rgbColor2}
                      onChange={(e) => setRgbColor2(e.target.value)}
                      className="w-20 h-20 rounded-lg cursor-pointer border-2 border-white/20"
                    />
                    <input
                      type="text"
                      value={rgbColor2}
                      onChange={(e) => setRgbColor2(e.target.value)}
                      className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div 
                className="h-32 rounded-lg mb-8 flex items-center justify-center text-4xl font-black"
                style={{
                  background: `linear-gradient(90deg, ${rgbColor1}, ${rgbColor2})`
                }}
              >
                Night-Times
              </div>

              <Tabs defaultValue="hex" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="hex">&#RRGGBB</TabsTrigger>
                  <TabsTrigger value="minecraft">&x&r&r&g&g&b&b</TabsTrigger>
                  <TabsTrigger value="rgb">RGB(r,g,b)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hex" className="mt-6">
                  <Card className="bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">{formats.hex}</code>
                      <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(formats.hex)}>
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="minecraft" className="mt-6">
                  <Card className="bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono break-all">{formats.minecraft}</code>
                      <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(formats.minecraft)}>
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="rgb" className="mt-6">
                  <Card className="bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">{formats.rgb}</code>
                      <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(formats.rgb)}>
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </section>
        )}

        {activeSection === 'контакты' && (
          <section className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold gradient-text mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect p-8 hover-scale cursor-pointer group">
                <Icon name="MessageCircle" size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Discord</h3>
                <p className="text-muted-foreground mb-4">Присоединяйтесь к нашему Discord серверу</p>
                <Button className="w-full group-hover:bg-primary">Перейти</Button>
              </Card>
              
              <Card className="glass-effect p-8 hover-scale cursor-pointer group">
                <Icon name="Send" size={48} className="text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Telegram</h3>
                <p className="text-muted-foreground mb-4">Наш официальный Telegram канал</p>
                <Button className="w-full group-hover:bg-secondary">Перейти</Button>
              </Card>
              
              <Card className="glass-effect p-8 hover-scale cursor-pointer group">
                <Icon name="Globe" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-2">Форум</h3>
                <p className="text-muted-foreground mb-4">Обсуждения и новости на форуме</p>
                <Button className="w-full group-hover:bg-accent">Перейти</Button>
              </Card>
              
              <Card className="glass-effect p-8 hover-scale cursor-pointer group">
                <Icon name="Mail" size={48} className="text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">support@night-times.su</p>
                <Button className="w-full group-hover:bg-yellow-500">Написать</Button>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="glass-effect border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Night-Times. Все права защищены. Не является официальным продуктом Mojang.
          </p>
        </div>
      </footer>
    </div>
  );
}
