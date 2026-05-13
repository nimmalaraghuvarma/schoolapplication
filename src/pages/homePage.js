import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaBus,
    FaBook,
    FaAward,
    FaPhoneAlt,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaEnvelope,
    FaBars,
    FaTimes,
    FaSpinner,
} from "react-icons/fa";

/* ─── EMAILJS CONFIG ─── */
const EMAILJS_SERVICE = "service_5luudin";
const EMAILJS_TEMPLATE = "template_xoct28p";
const EMAILJS_PUBLIC = "ubDHpz1TCTL6sgLGK";

/* ─── CONTACT DIALOG — powered by EmailJS ─── */
function ContactDialog({ open, onClose }) {
    const EMPTY = { parentName: "", phone: "", studentName: "", className: "", message: "" };
    const [formData, setFormData] = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    // Reset on open
    useEffect(() => {
        if (open) { setFormData(EMPTY); setSent(false); }
    }, [open]);

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await emailjs.send(
                EMAILJS_SERVICE,
                EMAILJS_TEMPLATE,
                {
                    parent_name: formData.parentName,
                    phone: formData.phone,
                    student_name: formData.studentName,
                    class_name: formData.className,
                    message: formData.message,
                },
                EMAILJS_PUBLIC
            );
            setSent(true);
            toast.success("Enquiry submitted! We'll contact you soon. 🎉");
            setTimeout(onClose, 2200);
        } catch (err) {
            console.error(err);
            toast.error("Failed to send. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="dialog-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="dialog-box"
                        initial={{ scale: 0.88, opacity: 0, y: 48 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.88, opacity: 0, y: 48 }}
                        transition={{ type: "spring", stiffness: 280, damping: 26 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="dialog-close" onClick={onClose} aria-label="Close">
                            <FaTimes />
                        </button>

                        {sent ? (
                            <motion.div
                                className="dialog-success"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260 }}
                            >
                                <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
                                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--crimson-dark)", marginBottom: 8 }}>
                                    Enquiry Received!
                                </h3>
                                <p style={{ color: "var(--slate)", fontSize: 14 }}>
                                    Thank you! Our team will reach out to you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="dialog-icon">🏫</div>
                                <h2>Admission Enquiry</h2>
                                <p>Fill in the details — we'll get back within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="dialog-form" noValidate>
                                    <div className="dialog-row">
                                        <div className="dialog-field">
                                            <label>Parent Name *</label>
                                            <input
                                                required
                                                name="parentName"
                                                placeholder="e.g. Ramesh Kumar"
                                                value={formData.parentName}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="dialog-field">
                                            <label>Phone Number *</label>
                                            <input
                                                required
                                                name="phone"
                                                type="tel"
                                                placeholder="e.g. 98765 43210"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div className="dialog-row">
                                        <div className="dialog-field">
                                            <label>Student Name *</label>
                                            <input
                                                required
                                                name="studentName"
                                                placeholder="e.g. Arjun Kumar"
                                                value={formData.studentName}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="dialog-field">
                                            <label>Applying for Class *</label>
                                            <select
                                                required
                                                name="className"
                                                value={formData.className}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Select class…</option>
                                                {["LKG", "UKG", ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`)].map((g) => (
                                                    <option key={g} value={g}>{g}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="dialog-field">
                                        <label>Message (optional)</label>
                                        <textarea
                                            name="message"
                                            rows={3}
                                            placeholder="Any specific questions or requirements…"
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                    </div>

                                    <button type="submit" className="dialog-btn" disabled={loading}>
                                        {loading ? (
                                            <span style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                                                <FaSpinner style={{ animation: "spin 0.8s linear infinite" }} /> Sending…
                                            </span>
                                        ) : (
                                            "Submit Enquiry →"
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── ANIMATED SECTION WRAPPER ─── */
function RevealSection({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

/* ─── FEATURE CARD ─── */
const featureItems = [
    { icon: <FaUserGraduate />, title: "Student Excellence", desc: "Personalized learning paths and continuous academic mentoring for every child." },
    { icon: <FaChalkboardTeacher />, title: "Expert Faculty", desc: "Highly qualified teachers with a passion for student success and growth." },
    { icon: <FaBus />, title: "Safe Transport", desc: "GPS-enabled, AC school buses ensuring safe and punctual commutes." },
    { icon: <FaBook />, title: "Digital Learning", desc: "Smart classrooms with interactive boards and tech-enabled curriculum." },
    { icon: <FaAward />, title: "Top Results", desc: "Consistent district and state-level academic excellence year after year." },
    { icon: <FaPhoneAlt />, title: "Parent Portal", desc: "Real-time attendance, marks, and school updates right on your phone." },
];

const galleryImages = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
];

const busImages = [
    "https://images.pexels.com/photos/32322673/pexels-photo-32322673.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/14189248/pexels-photo-14189248.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/19760978/pexels-photo-19760978.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

/* ─── MAIN COMPONENT ─── */
export default function SchoolLandingPage() {
    const [openDialog, setOpenDialog] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeNav, setActiveNav] = useState("home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#features", label: "Features" },
        { href: "#gallery", label: "Gallery" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --crimson: #8B1A1A;
          --crimson-dark: #6b1a1a;
          --crimson-light: #a52a2a;
          --gold: #D4A017;
          --gold-light: #F0C040;
          --gold-pale: #FFF8E7;
          --cream: #FAF6F0;
          --ink: #1A1A2E;
          --slate: #4A4A6A;
          --muted: #8888AA;
          --white: #ffffff;
          --shadow-sm: 0 2px 12px rgba(139,26,26,0.08);
          --shadow-md: 0 8px 32px rgba(139,26,26,0.12);
          --shadow-lg: 0 20px 60px rgba(139,26,26,0.18);
          --radius: 18px;
          --radius-sm: 10px;
          --font-display: 'Playfair Display', serif;
          --font-body: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-body);
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: var(--crimson); border-radius: 99px; }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          height: 76px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 6%;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 30px rgba(0,0,0,0.08);
          height: 66px;
        }
        .navbar.top { background: transparent; }

        .logo-wrap { display: flex; align-items: center; gap: 14px; text-decoration: none; }
        .logo-badge {
          width: 50px; height: 50px; border-radius: 14px;
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 6px 20px rgba(139,26,26,0.35);
          flex-shrink: 0;
        }
        .logo-text h2 {
          font-family: var(--font-display);
          font-size: 17px; font-weight: 700;
          color: var(--crimson-dark);
          line-height: 1.2;
        }
        .navbar.top .logo-text h2 { color: white; }
        .logo-text p { font-size: 11px; color: var(--gold); font-weight: 500; }

        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-links a {
          font-size: 14px; font-weight: 500; text-decoration: none;
          color: var(--slate); position: relative; padding-bottom: 4px;
          transition: color 0.3s;
        }
        .navbar.top .nav-links a { color: rgba(255,255,255,0.85); }
        .nav-links a::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: var(--gold);
          border-radius: 99px; transition: width 0.3s ease;
        }
        .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
        .nav-links a:hover { color: var(--crimson); }
        .navbar.top .nav-links a:hover { color: var(--gold-light); }

        .nav-right { display: flex; align-items: center; gap: 14px; }

        .login-btn {
          padding: 10px 22px;
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          color: white; border: none; border-radius: var(--radius-sm);
          font-family: var(--font-body); font-size: 14px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px rgba(139,26,26,0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,26,26,0.4);
        }

        .menu-toggle {
          display: none; background: none; border: none; cursor: pointer;
          font-size: 22px; color: var(--crimson);
        }
        .navbar.top .menu-toggle { color: white; }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(300px, 80vw);
          background: white;
          z-index: 1100;
          padding: 80px 32px 40px;
          display: flex; flex-direction: column; gap: 28px;
          box-shadow: -10px 0 40px rgba(0,0,0,0.15);
        }
        .mobile-menu a {
          font-size: 18px; font-weight: 600;
          color: var(--ink); text-decoration: none;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0ebe5;
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: var(--crimson); }
        .mobile-close {
          position: absolute; top: 22px; right: 22px;
          background: none; border: none; font-size: 22px;
          cursor: pointer; color: var(--slate);
        }
        .menu-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          z-index: 1099;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(107,26,26,0.92) 0%, rgba(26,26,46,0.85) 100%),
            url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop') center/cover no-repeat;
          display: flex; align-items: center;
          padding: 156px 6% 80px; /* 76px navbar + 38px marquee + 42px breathing room */
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(212,160,23,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Decorative dots */
        .hero-dots {
          position: absolute; right: 5%; top: 20%;
          width: 220px; height: 220px;
          background-image: radial-gradient(circle, rgba(212,160,23,0.35) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
          opacity: 0.6;
          pointer-events: none;
        }

        .hero-inner {
          width: 100%; max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }

        .hero-badge-wrap { margin-bottom: 22px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,160,23,0.18);
          border: 1px solid rgba(212,160,23,0.4);
          color: var(--gold-light);
          padding: 8px 18px; border-radius: 99px;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.5px;
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold-light);
          animation: blink 1.4s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 62px);
          color: white; line-height: 1.12;
          margin-bottom: 22px;
          font-weight: 900;
        }
        .hero-title span { color: var(--gold-light); display: block; }

        .hero-desc {
          color: rgba(255,255,255,0.78);
          font-size: 17px; line-height: 1.8;
          max-width: 500px; margin-bottom: 36px;
        }

        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--ink); border: none; border-radius: var(--radius-sm);
          font-family: var(--font-body); font-size: 15px; font-weight: 700;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 6px 24px rgba(212,160,23,0.4);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(212,160,23,0.5);
        }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: transparent;
          border: 2px solid rgba(255,255,255,0.5);
          color: white; border-radius: var(--radius-sm);
          font-family: var(--font-body); font-size: 15px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        .hero-stats {
          display: flex; gap: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .hero-stat h3 {
          font-family: var(--font-display);
          font-size: 40px; color: var(--gold-light);
          font-weight: 700; line-height: 1;
        }
        .hero-stat p { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 4px; font-weight: 500; }

        .hero-image-wrap { position: relative; }
        .hero-image-wrap img {
          width: 100%; border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          display: block;
        }
        .hero-image-badge {
          position: absolute; bottom: -20px; left: -20px;
          background: white; border-radius: 16px;
          padding: 16px 22px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          display: flex; align-items: center; gap: 12px;
        }
        .hero-badge-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: white;
        }
        .hero-badge-text strong { display: block; font-size: 15px; color: var(--ink); }
        .hero-badge-text span { font-size: 12px; color: var(--muted); }

        /* ── MARQUEE ── */
        .marquee-strip {
          background: linear-gradient(90deg, var(--crimson-dark), var(--crimson-light));
          padding: 11px 0; overflow: hidden;
          position: fixed; top: 76px; left: 0; width: 100%;
          z-index: 999;
          transition: top 0.4s ease;
          box-shadow: 0 2px 12px rgba(107,26,26,0.25);
        }
        .marquee-strip.nav-scrolled { top: 66px; }
        .marquee-track {
          display: flex; gap: 60px; width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-item {
          white-space: nowrap; color: white;
          font-size: 14px; font-weight: 500;
          display: flex; align-items: center; gap: 10px;
        }
        .marquee-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-light); flex-shrink: 0; }

        /* ── ABOUT ── */
        .about-section {
          padding: 100px 6%;
          background: var(--cream);
        }
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .about-images {
          position: relative;
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .about-img {
          border-radius: 20px; overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .about-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .about-img:first-child { grid-row: span 2; height: 380px; }
        .about-img:not(:first-child) { height: 180px; }

        .about-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(139,26,26,0.08);
          color: var(--crimson-dark);
          padding: 7px 16px; border-radius: 99px;
          font-size: 13px; font-weight: 600;
          margin-bottom: 18px;
          border: 1px solid rgba(139,26,26,0.15);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 46px);
          color: var(--ink); line-height: 1.2;
          margin-bottom: 18px; font-weight: 700;
        }
        .section-title span { color: var(--crimson-dark); }
        .section-desc { color: var(--slate); line-height: 1.8; font-size: 16px; margin-bottom: 30px; }

        .about-checklist { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .about-checklist li {
          display: flex; align-items: center; gap: 12px;
          font-size: 15px; color: var(--slate); font-weight: 500;
        }
        .check-icon {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 12px;
        }

        /* ── FEATURES ── */
        .features-section {
          padding: 100px 6%;
          background: white;
        }
        .section-center { text-align: center; max-width: 600px; margin: 0 auto 64px; }
        .section-center .section-title { margin-bottom: 14px; }
        .section-center p { color: var(--slate); font-size: 16px; line-height: 1.7; }

        .features-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
        }

        .feature-card {
          background: var(--cream);
          border: 1px solid rgba(139,26,26,0.08);
          border-radius: var(--radius);
          padding: 36px 30px;
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          cursor: default;
        }
        .feature-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--crimson-dark), var(--gold));
          opacity: 0; transition: opacity 0.3s;
        }
        .feature-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); background: white; }
        .feature-card:hover::before { opacity: 1; }

        .feature-icon-wrap {
          width: 58px; height: 58px; border-radius: 16px; margin-bottom: 22px;
          background: linear-gradient(135deg, rgba(139,26,26,0.1), rgba(139,26,26,0.06));
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; color: var(--crimson-dark);
          transition: all 0.3s;
        }
        .feature-card:hover .feature-icon-wrap {
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          color: white;
          box-shadow: 0 8px 24px rgba(139,26,26,0.3);
        }
        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 20px; color: var(--ink);
          margin-bottom: 10px; font-weight: 700;
        }
        .feature-card p { color: var(--slate); font-size: 14.5px; line-height: 1.7; }

        /* ── GALLERY ── */
        .gallery-section { padding: 100px 6%; background: var(--cream); }
        .gallery-swiper { border-radius: var(--radius); overflow: hidden; }
        .gallery-slide img {
          width: 100%; height: 300px; object-fit: cover;
          border-radius: var(--radius);
          display: block;
        }

        /* ── BUS SECTION ── */
        .bus-section { padding: 100px 6%; background: white; }
        .bus-section .section-center { margin-bottom: 48px; }
        .bus-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .bus-card {
          border-radius: var(--radius); overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          position: relative;
        }
        .bus-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(107,26,26,0.5) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.3s;
        }
        .bus-card:hover { transform: scale(1.04) translateY(-8px); box-shadow: var(--shadow-lg); }
        .bus-card:hover::after { opacity: 1; }
        .bus-card img { width: 100%; height: 240px; object-fit: cover; display: block; }

        /* ── STATS BAND ── */
        .stats-band {
          background: linear-gradient(135deg, var(--crimson-dark), var(--ink));
          padding: 70px 6%;
          position: relative; overflow: hidden;
        }
        .stats-band::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 300px; height: 300px; border-radius: 50%;
          background: rgba(212,160,23,0.08);
          pointer-events: none;
        }
        .stats-band-inner {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 40px; text-align: center;
        }
        .stat-item {}
        .stat-item h3 {
          font-family: var(--font-display);
          font-size: 50px; color: var(--gold-light);
          font-weight: 700; line-height: 1;
        }
        .stat-item p { color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 8px; font-weight: 500; }
        .stat-divider { width: 1px; background: rgba(255,255,255,0.12); height: 60px; margin: 0 auto; }

        /* ── CTA ── */
        .cta-section {
          padding: 110px 6%; text-align: center;
          background: var(--gold-pale);
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '🎓'; position: absolute;
          font-size: 200px; opacity: 0.04;
          top: -40px; right: 5%; pointer-events: none;
        }
        .cta-section h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 54px);
          color: var(--crimson-dark); margin-bottom: 16px;
        }
        .cta-section p { color: var(--slate); font-size: 17px; margin-bottom: 36px; }

        /* ── FOOTER ── */
        .footer {
          background: var(--ink); color: white;
          padding: 72px 6% 0;
        }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px; padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer-brand p { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 1.8; margin: 16px 0 22px; }
        .footer-contact-list { display: flex; flex-direction: column; gap: 10px; }
        .footer-contact-list a {
          display: flex; align-items: center; gap: 10px;
          color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px;
          transition: color 0.2s;
        }
        .footer-contact-list a:hover { color: var(--gold-light); }
        .footer-contact-list svg { color: var(--gold); flex-shrink: 0; }

        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 17px; font-weight: 700; margin-bottom: 22px; color: white;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-col ul li a {
          color: rgba(255,255,255,0.55); text-decoration: none; font-size: 14px;
          transition: color 0.2s; display: inline-block;
        }
        .footer-col ul li a:hover { color: var(--gold-light); transform: translateX(4px); }

        .footer-bottom {
          padding: 20px 0;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 13px; color: rgba(255,255,255,0.35);
          flex-wrap: wrap; gap: 10px;
        }
        .footer-logo { font-family: var(--font-display); font-size: 18px; color: white; margin-bottom: 4px; }
        .footer-tel { color: var(--gold-light); font-weight: 600; }

        /* ── FLOATING WHATSAPP ── */
        .floating-wa {
          position: fixed; right: 26px; bottom: 86px;
          width: 62px; height: 62px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; color: white; text-decoration: none;
          box-shadow: 0 8px 30px rgba(37,211,102,0.4);
          z-index: 9998;
          animation: waPulse 2.5s infinite;
          transition: transform 0.3s;
        }
        .floating-wa:hover { transform: scale(1.12); }
        @keyframes waPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)}
          60%{box-shadow:0 0 0 16px rgba(37,211,102,0)}
        }

        /* ── BOTTOM NAV (mobile) ── */
        .bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0;
          background: white; padding: 12px 0 10px;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.1);
          z-index: 9990;
          justify-content: space-around;
        }
        .bottom-nav a {
          color: var(--slate); text-decoration: none;
          font-size: 12px; font-weight: 600;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .bottom-nav a:hover { color: var(--crimson); }

        /* ── DIALOG ── */
        .dialog-backdrop {
          position: fixed; inset: 0;
          background: rgba(10,10,20,0.65);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .dialog-box {
          background: white; border-radius: 24px;
          padding: 10px 36px; width: min(560px, 100%);
          position: relative; text-align: center;
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          max-height: 90vh; overflow-y: auto;
        }
        .dialog-close {
          position: absolute; top: 16px; right: 18px;
          background: none; border: none; font-size: 18px;
          cursor: pointer; color: var(--muted);
          transition: color 0.2s; z-index: 1;
        }
        .dialog-close:hover { color: var(--crimson); }
        .dialog-icon { font-size: 42px; margin-bottom: 12px; }
        .dialog-box h2 {
          font-family: var(--font-display);
          font-size: 26px; color: var(--crimson-dark);
          margin-bottom: 6px;
        }
        .dialog-box > p { color: var(--muted); font-size: 14px; margin-bottom: 24px; }

        .dialog-form { display: flex; flex-direction: column; gap: 16px; text-align: left; }
        .dialog-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .dialog-field { display: flex; flex-direction: column; gap: 6px; }
        .dialog-field label {
          font-size: 12px; font-weight: 600; color: var(--slate);
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .dialog-field input,
        .dialog-field select,
        .dialog-field textarea {
          padding: 12px 16px; border: 1.5px solid #e5e0da;
          border-radius: 10px; font-family: var(--font-body); font-size: 14.5px;
          color: var(--ink); background: #faf8f5;
          outline: none; transition: border-color 0.25s, box-shadow 0.25s;
          width: 100%; resize: vertical;
        }
        .dialog-field input:focus,
        .dialog-field select:focus,
        .dialog-field textarea:focus {
          border-color: var(--crimson-dark);
          box-shadow: 0 0 0 3px rgba(139,26,26,0.08);
          background: white;
        }
        .dialog-field input:disabled,
        .dialog-field select:disabled,
        .dialog-field textarea:disabled { opacity: 0.6; cursor: not-allowed; }

        .dialog-btn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          background: linear-gradient(135deg, var(--crimson-dark), var(--crimson-light));
          color: white; font-family: var(--font-body); font-size: 16px;
          font-weight: 700; cursor: pointer; margin-top: 4px;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(139,26,26,0.3);
        }
        .dialog-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(139,26,26,0.4); }
        .dialog-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .dialog-success {
          padding: 28px 20px; text-align: center;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 500px) {
          .dialog-row { grid-template-columns: 1fr; }
          .dialog-box { padding: 32px 22px; }
        }

        /* ── MAP SECTION ── */
        .map-section {
          padding: 100px 6%;
          background: var(--cream);
        }
        .map-section .section-center { margin-bottom: 48px; }
        .map-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: 40px; align-items: stretch;
        }
        .map-info {
          background: white; border-radius: var(--radius);
          padding: 40px 36px;
          box-shadow: var(--shadow-sm);
          display: flex; flex-direction: column; gap: 28px;
        }
        .map-info h3 {
          font-family: var(--font-display);
          font-size: 26px; color: var(--crimson-dark); font-weight: 700;
        }
        .map-contact-row {
          display: flex; align-items: flex-start; gap: 16px;
        }
        .map-icon-box {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(139,26,26,0.1), rgba(139,26,26,0.06));
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: var(--crimson-dark);
        }
        .map-contact-row strong { display: block; font-size: 13px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .map-contact-row a, .map-contact-row p {
          color: var(--ink); text-decoration: none; font-size: 15px; font-weight: 500;
          transition: color 0.2s; margin: 0;
        }
        .map-contact-row a:hover { color: var(--crimson-dark); }
        .map-divider { height: 1px; background: #f0ebe5; }
        .map-hours { }
        .map-hours h4 { font-size: 14px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .map-hours-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
        .map-hours-row span:first-child { color: var(--slate); }
        .map-hours-row span:last-child { font-weight: 600; color: var(--ink); }

        .map-frame-wrap {
          border-radius: var(--radius); overflow: hidden;
          box-shadow: var(--shadow-md);
          min-height: 420px;
          position: relative;
        }
        .map-frame-wrap iframe {
          width: 100%; height: 100%; min-height: 420px;
          border: none; display: block;
        }
        .map-frame-label {
          position: absolute; top: 16px; left: 16px;
          background: white; border-radius: 10px;
          padding: 8px 14px; font-size: 13px; font-weight: 600;
          color: var(--crimson-dark);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          display: flex; align-items: center; gap: 7px;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .map-inner { grid-template-columns: 1fr; }
          .map-frame-wrap { min-height: 320px; }
          .map-frame-wrap iframe { min-height: 320px; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
          .stats-band-inner { grid-template-columns: repeat(2,1fr); gap: 32px; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .menu-toggle { display: flex; }

          .hero { padding: 140px 5% 70px; min-height: auto; }
          .hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hero-image-wrap { order: -1; }
          .hero-image-badge { display: none; }
          .hero-stats { gap: 24px; }
          .hero-stat h3 { font-size: 30px; }

          .about-inner { grid-template-columns: 1fr; gap: 40px; }
          .about-images { height: 300px; }
          .about-img:first-child { height: 260px; }
          .about-img:not(:first-child) { height: 130px; }

          .features-grid { grid-template-columns: 1fr; }
          .bus-grid { grid-template-columns: 1fr 1fr; }
          .footer-top { grid-template-columns: 1fr; }
          .bottom-nav { display: flex; }
          body { padding-bottom: 60px; }
          .footer-bottom { flex-direction: column; text-align: center; }
          .stats-band-inner { grid-template-columns: repeat(2,1fr); }
        }

        @media (max-width: 500px) {
          .bus-grid { grid-template-columns: 1fr; }
          .hero-btns { flex-direction: column; }
          .btn-primary, .btn-outline { width: 100%; justify-content: center; }
          .hero-stats { flex-wrap: wrap; gap: 20px; }
        }
      `}</style>

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        borderRadius: 12,
                        padding: "14px 20px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                    success: { iconTheme: { primary: "#6b1a1a", secondary: "#fff" } },
                }}
            />
            <div className="landing-page">

                {/* ── NAVBAR ── */}
                <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
                    <a href="#home" className="logo-wrap">
                        <div className="logo-badge">🏫</div>
                        <div className="logo-text">
                            <h2>Srinivasa Vidhyanikethan</h2>
                            <p>శ్రీనివాస విద్యానికేతన్</p>
                        </div>
                    </a>

                    <div className="nav-links">
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href}>{l.label}</a>
                        ))}
                    </div>

                    <div className="nav-right">
                        <a href="/login" className="login-btn">Staff Login</a>
                        <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
                            <FaBars />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            <motion.div
                                className="menu-overlay"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setMenuOpen(false)}
                            />
                            <motion.div
                                className="mobile-menu"
                                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                            >
                                <button className="mobile-close" onClick={() => setMenuOpen(false)}><FaTimes /></button>
                                {navLinks.map(l => (
                                    <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
                                ))}
                                <a href="/login" className="login-btn" style={{ textAlign: "center", marginTop: 10 }}>Staff Login</a>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ── MARQUEE ── */}
                <div className={`marquee-strip${scrolled ? " nav-scrolled" : ""}`}>
                    <div className="marquee-track">
                        {Array(4).fill([
                            "📣 Admissions Open 2026-27",
                            "🏆 100% Board Results – Class X",
                            "🚌 GPS-Enabled Transport Available",
                            "📚 Smart Classrooms Installed",
                            "🎉 Annual Sports Day – June 15th",
                            "📞 Contact: +91 8978762659",
                        ]).flat().map((item, i) => (
                            <span className="marquee-item" key={i}>
                                <span className="marquee-dot" /> {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── HERO ── */}
                <section className="hero" id="home">
                    <div className="hero-dots" />
                    <div className="hero-inner">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="hero-badge-wrap">
                                <span className="hero-badge">
                                    <span className="badge-dot" /> Admissions Open 2026-27
                                </span>
                            </div>

                            <h1 className="hero-title">
                                Building Bright Futures Through
                                <span>Quality Education</span>
                            </h1>

                            <p className="hero-desc">
                                A modern learning environment blending discipline, academics, digital innovation, and holistic student development.
                            </p>

                            <div className="hero-btns">
                                <button className="btn-primary" onClick={() => setOpenDialog(true)}>
                                    Apply for Admission
                                </button>
                                <a href="#features" className="btn-outline">Explore Campus</a>
                            </div>

                            <div className="hero-stats">
                                {[
                                    { end: 842, label: "Students" },
                                    { end: 48, label: "Teachers" },
                                    { end: 98, label: "Pass Rate", suffix: "%" },
                                    { end: 15, label: "Years Legacy", suffix: "+" },
                                ].map((s) => (
                                    <div className="hero-stat" key={s.label}>
                                        <h3><CountUp end={s.end} duration={2.5} />{s.suffix || ""}</h3>
                                        <p>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="hero-image-wrap"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop"
                                alt="Students learning"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="hero-image-badge">
                                <div className="hero-badge-icon">🏆</div>
                                <div className="hero-badge-text">
                                    <strong>Top Ranked School</strong>
                                    <span>Telangana District, 2025</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── ABOUT ── */}
                <section className="about-section" id="about">
                    <div className="about-inner">
                        <RevealSection delay={0}>
                            <div className="about-images">
                                <div className="about-img">
                                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="School" />
                                </div>
                                <div className="about-img">
                                    <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" alt="Classroom" />
                                </div>
                                <div className="about-img">
                                    <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=800&auto=format&fit=crop" alt="Students" />
                                </div>
                            </div>
                        </RevealSection>

                        <RevealSection delay={0.15}>
                            <div className="about-pill">📖 About Us</div>
                            <h2 className="section-title">
                                A Legacy of <span>Excellence</span> Since 2010
                            </h2>
                            <p className="section-desc">
                                Srinivasa Vidhyanikethan has been shaping young minds with a blend of traditional values and modern pedagogy. Our campus in Laxmipuram is a nurturing ground for academic brilliance and character building.
                            </p>
                            <ul className="about-checklist">
                                {[
                                    "CBSE / State board curriculum with bilingual instruction",
                                    "State-of-the-art smart classrooms and science labs",
                                    "Extracurricular programs: arts, sports, and leadership",
                                    "Dedicated parent engagement and real-time communication",
                                ].map((item) => (
                                    <li key={item}>
                                        <span className="check-icon">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="btn-primary" onClick={() => setOpenDialog(true)}>
                                Book a School Visit
                            </button>
                        </RevealSection>
                    </div>
                </section>

                {/* ── STATS BAND ── */}
                <section className="stats-band">
                    <div className="stats-band-inner">
                        {[
                            { end: 842, suffix: "+", label: "Enrolled Students" },
                            { end: 48, suffix: "", label: "Expert Educators" },
                            { end: 98, suffix: "%", label: "Pass Rate 2025" },
                            { end: 15, suffix: "+", label: "Years of Excellence" },
                        ].map((s) => (
                            <RevealSection key={s.label}>
                                <div className="stat-item">
                                    <h3><CountUp end={s.end} duration={2.5} />{s.suffix}</h3>
                                    <p>{s.label}</p>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section className="features-section" id="features">
                    <div className="section-center">
                        <div className="about-pill" style={{ margin: "0 auto 16px" }}>⭐ Why Choose Us</div>
                        <h2 className="section-title">Everything Your Child <span>Deserves</span></h2>
                        <p>Empowering students with education, values, and innovation every single day.</p>
                    </div>

                    <div className="features-grid">
                        {featureItems.map((item, i) => (
                            <RevealSection key={item.title} delay={i * 0.08}>
                                <div className="feature-card">
                                    <div className="feature-icon-wrap">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </section>

                {/* ── GALLERY ── */}
                <section className="gallery-section" id="gallery">
                    <div className="section-center">
                        <div className="about-pill" style={{ margin: "0 auto 16px" }}>📷 Campus Gallery</div>
                        <h2 className="section-title">Life at <span>Srinivasa Vidhyanikethan</span></h2>
                    </div>

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        autoplay={{ delay: 2800, disableOnInteraction: false }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="gallery-swiper"
                    >
                        {galleryImages.map((img, i) => (
                            <SwiperSlide key={i} className="gallery-slide">
                                <img src={img} alt={`Gallery ${i + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

                {/* ── BUS SECTION ── */}
                <section className="bus-section">
                    <div className="section-center">
                        <div className="about-pill" style={{ margin: "0 auto 16px" }}>🚌 Safe Transport</div>
                        <h2 className="section-title">School <span>Transport Fleet</span></h2>
                        <p>GPS-enabled, air-conditioned buses ensuring safe, timely pickups and drop-offs every day.</p>
                    </div>

                    <div className="bus-grid">
                        {busImages.map((img, i) => (
                            <RevealSection key={i} delay={i * 0.1}>
                                <div className="bus-card">
                                    <img src={img} alt="School bus" />
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="cta-section">
                    <RevealSection>
                        <h2>Admissions Are Now Open</h2>
                        <p>Give your child the foundation for a brilliant future. Limited seats available.</p>
                        <button className="btn-primary" style={{ fontSize: 17, padding: "16px 36px" }} onClick={() => setOpenDialog(true)}>
                            Contact School Today
                        </button>
                    </RevealSection>
                </section>

                {/* ── MAP / LOCATION ── */}
                <section className="map-section" id="location">
                    <div className="section-center">
                        <div className="about-pill" style={{ margin: "0 auto 16px" }}>📍 Find Us</div>
                        <h2 className="section-title">Our <span>Location</span></h2>
                        <p style={{ color: "var(--slate)", fontSize: 16 }}>Easily accessible from all major areas of Laxmipuram, Telangana.</p>
                    </div>

                    <div className="map-inner">
                        {/* Info Card */}
                        <RevealSection delay={0}>
                            <div className="map-info">
                                <h3>Srinivasa Vidhyanikethan</h3>

                                <div className="map-contact-row">
                                    <div className="map-icon-box"><FaMapMarkerAlt /></div>
                                    <div>
                                        <strong>Address</strong>
                                        <p>MR76+8F2, Laxmipuram, Burgampadu, Telangana 507114</p>
                                    </div>
                                </div>

                                <div className="map-divider" />

                                <div className="map-contact-row">
                                    <div className="map-icon-box"><FaPhoneAlt /></div>
                                    <div>
                                        <strong>Phone</strong>
                                        <a href="tel:+918978762659">+91 89787 62659</a>
                                    </div>
                                </div>

                                <div className="map-contact-row">
                                    <div className="map-icon-box"><FaEnvelope /></div>
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:arunkumar1992@gmail.com">arunkumar1992@gmail.com</a>
                                    </div>
                                </div>

                                <div className="map-contact-row">
                                    <div className="map-icon-box"><FaWhatsapp style={{ color: "#25D366" }} /></div>
                                    <div>
                                        <strong>WhatsApp</strong>
                                        <a href="https://wa.me/918978762659" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>
                                    </div>
                                </div>

                                <div className="map-divider" />

                                <div className="map-hours">
                                    <h4>School Hours</h4>
                                    <div className="map-hours-row"><span>Mon – Fri</span><span>8:30 AM – 4:30 PM</span></div>
                                    <div className="map-hours-row"><span>Saturday</span><span>8:30 AM – 1:00 PM</span></div>
                                    <div className="map-hours-row"><span>Sunday</span><span>Closed</span></div>
                                </div>

                                <button className="btn-primary" onClick={() => setOpenDialog(true)} style={{ marginTop: 4 }}>
                                    Book a School Visit
                                </button>
                            </div>
                        </RevealSection>

                        {/* Map */}
                        <RevealSection delay={0.12}>
                            <div className="map-frame-wrap">
                                <div className="map-frame-label">
                                    <FaMapMarkerAlt style={{ color: "var(--crimson-dark)" }} />
                                    Laxmipuram, Telangana
                                </div>
                                {/* <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30635.06474832895!2d79.24741!3d17.05815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf0d73aba5e71%3A0x3e1c6e3ee3a19bc!2sLaxmipuram%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                /> */}
                                <iframe
                                    title="School Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475.21542151378185!2d80.81062686237289!3d17.663256105304598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a36a81e25544fe7%3A0x7c0f02c7dc669e76!2sSri%20Srinivasa%20Vidyanikethan!5e0!3m2!1sen!2sin!4v1778668461167!5m2!1sen!2sin"
                                     width="600" 
                                     height="450"
                                    //   style="border:0;" 
                                      allowfullscreen="" 
                                      loading="lazy" 
                                      referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </RevealSection>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="footer" id="contact">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="footer-logo">Srinivasa Vidhyanikethan</div>
                            <p>శ్రీనివాస విద్యానికేతన్ — Nurturing excellence, values, and bright futures since 2010.</p>
                            <div className="footer-contact-list">
                                <a href="#"><FaMapMarkerAlt /> Laxmipuram, Telangana, India</a>
                                <a href="tel:+918978762659"><FaPhoneAlt /> <span className="footer-tel">+91 8978762659</span></a>
                                <a href="mailto:arunkumar1992@gmail.com"><FaEnvelope /> arunkumar1992@gmail.com</a>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Academics</h4>
                            <ul>
                                <li><a href="/">Examinations</a></li>
                                <li><a href="/">Results</a></li>
                                <li><a href="/">Library</a></li>
                                <li><a href="/">Timetable</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>School Life</h4>
                            <ul>
                                <li><a href="/">Sports</a></li>
                                <li><a href="/">Cultural Events</a></li>
                                <li><a href="/">Clubs</a></li>
                                <li><a href="/">Achievements</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#gallery">Gallery</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <span>© 2026 Srinivasa Vidhyanikethan. All rights reserved.</span>
                        <span>Designed with ❤️ for quality education</span>
                    </div>
                </footer>

                {/* ── FLOATING WHATSAPP ── */}
                <a
                    href="https://wa.me/918978762659?text=Hello%20Sir%2C%20I%20want%20to%20know%20about%20admissions%20for%202026-27"
                    target="_blank" rel="noopener noreferrer"
                    className="floating-wa"
                    aria-label="Chat on WhatsApp"
                >
                    <FaWhatsapp />
                </a>

                {/* ── BOTTOM NAV (mobile) ── */}
                <nav className="bottom-nav">
                    {navLinks.slice(0, 4).map(l => (
                        <a key={l.href} href={l.href}>{l.label}</a>
                    ))}
                </nav>

                {/* ── DIALOG ── */}
                <ContactDialog open={openDialog} onClose={() => setOpenDialog(false)} />
            </div>
        </>
    );
}