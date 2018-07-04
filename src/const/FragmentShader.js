/**
 * Default fragment shader which handles single colors and Texture sprite sheets.
 */

export const DEFAULT_F = `#version 300 es

precision mediump float;

//in
in vec2 v_texcoord;
uniform vec4 u_color;
uniform vec4 u_subTexcoord;

//local
uniform sampler2D u_texture;
vec2 subTexcoord;

//out
out vec4 outColor;

void main() {
  subTexcoord = v_texcoord;
  subTexcoord.xy -= u_subTexcoord.xy;
  subTexcoord.xy *= u_subTexcoord.zw;
  vec4 fragColor = texture(u_texture, subTexcoord) * u_color;

  if(fragColor.a < 0.25) {
    discard;
  }

  outColor = vec4(fragColor.rgb, u_color.a);
}
`;

/**
 * Fragment shader which takes parameters to draw tile maps.
 */

export const TILEMAP_F = `#version 300 es

precision mediump float;

//in
in vec2 v_texcoord;
uniform vec4 u_color;

/*
[0][0] = 0 = Map data tiles width.
[0][1] = 1 = Map data tiles height.
[0][2] = 2 = Map tiles in the texture width.
[0][3] = 3 = Map tiles in the texture height.

[1][0] = 4 = Map viewport width.
[1][1] = 5 = Map viewport height.
[1][2] = 6 = Map viewport x1.
[1][3] = 7 = Map viewport y1.

[2][0] = 8 = TileSize width normalized.
[2][1] = 9 = TileSize height normalized. 
*/
uniform mat4 u_tileData;
uniform mediump usampler2D u_mapDataTexture;
uniform sampler2D u_texture;

//local

//texture tile image coordinates
vec2 subTexcoord;

//map data tile position.
vec2 mapTilecoord;

//Drawing coordinate.
vec2 drawCoord;

//out
out vec4 outColor;

void main() {

  //get this tile xy coordinate for the tile ID.
  mapTilecoord.x = (u_tileData[1][2] + floor(v_texcoord.x * u_tileData[1][0])) / u_tileData[0][0];
  mapTilecoord.y = (u_tileData[1][3] + floor(v_texcoord.y * u_tileData[1][1])) / u_tileData[0][1];

  // mapTilecoord.x = 0.5f;
  // mapTilecoord.y = 0.0f;

  //get the tile ID from the texture.
  float tileID = float(texture(u_mapDataTexture, mapTilecoord).r);

  //float tileID = 2.0f;

  //get xy positions of texture from the ID, normalized.
  subTexcoord.x = -mod(tileID, u_tileData[0][2]) / u_tileData[0][2];
  subTexcoord.y = -floor(tileID / u_tileData[0][3]) / u_tileData[0][3];

  //always ID 1 for now.
  // subTexcoord.x = -0.125f;
  // subTexcoord.y = -0.0f;

  drawCoord.x = fract((v_texcoord.x) * u_tileData[1][0]);
  drawCoord.y = fract((v_texcoord.y) * u_tileData[1][1]);

  drawCoord.x /= u_tileData[0][2] + 0.1f;
  drawCoord.y /= u_tileData[0][3] + 0.1f;

  drawCoord.x -= subTexcoord.x;
  drawCoord.y -= subTexcoord.y;

  vec4 fragColor = texture(u_texture , drawCoord) * u_color;

  if(fragColor.a < 0.25) {
    discard;
  }

  outColor = vec4(fragColor.rgb, u_color.a);
}
`;