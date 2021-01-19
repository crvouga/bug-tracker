import useSWR from "swr";
import Person from "../components/Person";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IPerson {
  id: string;
  name: string;
}

export default function Index() {
  const { data, error } = useSWR<IPerson[]>("/api/people", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((p, i) => (
        <Person key={i} person={p} />
      ))}
    </ul>
  );
}
