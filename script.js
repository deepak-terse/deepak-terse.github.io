/* =========================================================
   1 THEME
========================================================= */
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const toggleIcon = toggle.querySelector("use");
const themeColor = document.querySelector('meta[name="theme-color"]');
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

let followsSystem = true;
try {
	const savedTheme = localStorage.getItem("deepak-theme");
	followsSystem = savedTheme !== "light" && savedTheme !== "dark";
} catch {
	// Without storage, follow the system until the visitor chooses a theme.
}

const currentTheme = () =>
	root.dataset.theme === "system"
		? (prefersDark.matches ? "dark" : "light")
		: root.dataset.theme;

const syncTheme = () => {
	themeColor.content = getComputedStyle(root).getPropertyValue("--bg").trim();
	const isDark = currentTheme() === "dark";
	toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
	toggleIcon.setAttribute("href", isDark ? "#i-moon" : "#i-sun");
};

toggle.addEventListener("click", () => {
	const next = currentTheme() === "dark" ? "light" : "dark";
	root.dataset.theme = next;
	followsSystem = false;
	try {
		localStorage.setItem("deepak-theme", next);
	} catch {
		// The theme still changes for this page view when storage is unavailable.
	}
	syncTheme();
});

prefersDark.addEventListener("change", () => {
	if (!followsSystem) return;
	syncTheme();
});
syncTheme();

/* =========================================================
   2 SCROLL REVEAL
========================================================= */
const sections = [...document.querySelectorAll(".chapter")];
const chapterInners = sections
	.map((section) => section.querySelector(".chapter-inner"))
	.filter(Boolean);

chapterInners[0]?.classList.add("is-visible");
root.classList.add("reveal-ready");

const reveal = new IntersectionObserver((entries, observer) => {
	entries.forEach(({ isIntersecting, target }) => {
		if (!isIntersecting) return;
		target.classList.add("is-visible");
		observer.unobserve(target);
	});
}, { rootMargin: "0px 0px -30px 0px" });

chapterInners.forEach((inner) => reveal.observe(inner));

/* =========================================================
   3 ACTIVE CHAPTER (dot nav)
========================================================= */
const links = [...document.querySelectorAll(".chapter-nav a")];
let activeUpdatePending = false;
let trackedSectionId = null;
let sectionStartedAt = null;

const finishSectionTiming = () => {
	if (!trackedSectionId || sectionStartedAt === null) return;

	const durationSeconds = Math.round((performance.now() - sectionStartedAt) / 1000);
	sectionStartedAt = null;
	if (durationSeconds < 1) return;

	window.umami?.track("section-time", {
		section: trackedSectionId,
		duration_seconds: durationSeconds,
	});
};

const startSectionTiming = () => {
	if (document.visibilityState !== "visible" || !trackedSectionId || sectionStartedAt !== null) return;
	sectionStartedAt = performance.now();
};

const updateActiveChapter = () => {
	activeUpdatePending = false;
	const activationLine = window.innerHeight * 0.27;
	let currentSection = sections[0];

	for (const section of sections) {
		if (section.getBoundingClientRect().top > activationLine) break;
		currentSection = section;
	}

	if (!currentSection) return;
	if (currentSection.getBoundingClientRect().bottom <= activationLine) {
		finishSectionTiming();
		trackedSectionId = null;
	} else {
		if (currentSection.id !== trackedSectionId) {
			finishSectionTiming();
			trackedSectionId = currentSection.id;
		}
		startSectionTiming();
	}

	links.forEach((link) => {
		if (link.hash === `#${currentSection.id}`) {
			link.setAttribute("aria-current", "location");
		} else {
			link.removeAttribute("aria-current");
		}
	});
};

const scheduleActiveUpdate = () => {
	if (activeUpdatePending) return;
	activeUpdatePending = true;
	window.requestAnimationFrame(updateActiveChapter);
};

window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveUpdate);
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "hidden") {
		finishSectionTiming();
	} else {
		updateActiveChapter();
	}
});
window.addEventListener("pagehide", finishSectionTiming);
window.addEventListener("pageshow", updateActiveChapter);
updateActiveChapter();
