/**
 * Default fragment shader which handles single colors and Texture sprite sheets.
 */

export const DEFAULT_F = `#version 300 es

precision mediump float;

//in
in vec2 v_texcoord;
uniform vec4 u_color;

//local
uniform sampler2D u_texture;
vec2 subTexcoord;

//out
out vec4 outColor;

void main() {
  vec4 fragColor = texture(u_texture, v_texcoord) * u_color;

  if(fragColor.a < 0.25) {
    discard;
  }

  outColor = vec4(fragColor.rgb, u_color.a);
}
`;