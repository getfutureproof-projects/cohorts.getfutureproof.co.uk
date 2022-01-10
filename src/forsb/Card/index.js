import React, { HTMLAttributes } from 'react';
// import { FPColorString } from '../styles/theme';
import { colors } from '@getfutureproof/fpsb';


// export interface CardProps extends HTMLAttributes<HTMLButtonElement> {
//     /** required */
//     label: string;
//     /** Denotes external link when 'true' */
//     external?: boolean;
//     /** Link href */
//     href?: string;
//     /** Switch bg and text color */
//     inverted?: boolean;
//     /** Choose contrast colour */
//     colorway?: FPColorString;
//     /** Click action */
//     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

export const Card = ({ children, type='info', shadow=false, inverted=false, colorway='purple', ...props })=> {
    let isDefault = colorway === 'purple';
    let contrast = isDefault ? 'white' : colorway;
    let bgColor = inverted ? contrast : 'purple';
    let textColor = inverted ? 'purple' : contrast;    

    return (
        <div
            className='card'
            style={{
                backgroundColor: colors[bgColor],
                boxShadow: shadow ? `-10px 10px ${colors.purple}` : 'none',
                color: colors[textColor], textAlign: 'left', fontWeight: 800,
                maxWidth: '30%', padding: '10px 20px', fontSize: '0.9em'
            }} >
                {children}
        </div>
    )
};