import Layout from "@/components/layout";
import { columns } from "./columns";
import EditPanel from "./editPanel";
import { usedataRepository } from "../../../../repositories/useRepository";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  return data

}



export default async function Panel() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Redirect to login or show unauthorized message
  
    redirect("/");
  }
  
  const data = await userRawData();
  return (
    <Layout>
      
      <EditPanel data={data} />
    </Layout>
  );
}
