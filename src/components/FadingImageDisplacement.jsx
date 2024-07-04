import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing, geometry } from "maath";

// shaderMaterial is a THREE.js material
const ImageFadeMaterial = shaderMaterial(
  { 
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  // Vertex Shader
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  // Fragment Shader
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r * effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
);

extend({ ImageFadeMaterial, RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

export const FadingImageDisplacement = () => {
  const ref = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    "/img/contact-img.webp", 
    "/img/contact-img.webp", 
    "/img/overlay.webp",
  ]);

  const [hovered, setHover] = useState(false);

  useFrame((_state, delta) => {
    easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
  });

  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <roundedPlaneGeometry args={[5, 9]} />
      <imageFadeMaterial 
        ref={ref} 
        tex={texture1} 
        tex2={texture2} 
        disp={dispTexture} 
        toneMapped={false} 
      />
    </mesh>
  );
};
