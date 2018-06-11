/**
 * Default vertex shader that handles 2D matricies (3x3 matricies) to screen space.
 */
export const DEFAULT_V = `#version 300 es

in vec2 a_position;

uniform mat3 u_matrix;

void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}
`