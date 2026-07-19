// import Search from "../components/templates/houseReserve/search/Search";
import Search from "@/app/components/modules/search/Search";
import ContentReseve from "../components/templates/houseReserve/contentReseve/ContentReseve";
import MainLayout from "../components/layout/MainLayout";
function page() {
  return (
    <MainLayout>
      <div>
        <main className="pt-20">
          {/* <Search /> */}

          <div>
            <Search
              resultCount={33}
              minLabel="حداقل قیمت"
              maxLabel="حداکثر قیمت"
              fields={[
                {
                  type: "input",
                  label: "جستجو",
                  placeholder: "نام ویلا یا شهر مورد نظر",
                },

                {
                  type: "select",
                  label: "مقصد",
                  placeholder: "انتخاب شهر",
                  options: ["رشت", "مازندران", "گیلان"],
                },

                {
                  type: "select",
                  label: "نوع ملک",
                  placeholder: "انتخاب کنید",
                  options: ["ویلا", "آپارتمان", "سوئیت"],
                },

                {
                  type: "select",
                  label: "امکانات",
                  placeholder: "انتخاب امکانات",
                  options: ["استخر", "پارکینگ", "حیاط"],
                },

                {
                  type: "select",
                  label: "تعداد نفرات",
                  placeholder: "تعداد",
                  options: ["2 نفر", "4 نفر", "8 نفر", "12 نفر"],
                },
              ]}
            />
          </div>

          <ContentReseve />
        </main>
      </div>
    </MainLayout>
  );
}

export default page;
