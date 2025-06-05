export default function BlogPage() {
  const blogs = [
    {
      image: "/images/cucumber.jpeg",
      title: "Ayurvedic Detox and Weight Balance with Ayur Manthra",
      date: "September 27, 2021",
      author: "Sanjay Shenoi",
      location: "Dhanwanthari Madom",
    },
    {
      image: "/images/immune.jpeg",
      title: "Boost Immune System Naturally Against Covid-19",
      date: "September 9, 2020",
      author: "Sanjay Shenoi",
      location: "Dhanwanthari Madom",
    },
    {
      image: "/images/kizhi.jpg",
      title: "Kizhi Treatment – Epic Formula To Heal Your Mind And Body",
      date: "July 30, 2020",
      author: "Ayurmanthra",
      location: "",
    },
  ];

  return (
    <div className="bg-white px-6 py-12">
      {/* Top Heading */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 style={{ fontFamily: "Libre Baskerville" }} className="-ml-16 text-lg italic text-[#7FB53D] text-left" >
          Ayurmanthra Blog
        </h2>
      </div>

     {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white shadow-lg rounded overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-left">
              <h3
                style={{ fontFamily: "'Onest', sans-serif" }}
                className="text-xl font-semibold mb-2 leading-snug"
              >
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600">
                {blog.date} by {blog.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

    