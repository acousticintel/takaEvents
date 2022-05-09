import Image from "next/image";

export default function Loader({ component }) {
  return (
    <div id="loader" className={`loader ${component && "component"}`}>
      <div className="relative">
        <div className="relative h-20 w-20">
          <Image
            src="/assets/logo.png"
            className="object-contain"
            layout="fill"
            alt=""
          />
        </div>
        <div className="h-40 w-40 abs-center">
          <div className="relative h-40 w-full animate-spin-slow">
            <Image
              src="/assets/leaves.webp"
              className="object-contain"
              layout="fill"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
