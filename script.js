document.addEventListener("DOMContentLoaded", () => {
    // Theme Switcher Engine
    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const theme = e.target.getAttribute("data-theme");
            document.documentElement.setAttribute("data-theme", theme);
            document.querySelector(".theme-btn.active").classList.remove("active");
            e.target.classList.add("active");
            localStorage.setItem("theme", theme);
        });
    });

    const savedTheme = localStorage.getItem("theme") || "liquid-quantum";
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.querySelector(".theme-btn.active")?.classList.remove("active");
    document
        .querySelector(`[data-theme="${savedTheme}"]`)
        ?.classList.add("active");

    // Navigation Active State Highlighting Tracker
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            document.querySelector(".nav-item.active")?.classList.remove("active");
            this.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(35px)";
        card.style.transition =
            "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    const projectObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetCard = entry.target;
                    targetCard.style.opacity = "1";
                    targetCard.style.transform = "translateY(0)";
                    observer.unobserve(targetCard);
                }
            });
        },
        {
            threshold: 0.12,
        },
    );

    projectCards.forEach((card) => projectObserver.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. LEFT SIDE: Hero Title Typewriter
    const roles = [
        "Frontend Developer",
        "UI/UX Designer",
        "AI Prompt Engineer",
        "Web Innovator"
    ];

    const typingElement = document.getElementById("typing-text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeHeroRole() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(typeHeroRole, typeSpeed);
    }

    typeHeroRole();


    // 2. RIGHT SIDE: Terminal Auto-Fit Content
    const categoriesData = [
        {
            category: "Frontend Stack",
            icon: "fa-solid fa-layer-group",
            items: [
                { name: "HTML5", icon: "fa-brands fa-html5" },
                { name: "CSS3 UI", icon: "fa-brands fa-css3-alt" },
                { name: "JavaScript", icon: "fa-brands fa-js" },
                { name: "Tailwind CSS \ Bootstrap 5", icon: "fa-brands fa-bootstrap" }
            ]
        },
        {
            category: "Logic & AI Stack",
            icon: "fa-solid fa-code-branch",
            items: [
                { name: "Python", icon: "fa-brands fa-python" },
                { name: "Problem Solving", icon: "fa-solid fa-puzzle-piece" },
                { name: "AI Agent Logic", icon: "fa-solid fa-robot" }
            ]
        }
    ];

    const contentContainer = document.getElementById("terminal-content");

    async function typeWriterText(text, element, speed = 30) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(res => setTimeout(res, speed));
        }
    }

    async function renderTerminalUI() {
        if (!contentContainer) return;
        contentContainer.innerHTML = "";

        // Command Prompt
        const promptDiv = document.createElement("div");
        promptDiv.className = "command-prompt-line";
        promptDiv.innerHTML = `<span class="cmd-host">dev@system:~$</span> <span id="cmd-typing"></span><span class="terminal-cursor"></span>`;
        contentContainer.appendChild(promptDiv);

        const typingCmdElement = document.getElementById("cmd-typing");

        await new Promise(res => setTimeout(res, 700));
        await typeWriterText("fetch --categories --skills", typingCmdElement, 30);
        await new Promise(res => setTimeout(res, 150));

        // Remove cursor
        document.querySelector(".terminal-cursor")?.remove();

        // Print Categories
        for (const cat of categoriesData) {
            const catBlock = document.createElement("div");
            catBlock.className = "category-block";

            let itemsHTML = "";
            cat.items.forEach(item => {
                itemsHTML += `
                    <div class="icon-chip">
                        <i class="${item.icon}"></i>
                        <span>${item.name}</span>
                    </div>
                `;
            });

            catBlock.innerHTML = `
                <div class="category-header">
                    <i class="${cat.icon}"></i> ${cat.category}
                </div>
                <div class="icon-grid">
                    ${itemsHTML}
                </div>
            `;

            contentContainer.appendChild(catBlock);
            await new Promise(res => setTimeout(res, 200));
        }

        // Completion Line
        const finalLine = document.createElement("div");
        finalLine.className = "command-prompt-line";
        finalLine.style.marginTop = "8px";
        finalLine.innerHTML = `<span class="cmd-host">dev@system:~$</span> Stack initialized.<span class="terminal-cursor"></span>`;
        contentContainer.appendChild(finalLine);
    }

    renderTerminalUI();
});