// document.addEventListener("DOMContentLoaded", function () {
  
//   // const hero = new HeroSlider(".swiper");
//   // hero.start();

//   // const #textAnimation = function (el, inview) {
//   //   if (inview) {
//   //     const ta = new TweenTextAnimation(el);
//   //     ta.animate();
//   //   }
//   // }

//   // const so = new ScrollObserver(".tween-animate-title", #textAnimation);

//   // const #inviewAnimation = function (el, inview) {
//   //   if (inview) {
//   //     el.classList.add("inview");
//   //   } else {
//   //     el.classList.remove("inview");
//   //   }
//   // }

//   // const so2 = new ScrollObserver(".cover-slide", #inviewAnimation);

//   // const header = document.querySelector(".header");
//   // const #navAnimation = function (el, inview) {
//   //   if (inview) {
//   //     header.classList.remove("triggered");
//   //   } else {
//   //     header.classList.add("triggered");
//   //   }
//   // }

//   // const so3 = new ScrollObserver(".nav-trigger", #navAnimation, {
//   //   once: false,
//   // });

//   // new MobileMenu();
// });
  
class Main {
  #observers = [];

  constructor() {
    this.header = document.querySelector(".header");
    this.hero = new HeroSlider(".swiper");
    this.sides = document.querySelectorAll(".side");
    this.#init();
  }

  #init() {
    new MobileMenu();
    Pace.on('done', this.#scrollInit.bind(this));
  }

  #scrollInit() {
    this.#observers.push(
      new ScrollObserver("#main-content", this.#sideAnimation.bind(this), {
        once: false, rootMargin: "-300px 0px"
      }),
      new ScrollObserver(".nav-trigger", this.#navAnimation.bind(this), {
        once: false,
      }),
      new ScrollObserver(".swiper", this.#toggleSlideAnimation.bind(this), {
        once: false,
      }),
      new ScrollObserver(".cover-slide", this.#inviewAnimation),
      new ScrollObserver(".appear", this.#inviewAnimation),
      new ScrollObserver(".tween-animate-title", this.#textAnimation)
    );
    console.log(this.#observers);
  }

  #toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  #textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  #sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add("inview"));
    } else {
      this.sides.forEach((side) => side.classList.remove("inview"));
    }
  }

  #inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }
}

new Main();
