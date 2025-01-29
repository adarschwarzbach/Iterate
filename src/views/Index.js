import React, { useState } from "react";

// Core Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// Apply Form Component
import ApplyForm from "components/PageHeader/ApplyForm";

export default function Index() {
  const [showApplyForm, setShowApplyForm] = useState(false);

  // React.useEffect(() => {
  //   document.body.classList.toggle("index-page");
  //   return () => {
  //     document.body.classList.toggle("index-page");
  //   };
  // }, []);

  return (
    <div className="bg-black black min-h-screen flex flex-col">
      <IndexNavbar />
      <div >
        {showApplyForm ? (
          <ApplyForm onClose={() => setShowApplyForm(false)} />
        ) : (
          <PageHeader onApplyClick={() => setShowApplyForm(true)} />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
