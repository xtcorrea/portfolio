import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Supondo que você não tenha um setup de 'components', vamos remover essas importações por enquanto.
// import { Button } from '@/components/ui/button'; 
// import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ServerCrash, WifiOff, DatabaseZap, ShieldOff, ChevronLeft, ChevronRight } from 'lucide-react';

// --- COMPONENTES SIMPLIFICADOS ---
// Como não temos a biblioteca de UI, criei versões simples dos componentes aqui mesmo.

const Button = ({ children, className, ...props }) => (
    <button className={className} {...props}>
        {children}
    </button>
);

const Card = ({ children, className, ...props }) => (
    <div className={className} {...props}>
        {children}
    </div>
);

const CardContent = ({ children, className, ...props }) => (
    <div className={className} {...props}>
        {children}
    </div>
);


// --- ESTRUTURA DE DADOS FINAL ---

const risksData = [
  { icon: ServerCrash, title: 'Paralisação Operacional', desc: 'Falhas em servidores ou na rede podem interromper totalmente suas operações, causando paralisações que geram prejuízos imediatos e impactam diretamente a produtividade e a confiança dos seus clientes.' },
  { icon: DatabaseZap, title: 'Perda de Dados Críticos', desc: 'Sem uma rotina de backup adequada, a perda de dados importantes, como informações financeiras ou registros de clientes, pode ser irreparável, comprometendo a continuidade do seu negócio.' },
  { icon: ShieldOff, title: 'Vulnerabilidades de Segurança', desc: 'Uma infraestrutura desprotegida se torna um alvo fácil para ataques cibernéticos, como ransomware, invasões e vazamento de dados sensíveis, que podem prejudicar a reputação da sua empresa e gerar multas pesadas.' },
  { icon: WifiOff, title: 'Lentidão e Queda de Performance', desc: 'Sistemas mal configurados causam lentidão, afetam a produtividade dos colaboradores e comprometem a experiência do cliente, prejudicando a competitividade e a entrega de resultados.' }
];

