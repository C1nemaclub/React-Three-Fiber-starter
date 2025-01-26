

varying vec3 vNormal;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vWorldPosition;

void main(){

    vec3 pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec3 worldNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyx;
    vNormal = normal;
    vWorldNormal = worldNormal;
    vUv = uv;
    vPosition = position;
    vWorldPosition = worldPosition;
}