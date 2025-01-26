

uniform vec3 uColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uLightPosition;
uniform sampler2D uNoiseTexture;
uniform sampler2D uNormalTexture;
varying vec3 vNormal;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWorldPosition;

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv = uv - 0.5;


    gl_FragColor = vec4(vNormal, 1.0);
}