import React from 'react';

const STUDENTS = [
  {
    avatar: '👩‍💻',
    name: 'Sasha',
    tag: 'Student 01',
    bio: "Hello! I'm Sasha, a student exploring the world of mobile app development. I enjoy designing clean interfaces and bringing ideas to life through code. Always learning, always curious!",
    course: 'DFD40143 • Mobile App Dev',
  },
  {
    avatar: '👨‍💻',
    name: 'Badrul',
    tag: 'Student 02',
    bio: "Hi there! I'm Badrul, passionate about building things that work. I love solving problems and turning concepts into working applications. Let's build something awesome together!",
    course: 'DFD40143 • Mobile App Dev',
  },
];

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
          Who Lives in the Cat House? 🐈
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Meet the two students behind this portal — Sasha and Badrul
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STUDENTS.map((s) => (
            <div
              key={s.name}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-5xl mb-4">{s.avatar}</div>
              <h3 className="text-lg font-bold text-white">{s.name}</h3>
              <span className="inline-block mt-2 mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-teal-600/80 text-white">
                {s.tag}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{s.bio}</p>
              <p className="mt-4 text-xs font-mono text-slate-500">{s.course}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
