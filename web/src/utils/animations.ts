export const animations = {
    jumpLoop: {
        animation: {
            y: [0, -8],
            transition: {
                delay: 0.6,
                yoyo: Infinity,
            }
        }
    },

    slideLeft: {
        initial: {
            x: '-10vw',
            opacity: 0,
        },
      
        final: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 35,
            }
        },
    },

    slideRight: {
        initial: {
            x: '10vw',
            opacity: 0,
        },
    
        final: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 30,
            },
        },
    },

    slideTop: {
        initial: {
            y: '-10vw',
            opacity: 0,
        },
    
        final: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 40,
            },
        },
    },

    opacity: {
        initial: {
            opacity: 0,
        },
        final: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                duration: 1.2,
            },
        },
        exit: {
            opacity: 0,
            transition: { ease: 'easeInOut' },
        },
    },
}