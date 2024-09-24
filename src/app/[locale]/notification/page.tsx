
import Layout from "../../../components/layout"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditPanel from "./test";
import FetchTableData from "./fetchTableData";



export default async function Notification() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      // Redirect to login or show unauthorized message
    
      redirect("/");
    }
    
    return (
        <Layout>
            {/* <h1>Notification</h1> */}
            <FetchTableData />
       {/* <EditPanel/> */}
      </Layout>
    )
}