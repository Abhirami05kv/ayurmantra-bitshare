import Image from "next/image";


// Define types for your items
type GridItemType = {
  type: 'image' | 'text';
  src?: string;
  alt?: string;
  title?: string;
  content?: string;
};

// Define props for GridItem component
interface GridItemProps {
  item: GridItemType;
  isLastInRow: boolean;
//   isSecondRow?: boolean;
//   index?: number;
}


export default function MassageTherapyServices() {

    const firstRowItems: GridItemType[]= [
    {
      type: "image",
      src: "/images/massage1.jpg",
      alt: "Yoga"
    },
    {
      type: "text",
      title: "Holistic Beauty Treatments",
      content: "The modern style of being an ayurvedic spa is never compromised as treatment for beauty or face massage and facial treatments where double cleanse and exfoliation are definitely involved. This ayurvedic face massage is a classic subsidiary to the full body massage in beauty treatment excels in relaxing, purifying, nourishing, hydrating and rejuvenating, the best available in Croydon and Epsom, London."
    },
    {
      type: "image",
      src: "/images/massage2.jpg",
      alt: "Massage"
    },
    {
      type: "text",
      title: "Ayurvedic Sports Massage",
      content: "Apart from the classic head and body massage, and kizhi treatments, Ayurmanthra also focuses on sports massage and sports injury treatments in the form of deep tissue massage. This is a recent form of developing an ayurvedic way of tissue injury recovery treatment or muscle damage treatment usually in the form of skeletal muscle injury treatment which is the major traumas in sports injuries. These muscle injuries may be traumatic or acute and chronic or overuse injuries. These injury treatments require different approaches of treatments as injuries to muscles vary according to the nature of body exposure and exercises involved."
    }
    ];


  const secondRowItems: GridItemType[] = [
    {
      type: "text",
      title: "Myofascial Release Therapy",
      content: "Also being the best ayurvedic treatment centre in London, Ayurmanthra involves in treatment for back pain– a major concern for majority of the people in London. Myofascial release treatment, also known as Myofascial trigger point therapy a physical therapy use to treat Myofascial pain syndrome, is a classic treatment followed and is only available at Ayurmanthra making it the best in the United Kingdom. The neck pain treatment, treatment for gout, Spondylosis (spinal osteoarthritis) treatment and treatment for arthritis are all available at Ayurmanthra. The practitioners provide due care while performing the treatments as every treatment has its own unique character and requires due diligence."
    },
    {
      type: "image",
      src: "/images/massage3.jpg",
      alt: "Thai Yoga"
    },
    {
      type: "text",
      title: "Mind-Body Rebalance",
      content: "Ayurveda always couples yoga with physical and mental strength and consciousness balance. Ayurmanthra is not an exception to this. Stress relief treatments, anxiety treatment, treatment for depression, Natural treatment for sciatica, natural treatment for memory loss are all provided here. These treatments are considered to be a part of anti-aging therapy-another specialization of Ayurmanthra."
    },
    {
      type: "image",
      src: "/images/massage4.webp",
      alt: "Yoga Treatment"
    }
  ];

    return(
        <div className="max-w-screen mx-auto px-4 py-12 bg-[#DEEED9]">
            {/* Heading at the top */}
            <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium">
                Ayurmanthra is The Best Massage and Yoga Centre in Croydon, London
            </h1>
                     
            {/* IMAGE BANNER WITH TEXT OVERLAY */}
            <div className="relative mt-6 w-full h-[500px] rounded-xl overflow-hidden shadow-md">
                <Image
                    src="/images/yogaa.jpg"
                    alt="Yoga Banner"
                    fill
                    className="object-cover object-[center_40%]"
                    priority
                />
            </div>
            <h2 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-xl font-medium italic mt-6">
                Boost Immunity & Wellness
            </h2>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-justify mt-2 text-lg ">
                Ayurmanthra is the best massage and yoga centre in Croydon and Epsom, 
                London. During this pandemic, people are concerned about health and 
                immunity against the covid-19 virus. Ayurmanthra being a holistic health 
                centre in London provides wide range of ayurvedic treatments along with 
                necessary guidelines as well as advices through their experienced 
                practitioners for keeping their mental and physical strength and wellness.
                There are a wide range of activities in Ayurmanthra based on ayurvedic 
                approach highly relying on herbal oil massage. Being a traditional 
                ayurvedic therapy centre in London Ayurmanthra treatment packages are 
                really nifty. The different abhayanga massage measures and the different 
                kizhi processes are considered to be best available at Ayurmanthra in 
                London due to the systematic way which they follow without fail. 
                The processes and procedures followed in a Kerala style traditional 
                form makes it the best ayurvedic medical centre with yoga classes as an 
                inevitable part of wellbeing measures.
            </p>
            

            {/* FIRST ROW - Image | Text | Image | Text */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 rounded-t-lg overflow-hidden shadow-sm">
                {firstRowItems.map((item, index) => (
                <GridItem key={`first-${index}`} item={item} isLastInRow={index === 3} />
                ))}
            </div>

            {/* SECOND ROW - Text | Image | Text | Image */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-t-0 border-gray-200 rounded-b-lg overflow-hidden shadow-sm">
                {secondRowItems.map((item, index) => (
                <GridItem key={`second-${index}`} item={item} isLastInRow={index === 3} />
                ))}
            </div>

            {/* PERSONALIZED TREATMENTS SECTION - Added below the second row */}
            <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-medium italic text-[#7FB53D] mb-6" style={{ fontFamily: "Libre Baskerville" }}>
                Personalized Treatments – The Special Character of Ayurmanthra
                </h2>
                
                <div className="space-y-4 text-justify">
                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    Ayurveda is always based on personal or individual treatment. This means 
                    that treatment is based on personal requirements and not providing anything 
                    in a general way. The processes or the procedures in Ayurveda depend on the 
                    nature and character of the person. Hence Ayurmanthra follows personalized 
                    lifestyle and diet plan approach. The <strong>medicated oil massage</strong> 
                    or the immunity boosting treatment or the soothing massage or even the 
                    <strong>body and mind refreshing massage</strong>, whichever be the 
                    requirement, all depends on the person and his physical and mental situation 
                    and requirements. This ayurvedic treatment clinic in London is the best found 
                    massage parlor with innovative natural remedies against several physical and 
                    mental imbalances.
                </p>
                
                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    The specializations of Ayurmanthra have a wide horizon which includes 
                    pregnancy massage, womb healing, <strong>hot stone massage</strong>, and 
                    <strong>herbal hair care</strong>. Reiki healing (this is a Japanese form of 
                    energy healing where palms of the practitioner is used to transfer the 
                    universal energy to the patient for emotional or physical healing) and natural 
                    treatment of lbs syndrome. Apart from these, natural body care is given due 
                    importance through foot massage, treatment of nerves disorder, herbal face 
                    massage, weight loss measure, diet plan, stress relieve measures, measures on 
                    refreshening of mind, and way of doing yoga, as well as yoga classes.
                </p>

                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    A place for all types of ayurvedic treatments are available at Ayurmanthra 
                    which is based at Croydon and Epsom, London the centre point in the UK. 
                    The practitioners at Ayurmanthra are focused on wellness oriented approach 
                    through herbal oil massage process. The qualities of a yogi could be seen 
                    in the practitioners which makes it popular and unique. These qualities 
                    ensure that the person is always equipped with personalized plans on diet, 
                    weight loss or any other measure if required.
                </p>
                </div>

                <h2 className="text-2xl font-medium italic text-[#7FB53D] mb-6 mt-8" style={{ fontFamily: "Libre Baskerville" }}>
                Role of Ayurmanthra in Immunity boosting system through Ayurveda
                </h2>

                <div className="space-y-4 text-justify">
                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    Ayurveda deals with negative and positive emotions. Illness is the result 
                    of poor health or decreased Ojas or energy resulting in negative emotions. 
                    These negative emotions increase negative feelings like hatred, anger, 
                    worry, guilt, envy, or jealousy. This means that reduced immunity increases 
                    negative emotions. So the solution is to increase positive emotions like 
                    love, affair, good concentration, calm mind, or happiness. To make this 
                    happen, immune system should be boosted. When positive emotions increase, 
                    negative emotion reduces, as both contradictory.
                </p>

                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    The need for immune system is due to its character of hyperactivity. 
                    The invasion of foreign particles are always defended and defeated by 
                    the cells due to this hyperactivity. Food plays a role in this 
                    hyperactivity of the cells. The uses of easy digestible foods are to be 
                    preferred over red meat or similar foods. The use of yogavahi or healing 
                    agents like spices, herbs etc… which have the capability of healing the 
                    cells and tissues are also be used in foods to boost immunity. Apart from 
                    these, physical exercises like walking, jogging or taking planks, and 
                    keeping good breathing system through practice of pranayama shall upgrade 
                    immunity naturally.
                </p>

                <p style={{ fontFamily: "'Onest', sans-serif" }}>
                    Ayurmanthra explains, advices and provides these measures for boosting 
                    of immunity. During this covid-19 pandemic, Ayurmanthra points out the 
                    need for keeping a healthy mind and a healthy body to defend against the 
                    powerful viruses. This defence is possible only if the body is having a 
                    strong immune system. The measures provided by Ayurmanthra is claimed to 
                    be the most effective in keeping the mind and body healthy.
                    Hence it is advised to avail the services of Ayurmanthra as soon as possible.
                </p>
                </div>
            </div>
        </div>
    );
}

// Reusable Grid Item Component
function GridItem({ item, isLastInRow }: GridItemProps) {
    return (
        <div className={`relative ${item.type === 'text' ? 'p-6 bg-white' : ''} 
            border-r ${isLastInRow ? 'border-r-0' : ''} border-gray-200 
            hover:bg-gray-50 transition-colors`}>
            {item.type === 'image' ? (
                <div className="relative h-full min-h-[200px] md:min-h-[300px]">
                    <Image
                        src={item.src || ''}
                        alt={item.alt || ''}
                        fill
                        className="object-cover"
                    />
                </div>
                ) : (
                <div className="h-full flex flex-col text-justify">
                    <h3 className="text-xl font-medium italic mb-3 text-[#7FB53D]">
                        {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-6 text-sm">
                        {item.content}
                    </p>
                </div>
            )}
        </div>

    )
}




