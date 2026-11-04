import { api } from "@/lib/api";
import { Paged, Diploma } from "@/lib/types";

export default async function Diplomas() {
  const result = await api<{payload:Paged<Diploma>}>("/api/diplomas?page=1&limit=12");
  // console.log("Diplomas response:", result);
  return (
    <>
      <h2>Here Diplomas Page</h2>
      <ul>
        {result.payload.data.map((diploma) => (
          <li key={diploma.id}>{diploma.title}</li>
        ))}
      </ul>
    </>
  );
}
