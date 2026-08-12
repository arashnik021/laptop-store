import { Outlet } from "react-router-dom";

import BackToTopButton from "../common/BackToTopButton";
import Toast from "../common/Toast";

import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function AppLayout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <Toast />

      <BackToTopButton />
    </>
  );
}

export default AppLayout;
