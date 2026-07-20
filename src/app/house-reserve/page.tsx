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
              variant="houseReserve"
              fields={[
                {
                  type: "input",
                  label: "جستجو",
                  placeholder: "نام ویلا یا شهر مورد نظر",
                },

                {
                  type: "select",
                  label: "مقصد یا هتل شما",
                  placeholder: "انتخاب شهر",
                  options: ["رشت", "مازندران", "گیلان"],
                },

                {
                  type: "select",
                  label: "مرتب سازی براساس",
                  placeholder: "انتخاب کنید",
                  options: ["محبوب‌ترین", "ارزان‌ترین"],
                },

                {
                  type: "select",
                  label: "امکانات هتل",
                  placeholder: "انتخاب امکانات",
                  options: ["استخر", "پارکینگ"],
                },

                {
                  type: "select",
                  label: "امتیاز هتل",
                  placeholder: "انتخاب امتیاز",
                  options: ["5 ستاره", "4 ستاره"],
                },

                {
                  type: "input",
                  label: "حداقل قیمت",
                  placeholder: "حداقل قیمت",
                },

                {
                  type: "input",
                  label: "حداکثر قیمت",
                  placeholder: "حداکثر قیمت",
                },

                {
                  type: "button",
                  label: "اعمال فیلتر",
                },

                {
                  type: "button",
                  label: "حذف فیلتر",
                },

                {
                  type: "button",
                  label: "۳۳ آگهی پیدا شد",
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
