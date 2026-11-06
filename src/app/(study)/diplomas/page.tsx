import { api } from "@/lib/api";
import Image from "next/image";
import { Paged, Diploma } from "@/lib/types";
import Link from "next/link";
import Pager from "@/components/pager";

export default async function Diplomas({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1,Number(page) || 1);
  const result = await api<{ payload: Paged<Diploma> }>(
    `/api/diplomas?page=${currentPage}&limit=12`,
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
            <h3>
              <Link href={`/diplomas/${diploma.id}`}>{diploma.title}</Link>
            </h3>
            <p>{diploma.description}</p>
          </li>
        ))}
      </ul>
      <p>
        Page {result.payload.metadata.page} of{" "}
        {result.payload.metadata.totalPages}
      </p>
      <Pager metadata={result.payload.metadata} />
    </>
  );
}
