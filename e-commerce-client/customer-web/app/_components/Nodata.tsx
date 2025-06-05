
import Image from "next/image";


function NoDataAvailable() {
  return (
    <section className="flex justify-center items-center">
      <Image 
        src="/no-data.png"
        alt="No data available" 
      width={400}
      height={400}
      />
      
    </section>
  );
}

export default NoDataAvailable;
