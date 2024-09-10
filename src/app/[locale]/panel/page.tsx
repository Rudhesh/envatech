import Layout from "@/components/layout";
import { columns } from "./columns";
import EditPanel from "./editPanel";
import { usedataRepository } from "../../../../repositories/useRepository";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}


const userRawData = async () => {
  const userRepository = usedataRepository();
  const data = await userRepository.getAll();
  console.log({data})
  return data

}


export default async function Panel() {
  const data = await userRawData();
  return (
    <Layout>
      <EditPanel data={data} />
    </Layout>
  );
}
