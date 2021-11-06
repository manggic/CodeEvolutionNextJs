import Image from "next/image";
import singleImg from "../public/1.jpg";
function PetsPage() {
  return (
    <div>
      <Image
        placeholder="blur"
        src={singleImg}
        alt="pet"
        width="280"
        height="240"
      />

      {["1", "2", "3", "4", "5"].map((ele) => {
        return (
          <div key={ele}>
            <Image src={`/${ele}.jpg`} alt="pet" width="280" height="240" />
          </div>
        );
      })}
    </div>
  );
}

export default PetsPage;
