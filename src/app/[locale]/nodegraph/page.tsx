import Layout from "../../../components/layout";
import { Rechart } from "./rechart";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NodeGraph() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Redirect to login or show unauthorized message

    redirect("/");
  }

  return (
    <Layout>
      <h1>Node-Graph</h1>
      <Rechart />
    </Layout>
  );
}
