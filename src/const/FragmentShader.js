/**
 * Default fragment shader which handles single colors.
 */

export const DEFAULT_F = `#version 300 es

precision mediump float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
  outColor = u_color;
}
`;