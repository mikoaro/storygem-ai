import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

const Hero2 = () => {
  return (
    <div
      className="relative pt-16 pb-32 flex content-center items-center justify-center bg-indigo-500"
      style={{ minHeight: "45vh" }}
    >
      {/* <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-60 bg-black"
        ></span>
      </div> */}
      <div className="container relative mx-auto ">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              <h1 className="text-primary font-semibold text-5xl">
                Stranger Things
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                When a young boy vanishes, a small town uncovers a mystery
                involving secret experiments, terrifying supernatural forces,
                and one strange little girl.
              </p>
              <div className="mt-8">
                <Button
                  className="bg-white text-black font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  <Play className="w-6 h-6 mr-2" /> Play
                </Button>
                <Button
                  variant="secondary"
                  className="bg-gray-800 text-white active:bg-gray-700 text-base font-bold uppercase px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  <Info className="w-6 h-6 mr-2" /> More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero2;
