import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function JokeGalaxyCanvas() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth || 320;
        const height = container.clientHeight || 260;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 4);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const emojiCanvas = document.createElement('canvas');
        emojiCanvas.width = 512;
        emojiCanvas.height = 512;
        const ctx = emojiCanvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, emojiCanvas.width, emojiCanvas.height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '260px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", sans-serif';
            ctx.fillText('😂', emojiCanvas.width / 2, emojiCanvas.height / 2 + 20);
        }

        const emojiTexture = new THREE.CanvasTexture(emojiCanvas);
        const emojiGeometry = new THREE.PlaneGeometry(2.4, 2.4);
        const emojiMaterial = new THREE.MeshBasicMaterial({
            map: emojiTexture,
            transparent: true,
        });
        const emojiMesh = new THREE.Mesh(emojiGeometry, emojiMaterial);
        scene.add(emojiMesh);

        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 300;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i += 1) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starsMaterial = new THREE.PointsMaterial({
            color: 0x22c55e,
            size: 0.035,
        });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
        directionalLight.position.set(3, 3, 5);
        scene.add(directionalLight);

        let animationFrameId;
        let targetX = 0;
        let targetY = 0;

        const handlePointerMove = (event) => {
            const rect = container.getBoundingClientRect();
            const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
            const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;

            if (!insideX || !insideY) return;

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            targetX = x * 1.2;
            targetY = -y * 1.2;
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            emojiMesh.rotation.y += (targetX - emojiMesh.rotation.y) * 0.08;
            emojiMesh.rotation.x += (targetY - emojiMesh.rotation.x) * 0.08;
            stars.rotation.y += 0.0008;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const newWidth = container.clientWidth || width;
            const newHeight = container.clientHeight || height;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            cancelAnimationFrame(animationFrameId);
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
            emojiGeometry.dispose();
            emojiMaterial.dispose();
            starsGeometry.dispose();
            starsMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-64 sm:h-72 md:h-80 w-full rounded-3xl border border-emerald-500/40 bg-transparent overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.35)]"
        />
    );
}


