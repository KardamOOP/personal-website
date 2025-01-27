import { useEffect, useState } from "react";
import starship from "./assets/starship.png"
export default function MainPage() {
    const [xCoord, setXCoord] = useState(window.innerWidth / 2)

    const [shootBullet, setShootBullet] = useState(true);
    const [xCoordBullet, setXCoordBullet] = useState(window.innerWidth / 2);
    const [yCoordBullet, setYCoordBullet] = useState(window.innerHeight - 80);
    const [shoot, setShoot] = useState(false)


    useEffect(() => {
        const handleMouseMove = (event) => {
            const screenWidth = window.innerWidth
            const starshipWidth = 80

            let newXCoord = event.clientX
            if (newXCoord < starshipWidth / 2) {
                newXCoord = starshipWidth / 2
            } else if (newXCoord > screenWidth - starshipWidth / 2) {
                newXCoord = screenWidth - starshipWidth / 2
            }

            setXCoord(newXCoord);
            setXCoordBullet(newXCoord)
        };


    const handleClick = () => {
      setShoot(true);
      setYCoordBullet(window.innerHeight); // Reset bullet position to the bottom of the screen
      }
    

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick)

        };
    }, [])


    useEffect(() => {
        let animationFrameId;

        const animateBullet = () => {
            setYCoordBullet((prevY) => {
                if (prevY <= 0) {
                    setShoot(() => {
                        setYCoordBullet(window.innerHeight)
                        return false
                    });
                    return prevY;
                }
                setXCoordBullet((prev) => {prev})
                return prevY - 10;
            });

            if (shoot) {
                animationFrameId = requestAnimationFrame(animateBullet);
            }
        };

        if (shoot) {
            animateBullet();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [shoot])

    return (
        <div>
            {shootBullet && <div style={{ position: 'absolute', top: `${yCoordBullet}px`, left: `${xCoordBullet}px`, width: '5px', height: '20px', backgroundColor: 'blue' }} />}
            <img
                src={starship}
                alt="Starship"
                style={{ position: "absolute", bottom: "0", left: `${xCoord}px`, transform: "translateX(-50%)" }}
            />
        </div>
    );
}