/**
 * Default vertex shader that handles 2D matricies (3x3 matricies) to screen space.
 */
export const DEFAULT_V = `#version 300 es

//in
in vec2 a_position;
in vec2 a_texcoord;
uniform mat3 u_matrix;
uniform float u_depth;


//out
out vec2 v_texcoord;

void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, u_depth, 1);
  v_texcoord = a_texcoord;
}
`;