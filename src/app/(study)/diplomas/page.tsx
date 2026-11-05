import { api } from "@/lib/api";
import Image from "next/image";
import { Paged, Diploma } from "@/lib/types";
import Link from "next/link";


export default async function Diplomas({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const {page = "1"} = await searchParams;
  const result = await api<{ payload: Paged<Diploma> }>(
    `/api/diplomas?page=${page}&limit=12`,
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
      <p>
        Page {result.payload.metadata.page} of{" "}
        {result.payload.metadata.totalPages}
      </p>
      <Link href="/diplomas?page=1">1</Link>
      <Link href="/diplomas?page=2">2</Link>
    </>
  );
}
