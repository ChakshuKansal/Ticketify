import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Admin = () => {
  const sections = [
    {
      imgSrc: "https://insider.in/list-your-events/images/lyoe_venue.png",
      alt: "Venues and Event Organisers",
      title: "Venues and Event Organisers",
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/lyoe-artist.png",
      alt: "Artists and Creators",
      title: "Artists and Creators",
      cta: { text: "CONTACT SALES", href: "#", rel: "noopener noreferrer" },
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/lyoe_courses.png",
      alt: "Course AND Workshop Facilitators",
      title: "Course AND Workshop Facilitators",
      cta: {
        text: "SIGN UP",
        href: "http://publish.insider.in/signup?utm_source=internal&utm_medium=organiser-landing-page",
        rel: "noopener",
      },
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/lyoe_camping.png",
      alt: "Travel Organizers",
      title: "Travel Organizers",
      cta: {
        text: "SIGN UP",
        href: "http://publish.insider.in/signup?utm_source=internal&utm_medium=organiser-landing-page",
        rel: "noopener",
      },
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/lyoe_corporate.png",
      alt: "Corporates",
      title: "Corporates",
    },
  ];

  const clients = [
    {
      imgSrc: "https://insider.in/list-your-events/images/OML_Logo_2016_mini.jpg",
      alt: "OML Logo",
      id: "OML-Logo",
      height: 120,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/Kommune.png",
      alt: "Kommune Logo",
      id: "Kommune-Logo",
      height: 120,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/Qyuki_logo_mini.jpg",
      alt: "Qyuki Logo",
      height: 110,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/counter_culture_mini.jpg",
      alt: "Counter Culture Logo",
      height: 100,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/MOM.png",
      alt: "MOM Logo",
      height: 120,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/Asha-Audio.jpeg",
      alt: "Asha Audio Logo",
      height: 100,
    },
    {
      imgSrc: "https://insider.in/list-your-events/images/Hunger-Inc.png",
      alt: "Hunger Inc Logo",
      height: 100,
    },
  ];

  return (

    <>
    <Navbar/>
    <div className="h-[90vh] flex flex-col items-center justify-center bg-[url('https://4kwallpapers.com/images/walls/thumbs_2t/17018.jpg')] bg-center bg-cover">
      
      <h1 className="text-5xl font-serif font-bold text-center mb-6 text-zinc-800 p-6">  
        Publish your event in under <span className="text-red-500">five</span> minutes.
      </h1>

      <p className="text-lg text-center font-serif px-4 max-w-2xl mb-8">
        Craft unique experiences using our simple and powerful event platform. Create, ticket, and host both on-ground
        and digital events on a platform used by millions of live event-loving fans.
        <a
          href="https://insider.in/list-your-online-events/#Pricing"
          className="font-bold text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn more
        </a>
      </p>

      <a
        href="#Pricing"
        className="bg-blue-500 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-700 transition"
        >
        LIST YOUR EVENT
      </a>
    </div>

    <div className="suitable-for-section wf-section py-12">
      <div className="container mx-auto px-4">
        <h4 className="text-5xl font-serif text-gray-800 text-center mb-6">
          Suitable For Everyone
        </h4>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-lg">
          Ticketify supports a wide range of event listings; from independent artists who want to monetize their content 
          to corporates looking for a hassle-free solution for company events, we have something for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8 px-4">
        {sections.map((section, index) => (
          <div key={index} className="text-center">
            <img
              src={section.imgSrc}
              alt={section.alt}
              className="mx-auto mb-4 w-72 object-contain"
            />
            <div className="mb-4">
              <strong className="text-lg text-gray-800 font-serif">{section.title}</strong>
            </div>
            {section.cta && (
              <a
                href={section.cta.href}
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                rel={section.cta.rel}
              >
                {section.cta.text}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="py-12 bg-gray-100">
      <h2 className="text-5xl font-bold text-center mb-6">Our Clients</h2>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gray-600 mb-8 text-lg">
          Trusted by India's top event organisers and artist communities
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={client.imgSrc}
                alt={client.alt}
                id={client.id}
                height={client.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default Admin;
