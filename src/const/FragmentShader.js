/**
 * Default fragment shader which handles single colors.
 */

export const DEFAULT_F = `#version 300 es

precision mediump float;

in vec2 v_texcoord;

uniform vec4 u_color;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
  outColor = texture(u_texture, v_texcoord) * u_color;
}
`;