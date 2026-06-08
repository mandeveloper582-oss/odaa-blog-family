import { teamMembers } from '../data/mockdata';

export default function About() {
  return (
    <div className="container-custom py-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
          <span className="text-4xl">🌳</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About ODAA FAMILY TECH</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          ODAA FAMILY TECH is a personal blog focused on expanding knowledge, inspiring youth, conducting extensive research and collecting valuable skills and expertise to pass on to the next generation. Our main goal is to show young people the right path, enhance their understanding and support them in becoming self-reliant and improving their lives.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">To bridge the gap between technology and family life through education and community.</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">👁️</div>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300">A world where every family confidently navigates the digital landscape together.</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-gray-600 dark:text-gray-300">Family first, continuous learning, community support, and innovation with purpose.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">The passionate people behind ODAA FAMILY TECH</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map(member => (
            <div key={member.name} className="text-center group">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary-500 group-hover:ring-8 transition-all">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary-500 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm opacity-90">Articles Published</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm opacity-90">Happy Readers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm opacity-90">Expert Authors</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-sm opacity-90">Reader Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}