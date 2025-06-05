
import NoDataImage from "/nodata.jpg";

function NoDataAvailable() {
  return (
    <section className="flex justify-center items-center">
      <img 
        src={NoDataImage} 
        alt="No data available" 
      width={200}
      height={200}
      />
      
    </section>
  );
}

export default NoDataAvailable;
