import Layout from "@/components/layout";
import { columns } from "./columns";
import EditPanel from "./editPanel";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}
// async function getUsers(): Promise<any> {
//   const apiUrl = process.env.NEXTAUTH_URL
//   const res = await fetch(`${apiUrl}/api/dataPartition`);
//   const data = await res.json();
//   console.log("DATA",data)
//     return data;
// }

const dummyData: DataPoint[] = [
  {
    id: 1,
    value: 25,
    time_stamp: "2024-09-08T10:00:00Z",
    min: 15,
    max: "30",
    status: "active",
  },
  {
    id: 2,
    value: 30,
    time_stamp: "2024-09-08T11:00:00Z",
    min: 20,
    max: "40",
    status: "warning",
  },
  {
    id: 3,
    value: 45,
    time_stamp: "2024-09-08T12:00:00Z",
    min: 30,
    max: "60",
    status: "error",
  },
  {
    id: 4,
    value: 20,
    time_stamp: "2024-09-08T13:00:00Z",
    min: 10,
    max: "25",
    status: "inactive",
  },
];




export default async function Panel() {
  // const data = await getUsers();
  return (
    <Layout>
      <EditPanel data={dummyData} />
    </Layout>
  );
}
