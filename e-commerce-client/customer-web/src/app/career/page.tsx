import Image from "next/image";

export default function CareerPage() {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium mb-10">
        Careers</h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT COLUMN */}
        <div>
          <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-3xl font-medium mb-4 text-black">Available Vacancy : <span className="">2</span></h2>
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-6">
            Job post | Ayurvedic Massage Therapist | CODE-23415 | Band 3 or Equivalent experience
          </h3>

          <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-bold mb-2">Job Description</h4>
          <p className="text-base leading-relaxed">
            An established and popular clinic in Croydon and Epsom providing Kerala Ayurvedic Therapies urgently
            requires male/female Panchakarma/Ayurvedic Therapist(s) to work alongside the Ayurvedic Practitioner.
            They will be responsible for providing massages & therapies to clients at the clinic under the supervision
            and guidance of an Ayurvedic Practitioner.
          </p>

           {/* New List Section */}
          <h5 className="italic text-lg font-bold mb-2 mt-3">
            This Centre offers:
          </h5>
          <ul style={{ fontFamily: "'Onest', sans-serif" }} className="list-disc list-inside space-y-2 text-base">
            <li>Traditional Kerala Ayurvedic Treatments</li>
            <li>Pain Control Ayurvedic Treatments</li>
            <li>Dietary Advice</li>
            <li>Yoga & Meditation</li>
            <li>Spa Therapies</li>
            <li>Male and Female Beauty Therapies & Yoga</li>
            <li>Counselling</li>
          </ul>
        </div>

        {/* RIGHT IMAGE COLUMN */}
        <div className="w-full flex justify-center">
            <div className="w-4/5 h-80 relative rounded-lg overflow-hidden shadow-lg">
            <Image
                src="/images/career.webp" 
                alt="Career Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
            />
            </div>
      </div>
      </div>

       {/* FULL-WIDTH Duties Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-bold mb-4">Duties</h4>
        <ol style={{ fontFamily: "'Onest', sans-serif" }} className="list-decimal list-inside space-y-3 text-base">
          <li>
            Clients/patients with challenging rehabilitation issues such as
            clients with addictive behaviours, post-traumatic stress disorder,
            grief, depression, stress, eating disorders, trauma, relational
            conflicts, anxiety, and other mental health issues ranging from mild
            to severe and recommend appropriate Ayurvedic therapies that will
            assist them to respond more effectively.
          </li>
          <li>
            Using classical Ayurveda for the promotion of health by diagnosing
            and differentiating diseases/disorders according to Ayurvedic
            principles and techniques, and formulating appropriate Ayurvedic
            treatment plans.
          </li>
          <li>
            Using knowledge and skills relating to scientific use of medicines
            and applying therapeutic measures for maintenance of health and
            alleviation of disease.
          </li>
          <li>
            Develop specific treatment plans based on the individual signs and
            symptoms of the client.
          </li>
          <li>
            Giving nutritional, dietary and preventive medicine advice in terms
            of Ayurveda.
          </li>
          <li>
            Reviewing and monitoring the clients’ health and modifying treatment
            accordingly.
          </li>
          <li>
            Independently research technical knowledge about diseases of clients.
          </li>
          <li>
            Create a database of clinical experience and research and share this
            information with other health care providers.
          </li>
          <li>
            Compare the merits and demerits of the contemporary healthcare system.
          </li>
        </ol>

        
        <div className="max-w-7xl mx-auto mt-12 space-y-8">
        <div>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed">
            We are looking for a qualified (degree or diploma in Ayurveda and Panchakarma) and skilled Panchakarma/Ayurveda therapists with experience in Pizhichil, Njavarakizhi, Shirodhara, Abhyanga, Udvarthanam, other Panchakarmas and other ayurvedic clinical procedures and examinations as well as Spa and Beauty Therapies.
            </p>
        </div>

        {/* Responsibilities */}
        <div>
            <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-bold mb-2">Responsibilities</h4>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed">
            Therapists are expected to meet and greet clients, work with Practitioners to discover the cause of pain, relieve discomfort, restore function and mobility and correct irregularities in body structure; prepare items used for the treatments and massages, restock, use ingredients such as herbs, oils and other natural materials/decoctions; ensuring treatment area and utensils are maintained at the required hygiene and safety standards; maintaining daily treatment records, training and supervising junior staff; preparing reports; assisting with reception work and ensuring that a good quality of service is offered to clients.
            </p>
        </div>

        {/* Qualities */}
        <div>
            <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-bold mb-2">Qualities</h4>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed">
            Therapists are expected to be mature, and honest and are required to be attentive, caring, 
            respectful, cooperative, responsible, work within company policies and guidelines and 
            accountable for taking of the clinic. They must be able to communicate comfortably, have a 
            flexible approach and follow specific instructions.
            </p>
        </div>

         {/* CV Details Section */}
          <div>
            <h4 className="italic text-lg font-semibold mb-2">
              Candidates wishing to apply for the post must forward us their full CV detailing:
            </h4>
            <ol style={{ fontFamily: "'Onest', sans-serif" }} className="list-decimal list-inside text-base space-y-1 pl-4">
              <li>Work Experiences</li>
              <li>Clarification of their career goals</li>
              <li>Education to date</li>
              <li>Appropriate current or future course and name of the establishment.</li>
              <li>Computer skills</li>
              <li>Languages spoken</li>
              <li>Other work experiences</li>
              <li>2 references</li>
            </ol>
          </div>

          {/* Qualifications / Experience */}
          <div>
            <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-bold mb-2">Qualifications/Experience</h4>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed">
              Successful candidates must hold relevant qualifications and/or proven prior 
              two-year experience in ayurvedic therapies.
            </p>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed mt-2">
              The job description sets out the duties of the post at the time it was drawn up. Such duties may vary from time to time
              without changing the general character of the duties or level of responsibility entailed. Such variations are a common
              occurrence and cannot of themselves justify a reconsideration of the grading of the post.
            </p>

            {/* Job Details */}
            <div className="mt-4">
                <ul style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed space-y-1">
                    <li><strong>Job Title:</strong> Ayurveda/Panchakarma Therapist or Masseur</li>
                    <li><strong>Job Type:</strong> Permanent, Full-time</li>
                    <li><strong>Salary:</strong> £26,500</li>
                    <li><strong>Hours per week:</strong> 37.5</li>
                    <li><strong>Location:</strong> Thornton Heath (Croydon) and Kingston Road (Epsom), UK</li>
                    <li><strong>Contact:</strong> Please send your CV with a cover letter.</li>
                    <li><strong>Job Type:</strong> Full-time</li>
                    <li><strong>Schedule:</strong> Day shift</li>
                </ul>
            </div>
            <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="mt-6 text-lg font-bold mb-2">COVID-19 considerations</h4>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-base leading-relaxed">
                We are COVID-19 secure, and we follow all required health and safety measures.
            </p>

            <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="mt-6 text-lg font-bold mb-2">
                Licence/Certification</h4>
            <ul style={{ fontFamily: "'Onest', sans-serif" }} className="list-disc list-inside space-y-2 text-base">
                <li>Massage Therapist (required)</li>
            </ul>

            <p className="mt-4 italic">Shoot your CV to 
              <strong> info@ayurmanthra.co.uk</strong>
            </p>

            <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-lg italic font-medium mb-10 mt-8">
              Want to know more about the careers at ayurmantra?
            </h1>
            <div className="bg-white rounded p-6 shadow-md">
              <form className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name*" className="border rounded p-2 w-full" />
                  <input type="text" placeholder="Email*" className="border rounded p-2 w-full" />
                  <input type="text" placeholder="Phone*" className="border rounded p-2 w-full" />
                  <input type="text" placeholder="Subject*" className="border rounded p-2 w-full" />
                </div>
                <textarea placeholder="Message" className="border rounded p-2 w-full" rows={4} />
                <button className=" bg-[#7FB53D] text-white py-2 px-4 rounded-full w-fit 
                cursor-pointer hover:bg-green-100 hover:text-[#7FB53D] ">
                  Send Message
                </button>
              </form> 

            </div>


          </div>
        </div>

      </div>
    </div>
  );
}
