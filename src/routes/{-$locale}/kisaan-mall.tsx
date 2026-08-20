import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/ui/pinky-news-letter";

export const Route = createFileRoute("/{-$locale}/kisaan-mall")({
  head: () => ({
    meta: [
      { title: "Kisaan Mall — Coming Soon | Agaate" },
      {
        name: "description",
        content:
          "Agaate Kisaan Mall is coming soon. Stay updated on our official opening and exclusive launch offers.",
      },
    ],
  }),
  component: KisaanMallPage,
});

function KisaanMallPage() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white">
      <Header />
      <div className="flex-1 pt-16">
        <NewsLetter
          title={isHindi ? "किसान मॉल · जल्द आ रहा है" : "Kisaan Mall · Coming Soon"}
          subtitle={isHindi ? "अगाते" : "Agaate"}
          description={
            isHindi ? (
              <>
                भारतीय किसानों के लिए 100% प्रमाणित बीज, जैविक पोषण और आधुनिक फार्म हार्डवेयर का वन-स्टॉप स्टोर।
                <br />
                उद्घाटन अपडेट्स और विशेष ऑफर्स पाने के लिए अपना ईमेल या मोबाइल दर्ज करें।
              </>
            ) : (
              <>
                India's premier modern agri-input store for verified seeds, bio-boosters & farm hardware.
                <br />
                Sign up now and stay in the loop for our official launch.
              </>
            )
          }
          placeholder={isHindi ? "अपना ईमेल या 10 अंकों का मोबाइल दर्ज करें" : "Enter your email or mobile number"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default KisaanMallPage;
