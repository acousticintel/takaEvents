import Image from "next/image";
import Title from "../components/elements/title";

export default function events() {

  const events = [
    {
      name: "Amapiano Tour",
      img: "/assets/event1.jpeg",
    },
    {
      name: "Sunday Siesta",
      img: "/assets/event2.jpeg",
    },
    {
      name: "Rema MNE Fest",
      img: "/assets/rem.jpeg",
    },
    {
      name: "Rema MNE Fest",
      img: "/assets/rem.jpeg",
    },
  ];

  return (
    <div className="events__page">
      <Title title="All Events" />
      <div className={`events__list ${events.length === 1 && "single"}`}>
        {events.map((e, i) => (
          <label
            key={i}
            htmlFor="event_modal"
            className="event modal-button modal-open"
          >
            <div className="image__cont">
              <Image
                src={e.img}
                className="object-cover"
                layout="fill"
                alt=""
              />
            </div>
            <h1>{e.name}</h1>
          </label>
        ))}
      </div>
    </div>
  );
}
