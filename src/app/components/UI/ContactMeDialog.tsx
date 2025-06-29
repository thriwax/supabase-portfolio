"use client";

import { useState } from "react";
import { useForm } from "@formspree/react";

export default function ContactMeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID as string);


    return (
        <section className="py-24 text-center bg-[#ff9ee0] mt-[100px]">
            <h2 className="text-7xl font-bold text-black mb-4">Contact Me</h2>
            <p className="text-xl text-white font-bold mb-8">Let’s work together. Get in touch!</p>

            <button
                onClick={() => setIsOpen(true)}
                className="font-bebas bg-white text-black text-lg font-semibold px-8 py-4 rounded-xl hover:bg-black hover:text-white transition"
            >
                Talk to Me
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal content */}
                    <div className="relative z-10 bg-white w-full max-w-lg rounded-xl p-10 shadow-xl transform transition-all duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-5 text-3xl text-black hover:opacity-60"
                        >
                            &times;
                        </button>

                        <h3 className="text-left text-3xl font-bold text-black mb-2">Send me a message</h3>
                        <p className="text-left text-lg text-gray-600 mb-6">I'll get back to you soon.</p>

                        {state.succeeded ? (
                            <div className="text-center py-10">
                                <h4 className="text-xl font-medium text-black">Thank you!</h4>
                                <p className="text-gray-600 mt-2">Your message has been sent.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Your email"
                                    className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="Your message..."
                                    className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                />

                                <button
                                    type="submit"
                                    disabled={state.submitting}
                                    className="w-full bg-white text-black font-semibold py-3 rounded-xl border border-black hover:bg-black hover:text-white transition"
                                >
                                    {state.submitting ? "Sending..." : "Submit"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
