import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ezz Menu support by phone, email, or WhatsApp.",
};

const Page = () => {
  return (
    <section className="flex justify-center px-4 py-20">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background shadow-lg p-8 space-y-8">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground">
            Reach out through any of the channels below
          </p>
        </header>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">Ezzaldeen Al-shaibani</span>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Phone</span>
            <a
              href="https://wa.me/905013575567"
              className="font-medium text-indigo-600 hover:underline"
            >
              +90 501 357 55 67
            </a>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Email</span>
            <a
              href="mailto:ezzaldeen.alshaibani@gmail.com"
              className="font-medium text-indigo-600 hover:underline"
            >
              ezzaldeen.alshaibani@gmail.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Page;