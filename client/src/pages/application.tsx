import Header from "@/components/header";
import ApplicationForm from "@/components/application-form";
import Footer from "@/components/footer";

export default function Application() {
  return (
    <div className="bg-background font-sans antialiased min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                  Start Your UK Healthcare Journey
                </h1>
                <p className="text-xl text-muted-foreground">
                  Complete your application in just a few steps. No interview required.
                </p>
              </div>
              <ApplicationForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
