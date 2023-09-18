<script>
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
</script>