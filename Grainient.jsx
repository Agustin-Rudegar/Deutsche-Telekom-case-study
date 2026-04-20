import React, { useMemo, useRef, useEffect } from "react";

const Grainient = ({
  color1 = "#E20074",
  color2 = "#000000",
  color3 = "#000000",
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5.2,
  warpSpeed = 2,
  warpAmplitude = 33,
  blendAngle = 3,
  blendSoftness = 0.41,
  rotationAmount = 0,
  noiseScale = 0.5,
  grainAmount = 0.08,
  grainScale = 0.5,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  ...props
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragSource = `
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

      // --- Utilities ---
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

      // --- Soft Noise Logic ---
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m*m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = (vUv - uCenter) / uZoom + uCenter;
        float t = uTime * uWarpSpeed;
        
        // --- Large Scale Soft Drift ---
        float n1 = snoise(uv * uWarpFrequency * 0.5 + t * 0.2);
        float n2 = snoise(uv * uWarpFrequency * 0.3 - t * 0.1);
        
        // --- Soft Blending ---
        float angle = uBlendAngle * 3.14159 / 180.0;
        vec2 dir = vec2(cos(angle), sin(angle));
        float dist = dot(uv - 0.5, dir) + 0.5;
        
        // Use high blendSoftness for the blurred look
        float mask1 = smoothstep(0.5 - uBlendSoftness - uColorBalance, 0.5 + uBlendSoftness - uColorBalance, dist + n1 * uWarpStrength * 0.1);
        vec3 color = mix(uColor1, uColor2, mask1);
        
        // Soft overlay of the third color
        float mask2 = smoothstep(-0.2, 1.2, n2 + 0.5);
        color = mix(color, uColor3, mask2 * 0.4);

        // --- Clean Post Processing ---
        color = pow(max(color, 0.0), vec3(1.0 / uGamma));
        color = mix(vec3(0.5), color, uContrast);
        
        vec3 hsv = rgb2hsv(color);
        hsv.y *= uSaturation;
        color = hsv2rgb(hsv);

        // --- Minimal Grain ---
        float grainTime = uGrainAnimated ? uTime * 5.0 : 0.0;
        float grain = random(vUv * uGrainScale + grainTime);
        color += (grain - 0.5) * uGrainAmount;

        gl_FragColor = vec4(color, 1.0);
      }

    `;

    const resize = () => {
      const displayWidth = Math.floor(canvas.clientWidth * window.devicePixelRatio);
      const displayHeight = Math.floor(canvas.clientHeight * window.devicePixelRatio);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
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
      requestAnimationFrameId = requestAnimationFrame(render);
    };
    let requestAnimationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [color1, color2, color3, timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness, noiseScale, grainAmount, grainScale, grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} {...props} />;
};

export default Grainient;
