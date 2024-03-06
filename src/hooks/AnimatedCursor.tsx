import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    AnimatedCursorProps,
    CursorCoreProps,
    DeviceInfo,
} from "../types/animatedTypes";

const IsDevice: DeviceInfo = (() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

    return {
        info: ua,

        Android: () => ua.match(/Android/i),
        BlackBerry: () => ua.match(/BlackBerry/i),
        IEMobile: () => ua.match(/IEMobile/i),
        iOS: () => ua.match(/iPhone|iPad|iPod/i),
        iPad: () =>
            Boolean(
                ua.match(/Mac/) &&
                    navigator.maxTouchPoints &&
                    navigator.maxTouchPoints > 2
            ),
        OperaMini: () => ua.match(/Opera Mini/i),

        any: function () {
            return Boolean(
                this.Android() ||
                    this.BlackBerry() ||
                    this.iOS() ||
                    this.iPad() ||
                    this.OperaMini() ||
                    this.IEMobile()
            );
        },
    };
})();

function useEventListener<T extends Event>(
    eventName: string,
    handler: (event: T) => void,
    element: HTMLElement | Window = window
) {
    const savedHandler = useRef<(event: T) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener: EventListenerOrEventListenerObject = (event) =>
            savedHandler.current && savedHandler.current(event as T);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}
/**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {string} color - rgb color value
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} innerSize - inner cursor size in px
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {number} outerScale - outer cursor scale amount
 * @param {object} outerStyle - style object for outer cursor
 * @param {object} innerStyle - style object for inner cursor
 * @param {array}  clickables - array of clickable selectors
 *
 */
const CursorCore: React.FC<CursorCoreProps> = ({
    outerStyle,
    innerStyle,
    color = "220, 90, 90",
    outerAlpha = 0.3,
    innerSize = 8,
    outerSize = 8,
    outerScale = 6,
    innerScale = 0.6,
    trailingSpeed = 8,
    clickables = [
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
    ],
}) => {
    const cursorOuterRef = useRef<HTMLDivElement | null>(null);
    const cursorInnerRef = useRef<HTMLDivElement | null>(null);
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    const endX = useRef(0);
    const endY = useRef(0);

    const onMouseMove = useCallback((event: MouseEvent) => {
        const { clientX, clientY } = event;
        setCoords({ x: clientX, y: clientY });
        if (cursorInnerRef.current) {
            cursorInnerRef.current.style.top = `${clientY}px`;
            cursorInnerRef.current.style.left = `${clientX}px`;
        }
        endX.current = clientX;
        endY.current = clientY;
    }, []);

    const animateOuterCursor = useCallback(
        (time: number) => {
            if (
                previousTimeRef.current !== undefined &&
                cursorOuterRef.current
            ) {
                coords.x += (endX.current - coords.x) / trailingSpeed;
                coords.y += (endY.current - coords.y) / trailingSpeed;
                cursorOuterRef.current.style.top = `${coords.y}px`;
                cursorOuterRef.current.style.left = `${coords.x}px`;
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animateOuterCursor);
        },
        [trailingSpeed, coords]
    );

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateOuterCursor);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animateOuterCursor]);

    // Mouse Events State updates
    const onMouseDown = useCallback(() => setIsActive(true), []);
    const onMouseUp = useCallback(() => setIsActive(false), []);
    const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
    const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

    useEventListener("mousemove", onMouseMove);
    useEventListener("mousedown", onMouseDown);
    useEventListener("mouseup", onMouseUp);
    useEventListener("mouseover", onMouseEnterViewport);
    useEventListener("mouseout", onMouseLeaveViewport);

    // Cursors Hover/Active State
    useEffect(() => {
        if (isActive) {
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
            }
        } else {
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.transform =
                    "translate(-50%, -50%) scale(1)";
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform =
                    "translate(-50%, -50%) scale(1)";
            }
        }
    }, [innerScale, outerScale, isActive]);

    // Cursors Click States
    useEffect(() => {
        if (isActiveClickable) {
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${
                    innerScale * 1.2
                })`;
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${
                    outerScale * 1.4
                })`;
            }
        }
    }, [innerScale, outerScale, isActiveClickable]);

    // Cursor Visibility State
    useEffect(() => {
        if (isVisible) {
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.opacity = "1";
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.opacity = "1";
            }
        } else {
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.opacity = "0";
            }
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.opacity = "0";
            }
        }
    }, [isVisible]);

    useEffect(() => {
        const clickableEls = document.querySelectorAll(clickables.join(","));

        clickableEls.forEach((el) => {
            const element = el as HTMLElement;
            element.style.cursor = "none";

            element.addEventListener("mouseover", () => {
                setIsActive(true);
            });
            element.addEventListener("click", () => {
                setIsActive(true);
                setIsActiveClickable(false);
            });
            element.addEventListener("mousedown", () => {
                setIsActiveClickable(true);
            });
            element.addEventListener("mouseup", () => {
                setIsActive(true);
            });
            element.addEventListener("mouseout", () => {
                setIsActive(false);
                setIsActiveClickable(false);
            });
        });

        return () => {
            clickableEls.forEach((el) => {
                el.removeEventListener("mouseover", () => {
                    setIsActive(true);
                });
                el.removeEventListener("click", () => {
                    setIsActive(true);
                    setIsActiveClickable(false);
                });
                el.removeEventListener("mousedown", () => {
                    setIsActiveClickable(true);
                });
                el.removeEventListener("mouseup", () => {
                    setIsActive(true);
                });
                el.removeEventListener("mouseout", () => {
                    setIsActive(false);
                    setIsActiveClickable(false);
                });
            });
        };
    }, [isActive, clickables]);

    // Cursor Styles
    const styles = {
        cursorInner: {
            zIndex: 999,
            display: "block",
            position: "fixed",
            borderRadius: "50%",
            width: innerSize,
            height: innerSize,
            pointerEvents: "none",
            backgroundColor: `rgba(${color}, 1)`,
            ...(innerStyle && innerStyle),
            transition:
                "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
        },
        cursorOuter: {
            zIndex: 999,
            display: "block",
            position: "fixed",
            borderRadius: "50%",
            pointerEvents: "none",
            width: `${outerSize}px`,
            height: `${outerSize}px`,
            backgroundColor: `rgba(${color}, ${outerAlpha})`,
            transition:
                "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
            willChange: "transform",
            ...(outerStyle && outerStyle),
        },
    };

    // Hide / Show global cursor
    document.body.style.cursor = "none";

    return (
        <React.Fragment>
            <div
                ref={cursorOuterRef}
                style={styles.cursorOuter as React.CSSProperties}
            />
            <div
                ref={cursorInnerRef}
                style={styles.cursorInner as React.CSSProperties}
            />
        </React.Fragment>
    );
};

/**
 * AnimatedCursor
 * Calls and passes props to CursorCore if not a touch/mobile device.
 */
function AnimatedCursor({
    outerStyle,
    innerStyle,
    color,
    outerAlpha,
    innerSize,
    innerScale,
    outerSize,
    outerScale,
    trailingSpeed,
    clickables,
}: AnimatedCursorProps) {
    if (typeof navigator !== "undefined" && IsDevice.any()) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <CursorCore
            outerStyle={outerStyle}
            innerStyle={innerStyle}
            color={color}
            outerAlpha={outerAlpha}
            innerSize={innerSize}
            innerScale={innerScale}
            outerSize={outerSize}
            outerScale={outerScale}
            trailingSpeed={trailingSpeed}
            clickables={clickables}
        />
    );
}

export default AnimatedCursor;