const solutionsData = [
  { 
    title: 'Infraestrutura de Redes e Segurança', 
    desc: 'Projetamos e gerenciamos redes corporativas seguras e de alta performance, unificando conectividade e proteção.',
    tech: [
      { name: 'Mikrotik', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mikrotik-light.svg' },
      { name: 'Unifi', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ubiquiti-unifi.svg' },
      { name: 'OPNsense', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/opnsense.svg' },
    ]
  },
  { 
    title: 'Sistemas e Virtualização', 
    desc: 'Otimizamos sua infraestrutura de servidores, gerenciando sistemas e virtualizando ambientes para máxima eficiência.',
    tech: [
        { name: 'Linux', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linux.svg' },
        { name: 'Windows', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-windows.svg' },
        { name: 'Proxmox', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox-light.svg' },
    ]
  },
  { 
    title: 'Backup e Recuperação de Desastres', 
    desc: 'Implementamos rotinas de backup seguras e planos de recuperação para garantir a continuidade do seu negócio.',
    tech: [
      { name: 'Veeam', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Veeam_logo.png' },
      { name: 'UrBackup', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/urbackup-server.png' },
      { name: 'Syncthing', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing.svg' },
    ]
  },
  { 
    title: 'Armazenamento e File Server', 
    desc: 'Soluções centralizadas e seguras para armazenamento, compartilhamento e gerenciamento de arquivos em rede.',
    tech: [
      { name: 'TrueNAS', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/truenas.svg' },
      { name: 'OpenMediaVault', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openmediavault.png' },
      { name: 'Nextcloud', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg' },
    ]
  },
  { 
    title: 'VPN, Conexões e Acesso Remoto', 
    desc: 'Conecte suas equipes e filiais de forma criptografada e eficiente com as tecnologias de VPN mais modernas.',
    tech: [
      { name: 'WireGuard', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wireguard.svg' },
      { name: 'RustDesk', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/rustdesk.svg' },
      { name: 'Traefik', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Traefik_Logo.svg' },
    ]
  },
  { 
    title: 'Monitoramento e Alertas 24/7', 
    desc: 'Visibilidade total da sua infraestrutura. Identificamos problemas antes que afetem seu negócio com dashboards e alertas.',
    tech: [
      { name: 'Zabbix', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/zabbix.svg' },
      { name: 'Grafana', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg' },
      { name: 'Wazuh', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/wazuh.png' },
      { name: 'Checkmk', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/checkmk.svg' },
      { name: 'Netdata', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/netdata.svg' },
      { name: 'Telegram', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/telegram.svg' },
    ]
  },
  {
    title: 'Performance Web e DNS',
    desc: 'Otimizamos a resolução de nomes e filtramos o tráfego para uma navegação mais rápida, produtiva e segura.',
    tech: [
        { name: 'AdGuard', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg' },
        { name: 'NxFilter', url: 'https://nxfilter.org/p4/wp-content/uploads/2023/05/logo.png' },
        { name: 'OpenDNS', url: 'https://images.seeklogo.com/logo-png/29/1/opendns-logo-png_seeklogo-299879.png' },
    ]
  }
];

const contactData = [
    { name: "WhatsApp", iconUrl: "https://images.icon-icons.com/373/PNG/96/Whatsapp_37229.png", href: "https://wa.me/5517997795411", text: "(17) 9 9779-5411" },
    { name: "E-mail", iconUrl: "https://images.icon-icons.com/2853/PNG/96/email_mail_envelope_message_icon_181521.png", href: "mailto:ti@correatech.com.br", text: "ti@correatech.com.br" },
];

const valuesData = [
    { title: "Estabilidade", desc: "Compromisso com a continuidade operacional." },
    { title: "Transparência", desc: "Clareza nas entregas e na comunicação." },
    { title: "Proximidade", desc: "Relacionamento técnico e colaborativo com o cliente." },
    { title: "Responsabilidade técnica", desc: "Prevenção e melhoria contínua." },
    { title: "Visão estratégica", desc: "Soluções alinhadas aos objetivos do negócio." }
];

// --- COMPONENTES REUTILIZÁVEIS ---

const ContactItem = ({ iconUrl, href, text }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-zinc-800 transition-colors duration-300">
    <img src={iconUrl} alt="" className="w-6 h-6 object-contain"/> <span>{text}</span>
  </a>
);

// Componente para o ícone com efeito de brilho
const TechIcon = ({ name, url }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const spotlightStyle = isHovered ? {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
    background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2), transparent 40%)',
    transform: 'scale(1.1)',
  } : {};

  return (
    <div 
      className="flex flex-col items-center justify-center gap-1 text-center w-20 h-12 transition-transform duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={spotlightStyle}
    >
      <img src={url} alt={name} title={name} className="h-7 max-w-full object-contain" />
      <span className="text-xs text-gray-400">{name}</span>
    </div>
  );
};


export default function PortfolioCorreaTech() {
  const [currentIndex, setCurrentIndex] = useState(solutionsData.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const cardsPerPage = 3;

  const extendedSolutions = [
    ...solutionsData,
    ...solutionsData,
    ...solutionsData,
  ];

  const handleNext = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (currentIndex >= solutionsData.length * 2) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(solutionsData.length);
      }, 500); // Duração da animação
    }

    if (currentIndex < solutionsData.length) {
       setTimeout(() => {
        setTransitionEnabled(false);
        const newIndex = solutionsData.length * 2 -1;
        setCurrentIndex(newIndex);
      }, 500);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!transitionEnabled) {
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
    }
  }, [transitionEnabled]);


  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      <motion.img 
        src="https://github.com/xtcorrea/portfcorrtech25/raw/main/logo-transparent-site.png"
        alt="CorreaTech Logo" 
        className="absolute top-6 left-6 md:top-8 md:left-8 w-48 md:w-64 z-30" 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1.5, delay: 0.2 }} 
      />

      {/* 1. Hero Section */}
      <section className="h-screen w-full relative flex items-center justify-center text-center p-6 bg-gradient-to-b from-zinc-900 via-black to-black">
        <div className="z-20 relative flex flex-col items-center">
            <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-2" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.5 }}
            >
                CorreaTech
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.8 }} 
                className="text-lg md:text-2xl text-yellow-400 max-w-3xl mb-8 font-light"
            >
                Gestão Inteligente & Consultoria em TI
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                <a href="#solucoes"> 
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-400 text-lg px-10 py-6 rounded-full shadow-lg shadow-yellow-500/20 transform hover:scale-105 transition-transform"> 
                        Conheça as Soluções
                    </Button> 
                </a>
            </motion.div>
        </div>
      </section>

      {/* 2. Seção de Riscos */}
      <section className="py-20 px-10 bg-black text-center">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">Os Riscos de uma Infraestrutura sem Gestão</h2>
        <p className="max-w-3xl mx-auto text-gray-400 mb-12">Pequenas falhas podem se transformar em grandes prejuízos. Proteger sua operação é um investimento, não um custo.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {risksData.map((item, i) => (
             <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} >
              <Card className="bg-zinc-900 border-zinc-800 text-center rounded-2xl h-full p-6 transform hover:-translate-y-2 transition-transform duration-300">
                 <div className="flex justify-center mb-4"> <item.icon className="w-10 h-10 text-yellow-500" /> </div>
                 <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-gray-400">{item.desc}</p>
              </Card>
             </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Soluções com Carrossel */}
      <section id="solucoes" className="py-20 px-10 bg-zinc-900 text-center">
        <h2 className="text-3xl font-bold mb-12 text-yellow-400">Nossas Soluções</h2>
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / extendedSolutions.length) * (extendedSolutions.length / cardsPerPage)}%` }}
              transition={{ duration: transitionEnabled ? 0.7 : 0, ease: 'easeInOut' }}
            >
              {extendedSolutions.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex-shrink-0 px-4" style={{ width: `${100 / cardsPerPage}%`}}>
                  <Card className="bg-black border-zinc-800 text-left rounded-2xl h-full transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-yellow-400 mb-2 h-14">{item.title}</h3>
                      <p className="text-gray-300 flex-grow mb-4">{item.desc}</p>
                      <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-4 mt-auto pt-4 border-t border-zinc-700/50 min-h-[120px]">
                        {item.tech.map(tech => <TechIcon key={tech.name} name={tech.name} url={tech.url} />)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Botões de Navegação */}
          <button onClick={handlePrev} className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-20 hidden md:flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={handleNext} className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-20 hidden md:flex items-center justify-center">
              <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>
      
      {/* 4. Sobre a CorreaTech */}
       <section 
        className="py-20 px-10 bg-black text-left"
       >
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-yellow-400 text-center">Sobre a CorreaTech</h2>
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-2xl h-full flex flex-col justify-center">
                        <div>
                            <p className="text-gray-300 text-lg mb-6">Com 15 anos de atuação em infraestrutura e operações de TI, a CorreaTech nasceu para trazer uma abordagem técnica, organizada e orientada a resultados. Atuamos com gestão, consultoria e análise de ambientes corporativos, priorizando a continuidade, a eficiência e a visão de longo prazo.</p>
                            <p className="text-gray-300 text-lg mb-6">Não nos limitamos a corrigir problemas: avaliamos riscos, identificamos falhas potenciais e implantamos melhorias planejadas que fortalecem a infraestrutura, reduzem riscos e otimizam a operação.</p>
                            <p className="text-gray-300 text-lg">Trabalhamos de forma consultiva e próxima ao cliente, alinhando soluções aos objetivos do negócio e garantindo que a TI contribua efetivamente para crescimento, produtividade e resiliência.</p>
                        </div>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-2xl h-full">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Nossa Missão</h3>
                        <p className="text-gray-300 mb-6">Garantir que a tecnologia suporte o negócio com consistência e inteligência por meio de atuação consultiva, preventiva e alinhada aos objetivos do cliente.</p>
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Nossa Visão</h3>
                        <p className="text-gray-300 mb-6">Ser referência em gestão de ambientes de TI, reconhecida por soluções que priorizam continuidade, eficiência e crescimento sustentável.</p>
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Nossos Valores</h3>
                        <ul className="space-y-3 text-gray-300">
                           {valuesData.map(value => (
                               <li key={value.title} className="flex items-start gap-3">
                                   <CheckCircle className="text-yellow-400 w-5 h-5 mt-1 flex-shrink-0" />
                                   <span><strong>{value.title}:</strong> {value.desc}</span>
                               </li>
                           ))}
                        </ul>
                    </Card>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 5. Contato */}
      <section className="p-10 bg-yellow-500 text-black text-center">
        <h2 className="text-3xl font-bold mb-6">Vamos conversar?</h2>
        <p className="max-w-2xl mx-auto mb-8"> Estamos prontos para entender seu desafio e desenhar a solução ideal para o seu negócio. </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg font-medium">
          {contactData.map(contact => ( <ContactItem key={contact.name} iconUrl={contact.iconUrl} href={contact.href} text={contact.text} /> ))}
        </div>
      </section>

      {/* 6. Rodapé */}
      <footer className="bg-zinc-900 text-center py-6 text-gray-400 text-sm"> © {new Date().getFullYear()} CorreaTech — Excelência e confiança para o seu negócio. </footer>
    </div>
  );
}
