import Link from "next/link";
import { Metadata } from "@/lib/types";
export default function Pager({ metadata }: { metadata: Metadata }) {
  const pages = Array.from(
    { length: metadata.totalPages },
    (_, index) => index + 1,
  ).map((page) => (
    <Link key={page} href={`?page=${page}`}>
      {page}
    </Link>
  ));
  return pages;
}
