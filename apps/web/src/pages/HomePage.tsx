import { useQuery } from "@tanstack/react-query";
import { getForms } from "@/services/forms.service";
import { Link } from "react-router-dom";

export default function HomePage() {
  const {
    data: forms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{String(error)}</p>;
  }

  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold mt-10">
        Recent forms
      </h1>
      <div className="flex flex-col items-center space-y-4 mt-10">
        {forms?.map((form) => (
          <Link key={form.id} to={`/forms/${form.id}`}>
            <div key={form.id} className="rounded-md border w-150 p-4 shadow">
              <h2 className="text-xl font-bold">{form.name}</h2>

              <p>{form.description}</p>

              <p>{form.questions.length} questions</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
