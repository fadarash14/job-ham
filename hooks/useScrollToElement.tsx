import { useEffect, RefObject } from "react";

function useScrollToElement<T extends HTMLElement>(
  ref: RefObject<T>,
  behavior: ScrollBehavior = "smooth",
  dependencies: any[] = [],
  scrollToTopOnMount = false,
  shouldScroll: boolean = true // New boolean prop
): () => void {
  const scrollToRef = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: behavior,
      });
    }
  };

  useEffect(() => {
    if (scrollToTopOnMount && typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    if (shouldScroll && dependencies.every((dep) => dep !== undefined)) {
      scrollToRef();
    }
  }, [ref, ...dependencies, scrollToTopOnMount, shouldScroll]);

  return scrollToRef;
}

export default useScrollToElement;
