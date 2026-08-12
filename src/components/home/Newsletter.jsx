import NewsletterForm from "../forms/NewsletterForm";

function Newsletter() {
  return (
    <section className="section">
      <div className="app-container">
        <div className="newsletter">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h2 className="h3 fw-bold">
                از جدیدترین پیشنهادها باخبر شوید
              </h2>

              <p className="mb-0 opacity-75">
                ایمیل خود را ثبت کنید تا از محصولات و پیشنهادهای
                نمونه آموزشی فروشگاه مطلع شوید.
              </p>
            </div>

            <div className="col-lg-6"><NewsletterForm /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
