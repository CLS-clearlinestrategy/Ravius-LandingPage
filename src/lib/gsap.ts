/**
 * src/lib/gsap.ts
 *
 * Central GSAP configuration for the Ravius Motion System.
 *
 * All GSAP plugins are registered exactly once here.
 * Import gsap, ScrollTrigger, SplitText, and useGSAP exclusively
 * from this module — never import directly from "gsap/*" in components.
 *
 * This prevents duplicate registration (which resets ScrollTrigger state)
 * across Fast Refresh cycles and multiple component imports.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
