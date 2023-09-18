<script>
// Ensure the document is fully loaded before executing the following
document.addEventListener('DOMContentLoaded', () => {

    // Code that runs on pageload
    gsap.to('.load_grid-item', {
        opacity: 0,
        duration: 0.001,
        stagger: { amount: 0.5, from: 'random' },
        onComplete: () => {
            gsap.set('.load_grid', { display: 'none' });
        }
    });

    // Code that runs on click of a link
    $('a').on('click', function(e) {
        if (
            $(this).prop('hostname') === window.location.host &&
            $(this).attr('href').indexOf('#') === -1 &&
            $(this).attr('target') !== '_blank'
        ) {
            e.preventDefault();
            const destination = $(this).attr('href');
            gsap.set('.load_grid', { display: 'grid' });
            gsap.fromTo(
                '.load_grid-item', 
                { opacity: 0 }, 
                {
                    opacity: 1,
                    duration: 0.001,
                    stagger: { amount: 0.5, from: 'random' },
                    onComplete: () => {
                        window.location = destination;
                    }
                }
            );
        }
    });

    // On click of the back button
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };

    // Split text into spans
    const typeSplit = new SplitType('[text-split]', {
        types: 'words, chars',
        tagName: 'span'
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
        // Reset timeline when scrolled out of view past the bottom of the screen
        ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top bottom',
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        // Play timeline when scrolled into view (60% from the top of the screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top 60%',
            onEnter: () => timeline.play()
        });
    }

    $('[scrub-each-word]').each(function() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: 'top 90%',
                end: 'top center',
                scrub: true
            }
        });
        tl.from($(this).find('.word'), { opacity: 0.2, duration: 0.2, ease: 'power1.out', stagger: { each: 0.4 } });
    });

    // Avoid flash of unstyled content
    gsap.set('[text-split]', { opacity: 1 });
});
</script>