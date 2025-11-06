"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API endpoint
    setStatus("Thank you for your message! We will get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-teal mb-4">
          Get In Touch
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-500">
          We&apos;d love to hear from you. Whether you have a question about
          features, trials, pricing, or anything else, our team is ready to
          answer all your questions.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-brand-teal mb-6">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-primary min-h-[120px]"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full text-lg py-3">
              Submit
            </button>
            {status && (
              <p className="text-center text-brand-green mt-4">{status}</p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-brand-amber p-3 rounded-full text-brand-teal">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-teal">Email</h3>
              <p className="text-slate-500">
                General Inquiries:{" "}
                <a
                  href="mailto:hello@shopverse.com"
                  className="hover:underline"
                >
                  hello@shopverse.com
                </a>
              </p>
              <p className="text-slate-500">
                Support:{" "}
                <a
                  href="mailto:support@shopverse.com"
                  className="hover:underline"
                >
                  support@shopverse.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-brand-amber p-3 rounded-full text-brand-teal">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-teal">Phone</h3>
              <p className="text-slate-500">(123) 456-7890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-brand-amber p-3 rounded-full text-brand-teal">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-teal">Office</h3>
              <p className="text-slate-500">
                123 Tech Avenue, Suite 100
                <br />
                Innovation City, CA 94105
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
