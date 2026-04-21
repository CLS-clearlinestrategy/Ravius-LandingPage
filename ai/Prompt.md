Create a reusable “section fade” component (gradient from a solid color to transparent) to improve transitions between sections.

The component should:

* Render a smooth gradient overlay
* Support positioning at the top or bottom of a section
* Accept props for:

  * position: "top" | "bottom"
  * color
  * height

Requirements:

* Must not block interactions (pointer-events-none)
* Assume the parent container is position: relative
* The fade should be visually smooth (avoid harsh transitions)

Output:

* Component implementation
* Type definitions
* Minimal usage example