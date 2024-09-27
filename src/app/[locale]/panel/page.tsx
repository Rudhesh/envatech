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
  station_id?: number;  // Optional fields
  temperature?: number;
  humidity?: number;
  wind_speed?: number;
  wind_direction?: string;
  rainfall?: number;
  pressure?: number;
  timestamp?: string;
  latitude?: number;
  longitude?: number;
  // Add other properties from your JSON data if needed
}


const userRawData = async (): Promise<any> => {
  const userRepository = usedataRepository();
  const result = await userRepository.getAll();

  // Assuming the response has a structure like { message: 'Success', data: [...] }
  return result;  // Return only the data array
};




export default async function Panel() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Redirect to login or show unauthorized message
  
    redirect("/");
  }
  
   const data = await userRawData();
  return (
    <Layout>
      
      <EditPanel data={data.data || [] } />
    </Layout>
  );
}
