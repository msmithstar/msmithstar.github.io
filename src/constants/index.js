export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 5,
    name: 'Ball',
    href: '#ball',
  },
];

// export const clientReviews = [
//   {
//     id: 1,
//     name: 'Emily Johnson',
//     position: 'Marketing Director at GreenLeaf',
//     img: 'assets/review1.png',
//     review:
//       'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
//   },
//   {
//     id: 2,
//     name: 'Mark Rogers',
//     position: 'Founder of TechGear Shop',
//     img: 'assets/review2.png',
//     review:
//       'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
//   },
//   {
//     id: 3,
//     name: 'John Dohsas',
//     position: 'Project Manager at UrbanTech ',
//     img: 'assets/review3.png',
//     review:
//       'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
//   },
//   {
//     id: 4,
//     name: 'Ether Smith',
//     position: 'CEO of BrightStar Enterprises',
//     img: 'assets/review4.png',
//     review:
//       'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
//   },
// ];

export const myProjects = [
  {
    title: 'Medline: For You',
    desc: 'Medline: For You is a personalized healthcare platform that streamlines pre-operative and post-operative care journeys.',
    subdesc:
      'Medline: For You is an Alpha Centauri project aimed at improving patient outcomes. Our solution is a progressive web app that centralizes exercise/medication reminders, to-do lists, health summary exports to PCPs, Medline products, relevant articles, and more in order to enhance the overall healthcare experience. Our admin portal makes it so Medline can easily create, modify, and delete content from the app.',
    href: '/textures/project/project1.mp4',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/mfy.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'MySQL',
        path: '/assets/mysql.jpg',
      },
    ],
  },
  {
    title: 'GeekGathering',
    desc: 'GeekGathering is a powerful AI chatbot connecting you with the gathering that\'s perfect for you.',
    subdesc:
      '"Where do I find my crew?" is a dilemma many of us face post-pandemic. I designed and built GeekGathering for geeks of all different hobbies to connect, share, and celebrate their interests. From anime conventions to truck expos, it’s all about sparking real connections over shared passions.',
    href: 'https://ai.studio/apps/drive/1-U9Pmtl8GSsGf8JlU8nWkuTVMQVeHaIE',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/gg.jpg',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'Google AI Studio',
        path: '/assets/gai.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 3.0 : isMobile ? 3.6 : 3.9, // 1.5x increased from previous values
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    acLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [10, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-8, 10, 0] : isTablet ? [-10, 10, 0] : [-18, 10, 0],
    starPosition: isSmall ? [-5, -7, -10] : isMobile ? [-7, -7, -10] : isTablet ? [-9, -4, -10] : [-11, -10, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'i.c.stars',
    pos: 'Software Development Intern',
    duration: 'May 2025 - Present',
    title: "Built fullstack web apps using React, Node.js, and Express. Led front-end development, integrated APIs, and presented a winning user-focused solution to stakeholders.",
    icon: '/assets/icstars.png',
    animation: 'clapping',
  },
  {
    id: 2,
    name: 'Sidley Austin',
    pos: 'Administrative Assistant',
    duration: 'Oct 2024 - Mar 2025',
    title: "Supported digital initiatives and created branded materials using official guides. Managed cross-team communication and led special projects with a UX lens.",
    icon: '/assets/sidley.jpg',
    animation: 'salute',
  },
  {
    id: 3,
    name: 'Kirkland & Ellis',
    pos: 'Legal Recruiting Assistant - Contract',
    duration: 'May 2024 - Sep 2024',
    title: "Managed candidate data for the recruiting team. Created onboarding guides and improved internal workflows with a user-first approach.",
    icon: '/assets/kirkland.jpg',
    animation: 'victory',
  },
  {
    id: 4,
    name: 'Kirkland & Ellis',
    pos: 'Record Assistant - Contract',
    duration: 'Mar 2024 - May 2024',
    title: "Helped digitize legal records and streamline filing systems. Ensured secure handling of confidential data and supported compliance efforts.",
    icon: '/assets/kirkland.jpg',
    animation: 'clapping',
  },
  {
    id: 5,
    name: 'Columbia College Chicago',
    pos: 'Program Assistant',
    duration: 'Aug 2021 - Mar 2024',
    title: "Supported TRIO’s student success initiatives by designing digital materials, leading workshops, and managing data. Used tools like Trello, Miro, and Adobe Suite to create user-centered experiences and streamline team workflows.",
    icon: '/assets/ccc.png',
    animation: 'victory',
  },
];