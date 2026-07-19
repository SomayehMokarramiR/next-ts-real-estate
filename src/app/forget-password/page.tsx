import AuthLayout from "../components/layout/AuthLayout";
import ForgetPass from "../components/templates/forgetPass/ForgetPass";

function Page() {
  return (
    <AuthLayout>
      <div className="pt-20">
        <ForgetPass />
      </div>
    </AuthLayout>
  );
}

export default Page;
