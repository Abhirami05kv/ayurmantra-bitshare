  import React from 'react';
  import Image from 'next/image';
  import CommonHeader from '../_components/CommonHeader';

  const images = [
    "/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg", "/gallery5.jpg", "/gallery6.jpg",
    "/Shiro Abhyanga.jpg", "/spa.jpg", "/spa2.jpg", "/spa3.jpg", "/blog_kizhi.jpg", "/backMassage.jpg",
    "/gallery9.jpg", "/gallery10.jpg", "/gallery11.jpg", "/gallery15.jpg", "/gallery13.jpg", "/gallery16.jpg",
    "/gallery18.jpg", "/gallery19.jpg", "/gallery21.jpg"
  ];

  function Gallery() {
    return (
      <div className='min-h-screen '>
        <CommonHeader title="PHOTO GALLERY" src='/dhroni_large.jpg'/>
        <section className='max-w-5xl mx-auto'>
          
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
            {images.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                <Image src={src} alt={`Gallery ${index + 1}`} width={500} height={300} loading='lazy' className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  export default Gallery;
