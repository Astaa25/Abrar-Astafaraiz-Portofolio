import {
  Profile,
  Skill,
  Project,
  ProjectImage,
  Achievement,
  Experience,
  SocialLink,
  SectionSetting,
  SiteSettingsMap,
  ActivityLog,
  PublicationStatus,
} from '@/types/database';
import { WebsiteContent, StatsOverview, PublishResult } from '@/types/content';

// Default initial data adhering to PRD specifications
export const INITIAL_PROFILE: Profile = {
  id: 'a0000000-0000-0000-0000-000000000001',
  display_name: 'Abrar Astafaraiz',
  headline: 'Full-Stack Developer | Web & Software Development',
  short_bio:
    'Mahasiswa Teknik Informatika dengan dedikasi tinggi dalam rekayasa perangkat lunak, pengembangan web modern, dan arsitektur database.',
  about_content:
    'Halo! Saya Abrar Astafaraiz, mahasiswa Teknik Informatika dengan dedikasi tinggi dalam software engineering dan modern web development. Saya berfokus pada perancangan dan implementasi aplikasi yang aman, skalabel, serta berorientasi pada kepuasan pengguna. Melalui berbagai proyek akademik dan kolaboratif, saya terbiasa memecahkan masalah kompleks dengan pendekatan rekayasa perangkat lunak yang sistematis.',
  profile_image_path: '/images/profile-avatar.webp',
  hero_image_path: '/images/hero-visual.webp',
  tagline: 'Building Digital Experiences Through Code.',
  primary_cta_label: 'Lihat Proyek',
  primary_cta_target: '#projects',
  secondary_cta_label: 'Hubungi Saya',
  secondary_cta_target: '#contact',
  updated_at: new Date().toISOString(),
};

