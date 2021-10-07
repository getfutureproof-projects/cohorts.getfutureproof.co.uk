import React, { useState, useEffect, useRef } from 'react'
import useMouse from '@react-hook/mouse-position'
import './style.css'

export default function Button({ text, action }) {
    const btn = useRef(null)
    const shimmer = useRef(null)
    const mouse = useMouse(btn, {
        enterDelay: 500,
        leaveDelay: 500,
    })

    useEffect(() => {
        let current = mouse.x;
        let peak = 25

        function getScaledValue(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
            var targetRange = targetRangeMax - targetRangeMin;
            var sourceRange = sourceRangeMax - sourceRangeMin;
            return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
        }

        if(current){
            let scaled = getScaledValue(mouse.x, 1, mouse.elementWidth, 5, 25)
            peak = scaled
        }

        let pre = peak - 5
        let post = peak + 5
        let fade = post + 5

        shimmer.current.style.backgroundImage = `linear-gradient(170deg,
            var(--fp-main-aubergine) 0%,
            var(--fp-main-aubergine) ${pre}%,
            var(--fp-accent-plum) ${peak}%,
            var(--fp-main-aubergine) ${post}%,
            var(--fp-dark-steel-op) ${fade}%,
            var(--fp-dark-steel-op) 51%,
            white 70%, white 98%, var(--fp-dark-steel-op) 100%)`

    }, [mouse]);

    return (
        <button className="cta pulse" onClick={action} ref={btn}>
            <h2 className="shimmer" ref={shimmer}>
                { text }
            </h2>
        </button>
    )
}
