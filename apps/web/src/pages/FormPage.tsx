import { useParams } from "react-router-dom";

export default function FormPage() {
  const { id } = useParams();

  return <>{id}</>;
}
