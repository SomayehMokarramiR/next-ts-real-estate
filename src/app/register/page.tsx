import RegisterLayout from "../components/layout/RegisterLayout";
import RegisterForm from "../components/templates/register/RegisterForm";

function Page() {
  return (
    <RegisterLayout>
      <div className="pt-20">
        <RegisterForm />
      </div>
    </RegisterLayout>
  );
}

export default Page;
