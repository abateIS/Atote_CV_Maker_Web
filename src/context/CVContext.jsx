import React, { createContext, useContext, useState } from 'react';

const CVContext = createContext();

const defaultCV = {
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: 'Addis Ababa, Ethiopia',
    linkedin: '',
    github: '',
    website: '',
    photo: null,
  },
  summary: 'Dedicated professional based in Addis Ababa, committed to contributing to Ethiopia’s growing tech and business landscape.',
  experience: [],
  education: [],
  skills: [],
  languages: [{ id: '1', language: 'Amharic', proficiency: 'Native' }, { id: '2', language: 'English', proficiency: 'Professional' }],
  certifications: [],
  projects: [],
};

export function CVProvider({ children }) {
  const [cvData, setCVData] = useState(defaultCV);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [theme, setTheme] = useState('dark');
  const [techBgColor, setTechBgColor] = useState('#0d1117');
  const [cvBgColor, setCvBgColor] = useState('#ffffff');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const updatePersonalInfo = (data) =>
    setCVData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));

  const updateSummary = (summary) => setCVData((prev) => ({ ...prev, summary }));

  // Generic section updater
  const addItem = (section, item) =>
    setCVData((prev) => ({ ...prev, [section]: [...prev[section], { id: Date.now(), ...item }] }));

  const updateItem = (section, id, data) =>
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));

  const removeItem = (section, id) =>
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));

  const moveItem = (section, fromIndex, toIndex) =>
    setCVData((prev) => {
      const arr = [...prev[section]];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return { ...prev, [section]: arr };
    });

  const loadSampleData = () => {
    setCVData({
      personalInfo: {
        firstName: 'Abebe',
        lastName: 'Bikila',
        title: 'Senior Software Engineer',
        email: 'abebe.bikila@example.et',
        phone: '+251 911 00 11 22',
        location: 'Bole, Addis Ababa, Ethiopia',
        linkedin: 'linkedin.com/in/abebebikila',
        github: 'github.com/abebebikila',
        website: 'abebebikila.et',
        photo: null,
      },
      summary: 'Experienced Software Engineer with over 8 years of expertise in building scalable web applications. Passionate about leveraging technology to solve local challenges in Ethiopia’s digital transformation.',
      experience: [
        {
          id: 'exp1',
          role: 'Lead Developer',
          company: 'Ethio Telecom',
          location: 'Addis Ababa',
          startDate: '2020-01',
          endDate: '',
          current: true,
          description: 'Leading the development of modern payment integration systems and customer portals.',
        },
      ],
      education: [
        {
          gpa: '3.8',
          honors: 'Magna Cum Laude',
        },
      ],
      skills: [
        { id: 1, name: 'React / Next.js', level: 95 },
        { id: 2, name: 'TypeScript', level: 90 },
        { id: 3, name: 'Node.js', level: 88 },
        { id: 4, name: 'Python', level: 80 },
        { id: 5, name: 'PostgreSQL', level: 85 },
        { id: 6, name: 'AWS / Cloud', level: 78 },
        { id: 7, name: 'Docker / Kubernetes', level: 75 },
        { id: 8, name: 'GraphQL', level: 82 },
      ],
      languages: [
        { id: 1, language: 'English', proficiency: 'Native' },
        { id: 2, language: 'Spanish', proficiency: 'Professional' },
        { id: 3, language: 'French', proficiency: 'Conversational' },
      ],
      certifications: [
        { id: 1, name: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2022-08', url: '' },
        { id: 2, name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023-03', url: '' },
      ],
      projects: [
        {
          id: 1,
          name: 'OpenCommerce',
          description: 'Open-source e-commerce platform with 2K+ GitHub stars. Built with Next.js, Stripe, and PostgreSQL.',
          url: 'github.com/alexjohnson/opencommerce',
          technologies: 'Next.js, Stripe, PostgreSQL, Tailwind',
        },
        {
          id: 2,
          name: 'AI Resume Scorer',
          description: 'Tool that analyzes resumes against job descriptions using NLP, helping candidates improve ATS scores.',
          url: 'github.com/alexjohnson/ai-resume',
          technologies: 'Python, FastAPI, OpenAI, React',
        },
      ],
    });
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        selectedTemplate,
        setSelectedTemplate,
        accentColor,
        setAccentColor,
        theme,
        toggleTheme,
        techBgColor,
        setTechBgColor,
        cvBgColor,
        setCvBgColor,
        updatePersonalInfo,
        updateSummary,
        addItem,
        updateItem,
        removeItem,
        moveItem,
        loadSampleData,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}
