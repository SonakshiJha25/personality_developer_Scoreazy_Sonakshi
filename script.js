const faqs = document.querySelectorAll('.faq-question');

faqs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item);
});

// ______________ Time Line _______________

const timelineButtons = document.querySelectorAll(".timeline-btn");
const timelineContent = document.getElementById("timelineContent");

const timelines = {
  4: [
    { title: "🧠 Week 1: Self-Awareness", desc: "Discover your strengths and identify areas to grow." },
    { title: "🗣️ Week 2: Communication", desc: "Learn to speak confidently and listen actively." },
    { title: "🎯 Week 3: Confidence", desc: "Engage in roleplay, feedback, and self-expression." },
    { title: "💬 Week 4: Public Speaking", desc: "Deliver short speeches with clarity and impact." },
    { title: "Price", desc: "💎 Price: ₹3,499 only", isPrice: true }
  ],
  6: [
    { title: "🧠 Week 1: Self-Awareness", desc: "Discover your strengths and identify areas to grow." },
    { title: "🗣️ Week 2: Communication", desc: "Learn to speak confidently and listen actively." },
    { title: "⏳ Week 3: Time Management", desc: "Balance priorities and boost productivity." },
    { title: "🎯 Week 4: Confidence", desc: "Engage in roleplay, feedback, and self-expression." },
    { title: "💬 Week 5: Public Speaking", desc: "Deliver short speeches with clarity and impact." },
    { title: "👥 Week 6: Teamwork", desc: "Collaborate effectively and lead with empathy." },
    { title: "Price", desc: "💎 Price: ₹5,499 only", isPrice: true }
  ]
};

timelineButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    timelineButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const weeks = btn.dataset.duration;
    const data = timelines[weeks];

    timelineContent.className = "timeline-grid";
    timelineContent.classList.add(`layout-${weeks}`);

    timelineContent.innerHTML = data
      .map(item =>
        item.isPrice
          ? `<div class="timeline-price">${item.desc}</div>`
          : `<div class="timeline-card">
               <h3>${item.title}</h3>
               <p>${item.desc}</p>
             </div>`
      )
      .join("");
  });
});

document.querySelector(".timeline-btn.active").click();

// _________ Testimonial _______________
const testimonials = [
  {
    name: "Aditi Sharma",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This program gave me a new level of confidence! The sessions were interactive and truly practical.",
    rating: 5
  },
  {
    name: "Rajeev Verma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Before this, I used to avoid public speaking. Now I love sharing ideas in groups. Great trainers!",
    rating: 4
  },
  {
    name: "Sneha Mehta",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "Loved how each week built on the previous one. Time management session was 🔥. Would highly recommend.",
    rating: 5
  },
  {
    name: "Aryan Nanda",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    text: "I struggled with confidence. But the mentors here made everything feel achievable. Really thankful!",
    rating: 5
  },
  {
    name: "Pooja Das",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    text: "Beautifully structured program. Activities, examples, roleplays... it all came together perfectly!",
    rating: 4
  },
  {
    name: "Karan Patel",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    text: "Gained so much clarity about self-discipline and effective communication. Thank you so much ❤️",
    rating: 5
  },
  {
    name: "Ananya Ghosh",
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    text: "This training should be compulsory for students! Loved the energy and personal growth I experienced.",
    rating: 5
  },
  {
    name: "Mohit Rao",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    text: "From day one, I felt welcomed and challenged. Sessions never felt boring. Totally worth it.",
    rating: 4
  }
];

let currentIndex = 0;
const cardsVisible = 3;

function renderTestimonials() {
  const track = document.getElementById("testimonialTrack");
  track.innerHTML = testimonials
    .map(t => `
      <div class="testimonial-card">
        <img src="${t.image}" alt="${t.name}" />
        <h3>${t.name}</h3>
        <p>${t.text}</p>
        <div class="stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
      </div>
    `).join("");
  updateSlide();
}

function updateSlide() {
  const cardWidth = document.querySelector(".testimonial-card").offsetWidth + 20; // spacing
  const track = document.getElementById("testimonialTrack");
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function prevSlide() {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateSlide();
}

function nextSlide() {
  const maxIndex = testimonials.length - cardsVisible;
  currentIndex = Math.min(currentIndex + 1, maxIndex);
  updateSlide();
}

window.addEventListener("resize", updateSlide);
window.addEventListener("load", renderTestimonials);

// FAQ's and forms
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const arrow = question.querySelector('.arrow');

    // Close all open FAQs
    document.querySelectorAll('.faq-answer').forEach((a) => a.classList.remove('open'));
    document.querySelectorAll('.arrow').forEach((a) => a.classList.remove('rotate'));

    // Toggle current
    if (!answer.classList.contains('open')) {
      answer.classList.add('open');
      arrow.classList.add('rotate');
    }
  });
});

// Footer

const icons = document.querySelectorAll('.social-icons i');
icons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    icon.style.transform = 'scale(1.2)';
  });
  icon.addEventListener('mouseout', () => {
    icon.style.transform = 'scale(1)';
  });
});

