import Layout from "../../../components/layout";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DatabaseConnectionForm from "./DatabaseConnectionForm";
import FetchTableData from "../notification/fetchTableData";
import DatabaseMongoConnectionForm from "../import/databaseMongoConnectionForm";

export default async function NodeGraph() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Redirect to login or show unauthorized message

    redirect("/");
  }

  return (
    <Layout>
     
      <DatabaseConnectionForm/>

      {/* <FetchTableData /> */}
      {/* <Rechart /> */}
    </Layout>
  );
}
