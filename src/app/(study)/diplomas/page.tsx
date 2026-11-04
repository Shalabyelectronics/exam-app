import { api } from "@/lib/api";
import Image from "next/image";
import { Paged, Diploma } from "@/lib/types";

export default async function Diplomas() {
  const result = await api<{ payload: Paged<Diploma> }>(
    "/api/diplomas?page=1&limit=12",
  );
  // console.log("Diplomas response:", result);
  return (
    <>
      <h2>Here Diplomas Page</h2>
      <ul>
        {result.payload.data.map((diploma) => (
          <li key={diploma.id}>
            <Image
              src={diploma.image}
              alt={diploma.title}
              width={320}
              height={180}
            />
            <h3>{diploma.title}</h3>
            <p>{diploma.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
