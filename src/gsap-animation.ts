import gsap from 'gsap';

const IMAGE_WIPE_DURATION = 1.1;

export class RevealAnimations {

  static revealUp(
    elements: gsap.TweenTarget,
    delay = 0
  ) {
    return gsap.fromTo(
      elements,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        stagger: 0.08,
        force3D: true
      }
    );
  }
  
  static revealText(
    elements: gsap.TweenTarget,
    delay = 0
  ) {
    return gsap.fromTo(
      elements,
      {
        y: '100%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.85,
        delay,
        ease: 'power3.out',
        stagger: 0.12,
        force3D: true
      }
    );
  }

  static revealImage(
    element: gsap.TweenTarget
  ) {
    const el = element as HTMLElement;

    return gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)',
      duration: IMAGE_WIPE_DURATION,
      ease: 'power3.inOut',
      force3D: true
    });
  }

  static bounceReveal(
    elements: gsap.TweenTarget,
    delay = 0
  ) {
    return gsap.fromTo(
      elements,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        delay: IMAGE_WIPE_DURATION + delay,
        duration: 0.65,
        ease: 'back.out(1.6)',
        stagger: 0.06,
        force3D: true
      }
    );
  }
}