export const INITIAL_SECTIONS: SectionSetting[] = [
  {
    id: 's-1',
    section_key: 'hero',
    title: 'Beranda',
    subtitle: 'Pengantar Singkat',
    nav_label: 'Home',
    is_visible: true,
    show_in_nav: true,
    sort_order: 1,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-2',
    section_key: 'about',
    title: 'Tentang Saya',
    subtitle: 'Latar Belakang & Profil Singkat',
    nav_label: 'About',
    is_visible: true,
    show_in_nav: true,
    sort_order: 2,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-3',
    section_key: 'skills',
    title: 'Keahlian & Teknologi',
    subtitle: 'Teknologi & Tools yang Dikuasai',
    nav_label: 'Skills',
    is_visible: true,
    show_in_nav: true,
    sort_order: 3,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-4',
    section_key: 'projects',
    title: 'Proyek Pilihan',
    subtitle: 'Karya & Proyek Terpilih',
    nav_label: 'Projects',
    is_visible: true,
    show_in_nav: true,
    sort_order: 4,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-5',
    section_key: 'achievements',
    title: 'Sertifikat & Pencapaian',
    subtitle: 'Sertifikasi & Lisensi',
    nav_label: 'Achievements',
    is_visible: true,
    show_in_nav: true,
    sort_order: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-6',
    section_key: 'experience',
    title: 'Pengalaman & Organisasi',
    subtitle: 'Riwayat Kerja & Organisasi',
    nav_label: 'Experience',
    is_visible: true,
    show_in_nav: true,
    sort_order: 6,
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-7',
    section_key: 'contact',
    title: 'Hubungi Saya',
    subtitle: 'Informasi Kontak & Media Sosial',
    nav_label: 'Contact',
    is_visible: true,
    show_in_nav: true,
    sort_order: 7,
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_SKILLS: Skill[] = [
  // --- TEKNIK INFORMATIKA (Software & Web Engineering) ---
  {
    id: 'sk-1',
    name: 'TypeScript',
    category: 'Programming Languages',
    description: 'Static typing for scalable modern web applications and robust architectures',
    icon_name: 'Code2',
    proficiency_label: 'Proficient',
    sort_order: 1,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-2',
    name: 'JavaScript',
    category: 'Programming Languages',
    description: 'Core scripting for frontend interactivity, event-driven DOM, and backend APIs',
    icon_name: 'FileCode2',
    proficiency_label: 'Advanced',
    sort_order: 2,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-3',
    name: 'Next.js',
    category: 'Web Development',
    description: 'Full-stack React framework with App Router, SSR, Turbopack, and Server Actions',
    icon_name: 'Layers',
    proficiency_label: 'Advanced',
    sort_order: 3,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-4',
    name: 'React',
    category: 'Web Development',
    description: 'Component-driven interactive UI engineering with hooks and state management',
    icon_name: 'Atom',
    proficiency_label: 'Advanced',
    sort_order: 4,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-5',
    name: 'Node.js & Express',
    category: 'Web Development',
    description: 'High-performance event-driven runtime and RESTful API backend architecture',
    icon_name: 'Server',
    proficiency_label: 'Proficient',
    sort_order: 5,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-6',
    name: 'Python',
    category: 'Programming Languages',
    description: 'Data processing, scripting, backend development, and AI/automation scripts',
    icon_name: 'Terminal',
    proficiency_label: 'Proficient',
    sort_order: 6,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-7',
    name: 'PHP & Laravel',
    category: 'Web Development',
    description: 'Robust MVC backend web application development and Eloquent ORM',
    icon_name: 'FileCode',
    proficiency_label: 'Proficient',
    sort_order: 7,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-8',
    name: 'C++',
    category: 'Programming Languages',
    description: 'Algorithmic problem solving, low-level data structures, and computer science foundations',
    icon_name: 'Cpu',
    proficiency_label: 'Familiar',
    sort_order: 8,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-9',
    name: 'Java',
    category: 'Programming Languages',
    description: 'Object-oriented programming, enterprise patterns, and algorithmic foundations',
    icon_name: 'Coffee',
    proficiency_label: 'Proficient',
    sort_order: 9,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-10',
    name: 'Golang',
    category: 'Programming Languages',
    description: 'Concurrent, high-throughput microservices and system programming',
    icon_name: 'Zap',
    proficiency_label: 'Familiar',
    sort_order: 10,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-11',
    name: 'Tailwind CSS',
    category: 'Web Development',
    description: 'Utility-first modern styling, responsive layouts, and dynamic themes',
    icon_name: 'Palette',
    proficiency_label: 'Advanced',
    sort_order: 11,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-12',
    name: 'PostgreSQL',
    category: 'Database Management',
    description: 'Advanced relational schema modeling, indexing, foreign keys, and complex queries',
    icon_name: 'Database',
    proficiency_label: 'Proficient',
    sort_order: 12,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-13',
    name: 'Supabase',
    category: 'Database Management',
    description: 'BaaS: Auth, Realtime Postgres, Storage, and Row Level Security (RLS)',
    icon_name: 'ShieldCheck',
    proficiency_label: 'Proficient',
    sort_order: 13,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-14',
    name: 'MySQL',
    category: 'Database Management',
    description: 'Relational data management, database normalization, and query optimization',
    icon_name: 'DatabaseZap',
    proficiency_label: 'Proficient',
    sort_order: 14,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-15',
    name: 'MongoDB',
    category: 'Database Management',
    description: 'NoSQL document-oriented database design and JSON aggregation pipelines',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 15,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-16',
    name: 'Redis',
    category: 'Database Management',
    description: 'In-memory key-value data structure store, caching layer, and session store',
    icon_name: 'Zap',
    proficiency_label: 'Familiar',
    sort_order: 16,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-17',
    name: 'Git & GitHub',
    category: 'Tools & Platforms',
    description: 'Version control, branch workflows, pull requests, and collaboration',
    icon_name: 'GitBranch',
    proficiency_label: 'Advanced',
    sort_order: 17,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-18',
    name: 'Docker',
    category: 'Tools & Platforms',
    description: 'Containerization, Dockerfile configuration, and consistent development environments',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 18,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- TEKNOLOGI REKAYASA KOMPUTER JARINGAN (TRKJ) ---
  {
    id: 'sk-19',
    name: 'Cisco Packet Tracer',
    category: 'Network & Security',
    description: 'Simulasi dan perancangan topologi jaringan skala LAN, MAN, hingga WAN',
    icon_name: 'Network',
    proficiency_label: 'Advanced',
    sort_order: 19,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-20',
    name: 'Mikrotik RouterOS',
    category: 'Network & Security',
    description: 'Konfigurasi routing, firewall filter, bandwidth queue management, dan hotspot gateway',
    icon_name: 'Router',
    proficiency_label: 'Proficient',
    sort_order: 20,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-21',
    name: 'Wireshark',
    category: 'Network & Security',
    description: 'Analisis protokol paket data jaringan (TCP/IP, UDP, DNS, HTTP) dan troubleshooting koneksi',
    icon_name: 'Activity',
    proficiency_label: 'Proficient',
    sort_order: 21,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-22',
    name: 'Routing & Switching',
    category: 'Network & Security',
    description: 'Implementasi VLAN, Trunking, Spanning Tree Protocol (STP), OSPF, RIP, dan BGP routing',
    icon_name: 'Network',
    proficiency_label: 'Proficient',
    sort_order: 22,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-23',
    name: 'Network Security & Firewall',
    category: 'Network & Security',
    description: 'Keamanan jaringan, IDS/IPS, konfigurasi NAT, VPN (OpenVPN, WireGuard), dan access control list',
    icon_name: 'ShieldAlert',
    proficiency_label: 'Proficient',
    sort_order: 23,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-24',
    name: 'Linux Server Administration',
    category: 'Network & Security',
    description: 'Pengelolaan Ubuntu Server, Debian, Nginx/Apache web server, SSH, DNS, dan Bash script',
    icon_name: 'TerminalSquare',
    proficiency_label: 'Advanced',
    sort_order: 24,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-25',
    name: 'Virtualization & Proxmox',
    category: 'Network & Security',
    description: 'Virtualisasi server dengan Proxmox VE, VMware ESXi, KVM, dan LXC container',
    icon_name: 'HardDrive',
    proficiency_label: 'Proficient',
    sort_order: 25,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-26',
    name: 'Penetration Testing (Kali Linux)',
    category: 'Network & Security',
    description: 'Vulnerability assessment dan port scanning menggunakan Nmap, Metasploit, dan Burp Suite',
    icon_name: 'ShieldCheck',
    proficiency_label: 'Familiar',
    sort_order: 26,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-27',
    name: 'GNS3 & PNetLab',
    category: 'Network & Security',
    description: 'Emulasi topologi jaringan kompleks dengan router Cisco IOS, IOU, dan virtual appliances',
    icon_name: 'Network',
    proficiency_label: 'Familiar',
    sort_order: 27,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-28',
    name: 'IoT & Microcontroller',
    category: 'Network & Security',
    description: 'Pemrograman hardware sensor dan aktuator dengan Arduino, ESP32, ESP8266, dan Raspberry Pi',
    icon_name: 'Cpu',
    proficiency_label: 'Familiar',
    sort_order: 28,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- TEKNOLOGI REKAYASA MULTIMEDIA (TRM) ---
  {
    id: 'sk-29',
    name: 'Figma',
    category: 'UI/UX Design',
    description: 'UI/UX design, wireframing, high-fidelity interactive prototyping, and design tokens',
    icon_name: 'Layout',
    proficiency_label: 'Advanced',
    sort_order: 29,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-30',
    name: 'Adobe Photoshop',
    category: 'UI/UX Design',
    description: 'Pengolahan citra digital, manipulasi raster grafis, retouching foto, dan komposisi visual',
    icon_name: 'Image',
    proficiency_label: 'Proficient',
    sort_order: 30,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-31',
    name: 'Adobe Illustrator',
    category: 'UI/UX Design',
    description: 'Pembuatan grafis vektor, desain logo, ikon antarmuka, dan branding visual presisi',
    icon_name: 'PenTool',
    proficiency_label: 'Proficient',
    sort_order: 31,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-32',
    name: 'Adobe Premiere Pro',
    category: 'UI/UX Design',
    description: 'Editing video profesional, timeline trimming, color correction Lumetri, dan mixing audio',
    icon_name: 'Video',
    proficiency_label: 'Proficient',
    sort_order: 32,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-33',
    name: 'Adobe After Effects',
    category: 'UI/UX Design',
    description: 'Motion graphics, animasi tipografi, visual effects (VFX), dan compositing video',
    icon_name: 'Film',
    proficiency_label: 'Familiar',
    sort_order: 33,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-34',
    name: 'Blender 3D',
    category: 'UI/UX Design',
    description: 'Pemodelan objek 3D (3D Modeling), texturing PBR, lighting, dan rendering Eevee/Cycles',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 34,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-35',
    name: 'Unity 3D',
    category: 'UI/UX Design',
    description: 'Pengembangan aplikasi game interaktif, simulasi visual, dan integrasi aset 3D dengan C#',
    icon_name: 'Layers',
    proficiency_label: 'Familiar',
    sort_order: 35,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-36',
    name: 'DaVinci Resolve',
    category: 'UI/UX Design',
    description: 'Color grading cinematic, video editing berkinerja tinggi, dan audio post-production Fairlight',
    icon_name: 'Video',
    proficiency_label: 'Familiar',
    sort_order: 36,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-37',
    name: 'Audacity & Sound Design',
    category: 'UI/UX Design',
    description: 'Perekaman audio, audio cleaning/noise reduction, sound effects, dan mastering podcast',
    icon_name: 'Music',
    proficiency_label: 'Proficient',
    sort_order: 37,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- TAMBAHAN TEKNIK INFORMATIKA (Mobile, Cloud, DevOps, AI, Testing) ---
  {
    id: 'sk-38',
    name: 'Flutter & Dart',
    category: 'Programming Languages',
    description: 'Pengembangan aplikasi mobile multi-platform (Android & iOS) dengan performa native',
    icon_name: 'Layers',
    proficiency_label: 'Proficient',
    sort_order: 38,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-39',
    name: 'React Native',
    category: 'Web Development',
    description: 'Framework mobile lintas platform menggunakan basis React dan JavaScript/TypeScript',
    icon_name: 'Atom',
    proficiency_label: 'Proficient',
    sort_order: 39,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-40',
    name: 'Kotlin (Android Native)',
    category: 'Programming Languages',
    description: 'Pemrograman aplikasi Android native modern dengan Jetpack Compose dan coroutines',
    icon_name: 'Code2',
    proficiency_label: 'Familiar',
    sort_order: 40,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-41',
    name: 'Swift (iOS Native)',
    category: 'Programming Languages',
    description: 'Pemrograman aplikasi ekosistem Apple native dengan SwiftUI dan integrasi UIKit',
    icon_name: 'Code2',
    proficiency_label: 'Familiar',
    sort_order: 41,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-42',
    name: 'Vue.js & Nuxt.js',
    category: 'Web Development',
    description: 'Framework frontend reaktif dengan Composition API dan Server Side Rendering (SSR)',
    icon_name: 'Layers',
    proficiency_label: 'Proficient',
    sort_order: 42,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-43',
    name: 'Angular',
    category: 'Web Development',
    description: 'Framework TypeScript enterprise-grade dengan dependency injection dan RxJS',
    icon_name: 'Layers',
    proficiency_label: 'Familiar',
    sort_order: 43,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-44',
    name: 'Svelte & SvelteKit',
    category: 'Web Development',
    description: 'Kompiler antarmuka web ultra-ringan tanpa overhead virtual DOM runtime',
    icon_name: 'Zap',
    proficiency_label: 'Familiar',
    sort_order: 44,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-45',
    name: 'FastAPI (Python)',
    category: 'Web Development',
    description: 'Framework backend asinkronus berkecepatan tinggi dengan auto dokumentasi Swagger/OpenAPI',
    icon_name: 'Zap',
    proficiency_label: 'Proficient',
    sort_order: 45,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-46',
    name: 'Django (Python)',
    category: 'Web Development',
    description: 'Framework web full-featured dengan built-in ORM, admin panel, dan modul autentikasi',
    icon_name: 'Server',
    proficiency_label: 'Proficient',
    sort_order: 46,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-47',
    name: 'Spring Boot (Java)',
    category: 'Web Development',
    description: 'Framework microservices enterprise dengan Hibernate JPA, Spring Security, dan MVC',
    icon_name: 'Coffee',
    proficiency_label: 'Familiar',
    sort_order: 47,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-48',
    name: 'ASP.NET Core (C#)',
    category: 'Web Development',
    description: 'Platform pengembangan web dan Web API modern berkinerja tinggi dari Microsoft',
    icon_name: 'Layers',
    proficiency_label: 'Familiar',
    sort_order: 48,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-49',
    name: 'GraphQL',
    category: 'Web Development',
    description: 'Bahasa kueri fleksibel untuk API yang mencegah over-fetching dan under-fetching data',
    icon_name: 'Network',
    proficiency_label: 'Proficient',
    sort_order: 49,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-50',
    name: 'gRPC & Protobuf',
    category: 'Web Development',
    description: 'Komunikasi RPC berkinerja tinggi antar microservice berbasis HTTP/2 dan serialisasi biner',
    icon_name: 'Zap',
    proficiency_label: 'Familiar',
    sort_order: 50,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-51',
    name: 'WebSockets & Socket.io',
    category: 'Web Development',
    description: 'Protokol komunikasi real-time dua arah untuk chat, live notification, dan kolaborasi online',
    icon_name: 'Activity',
    proficiency_label: 'Proficient',
    sort_order: 51,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-52',
    name: 'Kubernetes (K8s)',
    category: 'Tools & Platforms',
    description: 'Orkestrasi kontainer otomatis untuk deployment, scaling, dan manajemen cluster aplikasi',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 52,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-53',
    name: 'CI/CD Pipelines (GitHub Actions)',
    category: 'Tools & Platforms',
    description: 'Automasi pengujian, build, linting, dan continuous deployment ke server produksi',
    icon_name: 'GitBranch',
    proficiency_label: 'Proficient',
    sort_order: 53,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-54',
    name: 'Terraform (IaC)',
    category: 'Tools & Platforms',
    description: 'Pengelolaan infrastruktur cloud melalui kode deklaratif (Infrastructure as Code)',
    icon_name: 'Wrench',
    proficiency_label: 'Familiar',
    sort_order: 54,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-55',
    name: 'Unit & Integration Testing (Jest/Vitest)',
    category: 'Tools & Platforms',
    description: 'Pengujian kode otomatis untuk memastikan keandalan fungsi, regresi, dan clean architecture',
    icon_name: 'ShieldCheck',
    proficiency_label: 'Proficient',
    sort_order: 55,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-56',
    name: 'Playwright & E2E Testing',
    category: 'Tools & Platforms',
    description: 'Automasi pengujian menyeluruh (End-to-End) lintas peramban (Chromium, Firefox, WebKit)',
    icon_name: 'Terminal',
    proficiency_label: 'Proficient',
    sort_order: 56,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-57',
    name: 'Vite & Webpack',
    category: 'Tools & Platforms',
    description: 'Modern frontend build tool, Hot Module Replacement (HMR), dan bundling aset produksi',
    icon_name: 'Zap',
    proficiency_label: 'Advanced',
    sort_order: 57,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-58',
    name: 'Bun & Deno',
    category: 'Tools & Platforms',
    description: 'Runtime JavaScript/TypeScript modern all-in-one dengan kecepatan eksekusi tinggi',
    icon_name: 'Zap',
    proficiency_label: 'Familiar',
    sort_order: 58,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-59',
    name: 'PyTorch & Machine Learning',
    category: 'Tools & Platforms',
    description: 'Pelatihan model neural network, deep learning, dan integrasi inferensi kecerdasan buatan',
    icon_name: 'Cpu',
    proficiency_label: 'Familiar',
    sort_order: 59,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-60',
    name: 'Pandas & Data Science',
    category: 'Tools & Platforms',
    description: 'Manipulasi data tabular, eksplorasi data analisis (EDA), dan visualisasi data Python',
    icon_name: 'Database',
    proficiency_label: 'Proficient',
    sort_order: 60,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-61',
    name: 'OpenCV (Computer Vision)',
    category: 'Tools & Platforms',
    description: 'Pemrosesan citra digital, deteksi tepi, face recognition, dan ekstraksi fitur visual',
    icon_name: 'Activity',
    proficiency_label: 'Familiar',
    sort_order: 61,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-62',
    name: 'LLM & AI Prompt Engineering',
    category: 'Tools & Platforms',
    description: 'Integrasi model bahasa besar (OpenAI, Gemini API, Claude) dan Retrieval-Augmented Generation (RAG)',
    icon_name: 'Terminal',
    proficiency_label: 'Proficient',
    sort_order: 62,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- TAMBAHAN TEKNOLOGI REKAYASA KOMPUTER JARINGAN (TRKJ) ---
  {
    id: 'sk-63',
    name: 'pfSense & OPNsense',
    category: 'Network & Security',
    description: 'Implementasi firewall tingkat lanjut, traffic shaper, captive portal, dan gateway keamanan',
    icon_name: 'ShieldAlert',
    proficiency_label: 'Proficient',
    sort_order: 63,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-64',
    name: 'OpenVPN & WireGuard',
    category: 'Network & Security',
    description: 'Konfigurasi virtual private network (VPN) terenkripsi untuk akses jarak jauh yang aman',
    icon_name: 'ShieldCheck',
    proficiency_label: 'Advanced',
    sort_order: 64,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-65',
    name: 'Nginx & Reverse Proxy',
    category: 'Network & Security',
    description: 'Web server berkinerja tinggi, load balancer, SSL/TLS certificate management, dan caching',
    icon_name: 'Server',
    proficiency_label: 'Advanced',
    sort_order: 65,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-66',
    name: 'DNS Management (BIND9)',
    category: 'Network & Security',
    description: 'Konfigurasi Authoritative & Recursive DNS Server, DNSSEC, dan pencatatan zona rekaman domain',
    icon_name: 'Network',
    proficiency_label: 'Proficient',
    sort_order: 66,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-67',
    name: 'DHCP & IP Subnetting (CIDR)',
    category: 'Network & Security',
    description: 'Alokasi alamat IP dinamis, reservasi MAC, pembagian subnetting VLSM dan supernetting',
    icon_name: 'Network',
    proficiency_label: 'Advanced',
    sort_order: 67,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-68',
    name: 'SNMP & Monitoring (Zabbix/PRTG)',
    category: 'Network & Security',
    description: 'Pemantauan kesehatan perangkat jaringan, beban bandwidth, server uptime, dan alerting otomatis',
    icon_name: 'Activity',
    proficiency_label: 'Proficient',
    sort_order: 68,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-69',
    name: 'Suricata / Snort (IDS/IPS)',
    category: 'Network & Security',
    description: 'Deteksi dan pencegahan intrusi jaringan real-time berbasis signature dan deteksi anomali',
    icon_name: 'ShieldAlert',
    proficiency_label: 'Familiar',
    sort_order: 69,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-70',
    name: 'Windows Server & Active Directory',
    category: 'Network & Security',
    description: 'Manajemen Domain Controller, Group Policy Objects (GPO), LDAP, dan hak akses pengguna jaringan',
    icon_name: 'Server',
    proficiency_label: 'Proficient',
    sort_order: 70,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-71',
    name: 'Ansible IT Automation',
    category: 'Network & Security',
    description: 'Otomasi konfigurasi server massal, provisioning, dan deployment multi-node tanpa agent',
    icon_name: 'TerminalSquare',
    proficiency_label: 'Familiar',
    sort_order: 71,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-72',
    name: 'VMware vSphere & ESXi',
    category: 'Network & Security',
    description: 'Manajemen hypervisor bare-metal tingkat perusahaan, vSwitch, dan high availability VM',
    icon_name: 'HardDrive',
    proficiency_label: 'Proficient',
    sort_order: 72,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-73',
    name: 'TrueNAS & SAN/NAS Storage',
    category: 'Network & Security',
    description: 'Manajemen penyimpanan data terpusat, RAID pool ZFS, iSCSI, NFS, dan automated snapshot backup',
    icon_name: 'Database',
    proficiency_label: 'Proficient',
    sort_order: 73,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-74',
    name: 'Cloudflare WAF & CDN',
    category: 'Network & Security',
    description: 'Pengaturan keamanan Web Application Firewall (WAF), mitigasi DDoS, dan caching edge global',
    icon_name: 'ShieldCheck',
    proficiency_label: 'Advanced',
    sort_order: 74,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-75',
    name: 'AWS Cloud (EC2, S3, VPC)',
    category: 'Database Management',
    description: 'Arsitektur cloud publik Amazon Web Services: virtual instance, routing VPC, dan cloud storage',
    icon_name: 'Server',
    proficiency_label: 'Proficient',
    sort_order: 75,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-76',
    name: 'Google Cloud Platform (GCP)',
    category: 'Database Management',
    description: 'Deployment serverless, container registry, Compute Engine, dan Cloud Storage',
    icon_name: 'Server',
    proficiency_label: 'Familiar',
    sort_order: 76,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-77',
    name: 'Burp Suite (Web Security Audit)',
    category: 'Network & Security',
    description: 'Audit keamanan aplikasi web, pengujian kerentanan SQL Injection, XSS, dan intercept proxy',
    icon_name: 'ShieldAlert',
    proficiency_label: 'Proficient',
    sort_order: 77,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-78',
    name: 'Metasploit Framework',
    category: 'Network & Security',
    description: 'Eksplorasi modul keamanan, verifikasi kelemahan sistem, dan simulasi penetration testing',
    icon_name: 'Terminal',
    proficiency_label: 'Familiar',
    sort_order: 78,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-79',
    name: 'MQTT & IoT Protocols',
    category: 'Network & Security',
    description: 'Protokol publish/subscribe ringan untuk transmisi data sensor IoT ke broker Mosquitto',
    icon_name: 'Activity',
    proficiency_label: 'Proficient',
    sort_order: 79,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-80',
    name: 'Wireless Networking (WLAN 802.11)',
    category: 'Network & Security',
    description: 'Perencanaan frekuensi 2.4GHz/5GHz, site survey WiFi, WPA3 Enterprise, dan roaming access point',
    icon_name: 'Network',
    proficiency_label: 'Proficient',
    sort_order: 80,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- TAMBAHAN TEKNOLOGI REKAYASA MULTIMEDIA (TRM) ---
  {
    id: 'sk-81',
    name: 'Three.js & 3D WebGL',
    category: 'Web Development',
    description: 'Render grafis 3D interaktif pada web browser menggunakan WebGL, shader, dan material 3D',
    icon_name: 'Box',
    proficiency_label: 'Proficient',
    sort_order: 81,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-82',
    name: 'Framer Motion & Web Animation',
    category: 'Web Development',
    description: 'Animasi antarmuka web interaktif yang halus dengan spring physics dan micro-interaction',
    icon_name: 'Palette',
    proficiency_label: 'Advanced',
    sort_order: 82,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-83',
    name: 'Adobe InDesign',
    category: 'UI/UX Design',
    description: 'Tata letak editorial profesional, pembuatan buku, majalah digital, dan proposal publikasi',
    icon_name: 'Layout',
    proficiency_label: 'Proficient',
    sort_order: 83,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-84',
    name: 'CorelDRAW Graphic Suite',
    category: 'UI/UX Design',
    description: 'Desain ilustrasi vektor presisi, layout grafis media cetak, dan produksi merchandise visual',
    icon_name: 'PenTool',
    proficiency_label: 'Proficient',
    sort_order: 84,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-85',
    name: 'Adobe Audition',
    category: 'UI/UX Design',
    description: 'Restorasi audio multitrack, pembersihan desis kebisingan (noise removal), dan mastering suara',
    icon_name: 'Music',
    proficiency_label: 'Proficient',
    sort_order: 85,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-86',
    name: 'FL Studio & Sound Design',
    category: 'UI/UX Design',
    description: 'Komposisi musik digital (DAW), aransemen soundtrack latar game/video, dan sintesis audio',
    icon_name: 'Music',
    proficiency_label: 'Familiar',
    sort_order: 86,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-87',
    name: 'Autodesk Maya',
    category: 'UI/UX Design',
    description: 'Animasi karakter 3D industri, rigging kerangka, UV mapping, dan simulasi partikel',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 87,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-88',
    name: 'Substance 3D Painter',
    category: 'UI/UX Design',
    description: 'Teksturing 3D material Physically Based Rendering (PBR) dengan sistem mask dan smart material',
    icon_name: 'Palette',
    proficiency_label: 'Familiar',
    sort_order: 88,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-89',
    name: 'Cinema 4D',
    category: 'UI/UX Design',
    description: 'Motion graphics 3D dinamis, integrasi simulasi mograph, dan visual branding komersial',
    icon_name: 'Film',
    proficiency_label: 'Familiar',
    sort_order: 89,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-90',
    name: 'ZBrush Digital Sculpting',
    category: 'UI/UX Design',
    description: 'Pemahatan digital resolusi tinggi (high-poly sculpting) untuk karakter game dan aset detail',
    icon_name: 'Box',
    proficiency_label: 'Familiar',
    sort_order: 90,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-91',
    name: 'Godot Engine',
    category: 'UI/UX Design',
    description: 'Game engine open-source berbobot ringan untuk pengembangan game 2D & 3D dengan GDScript',
    icon_name: 'Layers',
    proficiency_label: 'Familiar',
    sort_order: 91,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-92',
    name: 'Unreal Engine 5 (UE5)',
    category: 'UI/UX Design',
    description: 'Visualisasi 3D fotorealistis menggunakan teknologi Nanite, Lumen, dan sistem Blueprint visual',
    icon_name: 'Layers',
    proficiency_label: 'Familiar',
    sort_order: 92,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-93',
    name: 'OBS Studio (Broadcasting)',
    category: 'UI/UX Design',
    description: 'Setup streaming live profesional, mixing audio-visual multi-source, dan encoding video RTMP',
    icon_name: 'Video',
    proficiency_label: 'Advanced',
    sort_order: 93,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-94',
    name: 'Color Grading & ACES Color',
    category: 'UI/UX Design',
    description: 'Manajemen warna sinematik, kurva tone, gamut transform, dan penciptaan mood filmik',
    icon_name: 'Film',
    proficiency_label: 'Proficient',
    sort_order: 94,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-95',
    name: 'CapCut Pro & Creative Editing',
    category: 'UI/UX Design',
    description: 'Produksi video pendek viral, transisi dinamis, auto-captioning, dan format mobile vertical',
    icon_name: 'Video',
    proficiency_label: 'Advanced',
    sort_order: 95,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-96',
    name: 'Design Systems & UI Token',
    category: 'UI/UX Design',
    description: 'Penyusunan komponen desain terstandarisasi, token warna, tipografi, dan konsistensi UX',
    icon_name: 'Layout',
    proficiency_label: 'Advanced',
    sort_order: 96,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sk-97',
    name: 'Motion Graphics & Typography Animation',
    category: 'UI/UX Design',
    description: 'Animasi tipografi dinamis, kinetic text, title sequence, dan visual identity animasi',
    icon_name: 'Film',
    proficiency_label: 'Proficient',
    sort_order: 97,
    is_visible: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'b-1',
    title: 'Personal Portfolio & Content Management System',
    slug: 'personal-portfolio-cms',
    short_description:
      'Website portofolio dinamis dengan dashboard CMS terpadu berbasis Next.js App Router dan Supabase.',
    full_description:
      'Platform portofolio digital komprehensif yang dirancang untuk menampilkan profil, keterampilan, pengalaman, dan proyek secara elegan dengan visual Aurora Violet. Dilengkapi dengan dashboard admin Lavender Studio untuk mengelola seluruh konten secara dinamis tanpa perlu redeploy kode. Sistem mendukung workflow draft, preview privat, publikasi berversi, optimasi gambar, dan Row Level Security.',
    year: '2026',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    cover_image_path: '/images/projects/portfolio-cms-cover.webp',
    project_url: 'https://abrar-astafaraiz.vercel.app',
    project_url_enabled: true,
    is_featured: true,
    is_visible: true,
    sort_order: 1,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-1-1',
        project_id: 'b-1',
        storage_path: '/images/projects/portfolio-cms-cover.webp',
        alt_text: 'Tampilan Halaman Utama Portofolio',
        caption: 'Desain responsif website publik dengan palet Aurora Violet',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: 'img-1-2',
        project_id: 'b-1',
        storage_path: '/images/projects/portfolio-admin-preview.webp',
        alt_text: 'Dashboard Manajemen Lavender Studio',
        caption: 'Panel admin untuk manajemen profil, keterampilan, dan proyek',
        sort_order: 2,
        created_at: new Date().toISOString(),
      },
      {
        id: 'img-1-3',
        project_id: 'b-1',
        storage_path: '/images/projects/portfolio-modal-preview.webp',
        alt_text: 'Detail Interaktif & Carousel',
        caption: 'Modal proyek dengan navigasi keyboard, touch swipe, dan informasi komprehensif',
        sort_order: 3,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-2',
    title: 'Sistem Kasir Restoran Berbasis Web',
    slug: 'sistem-kasir-restoran',
    short_description:
      'Aplikasi Point of Sale (POS) restoran dengan pencatatan transaksi real-time, manajemen meja, dan laporan keuangan.',
    full_description:
      'Sistem Point of Sale web modern yang mengotomatisasi proses pemesanan menu, pembagian nomor meja, kalkulasi pajak, diskon, cetak struk transaksi, dan pembuatan rekap laporan penjualan harian dan bulanan secara akurat.',
    year: '2025',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    cover_image_path: '/images/projects/pos-restoran-cover.webp',
    project_url: 'https://pos-restoran.demo.app',
    project_url_enabled: false,
    is_featured: true,
    is_visible: true,
    sort_order: 2,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-2-1',
        project_id: 'b-2',
        storage_path: '/images/projects/pos-restoran-cover.webp',
        alt_text: 'Antarmuka Kasir Restoran',
        caption: 'Katalog menu interaktif dan panel pemesanan meja kasir',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: 'img-2-2',
        project_id: 'b-2',
        storage_path: '/images/projects/pos-report-preview.webp',
        alt_text: 'Laporan Keuangan & Struk',
        caption: 'Statistik omzet harian dan cetak struk otomatis',
        sort_order: 2,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-3',
    title: 'ASTRACK',
    slug: 'astrack-asset-tracking',
    short_description:
      'Sistem manajemen pelacakan aset dan inventaris perangkat laboratorium berbasis web.',
    full_description:
      'ASTRACK memfasilitasi pencatatan inventaris perangkat keras, pelacakan histori peminjaman, monitoring status kondisi perangkat, serta penjadwalan pemeliharaan berkala guna mencegah kehilangan aset laboratorium.',
    year: '2025',
    category: 'Software Development',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    cover_image_path: '/images/projects/astrack-cover.webp',
    project_url: 'https://astrack.demo.app',
    project_url_enabled: false,
    is_featured: true,
    is_visible: true,
    sort_order: 3,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-3-1',
        project_id: 'b-3',
        storage_path: '/images/projects/astrack-cover.webp',
        alt_text: 'Dashboard Inventaris ASTRACK',
        caption: 'Monitoring ketersediaan perangkat keras dan peralatan laboratorium',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-4',
    title: 'BICHAMP',
    slug: 'bichamp-tournament-platform',
    short_description:
      'Platform manajemen kompetisi dan turnamen olahraga dengan bagan pertandingan interaktif.',
    full_description:
      'BICHAMP menyediakan pengelolaan turnamen mulai dari pendaftaran tim, pengundian bagan (bracket elimination & round-robin), pembaruan skor langsung, hingga pengumuman klasemen secara real-time.',
    year: '2024',
    category: 'Web Development',
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    cover_image_path: '/images/projects/bichamp-cover.webp',
    project_url: 'https://bichamp.demo.app',
    project_url_enabled: false,
    is_featured: false,
    is_visible: true,
    sort_order: 4,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-4-1',
        project_id: 'b-4',
        storage_path: '/images/projects/bichamp-cover.webp',
        alt_text: 'Turnamen Bracket BICHAMP',
        caption: 'Bagan eliminasi interaktif dengan kalkulasi otomatis',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-5',
    title: 'MOTOCARE',
    slug: 'motocare-service-booking',
    short_description:
      'Aplikasi web manajemen servis dan pemeliharaan kendaraan bermotor dengan sistem booking jadwal.',
    full_description:
      'MOTOCARE memudahkan pemilik kendaraan dalam mereservasi jadwal servis bengkel, memantau estimasi biaya perbaikan dan sparepart, serta menerima notifikasi pengingat servis rutin berkala.',
    year: '2024',
    category: 'Web Development',
    technologies: ['React', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    cover_image_path: '/images/projects/motocare-cover.webp',
    project_url: 'https://motocare.demo.app',
    project_url_enabled: false,
    is_featured: false,
    is_visible: true,
    sort_order: 5,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-5-1',
        project_id: 'b-5',
        storage_path: '/images/projects/motocare-cover.webp',
        alt_text: 'MOTOCARE Booking Portal',
        caption: 'Antarmuka reservasi antrean servis kendaraan bengkel',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-6',
    title: 'Sistem Absensi Digital Expo Wisuda Jurusan TIK',
    slug: 'absensi-expo-wisuda-tik',
    short_description:
      'Sistem presensi cepat menggunakan QR Code dan verifikasi digital untuk pengunjung Expo Wisuda.',
    full_description:
      'Sistem presensi digital yang dirancang untuk menangani lonjakan ribuan pengunjung acara Expo Wisuda TIK secara cepat. Menggunakan pemindaian barcode/QR Code terenkripsi untuk meminimalkan antrean dan menyediakan rekapitulasi data demografi pengunjung secara instan.',
    year: '2024',
    category: 'Web Development',
    technologies: ['JavaScript', 'HTML5', 'Node.js', 'MySQL', 'Tailwind CSS'],
    cover_image_path: '/images/projects/absensi-expo-cover.webp',
    project_url: 'https://expo-tik.demo.app',
    project_url_enabled: false,
    is_featured: false,
    is_visible: true,
    sort_order: 6,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-6-1',
        project_id: 'b-6',
        storage_path: '/images/projects/absensi-expo-cover.webp',
        alt_text: 'Presensi Digital QR Expo',
        caption: 'Pemindai kamera QR instan pada gerbang masuk Expo',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'b-7',
    title: 'Sistem Absensi dan Monitoring Aktivitas Santri',
    slug: 'absensi-monitoring-santri',
    short_description:
      'Platform pencatatan kehadiran, kedisiplinan, dan laporan perkembangan santri berbasis web.',
    full_description:
      'Aplikasi pemantauan santri yang mengintegrasikan pencatatan kehadiran salat berjamaah, kegiatan halaqah tahfiz, serta catatan kepribadian dan perizinan pulang. Informasi dapat diakses pengurus dan wali santri secara transparan.',
    year: '2024',
    category: 'Web Development',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    cover_image_path: '/images/projects/absensi-santri-cover.webp',
    project_url: 'https://santri-monitor.demo.app',
    project_url_enabled: false,
    is_featured: false,
    is_visible: true,
    sort_order: 7,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    images: [
      {
        id: 'img-7-1',
        project_id: 'b-7',
        storage_path: '/images/projects/absensi-santri-cover.webp',
        alt_text: 'Dashboard Monitoring Santri',
        caption: 'Rekap kehadiran hafalan Al-Qur’an dan absensi harian',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 Software Development Competition',
    organizer: 'Himpunan Mahasiswa Teknik Informatika',
    achievement_date: '2025',
    description:
      'Meraih peringkat pertama dalam kompetisi perancangan dan implementasi solusi perangkat lunak inovatif tingkat mahasiswa.',
    image_path: '/images/achievements/cert-competition.webp',
    verification_url: 'https://certificate.verification.url/sample1',
    category: 'Award',
    sort_order: 1,
    is_visible: true,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ach-2',
    title: 'Certified Web Developer: Modern Frontend & Backend',
    organizer: 'Dicoding Academy Indonesia',
    achievement_date: '2025',
    description:
      'Sertifikasi kompetensi pengembangan aplikasi web berskala enterprise menggunakan JavaScript, Next.js, dan RESTful architecture.',
    image_path: '/images/achievements/cert-dicoding.webp',
    verification_url: 'https://www.dicoding.com/certificates/sample',
    category: 'Certification',
    sort_order: 2,
    is_visible: true,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ach-3',
    title: 'Database Engineering & Cloud Foundations',
    organizer: 'Cisco Networking Academy',
    achievement_date: '2024',
    description:
      'Kompetensi perancangan skema relasional, optimasi query SQL, serta konfigurasi keamanan data dan basis komputasi awan.',
    image_path: '/images/achievements/cert-cisco.webp',
    verification_url: 'https://cisco.credential.net/sample',
    category: 'Certification',
    sort_order: 3,
    is_visible: true,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    position: 'Koordinator Divisi Riset & Pengembangan Web',
    organization: 'Himpunan Mahasiswa Teknik Informatika',
    start_date: 'Maret 2024',
    end_date: null,
    is_current: true,
    description:
      'Memimpin tim teknis dalam pengembangan website himpunan, platform informasi kegiatan akademik, dan workshop coding bagi mahasiswa baru.',
    responsibilities: [
      'Mengkoordinasikan tim pengembangan web dan arsitektur database proyek mahasiswa',
      'Mengadakan pelatihan dasar pemrograman web dan Git collaboration untuk 50+ peserta',
      'Merancang standarisasi kode dan code review internal himpunan',
    ],
    logo_path: '/images/experience/hmti-logo.webp',
    sort_order: 1,
    is_visible: true,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'exp-2',
    position: 'Full-Stack Developer (Proyek Kolaboratif)',
    organization: 'Lab Rekayasa Perangkat Lunak TIK',
    start_date: 'Agustus 2024',
    end_date: 'Januari 2025',
    is_current: false,
    description:
      'Berkontribusi dalam riset dan implementasi sistem informasi absensi dan pelacakan aset laboratorium jurusan.',
    responsibilities: [
      'Mengembangkan modul frontend interaktif berbasis React dan Tailwind CSS',
      'Mengintegrasikan API backend PostgreSQL dengan keamanan autentikasi berbasis token',
      'Melakukan uji fungsionalitas dan pemeliharaan performa sistem',
    ],
    logo_path: '/images/experience/lab-logo.webp',
    sort_order: 2,
    is_visible: true,
    publication_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'soc-1',
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/abrar-astafaraiz',
    icon_name: 'Github',
    sort_order: 1,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'soc-2',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/abrar-astafaraiz',
    icon_name: 'Linkedin',
    sort_order: 2,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'soc-3',
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/abrar_astafaraiz',
    icon_name: 'Instagram',
    sort_order: 3,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'soc-4',
    platform: 'email',
    label: 'Email',
    url: 'mailto:astaabrar@gmail.com',
    icon_name: 'Mail',
    sort_order: 4,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_SETTINGS: SiteSettingsMap = {
  appearance: {
    default_public_theme: 'light',
    animations_enabled: true,
    animation_intensity: 'standard',
    hero_gradient: 'aurora',
    site_logo_url: '',
    site_logo_initials: 'AA',
  },
  seo: {
    site_title: 'Abrar Astafaraiz | Personal Website',
    meta_description:
      'Personal website of Abrar Astafaraiz, showcasing software development projects, technical skills, experience, and professional achievements.',
    canonical_url: 'https://abrar-astafaraiz.vercel.app',
    og_title: 'Abrar Astafaraiz — Full-Stack Developer Portfolio',
    og_description:
      'Building Digital Experiences Through Code. Explore web engineering projects, certifications, and technical proficiencies.',
    og_image: '/images/og-image.webp',
    robots: 'index, follow',
  },
  contact_info: {
    email: 'astaabrar@gmail.com',
    location: 'Indonesia',
    cta_heading: 'Hubungi Saya Langsung',
    cta_subtext:
      'Ingin bertanya seputar proyek, mendiskusikan peluang kerja sama, atau sekadar bertukar pengalaman? Anda bisa langsung menghubungi saya lewat kontak di bawah.',
    footer_text: '© 2026 Abrar Astafaraiz. All rights reserved. Crafted with Next.js & Supabase.',
  },
  about_highlights: [
    {
      id: 'ah-1',
      icon_name: 'GraduationCap',
      title: 'Pendidikan Akademik',
      description: 'Mahasiswa Teknik Informatika dengan pemahaman teori komputasi, algoritma, dan rekayasa perangkat lunak.',
    },
    {
      id: 'ah-2',
      icon_name: 'Terminal',
      title: 'Software & Web Engineering',
      description: 'Berpengalaman membangun aplikasi full-stack modern dengan TypeScript, React, Next.js, dan RESTful API.',
    },
    {
      id: 'ah-3',
      icon_name: 'Database',
      title: 'Manajemen Data & Keamanan',
      description: 'Perancangan skema relasional, optimasi query PostgreSQL/MySQL, serta integrasi Supabase Auth & RLS.',
    },
    {
      id: 'ah-4',
      icon_name: 'Sparkles',
      title: 'Desain & Pengalaman Pengguna',
      description: 'Mengutamakan kejelasan hierarki visual, aksesibilitas, responsivitas, dan interaksi yang halus.',
    },
  ],
};

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    actor_id: 'admin',
    action: 'INITIALIZE_SYSTEM',
    entity_type: 'SYSTEM',
    entity_id: 'sys-init',
    metadata: { note: 'Initial deployment and baseline portfolio structure established.' },
    created_at: new Date().toISOString(),
  },
];

// In-Memory & LocalStorage Sync for seamless reliable operation
interface ContentStoreState {
  published: WebsiteContent;
  draft: WebsiteContent;
  logs: ActivityLog[];
  lastPublishedAt: string | null;
  versionCount: number;
}

const STORAGE_KEY = 'abrar_portfolio_content_store_v4';

const SUBTITLE_MIGRATION: Record<string, string> = {
  'Mengenal Latar Belakang & Fokus Profesional': 'Latar Belakang & Profil Singkat',
  'Kompetensi Teknis dan Alat Pengembangan': 'Teknologi & Tools yang Dikuasai',
  'Koleksi Portofolio Rekayasa Perangkat Lunak': 'Karya & Proyek Terpilih',
  'Apresiasi Akademik dan Lisensi Profesional': 'Sertifikasi & Lisensi',
  'Rekam Jejak Kolaborasi dan Kontribusi': 'Riwayat Kerja & Organisasi',
  'Mari Berkolaborasi Membangun Solusi Digital': 'Informasi Kontak & Media Sosial',
};

function migrateSubtitlesAndContact(store: ContentStoreState): boolean {
  let changed = false;
  const updateSections = (sections?: SectionSetting[]) => {
    if (!sections) return;
    sections.forEach((sec) => {
      if (sec.subtitle && SUBTITLE_MIGRATION[sec.subtitle]) {
        sec.subtitle = SUBTITLE_MIGRATION[sec.subtitle];
        changed = true;
      }
    });
  };

  const updateContact = (settings?: SiteSettingsMap) => {
    if (!settings?.contact_info) return;
    if (settings.contact_info.cta_heading === 'Tertarik Membangun Sesuatu yang Hebat Bersama?') {
      settings.contact_info.cta_heading = 'Hubungi Saya Langsung';
      changed = true;
    }
    if (
      settings.contact_info.cta_subtext?.includes('peluang magang') ||
      settings.contact_info.cta_subtext?.includes('visi pengembangan')
    ) {
      settings.contact_info.cta_subtext =
        'Ingin bertanya seputar proyek, mendiskusikan peluang kerja sama, atau sekadar bertukar pengalaman? Anda bisa langsung menghubungi saya lewat kontak di bawah.';
      changed = true;
    }
  };

  updateSections(store.published?.sections);
  updateSections(store.draft?.sections);
  updateContact(store.published?.settings);
  updateContact(store.draft?.settings);

  return changed;
}

function getDefaultStore(): ContentStoreState {
  const baseContent: WebsiteContent = {
    profile: { ...INITIAL_PROFILE },
    skills: [...INITIAL_SKILLS],
    projects: [...INITIAL_PROJECTS],
    achievements: [...INITIAL_ACHIEVEMENTS],
    experiences: [...INITIAL_EXPERIENCES],
    socialLinks: [...INITIAL_SOCIAL_LINKS],
    sections: [...INITIAL_SECTIONS],
    settings: JSON.parse(JSON.stringify(INITIAL_SETTINGS)),
    lastUpdated: new Date().toISOString(),
  };

  return {
    published: JSON.parse(JSON.stringify(baseContent)),
    draft: JSON.parse(JSON.stringify(baseContent)),
    logs: [...INITIAL_LOGS],
    lastPublishedAt: new Date().toISOString(),
    versionCount: 1,
  };
}

let memoryStore: ContentStoreState = getDefaultStore();

function loadFromStorage(): ContentStoreState {
  if (typeof window === 'undefined') {
    return memoryStore;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.draft && parsed.published) {
        if (migrateSubtitlesAndContact(parsed)) {
          saveToStorage(parsed);
        }
        memoryStore = parsed;
        return memoryStore;
      }
    }
  } catch (err) {
    console.warn('Failed to load content from localStorage, using memory store', err);
  }
  return memoryStore;
}

function saveToStorage(store: ContentStoreState) {
  // Automatically sync draft to published so user edits take effect immediately on the live website
  store.published = JSON.parse(JSON.stringify(store.draft));
  store.lastPublishedAt = new Date().toISOString();

  memoryStore = store;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      // Sync immediately to server disk via /api/content
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      }).catch(() => {});
    } catch (err) {
      console.warn('Failed to save content to localStorage', err);
    }
  }
}

export class DataService {
  /**
   * Updates in-memory store on server from /api/content sync
   */
  static syncFromServerStore(store: ContentStoreState) {
    memoryStore = store;
  }

  /**
   * Synchronizes local client store with latest server & Supabase data.
   */
  static async syncWithServer(): Promise<ContentStoreState> {
    if (typeof window === 'undefined') return memoryStore;
    try {
      const res = await fetch('/api/content', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const liveContent = await res.json();
        if (liveContent && liveContent.profile) {
          const store = loadFromStorage();
          store.published = {
            ...store.published,
            profile: liveContent.profile || store.published.profile,
            sections: liveContent.sections || store.published.sections,
            skills: liveContent.skills || store.published.skills,
            projects: liveContent.projects || store.published.projects,
            achievements: liveContent.achievements || store.published.achievements,
            experiences: liveContent.experiences || store.published.experiences,
            socialLinks: liveContent.socialLinks || store.published.socialLinks,
            settings: liveContent.settings || store.published.settings,
          };
          store.draft = JSON.parse(JSON.stringify(store.published));
          memoryStore = store;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
          } catch {}
          return store;
        }
      }
    } catch (err) {
      console.warn('Failed to sync with server:', err);
    }
    return loadFromStorage();
  }

  /**
   * Persists draft to localStorage and immediately synchronizes to server & Supabase.
   */
  static async persistToServer(customStore?: ContentStoreState): Promise<boolean> {
    const store = customStore || loadFromStorage();
    store.published = JSON.parse(JSON.stringify(store.draft));
    store.lastPublishedAt = new Date().toISOString();
    memoryStore = store;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch {}
      try {
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(store),
        });
        return res.ok;
      } catch (err) {
        console.error('Failed to persist to server /api/content:', err);
        return false;
      }
    }
    return true;
  }
  /**
   * Retrieves strictly published and visible content for the public website.
   * Drafts are NEVER returned here.
   */
  static getPublishedContent(): WebsiteContent {
    const store = loadFromStorage();
    const pub = store.published;

    return {
      profile: pub.profile,
      skills: (pub.skills || [])
        .filter((s) => s.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order),
      projects: (pub.projects || [])
        .filter((p) => p.is_visible && p.publication_status === 'published')
        .sort((a, b) => a.sort_order - b.sort_order),
      achievements: (pub.achievements || [])
        .filter((a) => a.is_visible && a.publication_status === 'published')
        .sort((a, b) => a.sort_order - b.sort_order),
      experiences: (pub.experiences || [])
        .filter((e) => e.is_visible && e.publication_status === 'published')
        .sort((a, b) => a.sort_order - b.sort_order),
      socialLinks: (pub.socialLinks || [])
        .filter((s) => s.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order),
      sections: (pub.sections || [])
        .filter((sec) => sec.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order),
      settings: pub.settings,
      lastUpdated: store.lastPublishedAt || pub.lastUpdated,
    };
  }

  /**
   * Retrieves draft content for admin dashboard and authorized /preview page.
   */
  static getDraftContent(): WebsiteContent {
    const store = loadFromStorage();
    return store.draft;
  }

  /**
   * Update draft profile
   */
  static updateDraftProfile(profile: Partial<Profile>): Profile {
    const store = loadFromStorage();
    store.draft.profile = {
      ...store.draft.profile,
      ...profile,
      updated_at: new Date().toISOString(),
    };
    this.addLog('UPDATE_PROFILE', 'PROFILE', store.draft.profile.id, { changes: Object.keys(profile) });
    saveToStorage(store);
    return store.draft.profile;
  }

  /**
   * Update draft about content
   */
  static updateDraftAbout(aboutContent: string): void {
    const store = loadFromStorage();
    store.draft.profile.about_content = aboutContent;
    store.draft.profile.updated_at = new Date().toISOString();
    this.addLog('UPDATE_ABOUT', 'PROFILE', store.draft.profile.id, {});
    saveToStorage(store);
  }

  /**
   * Projects CRUD for Draft
   */
  static getDraftProjects(): Project[] {
    const store = loadFromStorage();
    return [...(store.draft.projects || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static saveDraftProject(projectData: Partial<Project> & { title: string }): Project {
    const store = loadFromStorage();
    const existingIndex = store.draft.projects.findIndex((p) => p.id === projectData.id);

    let savedProject: Project;
    if (existingIndex >= 0) {
      savedProject = {
        ...store.draft.projects[existingIndex],
        ...projectData,
        updated_at: new Date().toISOString(),
      };
      store.draft.projects[existingIndex] = savedProject;
      this.addLog('UPDATE_PROJECT', 'PROJECT', savedProject.id, { title: savedProject.title });
    } else {
      const newId = projectData.id || `proj-${Date.now()}`;
      savedProject = {
        id: newId,
        title: projectData.title,
        slug: projectData.slug || projectData.title.toLowerCase().replace(/\s+/g, '-'),
        short_description: projectData.short_description || '',
        full_description: projectData.full_description || '',
        year: projectData.year || new Date().getFullYear().toString(),
        category: projectData.category || 'Web Development',
        technologies: projectData.technologies || [],
        cover_image_path: projectData.cover_image_path || '/images/projects/portfolio-cms-cover.webp',
        project_url: projectData.project_url || null,
        project_url_enabled: !!projectData.project_url_enabled,
        is_featured: !!projectData.is_featured,
        is_visible: projectData.is_visible !== undefined ? projectData.is_visible : true,
        sort_order: projectData.sort_order || store.draft.projects.length + 1,
        publication_status: projectData.publication_status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        images: projectData.images || [],
      };
      store.draft.projects.push(savedProject);
      this.addLog('CREATE_PROJECT', 'PROJECT', savedProject.id, { title: savedProject.title });
    }

    saveToStorage(store);
    return savedProject;
  }

  static deleteDraftProject(id: string): void {
    const store = loadFromStorage();
    const target = store.draft.projects.find((p) => p.id === id);
    store.draft.projects = store.draft.projects.filter((p) => p.id !== id);
    this.addLog('DELETE_PROJECT', 'PROJECT', id, { title: target?.title });
    saveToStorage(store);
  }

  static duplicateDraftProject(id: string): Project | null {
    const store = loadFromStorage();
    const original = store.draft.projects.find((p) => p.id === id);
    if (!original) return null;

    const dup: Project = {
      ...JSON.parse(JSON.stringify(original)),
      id: `proj-${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
      publication_status: 'draft',
      sort_order: store.draft.projects.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.draft.projects.push(dup);
    this.addLog('DUPLICATE_PROJECT', 'PROJECT', dup.id, { originalId: id });
    saveToStorage(store);
    return dup;
  }

  /**
   * Skills CRUD for Draft
   */
  static getDraftSkills(): Skill[] {
    const store = loadFromStorage();
    return [...(store.draft.skills || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static saveDraftSkill(skillData: Partial<Skill> & { name: string; category: string }): Skill {
    const store = loadFromStorage();
    const existingIndex = store.draft.skills.findIndex((s) => s.id === skillData.id);

    let savedSkill: Skill;
    if (existingIndex >= 0) {
      savedSkill = {
        ...store.draft.skills[existingIndex],
        ...skillData,
        updated_at: new Date().toISOString(),
      };
      store.draft.skills[existingIndex] = savedSkill;
      this.addLog('UPDATE_SKILL', 'SKILL', savedSkill.id, { name: savedSkill.name });
    } else {
      savedSkill = {
        id: skillData.id || `sk-${Date.now()}`,
        name: skillData.name,
        category: skillData.category,
        description: skillData.description || null,
        icon_name: skillData.icon_name || 'Code2',
        proficiency_label: skillData.proficiency_label || 'Proficient',
        sort_order: skillData.sort_order || store.draft.skills.length + 1,
        is_visible: skillData.is_visible !== undefined ? skillData.is_visible : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      store.draft.skills.push(savedSkill);
      this.addLog('CREATE_SKILL', 'SKILL', savedSkill.id, { name: savedSkill.name });
    }
    saveToStorage(store);
    return savedSkill;
  }

  static deleteDraftSkill(id: string): void {
    const store = loadFromStorage();
    const target = store.draft.skills.find((s) => s.id === id);
    store.draft.skills = store.draft.skills.filter((s) => s.id !== id);
    this.addLog('DELETE_SKILL', 'SKILL', id, { name: target?.name });
    saveToStorage(store);
  }

  /**
   * Achievements CRUD
   */
  static getDraftAchievements(): Achievement[] {
    const store = loadFromStorage();
    return [...(store.draft.achievements || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static saveDraftAchievement(achData: Partial<Achievement> & { title: string; organizer: string }): Achievement {
    const store = loadFromStorage();
    const existingIndex = store.draft.achievements.findIndex((a) => a.id === achData.id);

    let saved: Achievement;
    if (existingIndex >= 0) {
      saved = {
        ...store.draft.achievements[existingIndex],
        ...achData,
        updated_at: new Date().toISOString(),
      };
      store.draft.achievements[existingIndex] = saved;
      this.addLog('UPDATE_ACHIEVEMENT', 'ACHIEVEMENT', saved.id, { title: saved.title });
    } else {
      saved = {
        id: achData.id || `ach-${Date.now()}`,
        title: achData.title,
        organizer: achData.organizer,
        achievement_date: achData.achievement_date || new Date().getFullYear().toString(),
        description: achData.description || '',
        image_path: achData.image_path || '/images/achievements/cert-competition.webp',
        verification_url: achData.verification_url || null,
        category: achData.category || 'Certification',
        sort_order: achData.sort_order || store.draft.achievements.length + 1,
        is_visible: achData.is_visible !== undefined ? achData.is_visible : true,
        publication_status: achData.publication_status || 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      store.draft.achievements.push(saved);
      this.addLog('CREATE_ACHIEVEMENT', 'ACHIEVEMENT', saved.id, { title: saved.title });
    }
    saveToStorage(store);
    return saved;
  }

  static deleteDraftAchievement(id: string): void {
    const store = loadFromStorage();
    const target = store.draft.achievements.find((a) => a.id === id);
    store.draft.achievements = store.draft.achievements.filter((a) => a.id !== id);
    this.addLog('DELETE_ACHIEVEMENT', 'ACHIEVEMENT', id, { title: target?.title });
    saveToStorage(store);
  }

  /**
   * Experiences CRUD
   */
  static getDraftExperiences(): Experience[] {
    const store = loadFromStorage();
    return [...(store.draft.experiences || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static saveDraftExperience(expData: Partial<Experience> & { position: string; organization: string }): Experience {
    const store = loadFromStorage();
    const existingIndex = store.draft.experiences.findIndex((e) => e.id === expData.id);

    let saved: Experience;
    if (existingIndex >= 0) {
      saved = {
        ...store.draft.experiences[existingIndex],
        ...expData,
        updated_at: new Date().toISOString(),
      };
      store.draft.experiences[existingIndex] = saved;
      this.addLog('UPDATE_EXPERIENCE', 'EXPERIENCE', saved.id, { position: saved.position });
    } else {
      saved = {
        id: expData.id || `exp-${Date.now()}`,
        position: expData.position,
        organization: expData.organization,
        start_date: expData.start_date || new Date().getFullYear().toString(),
        end_date: expData.is_current ? null : expData.end_date || null,
        is_current: !!expData.is_current,
        description: expData.description || '',
        responsibilities: expData.responsibilities || [],
        logo_path: expData.logo_path || '/images/experience/hmti-logo.webp',
        sort_order: expData.sort_order || store.draft.experiences.length + 1,
        is_visible: expData.is_visible !== undefined ? expData.is_visible : true,
        publication_status: expData.publication_status || 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      store.draft.experiences.push(saved);
      this.addLog('CREATE_EXPERIENCE', 'EXPERIENCE', saved.id, { position: saved.position });
    }
    saveToStorage(store);
    return saved;
  }

  static deleteDraftExperience(id: string): void {
    const store = loadFromStorage();
    const target = store.draft.experiences.find((e) => e.id === id);
    store.draft.experiences = store.draft.experiences.filter((e) => e.id !== id);
    this.addLog('DELETE_EXPERIENCE', 'EXPERIENCE', id, { position: target?.position });
    saveToStorage(store);
  }

  /**
   * Contact & Social Links
   */
  static getDraftSocials(): SocialLink[] {
    const store = loadFromStorage();
    return [...(store.draft.socialLinks || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static saveDraftSocial(socData: Partial<SocialLink> & { platform: string; label: string; url: string }): SocialLink {
    const store = loadFromStorage();
    const existingIndex = store.draft.socialLinks.findIndex((s) => s.id === socData.id);

    let saved: SocialLink;
    if (existingIndex >= 0) {
      saved = {
        ...store.draft.socialLinks[existingIndex],
        ...socData,
        updated_at: new Date().toISOString(),
      };
      store.draft.socialLinks[existingIndex] = saved;
      this.addLog('UPDATE_SOCIAL', 'SOCIAL_LINK', saved.id, { platform: saved.platform });
    } else {
      saved = {
        id: socData.id || `soc-${Date.now()}`,
        platform: socData.platform,
        label: socData.label,
        url: socData.url,
        icon_name: socData.icon_name || 'Globe',
        sort_order: socData.sort_order || store.draft.socialLinks.length + 1,
        is_visible: socData.is_visible !== undefined ? socData.is_visible : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      store.draft.socialLinks.push(saved);
      this.addLog('CREATE_SOCIAL', 'SOCIAL_LINK', saved.id, { platform: saved.platform });
    }
    saveToStorage(store);
    return saved;
  }

  static deleteDraftSocial(id: string): void {
    const store = loadFromStorage();
    store.draft.socialLinks = store.draft.socialLinks.filter((s) => s.id !== id);
    saveToStorage(store);
  }

  /**
   * Section Settings
   */
  static getDraftSections(): SectionSetting[] {
    const store = loadFromStorage();
    return [...(store.draft.sections || [])].sort((a, b) => a.sort_order - b.sort_order);
  }

  static updateDraftSection(id: string, updates: Partial<SectionSetting>): void {
    const store = loadFromStorage();
    const idx = store.draft.sections.findIndex((s) => s.id === id);
    if (idx >= 0) {
      store.draft.sections[idx] = {
        ...store.draft.sections[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.addLog('UPDATE_SECTION', 'SECTION', id, updates);
      saveToStorage(store);
    }
  }

  /**
   * Site Settings (Appearance, SEO, Contact Info)
   */
  static getDraftSettings(): SiteSettingsMap {
    const store = loadFromStorage();
    return store.draft.settings;
  }

  static updateDraftSettings<K extends keyof SiteSettingsMap>(key: K, value: Partial<SiteSettingsMap[K]>): void {
    const store = loadFromStorage();
    store.draft.settings[key] = {
      ...store.draft.settings[key],
      ...value,
    };
    this.addLog('UPDATE_SETTINGS', 'SETTINGS', key, value);
    saveToStorage(store);
  }

  /**
   * PUBLISHING WORKFLOW (PRD Section 14)
   * Draft -> Validate -> Publish -> Overwrite published snapshot -> Record Log -> Revalidate cache
   */
  static publishChanges(): PublishResult {
    const store = loadFromStorage();
    try {
      const now = new Date().toISOString();
      store.versionCount += 1;
      store.lastPublishedAt = now;

      // Deep clone draft into published state
      store.published = JSON.parse(JSON.stringify(store.draft));
      store.published.lastUpdated = now;

      // Log publication event
      this.addLog('PUBLISH_WEBSITE', 'PUBLICATION', `v${store.versionCount}`, {
        version: store.versionCount,
        publishedAt: now,
        projectCount: store.published.projects.length,
      });

      saveToStorage(store);

      return {
        success: true,
        versionNumber: store.versionCount,
        publishedAt: now,
      };
    } catch (err) {
      console.error('Publish error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal mempublikasikan perubahan',
      };
    }
  }

  /**
   * Discard draft changes and restore from latest published state
   */
  static discardDraftChanges(): void {
    const store = loadFromStorage();
    store.draft = JSON.parse(JSON.stringify(store.published));
    this.addLog('DISCARD_DRAFT', 'SYSTEM', 'draft-reset', {});
    saveToStorage(store);
  }

  /**
   * Activity Logs
   */
  static getActivityLogs(): ActivityLog[] {
    const store = loadFromStorage();
    return [...(store.logs || [])].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  private static addLog(
    action: string,
    entity_type: string,
    entity_id?: string | null,
    metadata?: Record<string, unknown>
  ): void {
    const store = memoryStore;
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actor_id: 'admin',
      action,
      entity_type,
      entity_id: entity_id || null,
      metadata: metadata || null,
      created_at: new Date().toISOString(),
    };
    store.logs.unshift(newLog);
    // Keep last 100 logs
    if (store.logs.length > 100) {
      store.logs.pop();
    }
  }

  /**
   * Stats overview for Admin Dashboard Overview Page
   */
  static getStatsOverview(): StatsOverview {
    const store = loadFromStorage();
    const draftProjects = store.draft.projects || [];
    const publishedProjects = draftProjects.filter((p) => p.publication_status === 'published');
    const drafts = draftProjects.filter((p) => p.publication_status === 'draft');

    return {
      publishedProjects: publishedProjects.length,
      draftProjects: drafts.length,
      activeAchievements: (store.draft.achievements || []).filter((a) => a.is_visible).length,
      experiencesCount: (store.draft.experiences || []).filter((e) => e.is_visible).length,
      skillsCount: (store.draft.skills || []).filter((s) => s.is_visible).length,
      lastPublishedAt: store.lastPublishedAt,
      recentLogs: this.getActivityLogs().slice(0, 10),
    };
  }
}
