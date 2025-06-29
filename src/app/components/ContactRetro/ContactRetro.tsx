'use client'

import { useForm } from "@formspree/react";

export default function ContactNice() {
    const [state, handleSubmit] = useForm("xbjvevpw");

    if (state.succeeded) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-3xl font-semibold">Thank you!</h2>
                <p className="mt-2 text-gray-600">Your message has been sent.</p>
            </div>
        );
    }

    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* Left Text Block */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">Get started now!</h2>
                    <p className="text-gray-700 mb-6">
                        If you would like to work with us or just want to get in touch,
                        we’d love to hear from you!
                    </p>
                    {/* Optional right-arrow graphic */}
                    <div className="text-4xl">↗</div>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 p-8 rounded-2xl w-full space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Enter your First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Enter your Last Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter a valid email address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your message"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition-all"
                    >
                        {state.submitting ? "Sending..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
}