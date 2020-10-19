import "./styles.css";

const app = document.querySelector("#app");

const tabs = [
  {
    name: "HTML",
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  {
    name: "CSS",
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    name: "JS",
    body: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  {
    name: "NODE.JS",
    body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  },
  {
    name: "REACT",
    body: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`
  },
  {
    name: "JEST",
    body: `It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
  }
];

const state = {
  tabs,
  selectedTab: 0,
  tabHeaderWidth: 0
};

//create nodes ------------------------------
// -------------------------------------------
const createSlider = () => {
  return `
    <div class="slider">
      ${createSliderHeaderTemplate()}
      ${createSliderBodyTemplate()}
    </div>
  `;
};

const createSliderTabs = () => {
  const template = tabs.reduce((acc, tab) => {
    return (
      acc +
      `
      <div class="slider__tabs__item">
        <div class="tab">${tab.name}</div>
      </div>
    `
    );
  }, "");

  return `
    <div class="slider__tabs">
      ${template}
    </div>
  `;
};

const createSliderHeaderTemplate = () => {
  return `
    <div class="slider__header">
      ${createSliderTabs()}
    </div>
  `;
};

const createSliderSlides = () => {
  const template = tabs.reduce((acc, tab) => {
    return (
      acc +
      `
      <div class="slider__slide">
        ${tab.body}
      </div>
    `
    );
  }, "");

  return `
    <div class="slider__slides">
      ${template}
    </div>
  `;
};

const createSliderBodyTemplate = () => {
  return `
    <div class="slider__body">
      ${createSliderSlides()}
    </div>
  `;
};

const activateTab = (index) => {
  const tabs = [...document.querySelectorAll(".tab")];

  tabs.forEach((tab) => {
    tab.classList.remove("tab--active");
  });

  const currentTab = tabs[index];

  currentTab.classList.add("tab--active");
};

const activateSlide = (index) => {
  const slides = [...document.querySelectorAll(".slider__slide")];

  slides.forEach((slide) => {
    slide.classList.remove("slider__slide--active");
  });

  const currentSlide = slides[index];
  currentSlide.classList.add("slider__slide--active");
};

const updateSliderBodyHeight = (index) => {
  const slides = [...document.querySelectorAll(".slider__slide")];

  const currentSlide = slides[index];

  const currentSlideHeight = currentSlide.offsetHeight;

  const slideBody = document.querySelector(".slider__body");

  slideBody.style.height = `${currentSlideHeight}px`;
};

const getTabsHeaderWidth = () => {
  const tabsContainer = document.querySelector(".slider__tabs");

  const tabsContainerWidth = tabsContainer.offsetWidth;

  return tabsContainerWidth;
};

const checkTabsContainerWidth = () => {
  const tabsContainer = document.querySelector(".slider__tabs");
  const header = document.querySelector(".slider__header");

  const headerWidth = header.offsetWidth;

  if (headerWidth < state.tabHeaderWidth) {
    tabsContainer.classList.add("slider__tabs--column");
  } else {
    tabsContainer.classList.remove("slider__tabs--column");
  }
};

// events ------------------------------
// ---------------------------------------
const handleTabClick = (index) => {
  state.selectedTab = index;

  activateTab(state.selectedTab);
  activateSlide(state.selectedTab);
  updateSliderBodyHeight(state.selectedTab);
};

const handleWindowResize = () => {
  updateSliderBodyHeight(state.selectedTab);
  checkTabsContainerWidth();
};

const addEvents = () => {
  const tabs = [...document.querySelectorAll(".tab")];

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      handleTabClick(index);
    });
  });

  window.addEventListener("resize", handleWindowResize);
};

// RENDER ------------------------------
// -------------------------------------

const render = () => {
  app.innerHTML = createSlider();
  state.tabHeaderWidth = getTabsHeaderWidth();

  console.log(state.tabHeaderWidth);

  addEvents();
  checkTabsContainerWidth();
  activateTab(state.selectedTab);
  activateSlide(state.selectedTab);
  updateSliderBodyHeight(state.selectedTab);
};

render();
