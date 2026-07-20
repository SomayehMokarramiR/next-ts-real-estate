import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/templates/register/RegisterForm";

function Page() {
  return (
    <AuthLayout>
      <div className="pt-20">
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}

export default Page;
