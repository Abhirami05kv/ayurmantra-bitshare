import Image from "next/image";
import React from "react";

function AyurvedaTreatments() {
  const treatments = [
    {
      title: "ABHYANGA (FULL BODY OIL MASSAGE)",
      description:
        "Abhyanga is a traditional Ayurvedic herbal oil massage. It relaxes the body and mind, improves energy flow, relieves stress, anxiety, and depression. Additionally, it enhances blood circulation, alleviates muscle pain, and eases rheumatic symptoms for balanced health.",
      price: "60 Min - £72 | 90 Min - £108",
      image: "/bodymassage.jpg",
    },
    {
      title: "SHIRO ABHAYANGA (INDIAN HEAD MASSAGE)",
      description:
        "This treatment is beneficial for those suffering from headaches, migraines, insomnia, stress, and mental disorders. It involves head, neck, and shoulder massage using medicated oil, which stimulates hair growth and prevents premature graying.",
      price: "30 Min - £48",
      image: "/head_massage.jpg",
    },
    {
      title: "KATI ABHAYANGA (BACK MASSAGE)",
      description:
        "A special oil massage for the back, shoulder, and neck. This treatment helps reduce muscle pain, stiffness, arthritis, spondylosis, trapped nerve, sciatica, and spinal disorders. It heals and relieves chronic back aches.",
      price: "30 Min - £48",
      image: "/back-massage.jpg",
    },
    {
      title: "PADA ABHAYANGA (LEG MASSAGE)",
      description:
        "Pada Abhayanga is an Ayurvedic foot massage which is excellent for general leg pain, swelling, and poor blood circulation. This helps prevent sciatica, cramps, dryness, and numbness. It relaxes and revitalizes the central nervous system.",
      price: "30 Min - £48",
      image: "/leg_massage.jpg",
    },
    {
      title: "KIZHI (HOT BAG MASSAGE)",
      description:
        "Kizhi treatment is one of the most effective therapies in Ayurveda. Heated herbs and medicinal oil tied in cloth bags are kept on the treated area. Kizhi is useful for osteoarthritis, spondylosis, muscular cramps, obesity, swelling, sports injuries, sciatica, etc.",
      price: "30 Min - £48",
      image: "/kizhi.jpg",
    },
    {
      title: "SHIRO DHARA (OIL FLOW ON FOREHEAD)",
      description:
        "Shirodhara is a classical Ayurvedic treatment where medicated oil or liquids are slowly and steadily dripped on the forehead. It helps cure insomnia, stress, anxiety, depression, improves memory, sleep, and strengthens the central nervous system.",
      price: "60 Min - £84",
      image: "/massage.jpg",
    },
    {
      title: "KATI VASTHI (HERBAL OIL POOLING)",
      description:
        "Kati Vasthi is an Ayurvedic lumbosacral rejuvenation therapy. The healing properties of hot herbal oil deeply cleanse and enrich blood, strengthen muscles and connective tissues, and lubricate joints, keeping them flexible and pain-free.",
      price: "30 Min - £48",
      image: "/Kati-Vasti.jpg",
    },
    {
      title: "NASYA (NASAL TREATMENT)",
      description:
        "Nasya therapy cleanses, purifies, and strengthens the nasal passages, allowing you to breathe fully and easily. It is an effective remedy for congestion, allergies, migraine, headache, tonsillitis, and is excellent for hay fever and sinusitis.",
      price: "45 Min - £60",
      image: "/nasal-detox.jpeg",
    },
    {
      title: "PICHU (HERBAL OIL COTTON APPLICATION)",
      description:
        "Pichu treatment is performed by thick layer of cotton wool  soaked in warm medicated oil and then it is applied over the affected area. The therapy effectively treats inflammation, swelling, sprains, osteo– arthritis, joint pain, sciatica, neck problems, lumbar spondylosis etc.",
      price: "Price: 30 Min - £48",
      image: "/spine_Pichu.jpg",
    },
    {
      title: "NJAVARA KIZHI-(RICE BAG MASSAGE)",
      description:
        "Njavara Kizhi treatment is a rejuvenating therapy which nourishes and strengthens the nervous system. This treatment is performed by preparing medicated rice cooked with milk and some other medicated herbs and placing the preparation in cotton pouches and  massaged all over the affected areas of the body. This helps for neurological disorders, rheumatism, arthritis, paralysis, body weakness and also enhances tone and strengthens your muscles etc.",
      price: "Price: 30 Min - £48",
      image: "/navarakizhi.jpg",
    },
    {
      title: "PIZHICHIL-(FULL BODY OIL POURING)",
      description:
        "Pizhichil is The Royal Ayurvedic Treatment. This therapy involves pouring of medicated herbal oils all over the body for a fixed duration of time. It improves overall blood circulation, strengthens immunity system, helps in quick healing of fractured bones and also improves muscle development, treat paralysis, arthritis and rheumatic disease. Eliminates nerves weaknesses and disorders, reduce stress, anxiety and tension. This treatment also improves the quality of skin to an extent.",
      price: "Price: 60 Min - £96",
      image: "/Pizhichil-Oliestroom.jpg",
    },
    {
      title: "DEEP TISSUE MASSAGE",
      description:
        "Deep tissue massage is a massage technique that’s mainly used to treat musculoskeletal issues, such as strains and sports injuries. It involves applying sustained pressure using slow, deep strokes to target the inner layers of your muscles and connective tissues. This helps to break up scar tissue that forms following an injury and reduce tension in muscle and tissue. It may also promote faster healing by increasing blood flow and reducing inflammation.",
      price: "Price: 60 Min - £84",
      image: "/deep-tissue-massage.jpg",
    },
    {
      title: "SPORTS MASSAGE",
      description:
        "Sports massage is an effective treatment for sports injuries and general wear and tear. There are several types of massages used to treat athletes including deep tissue therapy, myofascial release, Thai massage, hot and cold therapy, stretching, Ashiatsu, and PTSM. If your sports injury isn’t responding to conventional massage treatments, and you want to try an alternative treatment, consider Ayurveda. This is a system of medicine that originated in India.",
      price: "Price: 60 Min - £84",
      image: "/sports.jpg",
    },
    {
      title: "STONE THERAPY",
      description:
        "Hot stone massage is a type of massage therapy that involves the use of smooth, heated stones. The massage therapist places the hot stones on specific points on your body and may also hold the stones while giving the massage. The localized heat and weight of the stones warm and relax muscles, allowing the massage therapist to apply deeper pressure to those areas without causing discomfort.",
      price: "Price: 60 Min - £84",
      image: "/stone.jpeg",
    },
    {
      title: "JANU VASTI-(KNEE)",
      description:
        "It is a specialist Ayurvedic therapy that includes collecting therapeutic oil in compartments made around the Knee joint or the location of inflammation or damage. Indications – Musculoskeletal illness such as osteoporosis, tendinitis, osteoarthritis, rheumatoid arthritis, ligament tears etc.",
      price: "Price: 30 Min - £48",
      image: "/knee.jpg",
    },
    {
      title: "DHOOMAPANA",
      description:
        "This is a medicated smoking therapy practised in ayurveda by which the medicated fumes are inhaled through one nostril while keeping the other one closed and thereby exhaling through mouth. This is done simultaneously on both nostrils for a specific period of time depending on the disease condition and as per the advice of doctor. This specific procedure has proven its efficiency in disease related with respiratory track and also in psychosomatic disorders. It helps in normal breathing , it has bronchodilator effect, removes excessive phlegm.",
      price: "Price: 45 Min - £54",
      image: "/SMOKE-FINAL.jpg",
    },
    {
      title: "GREEVA VASTI-(NECK)",
      description:
        "Specially prepared warm herbal oil is poured over the neck and retained inside the black gram paste boundary far 30 minutes Indications: Neck and upper back conditions like cervical spondylitis, stiff neck, pain due to over strain etc…",
      price: "Price: 30 Min - £48",
      image: "/neck.jpeg",
    },
    {
      title: "NETRA TARPANA",
      description:
        "It is a special Ayurvedic treatment for the eyes. It relieves tiredness and also improved eye sight. It is highly recommended for people who regularly work with computers, operate machinery, drive for long hours or anyone Who is suffering from tired, aching and Sore eyes. This Ayurvedic treatment for eyes is carried out in combination with a face massage and is very effective.",
      price: "Price: 45 Min - £60",
      image: "/ayursh_netra_tarpanam.jpg",
    },
    {
      title: "FOUR HANDS AYURVEDIC FULL BODY MASSAGE",
      description: `This is a fantastic de-stress massage technique performed by two therapists working alongside at the same time, creating massage choreography using four hands. It gives a double stimulation, double physical and mental relaxation. This relaxing massage technique has restorative and calming effect on entire nervous system, revives body & mind, releases stress, removes fatigue, improves sleep, increase joint mobility, and restore regulation mechanism of body and mind.
          
          The aim of four hand massage is to achieve harmony in the distribution of energy flow through body. As this technique is double relaxing than the normal therapies, it releases serotonin in the brain which will help to have a better sleep at night.`,
      price: "Price: 60 Min - £132",
      image: "/four-hands-massage.jpg",
    },
    {
      title: "UDWARTHANAM-(DETOXIFICATION)",
      description:
        "Udwarthanam or powder massage is a special massage in which herbal powders are used to massage the body against the firection of hair follicles with more pressure. The herbal powders used to perform this type of  treatments are chosen according to their effects on the body and the individual’s constitution. This massage opens up the pores of the skin and detoxifies. It also helps the body by increasing the heat inside the tissue. It helps activate nerves, improves blood circulation, detoxifies the body, reduces the excess accumulation of fat, reduces cholesterol levels, eliminates bad body odour, exfoliates dead skin cells.",
      price: "Price: 90 Min - £132",
      image: "/powder-massage.jpg",
    },
    {
      title: "DETOX THERAPY WITH WEIGHT MANAGEMENT",
      description:
        "Everything we eat and drink has to be processed by our body. This process takes place at all levels: in the gastrointestinal tract, in our brain, in our sensory organs, and in every cell. As soon as we eat or drink, the body reacts because it is facing a huge task. Ayurvedic detox removes toxins from the body, cleanses the intestine, and enhances circulation to the skin. It also prompts the brain to release happy hormones.",
      price: "Price: POA",
      image: "/detox.jpeg",
    },
    {
      title: "POST PARTUM (POST NATAL) AYURVEDIC TREATMENT AND AFTER CARE",
      description:
        "A woman undergoes different changes during pregnancy and delivery, both physically and emotionally. The lack of sleep, anxiety over the baby’s health, struggles in taking care of the baby, and hormonal changes affect a new mother's overall health and mental well-being. Our post-partum care emphasizes fast healing techniques, boosting immunity, and improving milk production. These therapies help relieve muscle tension, reduce stress and anxiety, and enhance recovery.",
      price: "POA",
      image: "/postpartum.jpeg",
    },
  ];

  return (
    <section className="mt-8 px-4 md:px-0">
    {treatments.map((treatment, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row gap-6 items-center mb-5 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div className="w-full md:w-1/3 h-64 flex-shrink-0">
          <Image
            src={treatment.image}
            alt={treatment.title}
            width={400}
            height={300}
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800">
            {treatment.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {treatment.description}
          </p>
          <div className="mt-4 text-gray-700 text-sm font-semibold">
            {treatment.price}
          </div>
        </div>
      </div>
    ))}
  </section>
    
  );
}

export default AyurvedaTreatments;
