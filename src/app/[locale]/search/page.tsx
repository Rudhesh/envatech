import TreeViewSearch from "@/components/treeView/treeViewSearch";
import Layout from "../../../components/layout";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Search() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Redirect to login or show unauthorized message

    redirect("/");
  }

  return (
    <Layout>
      <TreeViewSearch />
      Search
    </Layout>
  );
}
