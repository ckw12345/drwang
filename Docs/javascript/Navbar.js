const navbar = document.getElementById("navbar");

navbar.innerHTML = `
  <div class="w-full fixed z-50 top-0 left-0">
    <div class="bg-white flex-col w-full md:h-24 h-40 flex items-center justify-center ">
      <div class="flex items-center justify-between max-w-7xl w-full mx-auto md:p-5 p-3">
        <a href="./index.html" class="w-full max-w-[20rem]">
          <img src="/Docs/Assets/main-logo.png" class="md:h-12 h-8" alt="">
        </a>
        <div data-aos="zoom-out-left" class="flex items-center md:gap-5 gap-1 lg:w-full justify-end">
          <div class="lg:block hidden text-gray-700">
            <a href="tel:+6048323568" class="flex text-[15px] items-center gap-2 hover:underline">
              <i class="fa-solid fa-phone"></i> 604-832-3568
            </a>
            <a href="mailto:tcmclinic12@gmail.com" class="flex text-[15px] items-center gap-2 hover:underline mt-1.5">
              <i class="fa-regular text-lg fa-envelope"></i> tcmclinic12@gmail.com
            </a>
          </div>
          <a href="/contact.html">
            <button class="md:block hidden md:p-3 p-2 w-full bg-[#59312c] text-white rounded-sm transition-all duration-500 hover:opacity-80 cursor-pointer text-nowrap">Book Now</button>
          </a>
          <div class="flex flex-col mt-2 ml-3 justify-center items-center text-[#59312c] cursor-pointer" id="openNav">
            <div class="md:w-12 w-10 rounded-full h-0.5 bg-[#59312c]"></div>
            <div class="md:w-12 w-10 rounded-full h-0.5 mt-1.5 mb-1 bg-[#59312c]"></div>
            <p class="md:text-[16px] text-sm">Menu</p>
          </div>
        </div>
      </div>

      <div class="md:hidden flex items-center justify-between max-w-7xl w-full mx-auto md:p-5 p-3">
        <div class="text-gray-700 text-sm">
          <a href="tel:+6048323568" class="flex items-center gap-2 hover:underline"><i class="fa-solid fa-phone"></i> 604-832-3568</a>
          <a href="mailto:tcmclinic12@gmail.com" class="flex items-center gap-2 hover:underline mt-1.5"><i class="fa-regular text-lg fa-envelope"></i> tcmclinic12@gmail.com</a>
        </div>
        <a href="/contact.html">
          <button class="md:p-3 p-2 w-full bg-[#59312c] text-white rounded-sm transition-all duration-500 hover:opacity-80 cursor-pointer text-nowrap">Book Now</button>
        </a>
      </div>
    </div>
  </div>

  <div id="mobileMenuBg" class="fixed transition-all duration-500 top-0 left-0 w-0 h-full bg-[#0d0d0c] opacity-50 z-50"></div>

  <div id="mobileMenu" class="fixed left-0 top-0 bg-white max-w-[30rem] w-0 overflow-hidden h-screen z-50 transition-all duration-500">
    <div class="flex items-end justify-end">
      <i id="mobileMenuCloseBtn" class="fa-solid fa-x z-50 relative ml-auto p-5 text-2xl cursor-pointer"></i>
    </div>
    <ul class="flex relative z-50 flex-col p-10 gap-2">
      <li><a href="./index.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Home</a></li>
      <li><a href="./treatments.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Treatments</a></li>
      <li><a href="./testimonials.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Testimonials</a></li>
      <li><a href="./publications.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Publications</a></li>
      <li><a href="./case-reports.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Case Reports</a></li>
      <li><a href="./about.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">About</a></li>
      <li><a href="./fees.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Fees</a></li>
      <li><a href="./contact.html" class="hover:text-[#59312c] md:text-lg transition-all duration-500">Contact</a></li>
    </ul>
  </div>
  <div class="md:h-24 h-40"></div>
`;

// Mobile menu logic
const openNav = document.getElementById("openNav");
const mobileMenu = document.getElementById("mobileMenu");

// Add background class based on current page
const currentPage = window.location.href.toLowerCase();
let bgClass = "";

if (currentPage.includes("acupuncture")) {
  bgClass = "bgAcupuncture";
} else if (currentPage.includes("medicine")) {
  bgClass = "bgMedicine";
} else if (currentPage.includes("fertility")) {
  bgClass = "bgFertility";
} else if (currentPage.includes("case-reports")) {
  bgClass = "bgCaseReports";
} else if (currentPage.includes("contact")) {
  bgClass = "bgContact";
} else if (currentPage.includes("treatments")) {
  bgClass = "bgtreatments";
} else if (currentPage.includes("testimonials")) {
  bgClass = "bgPatientTestimonials";
} else if (currentPage.includes("publications")) {
  bgClass = "bgPublications";
} else if (currentPage.includes("about")) {
  bgClass = "bgAbout";
} else if (currentPage.includes("fees")) {
  bgClass = "bgfees";
}

// Remove any previous bg class (optional safety)
mobileMenu.classList.remove(
  "bgAcupuncture",
  "bgMedicine",
  "bgFertility",
  "bgCaseReports",
  "bgContact",
  "bgtreatments",
  "bgPatientTestimonials",
  "bgPublications",
  "bgAbout",
  "bgfees"
);

// Apply new background class
if (bgClass) {
  mobileMenu.classList.add(bgClass);
}


const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
const mobileMenuBg = document.getElementById("mobileMenuBg");

openNav.addEventListener("click", () => {
  mobileMenu.style.width = "100%";
  mobileMenuBg.style.width = "100vw";
});

mobileMenuCloseBtn.addEventListener("click", () => {
  mobileMenu.style.width = "0";
  mobileMenuBg.style.width = "0";
});

mobileMenuBg.addEventListener("click", () => {
  mobileMenu.style.width = "0";
  mobileMenuBg.style.width = "0";
});

// Inject PNG layers
["Layer1.png", "Layer2.png", "Layer3.png", "Layer4.png"].forEach((filename, i) => {
  const img = document.createElement("img");
  img.src = `/Docs/Assets/${filename}`;
  img.className = `menuImage image${i + 1}`;
  mobileMenu.appendChild(img);
});

// Add active class to current page link
const menuLinks = mobileMenu.querySelectorAll('ul li a');
const currentPath = window.location.pathname.split("/").pop();

menuLinks.forEach(link => {
  const linkPath = link.getAttribute('href').split("/").pop();
  if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
    link.parentElement.classList.add('active');
  }
});
