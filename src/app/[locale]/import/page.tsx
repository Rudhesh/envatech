import { getServerSession } from "next-auth";
import { useDataElementsRepository, useUsersRepository } from "../../../../repositories/useRepository";
import Layout from "../../../components/layout";
import Dashboard from "../dashboard/dashboard";
import { redirect } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image"
import DatabaseMongoConnectionForm from "./databaseMongoConnectionForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";

export default async function Import() {
 

  const userRepository =  useDataElementsRepository();

  // Fetch data directly without useState and useEffect
  const data =  userRepository.getAll().then((data) => {
    return data;
  });

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Redirect to login or show unauthorized message

    redirect("/");
  }
  
  return (
    <Layout>
      <h1>Import</h1>
      <div>{JSON.stringify(data)}</div> 
      <DatabaseMongoConnectionForm/>
    </Layout>
  );
}
