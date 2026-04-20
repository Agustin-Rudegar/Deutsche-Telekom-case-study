import React, { useMemo, useRef, useEffect } from "react";

const Grainient = ({
  color1 = "#ff0000",
  color2 = "#00ff00",
  color3 = "#0000ff",
  timeSpeed = 0.2,
  colorBalance = 0.5,
  warpStrength = 1.0,
  warpFrequency = 1.0,
  warpSpeed = 1.0,
  warpAmplitude = 1.0,
  blendAngle = 0.0,
  blendSoftness = 0.5,
  rotationAmount = 0.0,
  noiseScale = 1.0,
  grainAmount = 0.05,
  grainScale = 1.0,
  grainAnimated = true,
  contrast = 1.0,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.5,
  centerY = 0.5,
  zoom = 1.0,
  ...props
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertSource = \`
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    \`;

    const fragSource = \`
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uColorBalance;
      uniform float uWarpStrength;
      uniform float uWarpFrequency;
      uniform float uWarpSpeed;
      uniform float uWarpAmplitude;
      uniform float uBlendAngle;
      uniform float uBlendSoftness;
      uniform float uNoiseScale;
      uniform float uGrainAmount;
      uniform float uGrainScale;
      uniform bool uGrainAnimated;
      uniform float uContrast;
      uniform float uGamma;
      uniform float uSaturation;
      uniform vec2 uCenter;
      uniform float uZoom;

      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float random(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = (vUv - uCenter) / uZoom + uCenter;
        float t = uTime * uWarpSpeed;
        
        vec2 p = uv * uWarpFrequency;
        float n = noise(p + t) * uWarpStrength;
        uv += vec2(cos(n * uWarpAmplitude), sin(n * uWarpAmplitude)) * 0.01;

        float angle = uBlendAngle * 3.14159 / 180.0;
        vec2 dir = vec2(cos(angle), sin(angle));
        float dist = dot(uv - 0.5, dir) + 0.5;
        
        float factor = smoothstep(0.5 - uBlendSoftness - uColorBalance, 0.5 + uBlendSoftness - uColorBalance, dist);
        vec3 color = mix(uColor1, uColor2, factor);
        color = mix(color, uColor3, smoothstep(0.0, 1.0, noise(uv * 2.0 + t * 0.5)));

        // Contrast/Gamma/Saturation
        color = pow(color, vec3(1.0 / uGamma));
        color = mix(vec3(0.5), color, uContrast);
        vec3 hsv = rgb2hsv(color);
        hsv.y *= uSaturation;
        color = hsv2rgb(hsv);

        // Grain
        float grainTime = uGrainAnimated ? uTime : 0.0;
        float grain = random(vUv * uGrainScale + grainTime);
        color += (grain - 0.5) * uGrainAmount;

        gl_FragColor = vec4(color, 1.0);
      }
    \`;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    let start = 0;
    const render = (time) => {
      if (!start) start = time;
      const elapsed = (time - start) * 0.001 * timeSpeed;

      gl.uniform1f(gl.getUniformLocation(program, "uTime"), elapsed);
      gl.uniform3fv(gl.getUniformLocation(program, "uColor1"), hexToRgb(color1));
      gl.uniform3fv(gl.getUniformLocation(program, "uColor2"), hexToRgb(color2));
      gl.uniform3fv(gl.getUniformLocation(program, "uColor3"), hexToRgb(color3));
      gl.uniform1f(gl.getUniformLocation(program, "uColorBalance"), colorBalance);
      gl.uniform1f(gl.getUniformLocation(program, "uWarpStrength"), warpStrength);
      gl.uniform1f(gl.getUniformLocation(program, "uWarpFrequency"), warpFrequency);
      gl.uniform1f(gl.getUniformLocation(program, "uWarpSpeed"), warpSpeed);
      gl.uniform1f(gl.getUniformLocation(program, "uWarpAmplitude"), warpAmplitude);
      gl.uniform1f(gl.getUniformLocation(program, "uBlendAngle"), blendAngle);
      gl.uniform1f(gl.getUniformLocation(program, "uBlendSoftness"), blendSoftness);
      gl.uniform1f(gl.getUniformLocation(program, "uNoiseScale"), noiseScale);
      gl.uniform1f(gl.getUniformLocation(program, "uGrainAmount"), grainAmount);
      gl.uniform1f(gl.getUniformLocation(program, "uGrainScale"), grainScale);
      gl.uniform1i(gl.getUniformLocation(program, "uGrainAnimated"), grainAnimated);
      gl.uniform1f(gl.getUniformLocation(program, "uContrast"), contrast);
      gl.uniform1f(gl.getUniformLocation(program, "uGamma"), gamma);
      gl.uniform1f(gl.getUniformLocation(program, "uSaturation"), saturation);
      gl.uniform2f(gl.getUniformLocation(program, "uCenter"), centerX, centerY);
      gl.uniform1f(gl.getUniformLocation(program, "uZoom"), zoom);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, [color1, color2, color3, timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness, noiseScale, grainAmount, grainScale, grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} {...props} />;
};

export default Grainient;
