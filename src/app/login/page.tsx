import AuthLayout from "../components/layout/AuthLayout";
import Login from "../components/templates/login/Login";

function Page() {
  return (
    <AuthLayout>
      <div className="pt-20">
        <Login />
      </div>
    </AuthLayout>
  );
}

export default Page;
