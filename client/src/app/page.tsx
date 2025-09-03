
import Categery from "@/components/Categery";
import HeroSection from "@/components/HeroSection";
// import IdeasBox from "@/components/IdeasBox";
import LatestIdeas from "@/components/LatestIdeas";
// import SearchSection from "@/components/SearchSection";


export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      {/* <SearchSection/> */}
      {/* <IdeasBox/> */}
      <LatestIdeas/>
      <Categery/>
     
    </div>
  );
}
